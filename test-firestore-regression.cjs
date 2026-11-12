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
  const other = testEnv.authenticatedContext("user-002").firestore();
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

  console.log("\n--- UJIAN REGRESI FIRESTORE ---");

  await assertSucceeds(getDoc(userRef));
  console.log("LULUS: Baca profil sendiri.");

  await assertFails(getDoc(doc(other, "users/user-001")));
  console.log("LULUS: Sekat baca profil orang lain.");

  await assertFails(updateDoc(userRef, {
    roles: ["OWNER", "ADMIN"]
  }));
  console.log("LULUS: Sekat kenaikan role sendiri.");

  await assertFails(updateDoc(userRef, {
    membership: "PREMIUM"
  }));
  console.log("LULUS: Sekat perubahan membership sendiri.");

  await assertFails(updateDoc(userRef, {
    status: "SUSPENDED"
  }));
  console.log("LULUS: Sekat perubahan status sendiri.");

  await assertSucceeds(updateDoc(userRef, {
    name: "Nama Baharu",
    email: "new@example.com"
  }));
  console.log("LULUS: Kemas kini profil.");

  await assertSucceeds(updateDoc(userRef, {
    activeRole: "OWNER"
  }));
  console.log("LULUS: Kekalkan Active Role yang diluluskan.");

  await assertFails(updateDoc(userRef, {
    activeRole: "DRIVER"
  }));
  console.log("LULUS: Sekat Active Role yang belum diluluskan.");

  await assertFails(setDoc(doc(user, "role_requests/bad-admin"), {
    userUid: "user-001",
    requestedRole: "ADMIN",
    status: "PENDING",
    createdAt: new Date()
  }));
  console.log("LULUS: Sekat permohonan ADMIN.");

  const requestRef = doc(user, "role_requests/request-001");
  const lockRef = doc(user, "role_request_locks/user-001_DRIVER");

  await assertSucceeds(runTransaction(user, async tx => {
    tx.set(requestRef, {
      userUid: "user-001",
      requestedRole: "DRIVER",
      status: "PENDING",
      createdAt: new Date()
    });

    tx.set(lockRef, {
      userUid: "user-001",
      requestedRole: "DRIVER",
      requestId: "request-001",
      status: "PENDING",
      createdAt: new Date()
    });
  }));
  console.log("LULUS: Submit DRIVER bersama lock.");

  await assertFails(runTransaction(user, async tx => {
    tx.set(
      doc(user, "role_requests/request-duplicate"),
      {
        userUid: "user-001",
        requestedRole: "DRIVER",
        status: "PENDING",
        createdAt: new Date()
      }
    );

    tx.set(lockRef, {
      userUid: "user-001",
      requestedRole: "DRIVER",
      requestId: "request-duplicate",
      status: "PENDING",
      createdAt: new Date()
    });
  }));
  console.log("LULUS: Sekat lock berganda.");

  await assertSucceeds(runTransaction(admin, async tx => {
    const requestSnap = await tx.get(
      doc(admin, "role_requests/request-001")
    );

    const lockSnap = await tx.get(
      doc(admin, "role_request_locks/user-001_DRIVER")
    );

    const profileSnap = await tx.get(
      doc(admin, "users/user-001")
    );

    if (!requestSnap.exists() ||
        !lockSnap.exists() ||
        !profileSnap.exists()) {
      throw new Error("Dokumen kelulusan tidak lengkap.");
    }

    const roles = profileSnap.data().roles || [];

    tx.update(doc(admin, "users/user-001"), {
      roles: [...roles, "DRIVER"]
    });

    tx.update(
      doc(admin, "role_request_locks/user-001_DRIVER"),
      { status: "APPROVED" }
    );

    tx.update(
      doc(admin, "role_requests/request-001"),
      { status: "APPROVED" }
    );
  }));
  console.log("LULUS: Approve DRIVER.");

  const approvedUser = await getDoc(
    doc(admin, "users/user-001")
  );

  if (!approvedUser.data().roles.includes("DRIVER")) {
    throw new Error("Role DRIVER tidak ditambah.");
  }

  const mechanicRequest = doc(user, "role_requests/request-002");
  const mechanicLock = doc(
    user,
    "role_request_locks/user-001_MECHANIC"
  );

  await assertSucceeds(runTransaction(user, async tx => {
    tx.set(mechanicRequest, {
      userUid: "user-001",
      requestedRole: "MECHANIC",
      status: "PENDING",
      createdAt: new Date()
    });

    tx.set(mechanicLock, {
      userUid: "user-001",
      requestedRole: "MECHANIC",
      requestId: "request-002",
      status: "PENDING",
      createdAt: new Date()
    });
  }));
  console.log("LULUS: Submit MECHANIC bersama lock.");

  await assertSucceeds(runTransaction(admin, async tx => {
    const requestSnap = await tx.get(
      doc(admin, "role_requests/request-002")
    );

    const lockSnap = await tx.get(
      doc(admin, "role_request_locks/user-001_MECHANIC")
    );

    if (!requestSnap.exists() || !lockSnap.exists()) {
      throw new Error("Dokumen penolakan tidak lengkap.");
    }

    tx.update(
      doc(admin, "role_requests/request-002"),
      { status: "REJECTED" }
    );

    tx.delete(
      doc(admin, "role_request_locks/user-001_MECHANIC")
    );
  }));
  console.log("LULUS: Reject MECHANIC dan padam lock.");

  console.log("\nSELESAI: Semua ujian regresi lulus.");
}

main()
  .catch(error => {
    console.error("\nUJIAN REGRESI GAGAL:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (testEnv) await testEnv.cleanup();
  });
