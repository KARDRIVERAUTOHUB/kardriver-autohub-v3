const fs = require("node:fs");
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} = require("@firebase/rules-unit-testing");

const {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  deleteDoc,
  writeBatch,
  runTransaction
} = require("firebase/firestore");

const PROJECT_ID = "kardriver-autohub";

let testEnv;

async function main() {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync("firestore.rules", "utf8"),
      host: "127.0.0.1",
      port: 8080
    }
  });

  await testEnv.clearFirestore();

  const user = testEnv.authenticatedContext("user-001").firestore();
  const otherUser = testEnv.authenticatedContext("user-002").firestore();
  const suspendedUser = testEnv.authenticatedContext("user-003").firestore();
  const admin = testEnv.authenticatedContext(
    "admin-001",
    { platformAdmin: true }
  ).firestore();

  const userRef = doc(user, "users/user-001");

  await testEnv.withSecurityRulesDisabled(async context => {
    await setDoc(doc(context.firestore(), "users/user-001"), {
      name: "Test User",
      email: "test@example.com",
      membership: "FREE",
      status: "ACTIVE",
      roles: ["OWNER"],
      activeRole: "OWNER",
      createdAt: new Date()
    });

    await setDoc(doc(context.firestore(), "users/user-002"), {
      name: "Other User",
      email: "other@example.com",
      membership: "FREE",
      status: "ACTIVE",
      roles: ["OWNER"],
      activeRole: "OWNER",
      createdAt: new Date()
    });

    await setDoc(doc(context.firestore(), "community_profiles/user-001"), {
      uid: "user-001",
      displayName: "Test User",
      photoURL: null,
      status: "ACTIVE",
      updatedAt: new Date()
    });

    await setDoc(doc(context.firestore(), "community_profiles/user-002"), {
      uid: "user-002",
      displayName: "Other User",
      photoURL: null,
      status: "ACTIVE",
      updatedAt: new Date()
    });

    await setDoc(doc(context.firestore(), "users/user-004"), {
      name: "New Test User",
      email: "new@example.com",
      membership: "FREE",
      status: "ACTIVE",
      roles: ["DRIVER"],
      activeRole: "DRIVER",
      createdAt: new Date()
    });

    await setDoc(doc(context.firestore(), "users/user-003"), {
      name: "Suspended User",
      email: "suspended@example.com",
      membership: "FREE",
      status: "SUSPENDED",
      roles: ["OWNER"],
      activeRole: "OWNER",
      createdAt: new Date()
    });

    await setDoc(doc(context.firestore(), "community_profiles/user-003"), {
      uid: "user-003",
      displayName: "Suspended User",
      photoURL: null,
      status: "INACTIVE",
      updatedAt: new Date()
    });
  });

  console.log("\n--- UJIAN FIRESTORE RULES ---");

  await assertSucceeds(getDoc(userRef));
  console.log("LULUS: Pengguna boleh membaca profil sendiri.");

  await assertFails(getDoc(doc(otherUser, "users/user-001")));
  console.log("LULUS: Pengguna tidak boleh membaca profil orang lain.");

  const newUser = testEnv.authenticatedContext("user-004").firestore();
  const newProfileRef = doc(newUser, "community_profiles/user-004");

  await assertSucceeds(getDoc(newProfileRef));
  console.log("LULUS: Pengguna aktif boleh membaca profil sendiri yang belum wujud.");

  await assertFails(getDoc(doc(newUser, "community_profiles/user-002")));
  console.log("LULUS: Pengguna tidak boleh membaca profil komuniti orang lain.");

  await assertSucceeds(setDoc(newProfileRef, {
    uid: "user-004",
    displayName: "New Test User",
    photoURL: null,
    status: "ACTIVE",
    updatedAt: serverTimestamp()
  }));
  console.log("LULUS: Pengguna aktif boleh mencipta profil komuniti sendiri.");

  await assertFails(updateDoc(userRef, {
    roles: ["OWNER", "ADMIN"]
  }));
  console.log("LULUS: Pengguna tidak boleh menaikkan Role sendiri.");

  await assertFails(setDoc(doc(user, "role_requests/request-001"), {
    userUid: "user-001",
    requestedRole: "ADMIN",
    status: "PENDING",
    createdAt: new Date()
  }));
  console.log("LULUS: Role yang tidak dibenarkan ditolak.");

  await assertFails(updateDoc(
    doc(user, "role_requests/request-002"),
    { status: "APPROVED" }
  ));
  console.log("LULUS: Pengguna biasa tidak boleh meluluskan permohonan.");

  const request003 = doc(user, "role_requests/request-003");
  const driverLock = doc(user, "role_request_locks/user-001_DRIVER");

  await assertSucceeds(runTransaction(user, async tx => {
    tx.set(request003, {
      userUid: "user-001",
      requestedRole: "DRIVER",
      status: "PENDING",
      createdAt: new Date()
    });
    tx.set(driverLock, {
      userUid: "user-001",
      requestedRole: "DRIVER",
      requestId: "request-003",
      status: "PENDING",
      createdAt: new Date()
    });
  }));
  console.log("LULUS: Permohonan DRIVER dan Role Lock diwujudkan bersama.");

  // UJIAN ADMIN: LULUSKAN PERMOHONAN
  const approvalBatch = writeBatch(admin);
  approvalBatch.update(doc(admin, "users/user-001"), {
    roles: ["OWNER", "DRIVER"]
  });
  approvalBatch.update(doc(admin, "role_requests/request-003"), {
    status: "APPROVED"
  });
  approvalBatch.update(doc(admin, "role_request_locks/user-001_DRIVER"), {
    status: "APPROVED"
  });

  await assertSucceeds(approvalBatch.commit());

  const approvedRequest = await getDoc(doc(admin, "role_requests/request-003"));
  const approvedUser = await getDoc(doc(admin, "users/user-001"));
  const approvedLock = await getDoc(doc(admin, "role_request_locks/user-001_DRIVER"));

  if (
    approvedRequest.data().status !== "APPROVED" ||
    !approvedUser.data().roles.includes("DRIVER") ||
    approvedLock.data().status !== "APPROVED"
  ) {
    throw new Error("Keputusan kelulusan Admin tidak tepat.");
  }
  console.log("LULUS: Admin meluluskan permohonan dan mengemas kini Role Lock.");

  // UJIAN ADMIN: TOLAK PERMOHONAN DAN PADAM ROLE LOCK
  await assertSucceeds(runTransaction(user, async tx => {
    tx.set(doc(user, "role_requests/request-004"), {
      userUid: "user-001",
      requestedRole: "MECHANIC",
      status: "PENDING",
      createdAt: new Date()
    });
    tx.set(doc(user, "role_request_locks/user-001_MECHANIC"), {
      userUid: "user-001",
      requestedRole: "MECHANIC",
      requestId: "request-004",
      status: "PENDING",
      createdAt: new Date()
    });
  }));

  const rejectionBatch = writeBatch(admin);
  rejectionBatch.update(doc(admin, "role_requests/request-004"), {
    status: "REJECTED"
  });
  rejectionBatch.delete(doc(admin, "role_request_locks/user-001_MECHANIC"));

  await assertSucceeds(rejectionBatch.commit());

  const rejectedRequest = await getDoc(doc(admin, "role_requests/request-004"));
  const deletedLock = await getDoc(doc(admin, "role_request_locks/user-001_MECHANIC"));

  if (
    rejectedRequest.data().status !== "REJECTED" ||
    deletedLock.exists()
  ) {
    throw new Error("Keputusan penolakan Admin tidak tepat.");
  }
  console.log("LULUS: Admin menolak permohonan dan memadam Role Lock.");

  // UJIAN PERLINDUNGAN OWNER
  await assertFails(updateDoc(doc(admin, "users/user-001"), {
    status: "SUSPENDED"
  }));
  console.log("LULUS: Admin tidak boleh menggantung akaun OWNER.");

  await assertSucceeds(updateDoc(doc(admin, "users/user-004"), {
    status: "SUSPENDED"
  }));
  console.log("LULUS: Admin masih boleh menggantung akaun DRIVER.");

  // Pulihkan akaun ujian sebelum ujian Membership.
  await assertSucceeds(updateDoc(doc(admin, "users/user-004"), {
    status: "ACTIVE"
  }));
  console.log("LULUS: Akaun DRIVER dipulihkan untuk ujian seterusnya.");

  // UJIAN KARDRIVER LIVE CHAT
  const chatMessageRef = doc(user, "chat_rooms/general/messages/chat-001");

  await assertSucceeds(setDoc(chatMessageRef, {
    senderUid: "user-001",
    senderName: "Test User",
    text: "Mesej ujian LIVE CHAT",
    type: "MESSAGE",
    createdAt: serverTimestamp()
  }));
  console.log("LULUS: Pengguna aktif boleh menghantar mesej.");

  await assertSucceeds(getDoc(chatMessageRef));
  console.log("LULUS: Pengguna aktif boleh membaca mesej.");

  await assertSucceeds(getDocs(collection(otherUser, "chat_rooms/general/messages")));
  console.log("LULUS: Ahli aktif boleh membaca senarai mesej channel.");

  await assertFails(setDoc(
    doc(user, "chat_rooms/general/messages/chat-spoof-uid"),
    {
      senderUid: "user-002",
      senderName: "Test User",
      text: "UID palsu",
      type: "MESSAGE",
      createdAt: serverTimestamp()
    }
  ));
  console.log("LULUS: UID pengirim palsu ditolak.");

  await assertFails(setDoc(
    doc(user, "chat_rooms/general/messages/chat-spoof-name"),
    {
      senderUid: "user-001",
      senderName: "Admin Palsu",
      text: "Nama palsu",
      type: "MESSAGE",
      createdAt: serverTimestamp()
    }
  ));
  console.log("LULUS: Nama pengirim palsu ditolak.");

  await assertFails(setDoc(
    doc(user, "chat_rooms/general/messages/chat-too-long"),
    {
      senderUid: "user-001",
      senderName: "Test User",
      text: "X".repeat(3001),
      type: "MESSAGE",
      createdAt: serverTimestamp()
    }
  ));
  console.log("LULUS: Mesej melebihi 3000 aksara ditolak.");

  await assertFails(updateDoc(chatMessageRef, { text: "Diubah" }));
  console.log("LULUS: Pengguna tidak boleh mengubah mesej.");

  await assertFails(deleteDoc(chatMessageRef));
  console.log("LULUS: Pengguna tidak boleh memadam mesej.");

  await assertFails(getDoc(
    doc(suspendedUser, "chat_rooms/general/messages/chat-001")
  ));
  console.log("LULUS: Akaun digantung tidak boleh membaca mesej.");

  await assertFails(setDoc(
    doc(suspendedUser, "chat_rooms/general/messages/chat-suspended"),
    {
      senderUid: "user-003",
      senderName: "Suspended User",
      text: "Mesej daripada akaun digantung",
      type: "MESSAGE",
      createdAt: serverTimestamp()
    }
  ));
  console.log("LULUS: Akaun digantung tidak boleh menghantar mesej.");


  // ============================================================
  // UJIAN KHUSUS MEMBERSHIP
  // ============================================================
  console.log("\n--- UJIAN KHUSUS MEMBERSHIP ---");

  const membershipUser = testEnv.authenticatedContext("user-004").firestore();
  const membershipRequestRef = doc(collection(membershipUser, "membership_requests"));
  const membershipLockRef = doc(membershipUser, "membership_request_locks/user-004");

  await assertSucceeds(getDoc(doc(membershipUser, "users/user-004")));
  console.log("LULUS DIAGNOSTIK: user-004 boleh membaca profil sendiri.");
  const diagnosticProfile = await getDoc(doc(membershipUser, "users/user-004"));
  console.log("DATA DIAGNOSTIK user-004:", diagnosticProfile.data());



  await assertSucceeds(runTransaction(membershipUser, async tx => {
    tx.set(membershipRequestRef, {
      userUid: "user-004",
      requestedPlan: "PRO",
      billingCycle: "MONTHLY",
      amount: 29.99,
      paymentReference: "TEST-PAY-004",
      status: "PENDING",
      createdAt: serverTimestamp()
    });

    tx.set(membershipLockRef, {
      userUid: "user-004",
      requestId: membershipRequestRef.id,
      status: "PENDING",
      createdAt: serverTimestamp()
    });
  }));
  console.log("LULUS: Pengguna aktif menghantar Membership dan Lock bersama.");

  await assertFails(setDoc(
    doc(membershipUser, "membership_requests/invalid-price"),
    {
      userUid: "user-004",
      requestedPlan: "PRO",
      billingCycle: "MONTHLY",
      amount: 1,
      paymentReference: "TEST-INVALID",
      status: "PENDING",
      createdAt: serverTimestamp()
    }
  ));
  console.log("LULUS: Harga Membership tidak sah ditolak.");

  await assertFails(getDoc(doc(
    otherUser,
    "membership_requests/" + membershipRequestRef.id
  )));
  console.log("LULUS: Pengguna lain tidak boleh membaca permohonan.");

  await assertSucceeds(getDoc(doc(
    admin,
    "membership_requests/" + membershipRequestRef.id
  )));
  console.log("LULUS: Platform Admin boleh membaca permohonan.");

  await assertFails(updateDoc(
    doc(membershipUser, "membership_requests/" + membershipRequestRef.id),
    { status: "APPROVED" }
  ));
  console.log("LULUS: Pengguna biasa tidak boleh meluluskan permohonan.");

  const adminUserRef = doc(admin, "users/user-004");
  const adminRequestRef = doc(
    admin,
    "membership_requests/" + membershipRequestRef.id
  );
  const adminLockRef = doc(admin, "membership_request_locks/user-004");

  await assertSucceeds(runTransaction(admin, async tx => {
    const userSnap = await tx.get(adminUserRef);
    const requestSnap = await tx.get(adminRequestRef);
    const lockSnap = await tx.get(adminLockRef);

    if (!userSnap.exists() || !requestSnap.exists() || !lockSnap.exists()) {
      throw new Error("Dokumen ujian Membership tidak lengkap.");
    }

    tx.update(adminUserRef, {
      membership: "PRO",
      membershipStatus: "ACTIVE",
      membershipBillingCycle: "MONTHLY",
      membershipStartedAt: serverTimestamp(),
      membershipExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      membershipRequestId: membershipRequestRef.id
    });

    const membershipStartedAt = serverTimestamp();
    const membershipExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    tx.update(adminUserRef, {
      membershipStartedAt,
      membershipExpiresAt
    });

    tx.update(adminRequestRef, {
      status: "APPROVED",
      reviewedAt: serverTimestamp(),
      reviewedBy: "admin-001",
      startedAt: membershipStartedAt,
      expiresAt: membershipExpiresAt
    });

    tx.delete(adminLockRef);
  }));
  console.log("LULUS: Admin meluluskan Membership dan memadam Lock secara atomik.");

  const rejectionRequestRef = doc(collection(membershipUser, "membership_requests"));
  const rejectionLockRef = doc(
    membershipUser,
    "membership_request_locks/user-004"
  );

  await assertSucceeds(runTransaction(membershipUser, async tx => {
    tx.set(rejectionRequestRef, {
      userUid: "user-004",
      requestedPlan: "MASTERCLASS_ELITE",
      billingCycle: "YEARLY",
      amount: 899,
      paymentReference: "TEST-REJECT-004",
      status: "PENDING",
      createdAt: serverTimestamp()
    });

    tx.set(rejectionLockRef, {
      userUid: "user-004",
      requestId: rejectionRequestRef.id,
      status: "PENDING",
      createdAt: serverTimestamp()
    });
  }));
  console.log("LULUS: Permohonan kedua boleh dihantar selepas Lock pertama selesai.");

  const adminRejectionRef = doc(
    admin,
    "membership_requests/" + rejectionRequestRef.id
  );
  const adminRejectionLockRef = doc(
    admin,
    "membership_request_locks/user-004"
  );

  await assertSucceeds(runTransaction(admin, async tx => {
    const requestSnap = await tx.get(adminRejectionRef);
    const lockSnap = await tx.get(adminRejectionLockRef);

    if (!requestSnap.exists() || !lockSnap.exists()) {
      throw new Error("Dokumen penolakan Membership tidak lengkap.");
    }

    tx.update(adminRejectionRef, {
      status: "REJECTED",
      reviewedAt: serverTimestamp(),
      reviewedBy: "admin-001"
    });

    tx.delete(adminRejectionLockRef);
  }));
  console.log("LULUS: Admin menolak permohonan dan memadam Lock secara atomik.");

  console.log("\nSELESAI: Ujian asas Firestore Rules.");
}

main()
  .catch(error => {
    console.error("\nUJIAN GAGAL:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (testEnv) await testEnv.cleanup();
  });
