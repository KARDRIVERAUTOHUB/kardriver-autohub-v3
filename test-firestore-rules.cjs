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
      rules: fs.readFileSync("firestore.rules", "utf8"),
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
