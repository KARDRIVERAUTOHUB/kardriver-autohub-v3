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


    // MEMBERSHIP CONTROL CENTER
    const membershipStatus = document.getElementById("adminMembershipStatus");
    const membershipPending = document.getElementById("adminMembershipPending");
    const membershipActive = document.getElementById("adminMembershipActive");
    const membershipList = document.getElementById("adminMembershipRequestList");

    try {
      const membershipData = await window.firebaseAdminGetMembershipRequests();
      membershipPending.textContent = membershipData.pending;
      const now = Date.now();
      membershipActive.textContent = data.users.filter(user => {
        if (
          user.membershipStatus !== "ACTIVE" ||
          !["PRO", "MASTERCLASS_ELITE"].includes(user.membership)
        ) return false;

        const expiry = user.membershipExpiresAt;
        const expiryMillis =
          expiry?.toMillis?.() ??
          (expiry instanceof Date ? expiry.getTime() :
          typeof expiry === "string" ? Date.parse(expiry) :
          typeof expiry?.seconds === "number" ? expiry.seconds * 1000 : NaN);

        return Number.isFinite(expiryMillis) && expiryMillis > now;
      }).length;

      membershipList.replaceChildren();

      if (membershipData.requests.length === 0) {
        membershipList.appendChild(adminElement("p", "Tiada permohonan Membership."));
      } else {
        membershipData.requests.forEach(request => {
          const card = adminElement("div", null, "admin-request-card");
          const planName = request.requestedPlan === "MASTERCLASS_ELITE"
            ? "MASTERCLASS ELITE" : request.requestedPlan;

          card.appendChild(adminElement("strong", request.applicantName));
          card.appendChild(adminElement("p", request.applicantEmail || "-"));
          card.appendChild(adminElement("p", "PAKEJ: " + planName));
          card.appendChild(adminElement("p", "TEMPOH: " + request.billingCycle));
          card.appendChild(adminElement(
            "p",
            "JUMLAH: RM" + Number(request.amount).toFixed(2)
          ));
          card.appendChild(adminElement(
            "p",
            "RUJUKAN PEMBAYARAN: " + (request.paymentReference || "-")
          ));

          const requestStatus = String(request.status || "-").toUpperCase();
          const statusClass = {
            PENDING: "status-pending",
            APPROVED: "status-approved",
            REJECTED: "status-rejected"
          }[requestStatus] || "status-other";

          card.appendChild(adminElement(
            "span",
            requestStatus,
            "tag " + statusClass
          ));

          if (requestStatus === "PENDING") {
            const actions = adminElement("div", null, "admin-request-actions");
            const approve = adminElement("button", "APPROVE", "action");
            const reject = adminElement("button", "REJECT", "action");

            approve.type = "button";
            reject.type = "button";

            approve.addEventListener("click", () => {
              window.reviewAdminMembershipRequest(request.id, "APPROVED");
            });

            reject.addEventListener("click", () => {
              window.reviewAdminMembershipRequest(request.id, "REJECTED");
            });

            actions.append(approve, reject);
            card.appendChild(actions);
          }

          membershipList.appendChild(card);
        });
      }

      membershipStatus.textContent =
        "Membership requests berjaya dimuatkan. Semak rujukan pembayaran secara manual.";
    } catch (membershipError) {
      membershipStatus.textContent =
        "Gagal membaca Membership: " + membershipError.message;
      membershipPending.textContent = "—";
      membershipActive.textContent = "—";
      membershipList.textContent = "Data Membership tidak dapat dibaca.";
      console.error("Admin membership dashboard error:", membershipError);
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

        if (
          (userStatus === "ACTIVE" || userStatus === "SUSPENDED") &&
          !(userStatus === "ACTIVE" && roles.includes("OWNER"))
        ) {
          const action = userStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          const buttonText = action === "SUSPENDED" ? "SUSPEND" : "ACTIVATE";
          const button = adminElement("button", buttonText, "action");

          button.type = "button";

          if (action === "SUSPENDED") {
            button.style.background = "linear-gradient(135deg, #991B1B, #DC2626)";
            button.style.border = "1px solid #EF4444";
            button.style.color = "#FFFFFF";
            button.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.45)";
          } else {
            button.style.background = "linear-gradient(135deg, #065F46, #16A34A)";
            button.style.border = "1px solid #22C55E";
            button.style.color = "#FFFFFF";
            button.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.45)";
          }

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


// TINDAKAN APPROVE / REJECT MEMBERSHIP
window.reviewAdminMembershipRequest = async function(requestId, decision) {
  if (!window.adminState.verified) {
    alert("Akses Platform Admin diperlukan.");
    return;
  }

  const actionText = decision === "APPROVED" ? "meluluskan" : "menolak";

  if (!confirm("Adakah anda sudah menyemak rujukan pembayaran dan pasti mahu " +
      actionText + " permohonan Membership ini?")) {
    return;
  }

  try {
    const result = await window.firebaseAdminReviewMembershipRequest(
      requestId,
      decision
    );

    if (!result.success) {
      throw new Error("Tindakan tidak berjaya.");
    }

    alert("Permohonan Membership berjaya diproses: " + result.status);
    await window.loadAdminDashboard();
  } catch (error) {
    console.error("Membership review error:", error);
    alert("Gagal memproses Membership: " + error.message);
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
