import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-functions.js";
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  runTransaction,
  addDoc,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const useFirebaseEmulators = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const firebaseConfig = {
  apiKey: useFirebaseEmulators ? "demo-api-key" : "AIzaSyBYp4gySn8JmNAje9ZyNmIbwCDf4KIL1ng",
  authDomain: "kardriver-autohub.firebaseapp.com",
  projectId: useFirebaseEmulators ? "demo-kardriver-community" : "kardriver-autohub",
  storageBucket: "kardriver-autohub.firebasestorage.app",
  messagingSenderId: "521435133008",
  appId: "1:521435133008:web:16887b29b7f001d8528d55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, "asia-southeast1");

if (useFirebaseEmulators) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

// Simpan profil pengguna ke Firestore
window.saveUserProfile = async function(user) {
  if (!user) return false;

  try {
    const userRef = doc(db, "users", user.uid);

    const userData = {
      name: user.displayName || "Pengguna KARDRIVER",
      email: user.email || "",
      membership: "FREE",
      status: "ACTIVE",
      roles: ["DRIVER"],
      activeRole: "DRIVER",
      createdAt: user.metadata?.creationTime || ""
    };

    await setDoc(userRef, userData);

    return true;
  } catch (error) {
    console.error("Gagal menyimpan profil:", error);
    return false;
  }
};

let pendingRegistrationProfile = null;

// Daftar akaun baharu
window.firebaseRegister = async function(name, email, password) {
  let resolveProfileReady;
  const profileReadyPromise = new Promise(resolve => {
    resolveProfileReady = resolve;
  });

  pendingRegistrationProfile = { promise: profileReadyPromise };

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    const profileSaved = await window.saveUserProfile(result.user);
    resolveProfileReady(profileSaved);

    if (!profileSaved) {
      alert("Akaun berjaya dibuat, tetapi profil gagal disimpan. Sila hubungi Admin.");
      await signOut(auth);
      return false;
    }

    alert("Pendaftaran berjaya! Selamat datang ke KARDRIVER AUTOHUB.");
    return true;
  } catch (error) {
    resolveProfileReady(false);
    alert("Pendaftaran gagal: " + error.message);
    return false;
  } finally {
    if (pendingRegistrationProfile?.promise === profileReadyPromise) {
      pendingRegistrationProfile = null;
    }
  }
};

// Login pengguna
window.firebaseLogin = async function(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    alert("Login gagal: " + error.message);
    return false;
  }
};

// Logout pengguna
window.firebaseLogout = async function() {
  try {
    await signOut(auth);
  } catch (error) {
    alert("Logout gagal: " + error.message);
  }
};

// Maklumat pengguna semasa
window.getFirebaseUser = function() {
  return auth.currentUser;
};

// PENGESAHAN PLATFORM ADMIN
window.firebaseIsPlatformAdmin = async function(forceRefresh = false) {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const tokenResult = await user.getIdTokenResult(forceRefresh);
    return tokenResult.claims.platformAdmin === true;
  } catch (error) {
    console.error("Admin verification failed:", error);
    return false;
  }
};


// Baca senarai role pengguna daripada Firestore
window.firebaseGetUserRoles = async function() {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Pengguna belum login.");

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error("Profil pengguna tidak ditemui.");
    }

    const data = snapshot.data();

    const allowedRoles = ["OWNER", "DRIVER", "MECHANIC", "WORKSHOP", "FLEET"];

    if (
      !Array.isArray(data.roles) ||
      data.roles.length === 0 ||
      !data.roles.every(role => allowedRoles.includes(role)) ||
      !data.activeRole ||
      !allowedRoles.includes(data.activeRole) ||
      !data.roles.includes(data.activeRole)
    ) {
      throw new Error("Role profil tidak sah.");
    }

    return {
      roles: data.roles,
      activeRole: data.activeRole
    };
  } catch (error) {
    console.error("Gagal membaca role:", error);
    alert("Gagal membaca role: " + error.message);
    return null;
  }
};

// Tukar role aktif pengguna
window.firebaseSetActiveRole = async function(newRole) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Pengguna belum login.");

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      throw new Error("Profil pengguna tidak ditemui.");
    }

    const data = snapshot.data();
    if (data.status !== "ACTIVE") {
      throw new Error("Akaun tidak aktif. Pertukaran role tidak dibenarkan.");
    }
    const allowedRoles = ["OWNER", "DRIVER", "MECHANIC", "WORKSHOP", "FLEET"];
    const roles = Array.isArray(data.roles) ? data.roles : [];

    if (
      !roles.every(role => allowedRoles.includes(role)) ||
      !allowedRoles.includes(newRole) ||
      !roles.includes(newRole)
    ) {
      throw new Error("Role ini tidak sah atau belum diluluskan untuk akaun anda.");
    }

    await setDoc(userRef, { activeRole: newRole }, { merge: true });

    return true;
  } catch (error) {
    console.error("Gagal menukar role:", error);
    alert("Pertukaran role gagal: " + error.message);
    return false;
  }
};

