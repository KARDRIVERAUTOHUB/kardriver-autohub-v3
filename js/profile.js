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

  if (typeof window.renderMembership === "function") {
    window.renderMembership();
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



// ======================================================
// KARDRIVER MEMBERSHIP - PROFILE DISPLAY
// ======================================================

window.renderMembership = async function() {
  const planDisplay = document.getElementById("membershipCurrentPlan");
  const statusDisplay = document.getElementById("membershipCurrentStatus");
  const expiryDisplay = document.getElementById("membershipExpiryInfo");
  const historyDisplay = document.getElementById("membershipRequestHistory");
  const planSelect = document.getElementById("membershipPlanSelect");
  const cycleSelect = document.getElementById("membershipBillingCycle");
  const priceDisplay = document.getElementById("membershipSelectedPrice");

  if (!planDisplay) return;

  function formatDate(value) {
    if (!value) return "-";
    const date = typeof value.toDate === "function"
      ? value.toDate()
      : new Date(value);

    return Number.isNaN(date.getTime())
      ? "-"
      : date.toLocaleDateString("ms-MY");
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function updatePrice() {
    if (!planSelect || !cycleSelect || !priceDisplay) return;

    const prices = {
      PRO: { MONTHLY: 29.99, YEARLY: 299 },
      MASTERCLASS_ELITE: { MONTHLY: 89.99, YEARLY: 899 }
    };

    const plan = planSelect.value;
    const cycle = cycleSelect.value;
    const amount = prices[plan]?.[cycle];

    priceDisplay.textContent = amount
      ? "RM" + amount.toFixed(2)
      : "Sila pilih pakej.";
  }

  try {
    if (typeof window.syncMembershipExpiry === "function") {
      try {
        await window.syncMembershipExpiry();
      } catch (expiryError) {
        console.warn("Membership expiry check unavailable:", expiryError);
      }
    }

    const profile = await window.firebaseGetMyMembershipProfile();

    const plan = profile.membership || "FREE";
    const status = profile.membershipStatus || "INACTIVE";

    const planNames = {
      FREE: "FREE",
      PRO: "PRO",
      MASTERCLASS_ELITE: "MASTERCLASS ELITE"
    };

    planDisplay.textContent = planNames[plan] || plan;
    statusDisplay.textContent =
      plan === "FREE"
        ? "Anda menggunakan keahlian FREE."
        : "Status keahlian: " + status;

    if (profile.membershipExpiresAt) {
      expiryDisplay.textContent =
        "Tarikh mula: " + formatDate(profile.membershipStartedAt) +
        " | Tarikh luput: " + formatDate(profile.membershipExpiresAt);
    } else {
      expiryDisplay.textContent =
        plan === "FREE"
          ? "Anda belum mempunyai langganan berbayar."
          : "Maklumat tarikh langganan belum tersedia.";
    }
  } catch (error) {
    console.error("Membership profile error:", error);
    planDisplay.textContent = "Tidak dapat dimuatkan";
    statusDisplay.textContent = "Gagal menyemak Membership. Sila cuba lagi.";
  }

  if (planSelect && cycleSelect && priceDisplay) {
    planSelect.onchange = updatePrice;
    cycleSelect.onchange = updatePrice;
    updatePrice();
  }

  if (historyDisplay && typeof window.firebaseGetMyMembershipRequests === "function") {
    try {
      const requests = await window.firebaseGetMyMembershipRequests();
      const membershipProfile = await window.firebaseGetMyMembershipProfile();

      if (!requests || requests.length === 0) {
        historyDisplay.textContent = "Belum ada sejarah permohonan Membership.";
      } else {
        historyDisplay.innerHTML = requests.map(function(request) {
          const plan = request.plan || request.requestedPlan || "-";
          const cycle = request.billingCycle || "-";
          const status = request.status || "UNKNOWN";
            const matchesCurrentMembership =
              status === "APPROVED" &&
              membershipProfile &&
              membershipProfile.membershipRequestId === request.id;

            const startedValue =
              request.startedAt ||
              (matchesCurrentMembership
                ? membershipProfile.membershipStartedAt
                : null);

            const expiryValue =
              request.expiresAt ||
              request.membershipExpiresAt ||
              (matchesCurrentMembership
                ? membershipProfile.membershipExpiresAt
                : null);
          const amount = Number(request.amount);
          const amountText = Number.isFinite(amount)
            ? "RM" + amount.toFixed(2)
            : "-";

          return `
            <div class="notice">
              <strong>${escapeHTML(plan)}</strong>
              <p>Tempoh: ${escapeHTML(cycle)}</p>
              <p>Jumlah: ${escapeHTML(amountText)}</p>
              <p>Rujukan: ${escapeHTML(request.paymentReference || "-")}</p>
              <p>Status: <strong>${escapeHTML(status)}</strong></p>
              <p>Tarikh permohonan: ${escapeHTML(formatDate(request.createdAt))}</p>
              ${status === "APPROVED"
                ? `<p>Tarikh mula: ${escapeHTML(formatDate(startedValue))}</p>
                   <p>Tarikh luput: ${escapeHTML(formatDate(expiryValue))}</p>`
                : ""}
            </div>
          `;
        }).join("");
      }
    } catch (error) {
      console.error("Membership history error:", error);
      historyDisplay.textContent = "Sejarah permohonan gagal dimuatkan.";
    }
  }
};

// Pilih pakej daripada kad Membership
window.chooseMembershipPlan = function(plan) {
  const allowedPlans = ["PRO", "MASTERCLASS_ELITE"];

  if (!allowedPlans.includes(plan)) {
    alert("Pakej Membership tidak sah.");
    return;
  }

  const planSelect = document.getElementById("membershipPlanSelect");
  const cycleSelect = document.getElementById("membershipBillingCycle");
  const form = document.getElementById("membershipRequestForm");

  if (!planSelect || !cycleSelect || !form) {
    alert("Borang Membership tidak tersedia.");
    return;
  }

  planSelect.value = plan;
  planSelect.dispatchEvent(new Event("change", { bubbles: true }));

  form.scrollIntoView({ behavior: "smooth", block: "start" });
  planSelect.focus({ preventScroll: true });
};

// Hantar permohonan Membership
window.submitMembershipRequest = async function() {
  const plan = document.getElementById("membershipPlanSelect")?.value;
  const cycle = document.getElementById("membershipBillingCycle")?.value;
  const referenceInput = document.getElementById("membershipPaymentReference");
  const statusDisplay = document.getElementById("membershipRequestStatus");
  const button = document.getElementById("membershipSubmitButton");
  const reference = referenceInput?.value.trim() || "";

  if (!plan) {
    alert("Sila pilih pakej Membership.");
    return;
  }

  if (!reference || reference.length < 4) {
    alert("Sila masukkan nombor rujukan pembayaran yang sah.");
    return;
  }

  if (typeof window.firebaseSubmitMembershipRequest !== "function") {
    alert("Fungsi permohonan Membership belum tersedia.");
    return;
  }

  if (button) button.disabled = true;
  if (statusDisplay) statusDisplay.textContent = "Sedang menghantar permohonan...";

  try {
    const result = await window.firebaseSubmitMembershipRequest(
      plan,
      cycle,
      reference
    );

    if (result && result.success) {
      if (statusDisplay) {
        statusDisplay.textContent =
          "Permohonan berjaya dihantar. Status: PENDING. Menunggu semakan Admin.";
      }

      if (referenceInput) referenceInput.value = "";

      await window.renderMembership();
    } else {
      if (statusDisplay) {
        statusDisplay.textContent =
          result?.message || "Permohonan gagal. Sila cuba lagi.";
      }
    }
  } catch (error) {
    console.error("Membership submission error:", error);
    if (statusDisplay) {
      statusDisplay.textContent =
        error.message || "Ralat menghantar permohonan.";
    }
  } finally {
    if (button) button.disabled = false;
  }
};

console.log("KARDRIVER MEMBERSHIP PROFILE READY");
