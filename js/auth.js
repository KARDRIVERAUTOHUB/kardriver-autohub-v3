// KARDRIVER AUTOHUB V3 - AUTH SYSTEM

function showLogin() {
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");

  if (!loginPanel || !registerPanel) {
    console.error("Login/Register panel tidak dijumpai.");
    return;
  }

  loginPanel.classList.remove("hidden");
  registerPanel.classList.add("hidden");

  loginPanel.style.display = "block";
  registerPanel.style.display = "none";
}

function showRegister() {
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");

  if (!loginPanel || !registerPanel) {
    console.error("Login/Register panel tidak dijumpai.");
    return;
  }

  loginPanel.classList.add("hidden");
  registerPanel.classList.remove("hidden");

  loginPanel.style.display = "none";
  registerPanel.style.display = "block";
}

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (window.firebaseLogin) {
    const success = await window.firebaseLogin(email, password);
    if (success) {
      document.getElementById("loginPassword").value = "";
    }
  } else {
    alert("Firebase belum bersedia. Sila cuba semula.");
  }
}

async function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (window.firebaseRegister) {
    const success = await window.firebaseRegister(name, email, password);
    if (success) {
      document.getElementById("registerPassword").value = "";
    }
  } else {
    alert("Firebase belum bersedia. Sila cuba semula.");
  }
}

// Paparan awal V3
document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("auth-locked");
  showLogin();
});

// Buka aplikasi selepas pengesahan berjaya
function unlockApp(user) {
  document.body.classList.remove("auth-locked");
  document.getElementById("authPage").classList.add("hidden");
  go("home");

  if (user && user.email) {
    console.log("USER LOGIN:", user.email);
  }
}

// Logout pengguna
async function logoutUser() {
  if (window.firebaseLogout) {
    await window.firebaseLogout();
  } else {
    alert("Firebase belum bersedia.");
  }
}