// Tukar nama profil
window.firebaseUpdateName = async function(name) {
  const user = auth.currentUser;
  let stage = "VALIDATION";

  try {
    if (!user) throw new Error("Pengguna belum login.");

    const cleanName = String(name || "").trim();
    if (!cleanName || cleanName.length > 40) {
      throw new Error("Nama mesti mengandungi 1 hingga 40 aksara.");
    }

    const userRef = doc(db, "users", user.uid);
    const profileRef = doc(db, "community_profiles", user.uid);
    const previousName = user.displayName || "Pengguna KARDRIVER";

    stage = "AUTH_PROFILE";
    await updateProfile(user, { displayName: cleanName });

    try {
      stage = "FIRESTORE_TRANSACTION";
      await runTransaction(db, async transaction => {
        const latestUser = await transaction.get(userRef);
        const latestProfile = await transaction.get(profileRef);

        if (!latestUser.exists() || latestUser.data().status !== "ACTIVE") {
          throw new Error("Akaun tidak aktif atau profil pengguna tidak ditemui.");
        }

        if (
          !latestProfile.exists() ||
          latestProfile.data().uid !== user.uid ||
          latestProfile.data().status !== "ACTIVE"
        ) {
          throw new Error("Profil Community tidak aktif atau tidak ditemui.");
        }

        transaction.update(userRef, { name: cleanName });
        transaction.update(profileRef, {
          displayName: cleanName,
          updatedAt: serverTimestamp()
        });
      });

      alert("Nama profil berjaya dikemas kini dan disegerakkan.");
      return true;
    } catch (error) {
      const originalError = error;
      stage = "AUTH_ROLLBACK";
      try {
        await updateProfile(user, { displayName: previousName });
      } catch (rollbackError) {
        console.error("Name rollback failed:", rollbackError);
      }
      throw originalError;
    }
  } catch (error) {
    console.error("Profile name sync failed at " + stage + ":", error);
    const code = error.code ? " [" + error.code + "]" : "";
    alert("Gagal mengemas kini nama (" + stage + ")" + code + ": " + error.message);
    return false;
  }
};

// Hantar pautan reset password
window.firebaseResetPassword = async function() {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("Email pengguna tidak ditemui.");

    await sendPasswordResetEmail(auth, user.email);
    alert("Pautan reset password telah dihantar ke " + user.email);
    return true;
  } catch (error) {
    alert("Gagal menghantar reset password: " + error.message);
    return false;
  }
};

// ADMIN: BACA DATA DASHBOARD
window.firebaseAdminGetDashboardData = async function() {
  try {
    const isAdmin = await window.firebaseIsPlatformAdmin(true);
    if (!isAdmin) throw new Error("Akses Platform Admin ditolak.");

    const [usersSnapshot, requestsSnapshot] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "role_requests"))
    ]);

    const users = usersSnapshot.docs.map(item => ({
      uid: item.id,
      ...item.data()
    }));

    const userMap = new Map(
      users.map(user => [user.uid, user])
    );

    const requests = requestsSnapshot.docs.map(item => {
      const request = item.data();
      const applicant = userMap.get(request.userUid);

      return {
        id: item.id,
        ...request,
        applicantName: applicant?.name || "Nama tidak ditemui",
        applicantEmail: applicant?.email || ""
      };
    });

    return {
      users: users,
      requests: requests,
      totalUsers: users.length,
      pendingRequests: requests.filter(
        item => item.status === "PENDING"
      ).length
    };
  } catch (error) {
    console.error("Admin dashboard read failed:", error);
    throw error;
  }
};


