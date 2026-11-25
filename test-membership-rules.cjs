const fs = require("fs");
const assert = require("assert");
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} = require("@firebase/rules-unit-testing");

const {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  runTransaction,
  serverTimestamp
} = require("firebase/firestore");

const PROJECT_ID = "kardriver-autohub";
const RULES = fs.readFileSync("firestore.rules", "utf8");

async function main() {
  const testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: RULES
    }
  });

  try {
    // Bersihkan dokumen ujian terdahulu sahaja.
    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();

      const testUsers = [
        "membership-test-user",
        "membership-test-user-2",
        "membership-approve-user",
        "membership-reject-user"
      ];

      const testRequests = [
        "membership-valid-request",
        "duplicate-request",
        "fake-price",
        "membership-approve-request",
        "membership-reject-request"
      ];

      for (const uid of testUsers) {
        await deleteDoc(doc(db, "users", uid));
        await deleteDoc(doc(db, "membership_request_locks", uid));
      }

      for (const requestId of testRequests) {
        await deleteDoc(doc(db, "membership_requests", requestId));
      }
    });

    console.log("PASS: Data ujian lama dibersihkan.");

    const userUid = "membership-test-user";
    const adminUid = "membership-test-admin";
    const requestId = "membership-valid-request";

    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();

      await setDoc(doc(db, "users", userUid), {
        name: "Test User",
        email: "test@example.com",
        membership: "FREE",
        status: "ACTIVE",
        createdAt: new Date(),
        roles: ["DRIVER"],
        activeRole: "DRIVER"
      });
    });

    const userDb = testEnv.authenticatedContext(userUid).firestore();
    const userRef = doc(userDb, "users", userUid);
    const lockRef = doc(userDb, "membership_request_locks", userUid);
    const requestRef = doc(userDb, "membership_requests", requestId);

    console.log("TEST 0A: Pengguna cuba menaik taraf FREE kepada PRO...");
    await assertFails(updateDoc(userRef, { membership: "PRO" }));
    console.log("PASS: Manipulasi FREE kepada PRO ditolak.");

    console.log("TEST 0B: Pengguna cuba menaik taraf FREE kepada ELITE...");
    await assertFails(updateDoc(userRef, { membership: "MASTERCLASS_ELITE" }));
    console.log("PASS: Manipulasi FREE kepada ELITE ditolak.");

    console.log("TEST 0C: Pengguna cuba mengaktifkan status membership...");
    await assertFails(updateDoc(userRef, { membershipStatus: "ACTIVE" }));
    console.log("PASS: Manipulasi membershipStatus ditolak.");

    console.log("TEST 0D: Pengguna cuba memanjangkan tarikh luput...");
    await assertFails(updateDoc(userRef, {
      membershipExpiresAt: new Date(Date.now() + 365 * 86400000)
    }));
    console.log("PASS: Manipulasi tarikh luput ditolak.");

    console.log("TEST 0E: Pengguna cuba menukar kitaran bil...");
    await assertFails(updateDoc(userRef, { membershipBillingCycle: "YEARLY" }));
    console.log("PASS: Manipulasi kitaran bil ditolak.");

    console.log("TEST 1: Permohonan PRO sah...");
    await assertSucceeds(runTransaction(userDb, async tx => {
      const userSnap = await tx.get(userRef);
      const lockSnap = await tx.get(lockRef);

      assert.strictEqual(userSnap.data().status, "ACTIVE");
      assert.strictEqual(lockSnap.exists(), false);

      tx.set(requestRef, {
        userUid,
        requestedPlan: "PRO",
        billingCycle: "MONTHLY",
        amount: 29.99,
        paymentReference: "TEST-1234",
        status: "PENDING",
        createdAt: serverTimestamp()
      });

      tx.set(lockRef, {
        userUid,
        requestId,
        status: "PENDING",
        createdAt: serverTimestamp()
      });
    }));
    console.log("PASS: Permohonan sah diterima.");

    console.log("TEST 2: Permohonan kedua ketika lock wujud...");
    const duplicateRef = doc(userDb, "membership_requests", "duplicate-request");
    await assertFails(runTransaction(userDb, async tx => {
      const userSnap = await tx.get(userRef);
      const lockSnap = await tx.get(lockRef);

      assert(userSnap.exists());
      assert(lockSnap.exists());

      tx.set(duplicateRef, {
        userUid,
        requestedPlan: "PRO",
        billingCycle: "MONTHLY",
        amount: 29.99,
        paymentReference: "TEST-5678",
        status: "PENDING",
        createdAt: serverTimestamp()
      });

      tx.set(lockRef, {
        userUid,
        requestId: "duplicate-request",
        status: "PENDING",
        createdAt: serverTimestamp()
      });
    }));
    console.log("PASS: Permohonan berganda ditolak.");

    console.log("TEST 3: Harga palsu...");
    const secondUid = "membership-test-user-2";
    await testEnv.withSecurityRulesDisabled(async context => {
      await setDoc(doc(context.firestore(), "users", secondUid), {
        name: "Second User",
        email: "second@example.com",
        membership: "FREE",
        status: "ACTIVE",
        createdAt: new Date(),
        roles: ["DRIVER"],
        activeRole: "DRIVER"
      });
    });

    const secondDb = testEnv.authenticatedContext(secondUid).firestore();
    await assertFails(runTransaction(secondDb, async tx => {
      const userRef2 = doc(secondDb, "users", secondUid);
      const lockRef2 = doc(secondDb, "membership_request_locks", secondUid);
      const requestRef2 = doc(secondDb, "membership_requests", "fake-price");

      await tx.get(userRef2);
      await tx.get(lockRef2);

      tx.set(requestRef2, {
        userUid: secondUid,
        requestedPlan: "PRO",
        billingCycle: "MONTHLY",
        amount: 1,
        paymentReference: "TEST-9999",
        status: "PENDING",
        createdAt: serverTimestamp()
      });

      tx.set(lockRef2, {
        userUid: secondUid,
        requestId: "fake-price",
        status: "PENDING",
        createdAt: serverTimestamp()
      });
    }));
    console.log("PASS: Harga palsu ditolak.");

    console.log("TEST 4: Pengguna biasa cuba meluluskan permohonan...");
    await assertFails(updateDoc(requestRef, {
      status: "APPROVED",
      reviewedAt: serverTimestamp(),
      reviewedBy: userUid
    }));
    console.log("PASS: Kelulusan oleh pengguna biasa ditolak.");

    const storedRequest = await getDoc(requestRef);
    assert.strictEqual(storedRequest.data().status, "PENDING");


    console.log("TEST 5: Admin meluluskan PRO...");
    const approveUid = "membership-approve-user";
    const approveRequestId = "membership-approve-request";

    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();
      await setDoc(doc(db, "users", approveUid), {
        name: "Approve User",
        email: "approve@example.com",
        membership: "FREE",
        status: "ACTIVE",
        createdAt: new Date(),
        roles: ["DRIVER"],
        activeRole: "DRIVER"
      });
      await setDoc(doc(db, "membership_requests", approveRequestId), {
        userUid: approveUid,
        requestedPlan: "PRO",
        billingCycle: "MONTHLY",
        amount: 29.99,
        paymentReference: "ADMIN-1234",
        status: "PENDING",
        createdAt: new Date()
      });
      await setDoc(doc(db, "membership_request_locks", approveUid), {
        userUid: approveUid,
        requestId: approveRequestId,
        status: "PENDING",
        createdAt: new Date()
      });
    });

    const adminDb = testEnv.authenticatedContext(adminUid, {
      platformAdmin: true
    }).firestore();

    const approveUserRef = doc(adminDb, "users", approveUid);
    const approveRequestRef = doc(adminDb, "membership_requests", approveRequestId);
    const approveLockRef = doc(adminDb, "membership_request_locks", approveUid);

    await assertSucceeds(runTransaction(adminDb, async tx => {
      const userSnap = await tx.get(approveUserRef);
      const requestSnap = await tx.get(approveRequestRef);
      const lockSnap = await tx.get(approveLockRef);

      assert(userSnap.exists());
      assert.strictEqual(requestSnap.data().status, "PENDING");
      assert(lockSnap.exists());

      const startedAt = serverTimestamp();
      const expiresAt = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);

      tx.update(approveUserRef, {
        membership: "PRO",
        membershipStatus: "ACTIVE",
        membershipBillingCycle: "MONTHLY",
        membershipStartedAt: startedAt,
        membershipExpiresAt: expiresAt,
        membershipRequestId: approveRequestId
      });

      tx.update(approveRequestRef, {
        status: "APPROVED",
        reviewedAt: serverTimestamp(),
        reviewedBy: adminUid,
        startedAt,
        expiresAt
      });

      tx.delete(approveLockRef);
    }));

    const approvedUser = await getDoc(approveUserRef);
    const approvedRequest = await getDoc(approveRequestRef);
    const approvedLock = await getDoc(approveLockRef);

    assert.strictEqual(approvedUser.data().membership, "PRO");
    assert.strictEqual(approvedUser.data().membershipStatus, "ACTIVE");
    assert.strictEqual(approvedRequest.data().status, "APPROVED");
    assert.strictEqual(approvedLock.exists(), false);
    console.log("PASS: Admin meluluskan PRO dan lock dipadam.");

    console.log("TEST 6: Admin menolak permohonan...");
    const rejectUid = "membership-reject-user";
    const rejectRequestId = "membership-reject-request";

    await testEnv.withSecurityRulesDisabled(async context => {
      const db = context.firestore();
      await setDoc(doc(db, "users", rejectUid), {
        name: "Reject User",
        email: "reject@example.com",
        membership: "FREE",
        status: "ACTIVE",
        createdAt: new Date(),
        roles: ["DRIVER"],
        activeRole: "DRIVER"
      });
      await setDoc(doc(db, "membership_requests", rejectRequestId), {
        userUid: rejectUid,
        requestedPlan: "MASTERCLASS_ELITE",
        billingCycle: "YEARLY",
        amount: 899,
        paymentReference: "ADMIN-5678",
        status: "PENDING",
        createdAt: new Date()
      });
      await setDoc(doc(db, "membership_request_locks", rejectUid), {
        userUid: rejectUid,
        requestId: rejectRequestId,
        status: "PENDING",
        createdAt: new Date()
      });
    });

    const rejectUserRef = doc(adminDb, "users", rejectUid);
    const rejectRequestRef = doc(adminDb, "membership_requests", rejectRequestId);
    const rejectLockRef = doc(adminDb, "membership_request_locks", rejectUid);

    await assertSucceeds(runTransaction(adminDb, async tx => {
      const userSnap = await tx.get(rejectUserRef);
      const requestSnap = await tx.get(rejectRequestRef);
      const lockSnap = await tx.get(rejectLockRef);

      assert.strictEqual(userSnap.data().membership, "FREE");
      assert.strictEqual(requestSnap.data().status, "PENDING");
      assert(lockSnap.exists());

      tx.update(rejectRequestRef, {
        status: "REJECTED",
        reviewedAt: serverTimestamp(),
        reviewedBy: adminUid
      });

      tx.delete(rejectLockRef);
    }));

    const rejectedUser = await getDoc(rejectUserRef);
    const rejectedRequest = await getDoc(rejectRequestRef);
    const rejectedLock = await getDoc(rejectLockRef);

    assert.strictEqual(rejectedUser.data().membership, "FREE");
    assert.strictEqual(rejectedRequest.data().status, "REJECTED");
    assert.strictEqual(rejectedLock.exists(), false);
    console.log("PASS: Permohonan ditolak, membership kekal FREE dan lock dipadam.");

    console.log("\nSEMUA UJIAN MEMBERSHIP YANG DITETAPKAN LULUS.");
  } finally {
    await testEnv.cleanup();
  }
}

main().catch(error => {
  console.error("\nUJIAN GAGAL:", error);
  process.exitCode = 1;
});
