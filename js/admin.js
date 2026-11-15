// KARDRIVER AUTOHUB V3 - ADMIN CONTROL CENTER

window.adminState = {
  verified: false,
  loading: false
};

function adminElement(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined && text !== null) {
    el.textContent = String(text);
  }
  if (className) el.className = className;
  return el;
}

window.loadAdminDashboard = async function() {
  const status = document.getElementById("adminRequestStatus");
  const requestList = document.getElementById("adminRequestList");
  const userList = document.getElementById("adminUserList");

  if (window.adminState.loading) return;

  window.adminState.loading = true;

  try {
    status.textContent = "Mengesahkan Platform Admin...";

    const isAdmin = await window.firebaseIsPlatformAdmin(true);
    window.adminState.verified = isAdmin;

    if (!isAdmin) {
      throw new Error("Akses Platform Admin ditolak.");
    }

    status.textContent = "Sedang membaca data Firestore...";

    const data = await window.firebaseAdminGetDashboardData();

    document.getElementById("adminTotalUsers").textContent =
      data.totalUsers;

    document.getElementById("adminPendingRequests").textContent =
      data.pendingRequests;

    // SENARAI PERMOHONAN ROLE - GRID MINI
    requestList.replaceChildren();
    requestList.classList.add("admin-request-grid");

    if (data.requests.length === 0) {
      requestList.appendChild(
        adminElement("p", "Tiada permohonan peranan.")
      );
    } else {
      data.requests.forEach(request => {
        const card = adminElement("div", null, "admin-request-card");

        card.appendChild(
          adminElement("strong", request.applicantName || "Nama tidak ditemui")
        );

        const role = String(request.requestedRole || "-").toUpperCase();
        const roleClass = {
          DRIVER: "role-driver",
          MECHANIC: "role-mechanic",
          OWNER: "role-owner",
          ADMIN: "role-admin"
        }[role] || "role-other";

        card.appendChild(
          adminElement("span", role, `admin-role-label ${roleClass}`)
        );

        const status = String(request.status || "-").toUpperCase();
        const statusClass = {
          APPROVED: "status-approved",
          REJECTED: "status-rejected",
          PENDING: "status-pending"
        }[status] || "status-other";

        card.appendChild(
          adminElement("span", status, `tag ${statusClass}`)
        );

        if (request.status === "PENDING") {
          const actions = adminElement("div", null, "admin-request-actions");

          const approve = adminElement("button", "APPROVE", "action");
          const reject = adminElement("button", "REJECT", "action");

          approve.type = "button";
          reject.type = "button";

          approve.addEventListener("click", () => {
            window.reviewAdminRoleRequest(request.id, "APPROVED");
          });

          reject.addEventListener("click", () => {
            window.reviewAdminRoleRequest(request.id, "REJECTED");
          });

          actions.append(approve, reject);
          card.appendChild(actions);
        }

        requestList.appendChild(card);
      });
    }

    // SENARAI PENGGUNA
    userList.replaceChildren();

    if (data.users.length === 0) {
      userList.appendChild(
        adminElement("p", "Tiada pengguna berdaftar.")
      );
    } else {
      data.users.forEach(user => {
        const card = adminElement("div", null, "admin-user-card");
        const roles = Array.isArray(user.roles) ? user.roles : [];

        card.appendChild(
          adminElement("strong", user.name || "Pengguna KARDRIVER")
        );

        card.appendChild(
          adminElement("p", user.email || "-")
        );

        card.appendChild(
          adminElement("p", "Role: " + roles.join(", "))
        );

        const userStatus = String(user.status || "-").toUpperCase();

        card.appendChild(
          adminElement("span", userStatus, "tag")
        );

        if (userStatus === "ACTIVE" || userStatus === "SUSPENDED") {
          const action = userStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          const buttonText = action === "SUSPENDED" ? "SUSPEND" : "ACTIVATE";
          const button = adminElement("button", buttonText, "action");

          button.type = "button";
          button.addEventListener("click", () => {
            window.setAdminUserStatus(user.uid, action, button);
          });

          card.appendChild(button);
        }

        userList.appendChild(card);
      });
    }

    status.textContent = "Dashboard berjaya dimuatkan.";

  } catch (error) {
    window.adminState.verified = false;
    status.textContent = "GAGAL: " + error.message;
    requestList.replaceChildren();
    userList.textContent = "Data tidak dapat dibaca.";
    console.error("Admin dashboard error:", error);

  } finally {
    window.adminState.loading = false;
  }
};

// TINDAKAN SUSPEND / ACTIVATE PENGGUNA
window.setAdminUserStatus = async function(uid, targetStatus, button) {
  if (!window.adminState.verified) {
    alert("Akses Platform Admin diperlukan.");
    return;
  }

  const actionText = targetStatus === "SUSPENDED" ? "menggantung" : "mengaktifkan";

  if (!confirm("Adakah anda pasti mahu " + actionText + " akaun ini?")) {
    return;
  }

  try {
    if (button) button.disabled = true;

    const result = await window.firebaseAdminSetUserStatus(uid, targetStatus);

    if (!result.success) {
      throw new Error("Tindakan tidak berjaya.");
    }

    alert("Status akaun berjaya dikemaskini: " + result.status);
    await window.loadAdminDashboard();

  } catch (error) {
    console.error("Admin user status error:", error);
    alert("Gagal mengemaskini status akaun: " + error.message);
    if (button) button.disabled = false;
  }
};

// TINDAKAN APPROVE / REJECT
window.reviewAdminRoleRequest = async function(requestId, decision) {
  if (!window.adminState.verified) {
    alert("Akses Platform Admin diperlukan.");
    return;
  }

  const actionText = decision === "APPROVED"
    ? "meluluskan"
    : "menolak";

  if (!confirm("Adakah anda pasti mahu " + actionText + " permohonan ini?")) {
    return;
  }

  try {
    const result = await window.firebaseAdminReviewRoleRequest(
      requestId,
      decision
    );

    if (!result.success) {
      throw new Error("Tindakan tidak berjaya.");
    }

    alert("Permohonan berjaya diproses: " + result.status);

    await window.loadAdminDashboard();

  } catch (error) {
    console.error("Role review error:", error);
    alert("Gagal memproses permohonan: " + error.message);
  }
};

// SEMAK KUASA PLATFORM ADMIN
window.initAdminControlCenter = async function() {
  return await window.firebaseIsPlatformAdmin(true);
};

// BUKA ADMIN DASHBOARD
window.openAdminControlCenter = async function() {
  try {
    const isAdmin = await window.initAdminControlCenter();

    if (!isAdmin) {
      alert("Akses ditolak. Platform Admin sahaja.");
      go("home");
      return;
    }

    go("admin");
    await window.loadAdminDashboard();

  } catch (error) {
    console.error("Open Admin failed:", error);
    alert("Gagal membuka Admin Control Center.");
    go("home");
  }
};

console.log("KARDRIVER ADMIN MODULE READY");