// ADMIN: LULUSKAN ATAU TOLAK PERMOHONAN ROLE
window.firebaseAdminReviewRoleRequest = async function(requestId, decision) {
  try {
    const isAdmin = await window.firebaseIsPlatformAdmin(true);
    if (!isAdmin) throw new Error("Akses Platform Admin ditolak.");

    if (!requestId || !["APPROVED", "REJECTED"].includes(decision)) {
      throw new Error("Maklumat permohonan tidak sah.");
    }

    const allowedRoles = ["DRIVER", "MECHANIC", "WORKSHOP", "FLEET"];
    const requestRef = doc(db, "role_requests", requestId);

    await runTransaction(db, async transaction => {
      const requestSnapshot = await transaction.get(requestRef);

      if (!requestSnapshot.exists()) {
        throw new Error("Permohonan tidak ditemui.");
      }

      const requestData = requestSnapshot.data();

      if (requestData.status !== "PENDING") {
        throw new Error("Permohonan ini sudah diproses.");
      }

      if (!allowedRoles.includes(requestData.requestedRole)) {
        throw new Error("Role permohonan tidak sah.");
      }

      if (!requestData.userUid) {
        throw new Error("UID pengguna tidak sah.");
      }

      const userRef = doc(db, "users", requestData.userUid);
      const lockRef = doc(
        db,
        "role_request_locks",
        requestData.userUid + "_" + requestData.requestedRole
      );

      const lockSnapshot = await transaction.get(lockRef);

      if (!lockSnapshot.exists()) {
        throw new Error("Role lock tidak ditemui. Permohonan perlu disemak.");
      }

      const lockData = lockSnapshot.data();

      if (
        lockData.requestId !== requestId ||
        lockData.userUid !== requestData.userUid ||
        lockData.requestedRole !== requestData.requestedRole ||
        lockData.status !== "PENDING"
      ) {
        throw new Error("Role lock tidak sepadan dengan permohonan.");
      }

      let roles = [];

      if (decision === "APPROVED") {
        const userSnapshot = await transaction.get(userRef);

        if (!userSnapshot.exists()) {
          throw new Error("Profil pengguna tidak ditemui.");
        }

        roles = userSnapshot.data().roles || [];

        if (roles.includes(requestData.requestedRole)) {
          throw new Error("Pengguna sudah mempunyai role ini.");
        }
      }

      // Semua bacaan selesai sebelum transaksi membuat perubahan.
      if (decision === "APPROVED") {
        transaction.update(userRef, {
          roles: [...roles, requestData.requestedRole]
        });

        transaction.update(lockRef, {
          status: "APPROVED"
        });
      } else {
        transaction.delete(lockRef);
      }

      transaction.update(requestRef, {
        status: decision
      });
    });

    return {
      success: true,
      status: decision
    };

  } catch (error) {
    console.error("Admin role review failed:", error);
    throw error;
  }
};

// Hantar permohonan peranan tambahan
window.firebaseSubmitRoleRequest = async function(requestedRole) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Sila login dahulu.");

    const allowedRoles = ["DRIVER", "MECHANIC", "WORKSHOP", "FLEET"];

    if (!allowedRoles.includes(requestedRole)) {
      throw new Error("Peranan yang dipilih tidak sah.");
    }

    const userRef = doc(db, "users", user.uid);
    const requestRef = doc(collection(db, "role_requests"));
    const lockRef = doc(
      db,
      "role_request_locks",
      user.uid + "_" + requestedRole
    );

    await runTransaction(db, async transaction => {
      const userSnapshot = await transaction.get(userRef);
      const lockSnapshot = await transaction.get(lockRef);

      if (!userSnapshot.exists()) {
        throw new Error("Profil pengguna tidak ditemui.");
      }

      const roles = userSnapshot.data().roles || [];

      if (roles.includes(requestedRole)) {
        throw new Error("Anda sudah mempunyai role " + requestedRole + ".");
      }

      if (lockSnapshot.exists()) {
        const lockData = lockSnapshot.data();

        if (lockData.status === "PENDING") {
          throw new Error(
            "Permohonan " + requestedRole +
            " anda masih menunggu kelulusan Admin."
          );
        }

        if (lockData.status === "APPROVED") {
          throw new Error("Anda sudah mempunyai permohonan yang diluluskan untuk role ini.");
        }

        throw new Error("Role lock masih wujud. Sila hubungi Admin.");
      }

      const requestData = {
        userUid: user.uid,
        requestedRole: requestedRole,
        status: "PENDING",
        createdAt: serverTimestamp()
      };

      transaction.set(requestRef, requestData);

      transaction.set(lockRef, {
        userUid: user.uid,
        requestedRole: requestedRole,
        requestId: requestRef.id,
        status: "PENDING",
        createdAt: serverTimestamp()
      });
    });

    alert("Permohonan " + requestedRole + " berjaya dihantar.");
    return true;

  } catch (error) {
    console.error("Gagal menghantar permohonan role:", error);
    alert("Permohonan gagal: " + error.message);
    return false;
  }
};

