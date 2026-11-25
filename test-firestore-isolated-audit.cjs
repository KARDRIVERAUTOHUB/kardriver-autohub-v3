const fs = require("node:fs");
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} = require("@firebase/rules-unit-testing");
const { doc, setDoc, getDoc, updateDoc } = require("firebase/firestore");

const PROJECT_ID = "demo-kardriver-firestore-audit";

async function main() {
  const env = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: fs.readFileSync("firestore.rules", "utf8")
    }
  });

  try {
    await env.withSecurityRulesDisabled(async ctx => {
      const db = ctx.firestore();
      for (const uid of ["audit-user-a", "audit-user-b"]) {
        await setDoc(doc(db, "users", uid), {
          name: uid,
          email: uid + "@example.test",
          membership: "FREE",
          status: "ACTIVE",
          roles: ["DRIVER"],
          activeRole: "DRIVER",
          createdAt: new Date()
        });
      }
    });

    const a = env.authenticatedContext("audit-user-a").firestore();
    const b = env.authenticatedContext("audit-user-b").firestore();
    const own = doc(a, "users/audit-user-a");

    const tests = [
      ["Baca profil sendiri", () => assertSucceeds(getDoc(own))],
      ["Baca profil orang lain ditolak", () => assertFails(getDoc(doc(a, "users/audit-user-b")))],
      ["Tukar FREE kepada PRO ditolak", () => assertFails(updateDoc(own, { membership: "PRO" }))],
      ["Tukar FREE kepada ELITE ditolak", () => assertFails(updateDoc(own, { membership: "MASTERCLASS_ELITE" }))],
      ["Ubah status akaun ditolak", () => assertFails(updateDoc(own, { status: "SUSPENDED" }))],
      ["Ubah status membership ditolak", () => assertFails(updateDoc(own, { membershipStatus: "ACTIVE" }))],
      ["Panjangkan tarikh luput ditolak", () => assertFails(updateDoc(own, { membershipExpiresAt: new Date(Date.now() + 365 * 86400000) }))],
      ["Ubah kitaran bil ditolak", () => assertFails(updateDoc(own, { membershipBillingCycle: "YEARLY" }))],
      ["Baca profil sendiri akaun B", () => assertSucceeds(getDoc(doc(b, "users/audit-user-b")))]
    ];

    let passed = 0;
    for (const [name, test] of tests) {
      await test();
      console.log("PASS:", name);
      passed++;
    }
    console.log(`\nKEPUTUSAN: ${passed}/${tests.length} LULUS`);
  } finally {
    await env.cleanup();
  }
}

main().catch(error => {
  console.error("UJIAN GAGAL:", error);
  process.exitCode = 1;
});
