// KARDRIVER AUTOHUB V3 - DYNAMIC ROLE THEME
window.applyRoleTheme = function(role) {
  const themes = {
    DRIVER: "theme-driver",
    MECHANIC: "theme-mechanic",
    OWNER: "theme-owner",
    ADMIN: "theme-admin"
  };

  document.body.classList.remove(
    "theme-driver",
    "theme-mechanic",
    "theme-owner",
    "theme-admin"
  );

  const theme = themes[String(role || "").toUpperCase()];
  if (theme) document.body.classList.add(theme);
};

// KARDRIVER AUTOHUB V3 - USER PROFILE

window.renderUserProfile = function() {
  const user = window.getFirebaseUser?.();
  if (!user) return;

  document.getElementById("profileUserName").textContent =
    user.displayName || "Pengguna KARDRIVER";

  document.getElementById("profileUserEmail").textContent =
    user.email || "-";

  const date = user.metadata?.creationTime;
  document.getElementById("profileCreatedAt").textContent =
    date ? new Date(date).toLocaleDateString("en-MY") : "-";

  document.getElementById("profileNewName").value =
    user.displayName || "";

  if (typeof window.renderRoleSwitcher === "function") {
    window.renderRoleSwitcher();
  }
};

window.updateProfileName = async function() {
  const input = document.getElementById("profileNewName");
  const name = input.value.trim();

  if (!name) {
    alert("Sila masukkan nama baharu.");
    return;
  }

  if (await window.firebaseUpdateName(name)) {
    window.renderUserProfile();
  }
};

window.resetProfilePassword = async function() {
  await window.firebaseResetPassword();
};

console.log("KARDRIVER USER PROFILE READY");

// Hantar permohonan role tambahan
window.submitRoleRequest = async function() {
  const select = document.getElementById("requestedRole");
  const status = document.getElementById("roleRequestStatus");
  const role = select.value;

  if (!role) {
    alert("Sila pilih peranan yang ingin dipohon.");
    return;
  }

  status.textContent = "Sedang menghantar permohonan...";

  const success = await window.firebaseSubmitRoleRequest(role);

  if (success) {
    status.textContent = "Permohonan " + role + " berjaya dihantar. Status: PENDING.";
    select.value = "";
  } else {
    status.textContent = "Permohonan gagal dihantar. Sila cuba lagi.";
  }
};

// Paparkan role yang telah diluluskan
window.renderRoleSwitcher = async function() {
  const container = document.getElementById("roleSwitcher");
  const activeDisplay = document.getElementById("profileActiveRole");

  if (!container) return;

  const profile = await window.firebaseGetUserRoles();
  if (!profile) return;

  activeDisplay.textContent = profile.activeRole;
  window.applyRoleTheme(profile.activeRole);

  container.innerHTML = "";

  profile.roles.forEach(function(role) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "action";
    button.textContent =
      role === profile.activeRole ? role + " (AKTIF)" : "GUNA " + role;

    button.disabled = role === profile.activeRole;

    button.onclick = async function() {
      const success = await window.firebaseSetActiveRole(role);

      if (success) {
        window.applyRoleTheme(role);
        alert("Role aktif ditukar kepada " + role);
        await window.renderRoleSwitcher();
      }
    };

    container.appendChild(button);
  });
};

