(function () {
  "use strict";

  const STORAGE_KEY = "kardriver_car_health_v1";

  const COMPONENTS = [
    { id: "engine", name: "Enjin", weight: 30 },
    { id: "transmission", name: "Transmisi", weight: 20 },
    { id: "brakes", name: "Sistem brek", weight: 15 },
    { id: "tires", name: "Tayar", weight: 10 },
    { id: "battery", name: "Bateri", weight: 10 },
    { id: "cooling", name: "Sistem penyejukan", weight: 10 },
    { id: "maintenance", name: "Rekod penyelenggaraan", weight: 5 }
  ];

  function getVehicles() {
    try {
      const vehicles = JSON.parse(
        localStorage.getItem("kardriver_autohub_vehicles_v1") || "[]"
      );
      return Array.isArray(vehicles) ? vehicles : [];
    } catch (error) {
      console.error("Garage data error:", error);
      return [];
    }
  }

  function getAssessments() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return data && typeof data === "object" ? data : {};
    } catch (error) {
      console.error("Car Health data error:", error);
      return {};
    }
  }

  function calculateScore(assessment) {
    let totalWeight = 0;
    let weightedScore = 0;

    COMPONENTS.forEach(component => {
      const item = assessment[component.id];

      if (!item || !Number.isFinite(item.score)) return;
      if (item.score < 0 || item.score > 100) return;

      totalWeight += component.weight;
      weightedScore += item.score * component.weight;
    });

    return {
      score: totalWeight ? Math.round(weightedScore / totalWeight) : null,
      coverage: totalWeight
        ? Math.round((totalWeight / 100) * 100)
        : 0
    };
  }

  function scoreLabel(score) {
    if (score === null) return "Belum Dinilai";
    if (score >= 85) return "Sangat Baik";
    if (score >= 70) return "Baik";
    if (score >= 50) return "Perlu Perhatian";
    return "Perlu Pemeriksaan";
  }

  function renderCarHealth() {
    const root = document.getElementById("carHealthContent");
    if (!root) return;

    const vehicles = getVehicles();
    const assessments = getAssessments();

    if (!vehicles.length) {
      root.innerHTML = `
        <div class="card">
          <h3>Tiada kenderaan berdaftar</h3>
          <p>Daftarkan kereta dalam My Garage sebelum membuat pemeriksaan.</p>
          <button class="action" onclick="go('garage')">BUKA MY GARAGE</button>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="card">
        <label for="healthVehicle">Pilih kenderaan</label>
        <select id="healthVehicle" onchange="renderHealthAssessment()">
          ${vehicles.map((vehicle, index) => `
            <option value="${index}">
              ${escapeHTML(vehicle.brand)} ${escapeHTML(vehicle.model)}
              (${escapeHTML(vehicle.registration || "Tiada nombor")})
            </option>
          `).join("")}
        </select>
      </div>
      <div id="healthAssessment"></div>
    `;

    renderHealthAssessment();
  }

  function renderHealthAssessment() {
    const select = document.getElementById("healthVehicle");
    const root = document.getElementById("healthAssessment");
    if (!select || !root) return;

    const vehicles = getVehicles();
    const index = Number(select.value);
    const vehicle = vehicles[index];

    if (!vehicle) {
      root.textContent = "Kenderaan tidak ditemui.";
      return;
    }

    const key = String(index);
    const assessment = getAssessments()[key] || {};
    const result = calculateScore(assessment);

    root.innerHTML = `
      <div class="card health-score-card">
        <div class="eyebrow">KARDRIVER CAR HEALTH SCORE</div>
        <div class="health-score">${result.score === null ? "--" : result.score}</div>
        <h3>${scoreLabel(result.score)}</h3>
        <p>Data pemeriksaan: ${result.coverage}%</p>
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
              <select id="health-${component.id}">
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
        <button class="action" onclick="saveCarHealthAssessment()">
          SIMPAN PEMERIKSAAN
        </button>
      </div>
    `;
  }

  function saveCarHealthAssessment() {
    const select = document.getElementById("healthVehicle");
    if (!select) return;

    const index = Number(select.value);
    const vehicles = getVehicles();

    if (!Number.isInteger(index) || !vehicles[index]) {
      alert("Sila pilih kenderaan yang sah.");
      return;
    }

    const assessments = getAssessments();
    const current = assessments[String(index)] || {};

    COMPONENTS.forEach(component => {
      const field = document.getElementById("health-" + component.id);
      if (!field) return;

      if (field.value === "") {
        delete current[component.id];
      } else {
        current[component.id] = {
          score: Number(field.value),
          source: "manual",
          updatedAt: new Date().toISOString()
        };
      }
    });

    assessments[String(index)] = current;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));

    alert("Pemeriksaan Car Health berjaya disimpan.");
    renderHealthAssessment();
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  window.renderCarHealth = renderCarHealth;
  window.renderHealthAssessment = renderHealthAssessment;
  window.saveCarHealthAssessment = saveCarHealthAssessment;

  console.log("KARDRIVER CAR HEALTH MODULE READY");
})();
