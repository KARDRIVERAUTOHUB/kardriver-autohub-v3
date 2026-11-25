const fs = require("node:fs");
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} = require("@firebase/rules-unit-testing");
const { doc, setDoc, getDoc, getDocs, query, where, addDoc, collection, updateDoc, deleteDoc, serverTimestamp } = require("firebase/firestore");

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
      await setDoc(doc(db, "users/community-a"), {
        name: "Pemandu A", email: "a@example.test",
        membership: "FREE", status: "ACTIVE",
        roles: ["DRIVER"], activeRole: "DRIVER"
      });
      await setDoc(doc(db, "users/community-b"), {
        name: "Pemandu B", email: "b@example.test",
        membership: "FREE", status: "ACTIVE",
        roles: ["DRIVER"], activeRole: "DRIVER"
      });
      await setDoc(doc(db, "users/community-suspended"), {
        name: "Akaun Digantung", email: "s@example.test",
        membership: "FREE", status: "SUSPENDED",
        roles: ["DRIVER"], activeRole: "DRIVER"
      });

      for (const [uid, displayName] of [
        ["community-a", "Pemandu A"],
        ["community-b", "Pemandu B"],
        ["community-suspended", "Akaun Digantung"]
      ]) {
        await setDoc(doc(db, "community_profiles", uid), {
          uid, displayName, photoURL: "", status: "ACTIVE",
          updatedAt: new Date()
        });
      }
    });

    const a = env.authenticatedContext("community-a").firestore();
    const b = env.authenticatedContext("community-b").firestore();
    const suspended = env.authenticatedContext("community-suspended").firestore();
    const profileA = doc(a, "community_profiles/community-a");
    const message = collection(a, "chat_rooms/general/messages");
    let sentMessageRef = null;

    const tests = [
      ["Baca profil Community sendiri", () =>
        assertSucceeds(getDoc(profileA))],

      ["Akses terus profil pengguna lain ditolak", () =>
        assertFails(getDoc(doc(a, "community_profiles/community-b")))],

      ["Pengguna tidak boleh menyamar nama dalam profil", () =>
        assertFails(updateDoc(profileA, {
          displayName: "Pemandu B",
          updatedAt: serverTimestamp()
        }))],

      ["Hantar mesej sah dengan identiti sendiri", () =>
        assertSucceeds((async () => {
          sentMessageRef = await addDoc(message, {
            senderUid: "community-a",
            senderName: "Pemandu A",
            text: "Ujian mesej Community",
            type: "MESSAGE",
            createdAt: serverTimestamp()
          });
        })())],

      ["Baca senarai profil Community", () =>
        assertSucceeds(getDocs(query(collection(a, "community_profiles"), where("status", "==", "ACTIVE"))))],

      ["Baca mesej yang dihantar", async () => {
        if (!sentMessageRef) throw new Error("Rujukan mesej tiada");
        await assertSucceeds(getDoc(sentMessageRef));
      }],

      ["Pengubahan mesej selepas dihantar ditolak", async () => {
        if (!sentMessageRef) throw new Error("Rujukan mesej tiada");
        await assertFails(updateDoc(sentMessageRef, { text: "Mesej telah diubah" }));
      }],

      ["Pemadaman mesej selepas dihantar ditolak", async () => {
        if (!sentMessageRef) throw new Error("Rujukan mesej tiada");
        await assertFails(deleteDoc(sentMessageRef));
      }],

      ["Penyamaran UID penghantar ditolak", () =>
        assertFails(addDoc(message, {
          senderUid: "community-b",
          senderName: "Pemandu A",
          text: "Mesej palsu",
          type: "MESSAGE",
          createdAt: serverTimestamp()
        }))],

      ["Penyamaran nama penghantar ditolak", () =>
        assertFails(addDoc(message, {
          senderUid: "community-a",
          senderName: "Admin",
          text: "Mesej palsu",
          type: "MESSAGE",
          createdAt: serverTimestamp()
        }))],

      ["Mesej melebihi 3000 aksara ditolak", () =>
        assertFails(addDoc(message, {
          senderUid: "community-a",
          senderName: "Pemandu A",
          text: "X".repeat(3001),
          type: "MESSAGE",
          createdAt: serverTimestamp()
        }))],

      ["Akaun digantung tidak boleh menghantar mesej", () =>
        assertFails(addDoc(
          collection(suspended, "chat_rooms/general/messages"), {
            senderUid: "community-suspended",
            senderName: "Akaun Digantung",
            text: "Ujian akaun digantung",
            type: "MESSAGE",
            createdAt: serverTimestamp()
          }
        ))]
    ];

    let passed = 0;
    for (const [name, test] of tests) {
      await test();
      console.log("PASS:", name);
      passed++;
    }
    console.log(`\nKEPUTUSAN COMMUNITY: ${passed}/${tests.length} LULUS`);
  } finally {
    await env.cleanup();
  }
}

main().catch(error => {
  console.error("UJIAN GAGAL:", error);
  process.exitCode = 1;
});
