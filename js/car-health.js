(function(){
  "use strict";

  const NEW_HEALTH_KEY = "kardriver_car_health_by_vehicle_v1";

  const COMPONENTS = [
    { id:"engine", name:"Enjin", weight:30 },
    { id:"transmission", name:"Transmisi", weight:20 },
    { id:"brakes", name:"Sistem brek", weight:15 },
    { id:"tires", name:"Tayar", weight:10 },
    { id:"battery", name:"Bateri", weight:10 },
    { id:"cooling", name:"Sistem penyejukan", weight:10 },
    { id:"maintenance", name:"Rekod penyelenggaraan", weight:5 }
  ];

  function getStore(){
    return window.KarDriverVehicleStore || null;
  }

  function getVehicles(){
    const store = getStore();
    if(store) return store.getVehicles();

    try {
      const data = JSON.parse(
        localStorage.getItem("kardriver_autohub_vehicles_v1") || "[]"
      );
      return Array.isArray(data) ? data : [];
    } catch(error) {
      return [];
    }
  }

  function getHealthById(){
    const store = getStore();
    if(store && typeof store.getHealthByVehicleId === "function"){
      return store.getHealthByVehicleId();
    }

    try {
      const data = JSON.parse(localStorage.getItem(NEW_HEALTH_KEY) || "{}");
      return data && typeof data === "object" ? data : {};
    } catch(error) {
      return {};
    }
  }

  function getLegacyHealth(){
    const store = getStore();
    if(store && typeof store.getLegacyHealth === "function"){
      return store.getLegacyHealth();
    }

    try {
      const data = JSON.parse(
        localStorage.getItem("kardriver_car_health_v1") || "{}"
      );
      return data && typeof data === "object" ? data : {};
    } catch(error) {
      return {};
    }
  }

  function escapeHTML(value){
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#39;"
    })[character]);
  }

  function calculateScore(assessment){
    let totalWeight = 0;
    let weightedScore = 0;

    COMPONENTS.forEach(component => {
      const item = assessment?.[component.id];
      if(!item || !Number.isFinite(item.score)) return;
      if(item.score < 0 || item.score > 100) return;

      totalWeight += component.weight;
      weightedScore += item.score * component.weight;
    });

    return {
      score: totalWeight
        ? Math.round(weightedScore / totalWeight)
        : null,
      coverage: totalWeight
    };
  }

  function scoreLabel(score){
    if(score === null) return "Belum Dinilai";
    if(score >= 85) return "Sangat Baik";
    if(score >= 70) return "Baik";
    if(score >= 50) return "Perlu Perhatian";
    return "Perlu Pemeriksaan";
  }

  function vehicleLabel(vehicle){
    return `${vehicle.brand || ""} ${vehicle.model || ""}`.trim() +
      (vehicle.registration ? " (" + vehicle.registration + ")" : "");
  }

  function renderCarHealth(){
    const root = document.getElementById("carHealthContent");
    if(!root) return;

    const vehicles = getVehicles();
    const activeVehicles = vehicles.filter(vehicle =>
      vehicle.archived !== true && vehicle.vehicleId
    );
    const allIdVehicles = vehicles.filter(vehicle => vehicle.vehicleId);

    if(!allIdVehicles.length){
      root.innerHTML = `
        <div class="card">
          <h3>Tiada kenderaan dengan ID tersedia</h3>
          <p>Daftarkan kenderaan atau lengkapkan migrasi ID sebelum menggunakan Car Health.</p>
          <button class="action" onclick="go('garage')">BUKA MY GARAGE</button>
        </div>`;
      return;
    }

    const healthById = getHealthById();
    const legacy = getLegacyHealth();
    const linkedLegacyKeys = new Set(
      Object.values(healthById)
        .filter(item => item && item._legacySourceIndex !== undefined)
        .map(item => String(item._legacySourceIndex))
    );

    const legacyKeys = Object.keys(legacy).filter(key =>
      !linkedLegacyKeys.has(String(key))
    );

    root.innerHTML = `
      ${legacyKeys.length ? `
        <div class="card">
          <h3>SEJARAH CAR HEALTH LAMA</h3>
          <p class="muted">
            Penilaian terdahulu dikekalkan. Pilih sendiri kenderaan yang betul
            sebelum memindahkan salinan penilaian.
          </p>
          ${legacyKeys.map(key => {
            const assessment = legacy[key] || {};
            const result = calculateScore(assessment);
            const availableVehicles = allIdVehicles.filter(vehicle =>
              !Object.prototype.hasOwnProperty.call(healthById, vehicle.vehicleId)
            );

            return `
              <div class="card">
                <strong>Penilaian lama #${escapeHTML(key)}</strong>
                <h3>${result.score === null ? "--" : result.score} / 100</h3>
                <p class="muted">
                  ${scoreLabel(result.score)} · Liputan ${result.coverage}%
                </p>
                <label for="legacyHealthVehicle${escapeHTML(key)}">
                  Pilih kenderaan yang sepadan
                </label>
                <select id="legacyHealthVehicle${escapeHTML(key)}">
                  <option value="">Pilih kenderaan</option>
                  ${availableVehicles.map(vehicle => `
                    <option value="${escapeHTML(vehicle.vehicleId)}">
                      ${escapeHTML(vehicleLabel(vehicle))}
                      ${vehicle.archived === true ? " (Arkib)" : ""}
                    </option>
                  `).join("")}
                </select>
                <button class="action"
                  onclick="linkLegacyHealthFromUI('${escapeHTML(key)}')">
                  PAUTKAN PENILAIAN LAMA
                </button>
              </div>`;
          }).join("")}
        </div>
      ` : ""}

      <div class="card">
        <label for="healthVehicle">Pilih kenderaan</label>
        <select id="healthVehicle" onchange="renderHealthAssessment()">
          ${allIdVehicles.map(vehicle => `
            <option value="${escapeHTML(vehicle.vehicleId)}">
              ${escapeHTML(vehicleLabel(vehicle))}
              ${vehicle.archived === true ? " (Arkib)" : ""}
            </option>
          `).join("")}
        </select>
      </div>
      <div id="healthAssessment"></div>
    `;

    renderHealthAssessment();
  }

  function renderHealthAssessment(){
    const select = document.getElementById("healthVehicle");
    const root = document.getElementById("healthAssessment");
    if(!select || !root) return;

    const vehicleId = select.value;
    const vehicle = getVehicles().find(item =>
      item.vehicleId === vehicleId
    );

    if(!vehicle){
      root.textContent = "Kenderaan tidak ditemui.";
      return;
    }

    const assessment = getHealthById()[vehicleId] || {};
    const result = calculateScore(assessment);
    const archived = vehicle.archived === true;

    root.innerHTML = `
      <div class="card health-score-card">
        <div class="eyebrow">KARDRIVER CAR HEALTH SCORE</div>
        <div class="health-score">
          ${result.score === null ? "--" : result.score}
        </div>
        <h3>${scoreLabel(result.score)}</h3>
        <p>Data pemeriksaan: ${result.coverage}%</p>
        ${archived ? '<p class="muted">Kenderaan diarkibkan. Sejarah dipaparkan sahaja.</p>' : ""}
        <p class="health-disclaimer">
          Skor ini ialah penilaian awal berdasarkan maklumat yang dimasukkan,
          bukan diagnosis muktamad atau pemeriksaan keselamatan rasmi.
        </p>
      </div>

      <div class="card">
        <h3>PEMERIKSAAN KENDERAAN</h3>
        <p>Pilih skor berdasarkan keadaan yang diperiksa.</p>
        ${COMPONENTS.map(component => {
          const current = assessment[component.id];
          return `
            <div class="health-item">
              <label for="health-${component.id}">
                ${component.name} (${component.weight}%)
              </label>
              <select id="health-${component.id}" ${archived ? "disabled" : ""}>
                <option value="">Belum Dinilai</option>
                <option value="100" ${current?.score === 100 ? "selected" : ""}>100 - Sangat baik</option>
                <option value="85" ${current?.score === 85 ? "selected" : ""}>85 - Baik</option>
                <option value="70" ${current?.score === 70 ? "selected" : ""}>70 - Memuaskan</option>
                <option value="50" ${current?.score === 50 ? "selected" : ""}>50 - Perlu perhatian</option>
                <option value="25" ${current?.score === 25 ? "selected" : ""}>25 - Lemah</option>
                <option value="0" ${current?.score === 0 ? "selected" : ""}>0 - Kritikal</option>
              </select>
            </div>`;
        }).join("")}
        ${archived ? "" : `
          <button class="action" onclick="saveCarHealthAssessment()">
            SIMPAN PEMERIKSAAN
          </button>
        `}
      </div>`;
  }

  function saveCarHealthAssessment(){
    const select = document.getElementById("healthVehicle");
    if(!select) return;

    const vehicleId = select.value;
    const vehicle = getVehicles().find(item =>
      item.vehicleId === vehicleId && item.archived !== true
    );

    if(!vehicle){
      alert("Sila pilih kenderaan aktif yang sah.");
      return;
    }

    const healthById = getHealthById();
    const current = healthById[vehicleId] || {};

    COMPONENTS.forEach(component => {
      const field = document.getElementById("health-" + component.id);
      if(!field) return;

      if(field.value === ""){
        delete current[component.id];
      } else {
        current[component.id] = {
          score: Number(field.value),
          source: "manual",
          updatedAt: new Date().toISOString()
        };
      }
    });

    try {
      healthById[vehicleId] = current;
      localStorage.setItem(NEW_HEALTH_KEY, JSON.stringify(healthById));
      alert("Pemeriksaan Car Health berjaya disimpan.");
      renderHealthAssessment();
    } catch(error) {
      alert("Gagal menyimpan pemeriksaan. Semak storan telefon.");
      console.error(error);
    }
  }

  function linkLegacyHealthFromUI(legacyKey){
    const select = document.getElementById("legacyHealthVehicle" + legacyKey);
    const vehicleId = select?.value;

    if(!vehicleId){
      alert("Sila pilih kenderaan terlebih dahulu.");
      return;
    }

    const store = getStore();
    if(!store || typeof store.linkLegacyHealth !== "function"){
      alert("Fungsi pautan manual Vehicle Store tidak tersedia.");
      return;
    }

    if(!confirm("Sahkan bahawa penilaian lama ini memang milik kenderaan yang dipilih?")){
      return;
    }

    try {
      store.linkLegacyHealth(legacyKey, vehicleId);
      renderCarHealth();
      alert("Salinan penilaian lama berjaya dipautkan. Rekod asal dikekalkan.");
    } catch(error) {
      alert("Gagal memautkan penilaian: " + error.message);
      console.error(error);
    }
  }

  window.renderCarHealth = renderCarHealth;
  window.renderHealthAssessment = renderHealthAssessment;
  window.saveCarHealthAssessment = saveCarHealthAssessment;
  window.linkLegacyHealthFromUI = linkLegacyHealthFromUI;

  console.log("KARDRIVER CAR HEALTH MODULE READY");
})();
