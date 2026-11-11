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
  addDoc,
  serverTimestamp
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

// Hantar permohonan peranan tambahan
window.firebaseSubmitRoleRequest = async function(requestedRole) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Sila login dahulu.");

    const allowedRoles = ["DRIVER", "MECHANIC", "WORKSHOP", "FLEET"];

    if (!allowedRoles.includes(requestedRole)) {
      throw new Error("Peranan yang dipilih tidak sah.");
    }

    await addDoc(collection(db, "role_requests"), {
      userUid: user.uid,
      requestedRole: requestedRole,
      status: "PENDING",
      createdAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error("Gagal menghantar permohonan role:", error);
    alert("Permohonan gagal: " + error.message);
    return false;
  }
};

// Pantau status akaun
onAuthStateChanged(auth, function(user) {
  if (user) {
    if (typeof window.unlockApp === "function") {
      window.unlockApp(user);
    }
  } else {
    document.body.classList.add("auth-locked");
    document.getElementById("authPage").classList.remove("hidden");

    if (typeof window.showLogin === "function") {
      window.showLogin();
    }
  }
});

console.log("KARDRIVER FIREBASE AUTH READY");
