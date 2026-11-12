import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
  runTransaction
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYp4gySn8JmNAje9ZyNmIbwCDf4KIL1ng",
  authDomain: "kardriver-autohub.firebaseapp.com",
  projectId: "kardriver-autohub",
  storageBucket: "kardriver-autohub.firebasestorage.app",
  messagingSenderId: "521435133008",
  appId: "1:521435133008:web:16887b29b7f001d8528d55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
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
      roles: ["OWNER"],
      activeRole: "OWNER",
      createdAt: user.metadata?.creationTime || ""
    };

    const existing = await getDoc(userRef);

    if (!existing.exists()) {
      await setDoc(userRef, userData);
    }

    return true;
  } catch (error) {
    console.error("Gagal menyimpan profil:", error);
    return false;
  }
};

// Daftar akaun baharu
window.firebaseRegister = async function(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    const profileSaved = await window.saveUserProfile(result.user);
    if (!profileSaved) {
      alert("Akaun berjaya dibuat, tetapi profil gagal disimpan. Sila hubungi Admin.");
      return false;
    }

    alert("Pendaftaran berjaya! Selamat datang ke KARDRIVER AUTOHUB.");
    return true;
  } catch (error) {
    alert("Pendaftaran gagal: " + error.message);
    return false;
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

    return {
      roles: Array.isArray(data.roles) ? data.roles : ["OWNER"],
      activeRole: data.activeRole || "OWNER"
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
    const roles = Array.isArray(data.roles) ? data.roles : [];

    if (!roles.includes(newRole)) {
      throw new Error("Role ini belum diluluskan untuk akaun anda.");
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
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Pengguna belum login.");

    await updateProfile(user, { displayName: name });
    alert("Nama profil berjaya dikemas kini.");
    return true;
  } catch (error) {
    alert("Gagal mengemas kini nama: " + error.message);
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

// Pantau status akaun
onAuthStateChanged(auth, async function(user) {
  if (user) {
    if (typeof window.unlockApp === "function") {
      window.unlockApp(user);
    }

    await window.refreshAdminMenu(user);
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
