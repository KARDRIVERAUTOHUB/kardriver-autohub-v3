(function () {
  "use strict";
  const views = {
    home: "COMMUNITY",
    chat: "LIVE CHAT",
    market: "MARKETPLACE",
    jana: "JANA PENDAPATAN SAMPINGAN",
    donate: "DONATE",
    profile: "PROFILE"
  };
  function renderCommunityView(view) {
    const content = document.getElementById("communityContent");
    const title = document.getElementById("communityViewTitle");
    if (!content || !title) return;
    if (!Object.prototype.hasOwnProperty.call(views, view)) view = "home";
    title.textContent = views[view];
    content.innerHTML = view === "home" ? `
      <div class="community-welcome">Selamat datang ke KARDRIVER COMMUNITY.</div>
      <div class="community-grid">
        <button class="community-card" onclick="communityNavigate('chat')"><span class="community-icon">💬</span><strong>LIVE CHAT</strong><small>Chat pengguna dan Admin</small></button>
        <button class="community-card" onclick="communityNavigate('market')"><span class="community-icon">🛍️</span><strong>MARKETPLACE</strong><small>Jual beli semua kategori</small></button>
        <button class="community-card" onclick="communityNavigate('jana')"><span class="community-icon">🚀</span><strong>JANA PENDAPATAN SAMPINGAN</strong><small>Forex, Bonus Forex dan Affiliate</small></button>
        <button class="community-card" onclick="communityNavigate('donate')"><span class="community-icon">❤️</span><strong>DONATE</strong><small>Sumbangan komuniti</small></button>
      </div>
      <div class="community-section-title">COMMUNITY UPDATE</div>
      <div class="community-info">KARDRIVER COMMUNITY sedang dibangunkan.</div>
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
