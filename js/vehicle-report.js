(function () {
  "use strict";

  const KEYS = {
    vehicles: "kardriver_autohub_vehicles_v1",
    services: "kardriver_autohub_services_v1",
    health: "kardriver_car_health_v1"
  };

  function read(key, fallback) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
      return data ?? fallback;
    } catch (error) {
      console.error("Vehicle Report read error:", key, error);
      return fallback;
    }
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#39;"
    })[c]);
  }

  function money(value) {
    return "RM " + (Number(value) || 0).toLocaleString("en-MY", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function renderVehicleReport() {
    const root = document.getElementById("vehicleReportContent");
    if (!root) return;

    const vehicles = read(KEYS.vehicles, []);
    const services = read(KEYS.services, []);
    const health = read(KEYS.health, {});

    if (!vehicles.length) {
      root.innerHTML = `
        <div class="card">
          <h3>Tiada kenderaan berdaftar</h3>
          <p>Daftarkan kenderaan melalui My Garage untuk menjana laporan.</p>
          <button class="action" onclick="go('garage')">BUKA MY GARAGE</button>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="card">
        <label for="reportVehicle">PILIH KENDERAAN</label>
        <select id="reportVehicle" onchange="renderSelectedVehicleReport()">
          ${vehicles.map((car, index) => `
            <option value="${index}">
              ${escapeHTML(car.brand)} ${escapeHTML(car.model)}
              - ${escapeHTML(car.registration || "Tiada nombor")}
            </option>
          `).join("")}
        </select>
      </div>
      <div id="selectedVehicleReport"></div>`;

    renderSelectedVehicleReport();
  }

  function renderSelectedVehicleReport() {
    const select = document.getElementById("reportVehicle");
    const root = document.getElementById("selectedVehicleReport");
    if (!select || !root) return;

    const vehicles = read(KEYS.vehicles, []);
    const services = read(KEYS.services, []);
    const health = read(KEYS.health, {});
    const index = Number(select.value);
    const car = vehicles[index];

    if (!Number.isInteger(index) || !car) {
      root.textContent = "Rekod kenderaan tidak ditemui.";
      return;
    }

    const records = services
      .map((record, originalIndex) => ({ record, originalIndex }))
      .filter(item => Number(item.record.vehicleIndex) === index)
      .sort((a, b) => String(b.record.date || "").localeCompare(String(a.record.date || "")));

    const totalCost = records.reduce(
      (sum, item) => sum + (Number(item.record.cost) || 0), 0
    );

    const assessment = health[String(index)] || {};
    const weights = {
      engine: 30, transmission: 20, brakes: 15,
      tires: 10, battery: 10, cooling: 10, maintenance: 5
    };

    let totalWeight = 0;
    let weightedScore = 0;

    Object.entries(weights).forEach(([key, weight]) => {
      const score = assessment[key]?.score;
      if (Number.isFinite(score) && score >= 0 && score <= 100) {
        totalWeight += weight;
        weightedScore += score * weight;
      }
    });

    const score = totalWeight ? Math.round(weightedScore / totalWeight) : null;
    const coverage = totalWeight;
    const scoreLabel = score === null ? "Belum Dinilai"
      : score >= 85 ? "Sangat Baik"
      : score >= 70 ? "Baik"
      : score >= 50 ? "Perlu Perhatian"
      : "Perlu Pemeriksaan";

    root.innerHTML = `
      <div class="card">
        <div class="eyebrow">KARDRIVER VEHICLE REPORT</div>
        <h2>${escapeHTML(car.brand)} ${escapeHTML(car.model)}</h2>
        <div class="garage-meta">
          Tahun: ${escapeHTML(car.year || "-")}<br>
          No. pendaftaran: ${escapeHTML(car.registration || "-")}<br>
          Mileage: ${(Number(car.mileage) || 0).toLocaleString("en-MY")} KM<br>
          Road Tax: ${escapeHTML(car.roadtax || "Belum diisi")}<br>
          Insurans: ${escapeHTML(car.insurance || "Belum diisi")}
        </div>
      </div>

      <div class="grid">
        <div class="stat">
          <span class="muted">REKOD SERVIS</span>
          <strong>${records.length}</strong>
        </div>
        <div class="stat">
          <span class="muted">KOS SERVIS</span>
          <strong>${money(totalCost)}</strong>
        </div>
        <div class="stat">
          <span class="muted">CAR HEALTH</span>
          <strong>${score === null ? "--" : score}</strong>
          <span class="muted">${scoreLabel}</span>
        </div>
        <div class="stat">
          <span class="muted">LIPUTAN PENILAIAN</span>
          <strong>${coverage}%</strong>
        </div>
      </div>

      <div class="card">
        <h3>SEJARAH SERVIS</h3>
        ${records.length ? records.map(({ record }) => `
          <div class="garage-car">
            <h4>${escapeHTML(record.type || "Servis")}</h4>
            <div class="garage-meta">
              Tarikh: ${escapeHTML(record.date || "-")}<br>
              Mileage: ${(Number(record.mileage) || 0).toLocaleString("en-MY")} KM<br>
              Kos: ${money(record.cost)}<br>
              Servis seterusnya: ${record.nextMileage === "" || record.nextMileage == null
                ? "-" : Number(record.nextMileage).toLocaleString("en-MY") + " KM"}<br>
              Catatan: ${escapeHTML(record.notes || "-")}
            </div>
          </div>
        `).join("") : '<p class="muted">Belum ada rekod servis untuk kenderaan ini.</p>'}
      </div>

      <div class="card">
        <h3>CAR HEALTH ASSESSMENT</h3>
        <h2>${score === null ? "--" : score + " / 100"}</h2>
        <p>${scoreLabel} · Liputan penilaian ${coverage}%</p>
        <p class="muted">Berdasarkan penilaian manual yang disimpan.</p>
        <p class="muted">OBD2: Sejarah scan belum tersedia dalam storan projek.</p>
      </div>

      <div class="card">
        <p class="muted">Laporan dijana daripada rekod tempatan KARDRIVER AUTOHUB pada ${new Date().toLocaleString("ms-MY")}.</p>
        <button class="action" onclick="window.print()">CETAK / SIMPAN PDF</button>
      </div>`;
  }

  window.renderVehicleReport = renderVehicleReport;
  window.renderSelectedVehicleReport = renderSelectedVehicleReport;

  console.log("KARDRIVER VEHICLE REPORT MODULE READY");
})();
