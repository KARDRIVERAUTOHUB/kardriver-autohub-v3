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
  writeBatch,
  runTransaction
} = require("firebase/firestore");

const PROJECT_ID = "kardriver-autohub";

let testEnv;

async function main() {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync("firestore.role-lock.rules", "utf8"),
      host: "127.0.0.1",
      port: 8080
    }
  });

  await testEnv.clearFirestore();

  const user = testEnv.authenticatedContext("user-001").firestore();
  const otherUser = testEnv.authenticatedContext("user-002").firestore();
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
  });

  console.log("\n--- UJIAN FIRESTORE RULES ---");

  await assertSucceeds(getDoc(userRef));
  console.log("LULUS: Pengguna boleh membaca profil sendiri.");

  await assertFails(getDoc(doc(otherUser, "users/user-001")));
  console.log("LULUS: Pengguna tidak boleh membaca profil orang lain.");

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


  // UJIAN: HANTAR DRIVER BERSAMA LOCK
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

  console.log("LULUS: Permohonan DRIVER dan lock diwujudkan bersama.");

  // UJIAN TRANSAKSI: SUBMIT KEDUA DITOLAK APABILA LOCK PENDING WUJUD
  let duplicateSubmitBlocked = false;

  try {
    await runTransaction(user, async tx => {
      const userRef = doc(user, "users/user-001");
      const lockRef = doc(user, "role_request_locks/user-001_DRIVER");

      const userSnap = await tx.get(userRef);
      const lockSnap = await tx.get(lockRef);

      if (!userSnap.exists()) {
        throw new Error("Profil pengguna tidak ditemui.");
      }

      if (lockSnap.exists()) {
        throw new Error("Permohonan DRIVER masih menunggu kelulusan Admin.");
      }
    });
  } catch (error) {
    if (error.message.includes("masih menunggu kelulusan Admin")) {
      duplicateSubmitBlocked = true;
    } else {
      throw error;
    }
  }

  if (!duplicateSubmitBlocked) {
    throw new Error("Permohonan berganda tidak disekat.");
  }

  console.log("LULUS: Transaksi Submit kedua ditolak apabila lock PENDING wujud.");

  // UJIAN: PERMOHONAN PENDING BERGANDA DITOLAK
  await assertFails(setDoc(
    doc(user, "role_requests/request-duplicate"),
    {
      userUid: "user-001",
      requestedRole: "DRIVER",
      status: "PENDING",
      createdAt: new Date()
    }
  ));

  console.log("LULUS: Permohonan DRIVER berganda ditolak.");

  // UJIAN ADMIN: TRANSAKSI LULUSKAN DRIVER DAN KEKALKAN LOCK
  await assertSucceeds(runTransaction(admin, async tx => {
    const requestRef = doc(admin, "role_requests/request-003");
    const lockRef = doc(admin, "role_request_locks/user-001_DRIVER");
    const userRef = doc(admin, "users/user-001");

    const requestSnap = await tx.get(requestRef);
    const lockSnap = await tx.get(lockRef);
    const userSnap = await tx.get(userRef);

    if (!requestSnap.exists() || !lockSnap.exists() || !userSnap.exists()) {
      throw new Error("Dokumen kelulusan tidak lengkap.");
    }

    const roles = userSnap.data().roles || [];

    tx.update(userRef, { roles: [...roles, "DRIVER"] });
    tx.update(lockRef, { status: "APPROVED" });
    tx.update(requestRef, { status: "APPROVED" });
  }));

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

  console.log("LULUS: Transaksi Admin meluluskan DRIVER dan mengekalkan lock.");

  // UJIAN: PENGGUNA YANG SUDAH MEMILIKI DRIVER TIDAK BOLEH MEMOHON SEMULA
  await assertFails(runTransaction(user, async tx => {
    tx.set(doc(user, "role_requests/request-driver-again"), {
      userUid: "user-001",
      requestedRole: "DRIVER",
      status: "PENDING",
      createdAt: new Date()
    });

    tx.set(doc(user, "role_request_locks/user-001_DRIVER"), {
      userUid: "user-001",
      requestedRole: "DRIVER",
      requestId: "request-driver-again",
      status: "PENDING",
      createdAt: new Date()
    });
  }));

  console.log("LULUS: Pengguna yang sudah memiliki DRIVER tidak boleh memohon semula.");


  // UJIAN: HANTAR MECHANIC BERSAMA LOCK
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

  console.log("LULUS: Permohonan MECHANIC dan lock diwujudkan bersama.");

  // UJIAN ADMIN: TRANSAKSI TOLAK DAN PADAM LOCK
  await assertSucceeds(runTransaction(admin, async tx => {
    const requestRef = doc(admin, "role_requests/request-004");
    const lockRef = doc(admin, "role_request_locks/user-001_MECHANIC");

    const requestSnap = await tx.get(requestRef);
    const lockSnap = await tx.get(lockRef);

    if (!requestSnap.exists() || !lockSnap.exists()) {
      throw new Error("Dokumen penolakan tidak lengkap.");
    }

    tx.update(requestRef, { status: "REJECTED" });
    tx.delete(lockRef);
  }));

  const rejectedRequest = await getDoc(
    doc(admin, "role_requests/request-004")
  );
  const deletedLock = await getDoc(
    doc(admin, "role_request_locks/user-001_MECHANIC")
  );

  if (
    rejectedRequest.data().status !== "REJECTED" ||
    deletedLock.exists()
  ) {
    throw new Error("Keputusan penolakan Admin tidak tepat.");
  }

  console.log("LULUS: Admin menolak permohonan dan memadam lock.");

  // UJIAN: PERMOHONAN SEMULA SELEPAS REJECTED
  await assertSucceeds(runTransaction(user, async tx => {
    tx.set(doc(user, "role_requests/request-005"), {
      userUid: "user-001",
      requestedRole: "MECHANIC",
      status: "PENDING",
      createdAt: new Date()
    });

    tx.set(doc(user, "role_request_locks/user-001_MECHANIC"), {
      userUid: "user-001",
      requestedRole: "MECHANIC",
      requestId: "request-005",
      status: "PENDING",
      createdAt: new Date()
    });
  }));

  console.log("LULUS: Pengguna boleh memohon semula selepas REJECTED.");
// UJIAN PLATFORM ADMIN: TAMBAH ROLE SECARA TERUS
await assertSucceeds(updateDoc(
  doc(admin, "users/user-002"),
  { roles: ["OWNER", "WORKSHOP"] }
));

const adminGrantedUser = await getDoc(
  doc(admin, "users/user-002")
);

if (!adminGrantedUser.data().roles.includes("WORKSHOP")) {
  throw new Error("Platform Admin gagal memberikan Role WORKSHOP.");
}

console.log("LULUS: Platform Admin boleh menambah Role secara terus.");

// UJIAN PLATFORM ADMIN: TIDAK BOLEH MEMBUANG OWNER
await assertFails(updateDoc(
  doc(admin, "users/user-002"),
  { roles: ["WORKSHOP"] }
));

console.log("LULUS: Platform Admin tidak boleh membuang Role OWNER.");

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
