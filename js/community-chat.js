(function () {
  "use strict";

  const CHANNELS = [
    { id: "general", name: "#general", description: "Perbualan umum" },
    { id: "automotive", name: "#automotive", description: "Komuniti automotif" },
    { id: "mechanic", name: "#mechanic", description: "Teknikal dan mekanik" },
    { id: "forex", name: "#forex", description: "Forex dan trading" }
  ];

  let activeChannel = "general";
  let unsubscribeMessages = null;
  let unsubscribeDirectory = null;
  let communityMembers = [];
  let communityMemberMap = new Map();
  let currentMessages = [];
  let subscriptionVersion = 0;
  let sending = false;
  let authListenerReady = false;

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function setConnectionStatus(status, message) {
    const root = document.getElementById("communityChat");
    const element = root?.querySelector(".kchat-connection-status");
    if (!element) return;
    const detail = status === "ERROR" && message
      ? String(message).slice(0, 120)
      : status;
    element.innerHTML = `<i></i> ${escapeHTML(detail)}`;
    element.title = message || status;
    element.dataset.status = status;
  }

  function renderChannelList() {
    return CHANNELS.map(function (channel) {
      return `
        <button type="button"
          class="kchat-channel ${channel.id === activeChannel ? "active" : ""}"
          data-channel="${channel.id}">
          <span>${escapeHTML(channel.name)}</span>
          <small>${escapeHTML(channel.description)}</small>
        </button>
      `;
    }).join("");
  }

  function renderMessages(messages) {
    const area = document.getElementById("kchatMessages");
    if (!area) return;

    if (!messages.length) {
      area.innerHTML = `
        <div class="kchat-welcome">
          <div class="kchat-welcome-icon">✦</div>
          <strong>WELCOME TO ${escapeHTML("#" + activeChannel)}</strong>
          <p>Ruang perbualan KARDRIVER COMMUNITY.</p>
          <small>Belum ada mesej. Mulakan perbualan.</small>
        </div>`;
      return;
    }

    area.innerHTML = messages.map(function (message) {
      let time = "";
      if (message.createdAt && typeof message.createdAt.toDate === "function") {
        time = message.createdAt.toDate().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });
      }

      const member = communityMemberMap.get(message.senderUid);
      const senderName = member?.displayName || message.senderName || "Pengguna";
      const badge = member?.badge || null;
      const badgeHTML = badge
        ? `<span class="kchat-role-badge ${badge === "SuperAdmin" ? "kchat-badge-superadmin" : "kchat-badge-admin"}">${escapeHTML(badge)}</span>`
        : "";

      return `
        <article class="kchat-message" data-message-id="${escapeHTML(message.id)}">
          <div class="kchat-message-meta">
            <strong>${escapeHTML(senderName)}</strong>
            ${badgeHTML}
            <time>${escapeHTML(time)}</time>
          </div>
          <div class="kchat-message-text">${escapeHTML(message.text)}</div>
        </article>`;
    }).join("");

    area.scrollTop = area.scrollHeight;
  }

  function renderUserDirectory() {
    const list = document.getElementById("kchatUsersList");
    if (!list) return;

    if (!communityMembers.length) {
      list.innerHTML = `
        <div class="kchat-users-empty">
          <span>◎</span>
          <p>Tiada ahli aktif ditemui.</p>
        </div>`;
      return;
    }

    list.innerHTML = communityMembers.map(function(member) {
      const badge = member.badge;
      const badgeHTML = badge
        ? `<span class="kchat-role-badge ${badge === "SuperAdmin" ? "kchat-badge-superadmin" : "kchat-badge-admin"}">${escapeHTML(badge)}</span>`
        : "";

      return `
        <div class="kchat-user-item" data-uid="${escapeHTML(member.uid)}">
          <span class="kchat-user-indicator" aria-hidden="true">●</span>
          <span class="kchat-user-name">${escapeHTML(member.displayName || "Pengguna")}</span>
          ${badgeHTML}
        </div>`;
    }).join("");
  }

  function stopSubscription() {
    subscriptionVersion++;

    if (typeof unsubscribeMessages === "function") {
      unsubscribeMessages();
      unsubscribeMessages = null;
    }

    if (typeof unsubscribeDirectory === "function") {
      unsubscribeDirectory();
      unsubscribeDirectory = null;
    }

    currentMessages = [];
  }

  function setComposerEnabled(enabled) {
    const root = document.getElementById("communityChat");
    const input = root?.querySelector("#kchatMessageInput");
    const button = root?.querySelector("#kchatComposer button[type='submit']");
    if (input) input.disabled = !enabled;
    if (button) button.disabled = !enabled;
  }

  async function connectChannel() {
    const root = document.getElementById("communityChat");
    if (!root) return;

    stopSubscription();
    const version = subscriptionVersion;

    renderMessages([]);
    setComposerEnabled(false);

    if (typeof window.firebaseChatSubscribe !== "function") {
      setConnectionStatus("WAITING", "Menunggu Firebase API.");
      return;
    }

    if (typeof window.getFirebaseUser === "function" &&
        !window.getFirebaseUser()) {
      setConnectionStatus("LOGIN REQUIRED", "Sila login untuk menggunakan LIVE CHAT.");
      return;
    }

    setConnectionStatus("CONNECTING", "Menyambung ke Firestore...");

    try {
      if (typeof window.subscribeCommunityDirectory === "function") {
        unsubscribeDirectory = window.subscribeCommunityDirectory(
          function(members) {
            if (version !== subscriptionVersion) return;
            if (!document.getElementById("communityChat")) return;

            communityMembers = members;
            communityMemberMap = new Map(
              communityMembers.map(member => [member.uid, member])
            );

            renderUserDirectory();
            renderMessages(currentMessages);
          },
          function(error) {
            if (version !== subscriptionVersion) return;
            console.error("COMMUNITY DIRECTORY realtime error:", error);
          }
        );
      } else if (typeof window.getCommunityDirectory === "function") {
        communityMembers = await window.getCommunityDirectory();
        communityMemberMap = new Map(
          communityMembers.map(member => [member.uid, member])
        );
        renderUserDirectory();
      }

      const unsubscribe = await window.firebaseChatSubscribe(
        activeChannel,
        function (messages) {
          if (version !== subscriptionVersion) return;
          if (!document.getElementById("communityChat")) return;
          currentMessages = messages;
          renderMessages(currentMessages);
          setConnectionStatus("CONNECTED", "Sambungan realtime aktif.");
          setComposerEnabled(true);
        },
        function (error) {
          if (version !== subscriptionVersion) return;
          console.error("LIVE CHAT realtime error:", error);
          setConnectionStatus("ERROR", (error.code || "unknown") + ": " + (error.message || "Ralat tidak diketahui"));
          setComposerEnabled(false);
        }
      );

      if (version !== subscriptionVersion) {
        if (typeof unsubscribe === "function") unsubscribe();
        return;
      }

      unsubscribeMessages = unsubscribe;
    } catch (error) {
      if (version !== subscriptionVersion) return;
      console.error("LIVE CHAT connection failed:", error);
      setConnectionStatus("ERROR", (error.code || "unknown") + ": " + (error.message || "Sambungan gagal"));
      setComposerEnabled(false);
    }
  }

  async function sendMessage(event) {
    event.preventDefault();
    if (sending) return;

    const root = document.getElementById("communityChat");
    const input = root?.querySelector("#kchatMessageInput");
    const text = input?.value.trim();

    if (!text) return;

    if (typeof window.firebaseChatSendMessage !== "function") {
      setConnectionStatus("ERROR", "Firebase Chat API belum tersedia.");
      return;
    }

    sending = true;
    setComposerEnabled(false);

    try {
      await window.firebaseChatSendMessage(activeChannel, text);
      if (input) input.value = "";
    } catch (error) {
      console.error("LIVE CHAT send failed:", error);
      alert("Mesej gagal dihantar: " + (error.message || "Ralat tidak diketahui."));
    } finally {
      sending = false;
      if (document.getElementById("communityChat")) {
        setComposerEnabled(Boolean(unsubscribeMessages));
      }
    }
  }

  function attachAuthListener() {
    if (authListenerReady) return;
    authListenerReady = true;

    window.addEventListener("kardriverAuthStateChanged", function (event) {
      const status = event.detail?.status;

      if (status === "UNAUTHENTICATED") {
        stopSubscription();
        setConnectionStatus("LOGIN REQUIRED", "Sesi login telah tamat.");
        setComposerEnabled(false);
      } else if (status === "AUTHENTICATED") {
        if (document.getElementById("communityChat")) {
          connectChannel();
        }
      }
    });
  }

  function renderChat() {
    const root = document.getElementById("communityChat");
    if (!root) return;

    stopSubscription();
    attachAuthListener();

    const channel = CHANNELS.find(item => item.id === activeChannel);

    root.innerHTML = `
      <section class="kchat-shell" aria-label="KARDRIVER Live Chat">
        <aside class="kchat-sidebar">
          <div class="kchat-sidebar-heading">
            <span>CHANNELS</span>
            <span class="kchat-online-indicator">● LIVE</span>
          </div>
          <div class="kchat-channel-list">${renderChannelList()}</div>
          <div class="kchat-sidebar-footer">
            KARDRIVER NETWORK<br>
            <small>IRC STYLE COMMUNITY</small>
          </div>
        </aside>

        <section class="kchat-main">
          <header class="kchat-room-header">
            <div>
              <strong id="kchatRoomName">${escapeHTML(channel.name)}</strong>
              <small id="kchatRoomDescription">${escapeHTML(channel.description)}</small>
            </div>
            <span class="kchat-connection-status" data-status="CONNECTING">
              <i></i> CONNECTING
            </span>
          </header>

          <div class="kchat-message-area" id="kchatMessages">
            <div class="kchat-welcome">
              <div class="kchat-welcome-icon">✦</div>
              <strong>WELCOME TO ${escapeHTML(channel.name)}</strong>
              <p>Ruang perbualan KARDRIVER COMMUNITY.</p>
              <small>Menyediakan sambungan masa nyata...</small>
            </div>
          </div>

          <form class="kchat-composer" id="kchatComposer">
            <div class="kchat-composer-hint">
              <span>MESSAGE</span>
              <span>Gunakan /help untuk arahan</span>
            </div>
            <div class="kchat-input-row">
              <input
                id="kchatMessageInput"
                type="text"
                maxlength="3000"
                autocomplete="off"
                placeholder="Taip mesej..."
                aria-label="Mesej chat"
                disabled
              >
              <button type="submit" aria-label="Hantar mesej" disabled>➤</button>
            </div>
            <div class="kchat-notice">
              MOD: Admin sahaja · PM: Admin sahaja
            </div>
          </form>
        </section>

        <aside class="kchat-users">
          <div class="kchat-users-heading">USER LIST</div>
          <div class="kchat-users-list" id="kchatUsersList">
            <div class="kchat-users-empty">
              <span>◎</span>
              <p>Memuatkan direktori ahli...</p>
            </div>
          </div>
          <div class="kchat-users-footer">MEMBER DIRECTORY · LIVE PRESENCE COMING</div>
        </aside>
      </section>
    `;

    root.querySelectorAll("[data-channel]").forEach(function (button) {
      button.addEventListener("click", function () {
        const nextChannel = button.dataset.channel;
        if (!CHANNELS.some(item => item.id === nextChannel)) return;
        if (nextChannel === activeChannel) return;
        activeChannel = nextChannel;
        renderChat();
      });
    });

    root.querySelector("#kchatComposer").addEventListener("submit", sendMessage);

    connectChannel();
  }

  window.renderCommunityChat = renderChat;
  window.stopCommunityChat = stopSubscription;
})();
