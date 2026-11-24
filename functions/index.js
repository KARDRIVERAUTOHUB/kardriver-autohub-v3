const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");

initializeApp();

const db = getFirestore();
const REGION = "asia-southeast1";
const dtcDatabase = require("./dtc-data");

// Semak identiti daripada Firebase Authentication.
// Jangan terima UID, nama atau gambar daripada input pengguna.
async function writeCommunityProfile(uid) {
  const userRef = db.collection("users").doc(uid);
  const profileRef = db.collection("community_profiles").doc(uid);

  let userRecord = null;

  try {
    userRecord = await getAuth().getUser(uid);
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      throw error;
    }
  }

  // Status akaun dan profil dibaca/dikemas kini secara atomik.
  // Event lama tidak boleh mengatasi status akaun terkini.
  return db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);

    const userData = userSnap.exists ? userSnap.data() : {};
    const isActive =
      userSnap.exists &&
      userData.status === "ACTIVE" &&
      userRecord !== null &&
      userRecord.disabled !== true;

    if (!isActive) {
      transaction.set(profileRef, {
        uid,
        displayName: FieldValue.delete(),
        photoURL: FieldValue.delete(),
        badge: null,
        status: "INACTIVE",
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true });

      return false;
    }

    const roles = Array.isArray(userData.roles) ? userData.roles : [];
    const isOwner = roles.includes("OWNER");
    const isPlatformAdmin =
      userRecord.customClaims?.platformAdmin === true;

    const badge = isOwner
      ? "SuperAdmin"
      : isPlatformAdmin
        ? "Admin"
        : null;

    transaction.set(profileRef, {
      uid,
      displayName: userRecord.displayName || "Pengguna KARDRIVER",
      photoURL: userRecord.photoURL || null,
      badge,
      status: "ACTIVE",
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    return true;
  });
}

// Pengguna hanya boleh menyegerakkan profil akaun sendiri.
exports.syncCommunityProfile = onCall(
  { region: REGION },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "Sila login terlebih dahulu."
      );
    }

    const uid = request.auth.uid;
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists || userDoc.data().status !== "ACTIVE") {
      throw new HttpsError(
        "permission-denied",
        "Akaun tidak aktif atau profil tidak sah."
      );
    }

    const synced = await writeCommunityProfile(uid);

    if (!synced) {
      throw new HttpsError(
        "permission-denied",
        "Akaun Firebase Authentication tidak aktif."
      );
    }

    return { success: true };
  }
);

// Pantau perubahan users/{uid}.
// Abaikan status daripada event dan baca status terkini daripada Firestore.
exports.syncCommunityProfileOnUserWrite = onDocumentWritten(
  {
    document: "users/{uid}",
    region: REGION
  },
  async (event) => {
    const uid = event.params.uid;
    await writeCommunityProfile(uid);
  }
);

// MEMBERSHIP AUTO-EXPIRY V1
// Semak dan turunkan Membership yang telah tamat tempoh.
exports.syncMembershipExpiry = onCall(
  { region: REGION },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "Sila login terlebih dahulu."
      );
    }

    const uid = request.auth.uid;
    const userRef = db.collection("users").doc(uid);

    return db.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists) {
        throw new HttpsError(
          "not-found",
          "Profil pengguna tidak ditemui."
        );
      }

      const userData = userSnap.data();
      const expiresAt = userData.membershipExpiresAt;

      if (
        !["PRO", "MASTERCLASS_ELITE"].includes(userData.membership) ||
        userData.membershipStatus !== "ACTIVE" ||
        !expiresAt ||
        typeof expiresAt.toMillis !== "function"
      ) {
        return {
          success: true,
          expired: false,
          membership: userData.membership || "FREE",
          membershipStatus: userData.membershipStatus || "INACTIVE"
        };
      }

      if (expiresAt.toMillis() > Date.now()) {
        return {
          success: true,
          expired: false,
          membership: userData.membership,
          membershipStatus: userData.membershipStatus
        };
      }

      transaction.update(userRef, {
        membership: "FREE",
        membershipStatus: "EXPIRED",
        membershipBillingCycle: null,
        membershipExpiredAt: FieldValue.serverTimestamp()
      });

      return {
        success: true,
        expired: true,
        membership: "FREE",
        membershipStatus: "EXPIRED"
      };
    });
  }
);


/**
 * KARDRIVER MEMBERSHIP AUTO-EXPIRY V2
 * Pemeriksaan global setiap hari pada 02:00 waktu Malaysia.
 * Sejarah langganan dan tarikh asal dikekalkan.
 */
