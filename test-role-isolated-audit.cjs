const fs = require("node:fs");
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} = require("@firebase/rules-unit-testing");
const {
  doc, setDoc, getDoc, deleteDoc, writeBatch, serverTimestamp
} = require("firebase/firestore");

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

      // Bersihkan dokumen audit terdahulu sahaja.
      for (const id of [
        "role-audit-request-1",
        "role-audit-invalid",
        "role-audit-duplicate"
      ]) {
        await deleteDoc(doc(db, "role_requests", id));
      }
      for (const id of [
        "role-audit-user_MECHANIC"
      ]) {
        await deleteDoc(doc(db, "role_request_locks", id));
      }

      await setDoc(doc(db, "users/role-audit-user"), {
        name: "Role Audit User",
        email: "role-user@example.test",
        membership: "FREE",
        status: "ACTIVE",
        roles: ["DRIVER"],
        activeRole: "DRIVER"
      });
      await setDoc(doc(db, "users/role-audit-admin"), {
        name: "Role Audit Admin",
        email: "role-admin@example.test",
        membership: "FREE",
        status: "ACTIVE",
        roles: ["OWNER"],
        activeRole: "OWNER"
      });
    });

    const user = env.authenticatedContext("role-audit-user").firestore();
    const admin = env.authenticatedContext("role-audit-admin", {
      platformAdmin: true
    }).firestore();

    const requestRef = doc(user, "role_requests/role-audit-request-1");
    const lockRef = doc(user, "role_request_locks/role-audit-user_MECHANIC");

    async function submitRole(role, requestId) {
      const batch = writeBatch(user);
      batch.set(doc(user, "role_requests/" + requestId), {
        userUid: "role-audit-user",
        requestedRole: role,
        status: "PENDING",
        createdAt: serverTimestamp()
      });
      batch.set(
        doc(user, "role_request_locks/role-audit-user_" + role),
        {
          userUid: "role-audit-user",
          requestedRole: role,
          requestId,
          status: "PENDING",
          createdAt: serverTimestamp()
        }
      );
      await batch.commit();
    }

    const tests = [
      ["Permohonan MECHANIC sah diterima", () =>
        assertSucceeds(submitRole("MECHANIC", "role-audit-request-1"))],

      ["Pengguna boleh membaca permohonan sendiri", () =>
        assertSucceeds(getDoc(requestRef))],

      ["Pengguna tidak boleh membaca lock pengguna lain", () =>
        assertFails(getDoc(doc(user, "role_request_locks/other-user_MECHANIC")))],

      ["Permohonan role tidak sah ditolak", () =>
        assertFails(submitRole("ADMIN", "role-audit-invalid"))],

      ["Permohonan role berganda ketika lock aktif ditolak", () =>
        assertFails(submitRole("MECHANIC", "role-audit-duplicate"))],

      ["Pengguna biasa tidak boleh meluluskan permohonan", async () => {
        const batch = writeBatch(user);
        batch.update(requestRef, { status: "APPROVED" });
        await assertFails(batch.commit());
      }],

      ["Admin meluluskan MECHANIC secara atomik", async () => {
        const batch = writeBatch(admin);
        batch.update(doc(admin, "role_requests/role-audit-request-1"), {
          status: "APPROVED"
        });
        batch.update(doc(admin, "role_request_locks/role-audit-user_MECHANIC"), {
          status: "APPROVED"
        });
        batch.update(doc(admin, "users/role-audit-user"), {
          roles: ["DRIVER", "MECHANIC"]
        });
        await assertSucceeds(batch.commit());
      }],

      ["Role MECHANIC direkodkan pada profil", async () => {
        const result = await getDoc(doc(user, "users/role-audit-user"));
        if (!result.exists() || !result.data().roles.includes("MECHANIC")) {
          throw new Error("Role MECHANIC tidak direkodkan");
        }
      }]
    ];

    let passed = 0;
    for (const [name, test] of tests) {
      await test();
      console.log("PASS:", name);
      passed++;
    }
    console.log(`\nKEPUTUSAN ROLE: ${passed}/${tests.length} LULUS`);
  } finally {
    await env.cleanup();
  }
}

main().catch(error => {
  console.error("UJIAN GAGAL:", error);
  process.exitCode = 1;
});