// Paparkan menu Admin hanya selepas pengesahan Custom Claim
window.refreshAdminMenu = async function(user) {
  const button = document.getElementById("adminMenuButton");
  if (!button) return;

  button.classList.add("hidden");

  if (!user || !window.firebaseIsPlatformAdmin) return;

  try {
    const isAdmin = await window.firebaseIsPlatformAdmin(true);
    button.classList.toggle("hidden", !isAdmin);
    console.log("Platform Admin access:", isAdmin);
  } catch (error) {
    button.classList.add("hidden");
    console.error("Admin menu verification failed:", error);
  }
};

let unsubscribeUserStatus = null;
let authStateVersion = 0;

// Pantau status akaun dan sekat akaun tidak aktif
onAuthStateChanged(auth, async function(user) {
  const currentVersion = ++authStateVersion;
  if (unsubscribeUserStatus) {
    unsubscribeUserStatus();
    unsubscribeUserStatus = null;
  }

  if (user) {
    try {
      const registrationPending = pendingRegistrationProfile;
      if (registrationPending) {
        const profileReady = await registrationPending.promise;
        if (!profileReady || currentVersion !== authStateVersion) return;
      }

      const isAdmin = await window.firebaseIsPlatformAdmin(true);
if (currentVersion !== authStateVersion) return;

      if (!isAdmin) {
        const userRef = doc(db, "users", user.uid);
        const profileSnapshot = await getDoc(userRef);
        if (currentVersion !== authStateVersion) return;

        if (
          !profileSnapshot.exists() ||
          profileSnapshot.data().status !== "ACTIVE"
        ) {
          alert("Akaun tidak aktif atau profil tidak sah. Sila hubungi Admin.");
          await signOut(auth);
          return;
        }

        unsubscribeUserStatus = onSnapshot(
          userRef,
          async function(snapshot) {
            if (
              currentVersion !== authStateVersion ||
              auth.currentUser?.uid !== user.uid
            ) return;

            if (
              !snapshot.exists() ||
              snapshot.data().status !== "ACTIVE"
            ) {
              if (unsubscribeUserStatus) {
                unsubscribeUserStatus();
                unsubscribeUserStatus = null;
              }

              if (auth.currentUser?.uid === user.uid) {
                alert("Akaun anda telah digantung atau tidak aktif. Sila hubungi Admin.");
                await signOut(auth);
              }
            }
          },
          async function(error) {
            if (
              currentVersion !== authStateVersion ||
              auth.currentUser?.uid !== user.uid
            ) return;

            console.error("Pemantauan status akaun gagal:", error);

            if (auth.currentUser?.uid === user.uid) {
              alert("Status akaun tidak dapat dipantau. Sila login semula.");
              await signOut(auth);
            }
          }
        );
      }


      if (currentVersion !== authStateVersion) return;
      if (typeof window.unlockApp === "function") {
        window.unlockApp(user);
      }

      await window.refreshAdminMenu(user);
    } catch (error) {
      if (currentVersion !== authStateVersion) return;
      console.error("Pengesahan status akaun gagal:", error);
      alert("Status akaun tidak dapat disahkan. Sila cuba login semula.");
      await signOut(auth);
    }
  } else {
    const button = document.getElementById("adminMenuButton");
    if (button) button.classList.add("hidden");

    document.body.classList.add("auth-locked");
    document.getElementById("authPage").classList.remove("hidden");

    if (typeof window.showLogin === "function") {
      window.showLogin();
    }
  }
});
console.log("KARDRIVER FIREBASE AUTH READY");

// FORGOT PASSWORD - LOGIN PAGE
window.handleForgotPassword = async function() {
  const email = document.getElementById("loginEmail")?.value.trim();

  if (!email) {
    alert("Sila masukkan alamat email dahulu.");
    document.getElementById("loginEmail")?.focus();
    return false;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Pautan reset password telah dihantar ke " + email);
    return true;
  } catch (error) {
    console.error("Forgot password failed:", error);
    alert("Gagal menghantar pautan reset: " + error.message);
    return false;
  }
};



// FORGOT PASSWORD BUTTON EVENT
document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("forgotPasswordBtn");

  if (button) {
    button.addEventListener("click", window.handleForgotPassword);
    console.log("FORGOT PASSWORD BUTTON READY");
  }
});