exports.scheduledMembershipExpiryV2 = onSchedule(
  {
    schedule: "0 2 * * *",
    timeZone: "Asia/Kuala_Lumpur",
    region: REGION,
    maxInstances: 1,
    timeoutSeconds: 540
  },
  async () => {
    const now = new Date();
    const batchSize = 200;
    let totalExpired = 0;

    while (true) {
      const snapshot = await db.collection("users")
        .where("membershipStatus", "==", "ACTIVE")
        .where("membership", "in", ["PRO", "MASTERCLASS_ELITE"])
        .where("membershipExpiresAt", "<=", now)
        .orderBy("membershipExpiresAt", "asc")
        .limit(batchSize)
        .get();

      if (snapshot.empty) break;

      let batchExpired = 0;

      for (const userDoc of snapshot.docs) {
        const userRef = db.collection("users").doc(userDoc.id);

        const expired = await db.runTransaction(async (transaction) => {
          const currentSnap = await transaction.get(userRef);

          if (!currentSnap.exists) return false;

          const data = currentSnap.data();
          const expiresAt = data.membershipExpiresAt;

          if (
            !["PRO", "MASTERCLASS_ELITE"].includes(data.membership) ||
            data.membershipStatus !== "ACTIVE" ||
            !expiresAt ||
            typeof expiresAt.toMillis !== "function" ||
            expiresAt.toMillis() > Date.now()
          ) {
            return false;
          }

          transaction.update(userRef, {
            membership: "FREE",
            membershipStatus: "EXPIRED",
            membershipBillingCycle: null,
            membershipExpiredAt: FieldValue.serverTimestamp()
          });

          return true;
        });

        if (expired) {
          batchExpired++;
          totalExpired++;
        }
      }

      console.log(
        "Membership Auto-Expiry V2: kelompok diproses",
        snapshot.size,
        "| tamat tempoh",
        batchExpired
      );

      if (snapshot.size < batchSize) break;
    }

    console.log(
      "Membership Auto-Expiry V2 selesai. Jumlah akaun ditamatkan:",
      totalExpired
    );

    return { success: true, totalExpired };
  }
);

// ============================================================
// KARDRIVER LIVE PRESENCE AUTO-CLEANUP V1
// Buang sesi yang tidak menerima heartbeat selama 3 minit.
// ============================================================

exports.scheduledPresenceCleanupV1 = onSchedule(
  {
    schedule: "*/5 * * * *",
    timeZone: "Asia/Kuala_Lumpur",
    region: REGION,
    maxInstances: 1,
    timeoutSeconds: 540
  },
  async () => {
    const cutoff = Date.now() - (3 * 60 * 1000);
    const batchSize = 200;
    let totalRemoved = 0;

    while (true) {
      const snapshot = await db
        .collection("community_presence_sessions")
        .where("lastHeartbeat", "<=", new Date(cutoff))
        .orderBy("lastHeartbeat", "asc")
        .limit(batchSize)
        .get();

      if (snapshot.empty) break;

      let removedThisBatch = 0;

      for (const sessionDoc of snapshot.docs) {
        const removed = await db.runTransaction(async (transaction) => {
          const currentSnap = await transaction.get(sessionDoc.ref);

          if (!currentSnap.exists) return false;

          const data = currentSnap.data();
          const heartbeat = data.lastHeartbeat;

          if (
            !heartbeat ||
            typeof heartbeat.toMillis !== "function" ||
            heartbeat.toMillis() > cutoff
          ) {
            return false;
          }

          transaction.delete(sessionDoc.ref);
          return true;
        });

        if (removed) {
          removedThisBatch++;
          totalRemoved++;
        }
      }

      console.log(
        "Presence Auto-Cleanup: diperiksa",
        snapshot.size,
        "| dipadam",
        removedThisBatch
      );
    }

    console.log(
      "Presence Auto-Cleanup V1 selesai. Jumlah sesi dipadam:",
      totalRemoved
    );

    return { success: true, totalRemoved };
  }
);


// ============================================================
// KARDRIVER DTC DETAILS API V1
// Akses kandungan berdasarkan Membership yang disahkan backend.
// ============================================================

exports.getDTCDetails = onCall(
  { region: REGION },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Sila login terlebih dahulu.");
    }

    const code = String(request.data?.code || "").trim().toUpperCase();

    if (!/^[PBCU][0-9A-F]{4}$/.test(code)) {
      throw new HttpsError("invalid-argument", "Format kod DTC tidak sah.");
    }

    const dtc = dtcDatabase.find((item) => item.c === code);
    if (!dtc) {
      throw new HttpsError("not-found", "Kod DTC tidak ditemui.");
    }

    const uid = request.auth.uid;
    const userRef = db.collection("users").doc(uid);

    const access = await db.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists || userSnap.data().status !== "ACTIVE") {
        throw new HttpsError(
          "permission-denied",
          "Akaun tidak aktif atau profil tidak sah."
        );
      }

      const userData = userSnap.data();
      const plan = userData.membership || "FREE";
      const membershipStatus = userData.membershipStatus || "INACTIVE";

      if (plan === "FREE") {
        return { tier: "FREE", membership: "FREE" };
      }

      if (
        !["PRO", "MASTERCLASS_ELITE"].includes(plan) ||
        membershipStatus !== "ACTIVE"
      ) {
        return { tier: "FREE", membership: "FREE" };
      }

      const expiresAt = userData.membershipExpiresAt;

      if (!expiresAt || typeof expiresAt.toMillis !== "function") {
        return { tier: "FREE", membership: "FREE" };
      }

      if (expiresAt.toMillis() <= Date.now()) {
        transaction.update(userRef, {
          membership: "FREE",
          membershipStatus: "EXPIRED",
          membershipBillingCycle: null,
          membershipExpiredAt: FieldValue.serverTimestamp()
        });

        return { tier: "FREE", membership: "FREE", expired: true };
      }

      return { tier: plan, membership: plan };
    });

    const result = {
      code: dtc.c,
      name: dtc.n,
      tier: access.tier,
      membership: access.membership,
      free: dtc.free
    };

    if (access.tier === "PRO" || access.tier === "MASTERCLASS_ELITE") {
      result.pro = dtc.pro;
    }

    if (access.tier === "MASTERCLASS_ELITE") {
      result.elite = dtc.elite;
    }

    return result;
  }
);
