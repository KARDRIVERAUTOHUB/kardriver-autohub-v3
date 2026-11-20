(function () {
  "use strict";
  const views = {
    home: "COMMUNITY",
    directory: "MEMBER DIRECTORY",
    chat: "LIVE CHAT",
    market: "MARKETPLACE",
    jana: "JANA PENDAPATAN SAMPINGAN",
    donate: "DONATE",
    profile: "PROFILE"
  };

  async function loadCommunityDirectory() {
    const target = document.getElementById("communityDirectory");
    if (!target) return;

    if (typeof window.getCommunityDirectory !== "function") {
      target.innerHTML = '<div class="community-info">Sambungan direktori belum tersedia. Sila muat semula halaman.</div>';
      return;
    }

    target.innerHTML = '<div class="community-info">Memuatkan ahli...</div>';

    try {
      const members = await window.getCommunityDirectory();
      if (!document.getElementById("communityDirectory")) return;

      function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function(char) {
          return ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          })[char];
        });
      }

      function renderMembers(list) {
        if (!list.length) {
          target.innerHTML = '<div class="community-info">Tiada ahli aktif ditemui.</div>';
          return;
        }

        target.innerHTML = list.map(function(member) {
          const name = escapeHTML(member.displayName);
          const photo = typeof member.photoURL === "string" &&
            /^https:\/\//i.test(member.photoURL)
              ? escapeHTML(member.photoURL)
              : "";

          return `
            <article class="community-member-card">
              <div class="community-member-avatar">
                ${photo
                  ? `<img src="${photo}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`
                  : ""}
                <span style="${photo ? "display:none" : "display:grid"}">👤</span>
              </div>
              <div class="community-member-details">
                <strong>${name}</strong>
                <small>AHLI KARDRIVER COMMUNITY</small>
              </div>
              <span class="community-member-status">ACTIVE</span>
            </article>
          `;
        }).join("");
      }

      target.innerHTML = `
        <div class="community-directory-count">${members.length} AHLI AKTIF</div>
        <input
          id="communityDirectorySearch"
          class="community-directory-search"
          type="search"
          placeholder="Cari nama ahli..."
          aria-label="Cari nama ahli"
          autocomplete="off"
        >
        <div id="communityDirectoryResults"></div>
      `;

      const results = target.querySelector("#communityDirectoryResults");
      const search = target.querySelector("#communityDirectorySearch");

      function filterMembers() {
        const term = search.value.trim().toLocaleLowerCase();
        const filtered = members.filter(function(member) {
          return member.displayName.toLocaleLowerCase().includes(term);
        });

        if (!filtered.length) {
          results.innerHTML = '<div class="community-info">Tiada ahli sepadan dengan carian.</div>';
          return;
        }

        renderMembersInto(results, filtered);
      }

      function renderMembersInto(container, list) {
        if (!list.length) {
          container.innerHTML = '<div class="community-info">Tiada ahli aktif ditemui.</div>';
          return;
        }

        container.innerHTML = list.map(function(member) {
          const name = escapeHTML(member.displayName);
          const photo = typeof member.photoURL === "string" &&
            /^https:\/\//i.test(member.photoURL)
              ? escapeHTML(member.photoURL)
              : "";

          return `
            <article class="community-member-card">
              <div class="community-member-avatar">
                ${photo
                  ? `<img src="${photo}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`
                  : ""}
                <span style="${photo ? "display:none" : "display:grid"}">👤</span>
              </div>
              <div class="community-member-details">
                <strong>${name}</strong>
                <small>AHLI KARDRIVER COMMUNITY</small>
              </div>
              <span class="community-member-status">ACTIVE</span>
            </article>
          `;
        }).join("");
      }

      renderMembersInto(results, members);
      search.addEventListener("input", filterMembers);
    } catch (error) {
      console.error("Community Directory error:", error);
      const errorCode = String(error.code || "unknown");
      target.innerHTML = '<div class="community-info">Gagal memuatkan direktori.<br>Kod ralat: ' + errorCode.replace(/[&<>"']/g, "") + '</div>';
    }
  }

  function renderCommunityView(view) {
    const content = document.getElementById("communityContent");
    const title = document.getElementById("communityViewTitle");
    if (!content || !title) return;
    if (!Object.prototype.hasOwnProperty.call(views, view)) view = "home";
    title.textContent = views[view];
    content.innerHTML = view === "home" ? `
      <div class="community-welcome">Selamat datang ke KARDRIVER COMMUNITY.</div>
      <div class="community-grid">
        <button class="community-card" onclick="communityNavigate('directory')"><span class="community-icon">👥</span><strong>MEMBER DIRECTORY</strong><small>Kenali ahli KARDRIVER COMMUNITY</small></button>
        <button class="community-card" onclick="communityNavigate('chat')"><span class="community-icon">💬</span><strong>LIVE CHAT</strong><small>Chat pengguna dan Admin</small></button>
        <button class="community-card" onclick="communityNavigate('market')"><span class="community-icon">🛍️</span><strong>MARKETPLACE</strong><small>Jual beli semua kategori</small></button>
        <button class="community-card" onclick="communityNavigate('jana')"><span class="community-icon">🚀</span><strong>JANA PENDAPATAN SAMPINGAN</strong><small>Forex, Bonus Forex dan Affiliate</small></button>
        <button class="community-card" onclick="communityNavigate('donate')"><span class="community-icon">❤️</span><strong>DONATE</strong><small>Sumbangan komuniti</small></button>
      </div>
      <div class="community-section-title">COMMUNITY UPDATE</div>
      <div class="community-info">KARDRIVER COMMUNITY sedang dibangunkan.</div>
    ` : view === "directory" ? `
      <div class="community-info">Memuatkan senarai ahli aktif...</div>
      <div id="communityDirectory"></div>
    ` : view === "chat" ? `
      <div id="communityChat"></div>
    ` : view === "jana" ? `
      <div class="community-grid">
        <button class="community-card"><span class="community-icon">📘</span><strong>BELAJAR FOREX</strong><small>Pembelajaran forex</small></button>
        <button class="community-card"><span class="community-icon">🎁</span><strong>BONUS FOREX</strong><small>Maklumat bonus broker</small></button>
        <button class="community-card"><span class="community-icon">🤝</span><strong>AFFILIATE</strong><small>Program affiliate</small></button>
      </div>
      <div class="community-info">Modul dalam pembangunan.</div>
    ` : `
      <div class="community-info">${views[view]} sedang dibangunkan.</div>
    `;
    content.innerHTML += `<button class="community-back" onclick="communityNavigate('home')">← KEMBALI KE COMMUNITY</button>`;
    document.querySelectorAll("#communityPage .community-nav button").forEach(button => button.classList.toggle("active", button.dataset.view === view));

    if (view !== "chat" && typeof window.stopCommunityChat === "function") {
      window.stopCommunityChat();
    }

    if (view === "directory") loadCommunityDirectory();
    if (view === "chat" && typeof window.renderCommunityChat === "function") {
      window.renderCommunityChat();
    }
  }
  window.communityNavigate = renderCommunityView;
  window.openCommunity = function () {
    if (typeof window.go === "function") window.go("community");
    renderCommunityView("home");
  };
  window.closeCommunity = function () {
    if (typeof window.go === "function") window.go("home");
  };
  window.renderCommunityView = renderCommunityView;
})();