// COMMUNITY DIRECTORY - ACTIVE MEMBERS ONLY
window.getCommunityDirectory = async function() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Sila login untuk melihat direktori ahli.");
  }

  const directoryQuery = query(
    collection(db, "community_profiles"),
    where("status", "==", "ACTIVE")
  );

  const snapshot = await getDocs(directoryQuery);

  return snapshot.docs.map(function(item) {
    const data = item.data();

    return {
      uid: item.id,
      displayName: data.displayName || "Pengguna KARDRIVER",
      photoURL: data.photoURL || null
    };
  }).sort(function(a, b) {
    return a.displayName.localeCompare(b.displayName);
  });
};


// LIVE CHAT: PASTIKAN PROFIL KOMUNITI WUJUD DAN AKTIF
window.firebaseEnsureCommunityProfile = async function() {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login untuk menggunakan LIVE CHAT.");

  const userRef = doc(db, "users", user.uid);
  const profileRef = doc(db, "community_profiles", user.uid);

  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists() || userSnapshot.data().status !== "ACTIVE") {
    throw new Error("Akaun tidak aktif atau profil pengguna tidak sah.");
  }

  const userData = userSnapshot.data();
  const profileSnapshot = await getDoc(profileRef);

  if (profileSnapshot.exists()) {
    const profile = profileSnapshot.data();
    if (profile.uid !== user.uid || profile.status !== "ACTIVE") {
      throw new Error("Profil komuniti tidak aktif. Sila hubungi Admin.");
    }
    return {
      uid: user.uid,
      displayName: profile.displayName,
      photoURL: profile.photoURL || null,
      badge: ["SuperAdmin", "Admin"].includes(profile.badge) ? profile.badge : null
    };
  }

  const profileData = {
    uid: user.uid,
    displayName: userData.name || "Pengguna KARDRIVER",
    photoURL: user.photoURL || null,
    status: "ACTIVE",
    updatedAt: serverTimestamp()
  };

  await setDoc(profileRef, profileData);

  return {
    uid: user.uid,
    displayName: profileData.displayName,
    photoURL: profileData.photoURL
  };
};

// LIVE CHAT: FIRESTORE REALTIME API
const KARDRIVER_CHAT_CHANNELS = ["general", "automotive", "mechanic", "forex"];

window.firebaseChatSubscribe = async function(channelId, onMessages, onError) {
  if (!KARDRIVER_CHAT_CHANNELS.includes(channelId)) {
    throw new Error("Channel LIVE CHAT tidak sah.");
  }
  if (typeof onMessages !== "function") {
    throw new Error("Callback mesej tidak sah.");
  }

  await window.firebaseEnsureCommunityProfile();

  const messagesQuery = query(
    collection(db, "chat_rooms", channelId, "messages"),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  return onSnapshot(
    messagesQuery,
    function(snapshot) {
      const messages = snapshot.docs.map(function(item) {
        return { id: item.id, ...item.data() };
      }).reverse();
      onMessages(messages);
    },
    function(error) {
      console.error("LIVE CHAT subscription failed:", error);
      if (typeof onError === "function") onError(error);
    }
  );
};

window.firebaseChatSendMessage = async function(channelId, messageText) {
  if (!KARDRIVER_CHAT_CHANNELS.includes(channelId)) {
    throw new Error("Channel LIVE CHAT tidak sah.");
  }

  const text = String(messageText || "").trim();
  if (!text || text.length > 3000) {
    throw new Error("Mesej mesti mengandungi 1 hingga 3000 aksara.");
  }

  const profile = await window.firebaseEnsureCommunityProfile();

  const messageRef = await addDoc(
    collection(db, "chat_rooms", channelId, "messages"),
    {
      senderUid: profile.uid,
      senderName: profile.displayName,
      text: text,
      type: "MESSAGE",
      createdAt: serverTimestamp()
    }
  );

  return { success: true, messageId: messageRef.id };
};

// COMMUNITY DIRECTORY: REALTIME SUBSCRIPTION
window.subscribeCommunityDirectory = function(onMembers, onError) {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login untuk melihat direktori ahli.");
  if (typeof onMembers !== "function") {
    throw new Error("Callback direktori tidak sah.");
  }

  const directoryQuery = query(
    collection(db, "community_profiles"),
    where("status", "==", "ACTIVE")
  );

  return onSnapshot(
    directoryQuery,
    function(snapshot) {
      const members = snapshot.docs.map(function(item) {
        const data = item.data();
        return {
          uid: item.id,
          displayName: data.displayName || "Pengguna KARDRIVER",
          photoURL: data.photoURL || null,
          badge: ["SuperAdmin", "Admin"].includes(data.badge) ? data.badge : null
        };
      }).sort(function(a, b) {
        return a.displayName.localeCompare(b.displayName);
      });
      onMembers(members);
    },
    function(error) {
      console.error("COMMUNITY DIRECTORY realtime failed:", error);
      if (typeof onError === "function") onError(error);
    }
  );
};

console.log("KARDRIVER COMMUNITY DIRECTORY READY");


// ADMIN: GANTUNG / AKTIFKAN AKAUN DAN PROFIL DIREKTORI
window.firebaseAdminSetUserStatus = async function(uid, targetStatus) {
  try {
    const isAdmin = await window.firebaseIsPlatformAdmin(true);
    if (!isAdmin) throw new Error("Akses Platform Admin ditolak.");

    if (!uid || !["ACTIVE", "SUSPENDED"].includes(targetStatus)) {
      throw new Error("UID atau status sasaran tidak sah.");
    }

    const userRef = doc(db, "users", uid);
    const profileRef = doc(db, "community_profiles", uid);

    await runTransaction(db, async transaction => {
      const userSnapshot = await transaction.get(userRef);
      const profileSnapshot = await transaction.get(profileRef);

      if (!userSnapshot.exists()) {
        throw new Error("Profil pengguna tidak ditemui.");
      }

      const userData = userSnapshot.data();

      if (
        targetStatus === "SUSPENDED" &&
        Array.isArray(userData.roles) &&
        userData.roles.includes("OWNER")
      ) {
        throw new Error("Akaun OWNER dilindungi dan tidak boleh digantung.");
      }

      if (!["ACTIVE", "SUSPENDED"].includes(userData.status)) {
        throw new Error("Status akaun semasa tidak sah.");
      }

      if (userData.status === targetStatus) {
        throw new Error("Akaun sudah berada dalam status " + targetStatus + ".");
      }

      if (profileSnapshot.exists()) {
        const profileData = profileSnapshot.data();

        if (profileData.uid !== uid) {
          throw new Error("UID profil direktori tidak sepadan.");
        }

        transaction.update(profileRef, {
          status: targetStatus === "ACTIVE" ? "ACTIVE" : "INACTIVE"
        });
      } else if (targetStatus === "ACTIVE") {
        transaction.set(profileRef, {
          uid: uid,
          displayName: userData.name || "Pengguna KARDRIVER",
          photoURL: null,
          status: "ACTIVE",
          updatedAt: serverTimestamp()
        });
      }

      transaction.update(userRef, {
        status: targetStatus
      });
    });

    return {
      success: true,
      uid: uid,
      status: targetStatus
    };

  } catch (error) {
    console.error("Admin user status update failed:", error);
    throw error;
  }
};

// KARDRIVER LIVE PRESENCE V1 - FIRESTORE API
const KARDRIVER_PRESENCE_COLLECTION = "community_presence_sessions";

window.firebasePresenceStartSession = async function(sessionId) {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login untuk memulakan Presence.");

  await window.firebaseEnsureCommunityProfile();

  if (!/^[a-zA-Z0-9_-]{10,80}$/.test(sessionId)) {
    throw new Error("ID sesi Presence tidak sah.");
  }

  const sessionRef = doc(db, KARDRIVER_PRESENCE_COLLECTION, sessionId);

  await setDoc(sessionRef, {
    uid: user.uid,
    sessionId: sessionId,
    state: "ONLINE",
    lastHeartbeat: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return { success: true, sessionId: sessionId };
};

window.firebasePresenceHeartbeat = async function(sessionId, state) {
  const user = auth.currentUser;
  if (!user) throw new Error("Sesi login tidak sah.");

  if (!/^[a-zA-Z0-9_-]{10,80}$/.test(sessionId)) {
    throw new Error("ID sesi Presence tidak sah.");
  }

  if (!["ONLINE", "AWAY"].includes(state)) {
    throw new Error("Status Presence tidak sah.");
  }

  const sessionRef = doc(db, KARDRIVER_PRESENCE_COLLECTION, sessionId);
  const snapshot = await getDoc(sessionRef);

  if (!snapshot.exists() || snapshot.data().uid !== user.uid) {
    throw new Error("Sesi Presence tiada atau bukan milik pengguna ini.");
  }

  await updateDoc(sessionRef, {
    state: state,
    lastHeartbeat: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return { success: true, state: state };
};

window.firebasePresenceEndSession = async function(sessionId) {
  const user = auth.currentUser;
  if (!user) return { success: false, reason: "NO_AUTH" };

  if (!/^[a-zA-Z0-9_-]{10,80}$/.test(sessionId)) {
    throw new Error("ID sesi Presence tidak sah.");
  }

  const sessionRef = doc(db, KARDRIVER_PRESENCE_COLLECTION, sessionId);
  const snapshot = await getDoc(sessionRef);

  if (!snapshot.exists()) return { success: true, removed: false };

  if (snapshot.data().uid !== user.uid) {
    throw new Error("Tidak dibenarkan menamatkan sesi pengguna lain.");
  }

  await deleteDoc(sessionRef);
  return { success: true, removed: true };
};

console.log("KARDRIVER LIVE PRESENCE FIRESTORE API READY");

// ============================================================
// KARDRIVER MEMBERSHIP API V1
// ============================================================

const KARDRIVER_MEMBERSHIP_PRICES = {
  PRO: { MONTHLY: 29.99, YEARLY: 299 },
  MASTERCLASS_ELITE: { MONTHLY: 89.99, YEARLY: 899 }
};

function membershipDateMillis(value) {
  if (value?.toMillis) return value.toMillis();
  if (value instanceof Date) return value.getTime();
  if (typeof value === "string") return Date.parse(value);
  if (typeof value?.seconds === "number") return value.seconds * 1000;
  return 0;
}

// 1. BACA PROFIL MEMBERSHIP PENGGUNA
window.firebaseGetMyMembershipProfile = async function() {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login dahulu.");

  const snapshot = await getDoc(doc(db, "users", user.uid));
  if (!snapshot.exists()) throw new Error("Profil pengguna tidak ditemui.");

  return snapshot.data();
};

// 2. BACA SEJARAH PERMOHONAN MEMBERSHIP
window.firebaseGetMyMembershipRequests = async function() {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login dahulu.");

  const requestsQuery = query(
    collection(db, "membership_requests"),
    where("userUid", "==", user.uid)
  );

  const snapshot = await getDocs(requestsQuery);

  return snapshot.docs.map(item => ({
    id: item.id,
    ...item.data()
  })).sort((a, b) =>
    membershipDateMillis(b.createdAt) - membershipDateMillis(a.createdAt)
  );
};

// 3. HANTAR PERMOHONAN MEMBERSHIP
window.firebaseSubmitMembershipRequest = async function(plan, cycle, paymentReference) {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login dahulu.");

  if (!Object.prototype.hasOwnProperty.call(KARDRIVER_MEMBERSHIP_PRICES, plan)) {
    throw new Error("Pakej Membership tidak sah.");
  }

  if (!["MONTHLY", "YEARLY"].includes(cycle)) {
    throw new Error("Tempoh langganan tidak sah.");
  }

  const reference = String(paymentReference || "").trim();
  if (reference.length < 4 || reference.length > 100) {
    throw new Error("Rujukan pembayaran mesti antara 4 hingga 100 aksara.");
  }

  const amount = KARDRIVER_MEMBERSHIP_PRICES[plan][cycle];
  const userRef = doc(db, "users", user.uid);
  const lockRef = doc(db, "membership_request_locks", user.uid);
  const requestRef = doc(collection(db, "membership_requests"));

  await runTransaction(db, async transaction => {
    const userSnapshot = await transaction.get(userRef);
    const lockSnapshot = await transaction.get(lockRef);

    if (!userSnapshot.exists()) {
      throw new Error("Profil pengguna tidak ditemui.");
    }

    if (userSnapshot.data().status !== "ACTIVE") {
      throw new Error("Akaun tidak aktif. Permohonan tidak dibenarkan.");
    }

    if (lockSnapshot.exists()) {
      throw new Error("Anda masih mempunyai permohonan Membership yang menunggu semakan.");
    }

    transaction.set(requestRef, {
      userUid: user.uid,
      requestedPlan: plan,
      billingCycle: cycle,
      amount: amount,
      paymentReference: reference,
      status: "PENDING",
      createdAt: serverTimestamp()
    });

    transaction.set(lockRef, {
      userUid: user.uid,
      requestId: requestRef.id,
      status: "PENDING",
      createdAt: serverTimestamp()
    });
  });

  return {
    success: true,
    status: "PENDING",
    requestId: requestRef.id
  };
};

// 4. ADMIN: BACA PERMOHONAN MEMBERSHIP
window.firebaseAdminGetMembershipRequests = async function() {
  const isAdmin = await window.firebaseIsPlatformAdmin(true);
  if (!isAdmin) throw new Error("Akses Platform Admin ditolak.");

  const [requestsSnapshot, usersSnapshot] = await Promise.all([
    getDocs(collection(db, "membership_requests")),
    getDocs(collection(db, "users"))
  ]);

  const users = new Map(
    usersSnapshot.docs.map(item => [item.id, item.data()])
  );

  const requests = requestsSnapshot.docs.map(item => {
    const request = item.data();
    const applicant = users.get(request.userUid);

    return {
      id: item.id,
      ...request,
      applicantName: applicant?.name || "Nama tidak ditemui",
      applicantEmail: applicant?.email || ""
    };
  }).sort((a, b) =>
    membershipDateMillis(b.createdAt) - membershipDateMillis(a.createdAt)
  );

  return {
    pending: requests.filter(item => item.status === "PENDING").length,
    requests
  };
};

// 5. ADMIN: LULUSKAN ATAU TOLAK PERMOHONAN MEMBERSHIP
window.firebaseAdminReviewMembershipRequest = async function(requestId, decision) {
  const isAdmin = await window.firebaseIsPlatformAdmin(true);
  if (!isAdmin) throw new Error("Akses Platform Admin ditolak.");

  if (!requestId || !["APPROVED", "REJECTED"].includes(decision)) {
    throw new Error("Maklumat permohonan tidak sah.");
  }

  const requestRef = doc(db, "membership_requests", requestId);

  await runTransaction(db, async transaction => {
    const requestSnapshot = await transaction.get(requestRef);

    if (!requestSnapshot.exists()) {
      throw new Error("Permohonan Membership tidak ditemui.");
    }

    const requestData = requestSnapshot.data();

    if (requestData.status !== "PENDING") {
      throw new Error("Permohonan ini sudah diproses.");
    }

    const userUid = requestData.userUid;
    if (!userUid) throw new Error("UID pengguna tidak sah.");

    const userRef = doc(db, "users", userUid);
    const lockRef = doc(db, "membership_request_locks", userUid);

    const [userSnapshot, lockSnapshot] = await Promise.all([
      transaction.get(userRef),
      transaction.get(lockRef)
    ]);

    if (!userSnapshot.exists()) {
      throw new Error("Profil pengguna tidak ditemui.");
    }

    if (!lockSnapshot.exists()) {
      throw new Error("Membership lock tidak ditemui. Permohonan perlu disemak.");
    }

    const lockData = lockSnapshot.data();

    if (
      lockData.requestId !== requestId ||
      lockData.userUid !== userUid ||
      lockData.status !== "PENDING"
    ) {
      throw new Error("Membership lock tidak sepadan dengan permohonan.");
    }

    let startedAt = null;
    let expiresAt = null;

    if (decision === "APPROVED") {
      const plan = requestData.requestedPlan;
      const cycle = requestData.billingCycle;
      const expectedAmount = KARDRIVER_MEMBERSHIP_PRICES[plan]?.[cycle];

      if (
        expectedAmount === undefined ||
        Number(requestData.amount) !== expectedAmount
      ) {
        throw new Error("Harga atau pakej permohonan tidak sah.");
      }

      if (userSnapshot.data().status !== "ACTIVE") {
        throw new Error("Akaun pengguna tidak aktif.");
      }

      startedAt = new Date();
      expiresAt = new Date(startedAt);
      const originalDay = expiresAt.getDate();

      expiresAt.setDate(1);

      if (cycle === "MONTHLY") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      const lastDay = new Date(
        expiresAt.getFullYear(),
        expiresAt.getMonth() + 1,
        0
      ).getDate();

      expiresAt.setDate(Math.min(originalDay, lastDay));

      transaction.update(userRef, {
        membership: plan,
        membershipStatus: "ACTIVE",
        membershipBillingCycle: cycle,
        membershipStartedAt: serverTimestamp(),
        membershipExpiresAt: expiresAt,
        membershipRequestId: requestId
      });
    }

    transaction.update(requestRef, {
      status: decision,
      reviewedAt: serverTimestamp(),
      reviewedBy: auth.currentUser.uid,
      ...(decision === "APPROVED" ? {
        startedAt: serverTimestamp(),
        expiresAt: expiresAt
      } : {})
    });

    transaction.delete(lockRef);
  });

  return {
    success: true,
    status: decision
  };
};

console.log("KARDRIVER MEMBERSHIP FIRESTORE API READY");


// MEMBERSHIP: FRONTEND AUTO-EXPIRY CALLABLE
window.syncMembershipExpiry = async function() {
  const user = auth.currentUser;
  if (!user) throw new Error("Sila login dahulu.");

  const syncExpiry = httpsCallable(functions, "syncMembershipExpiry");
  const response = await syncExpiry({});

  return response.data;
};
