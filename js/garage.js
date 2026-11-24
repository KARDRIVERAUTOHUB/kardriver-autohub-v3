(function(){
  const STORAGE_KEY = "kardriver_autohub_vehicles_v1";

  function getVehicles(){
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch(error) {
      console.error("Garage data error:", error);
      return [];
    }
  }

  function saveVehicles(vehicles){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }

  function escapeHTML(value){
    return String(value ?? "").replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function expiryStatus(date){
    if(!date) return {text:"Belum diisi",color:"#9bb9cc"};
    const today = new Date();
    today.setHours(0,0,0,0);
    const expiry = new Date(date + "T00:00:00");
    const days = Math.ceil((expiry - today) / 86400000);

    if(days < 0) return {text:"TELAH TAMAT (" + Math.abs(days) + " hari)",color:"#ff6878"};
    if(days <= 30) return {text:"HAMPIR TAMAT (" + days + " hari lagi)",color:"#ffc857"};
    return {text:"MASIH SAH (" + days + " hari lagi)",color:"#48e0a0"};
  }

  function renderGarage(){
    const list = document.getElementById("garageVehicleList");
    const count = document.getElementById("garageVehicleCount");
    if(!list || !count) return;

    const allVehicles = getVehicles();
    const active = allVehicles
      .map((car,index) => ({car,index}))
      .filter(item => item.car.archived !== true);
    const archived = allVehicles
      .map((car,index) => ({car,index}))
      .filter(item => item.car.archived === true);

    count.textContent = active.length;

    const activeHTML = active.length
      ? active.map(({car,index}) => {
          const road = expiryStatus(car.roadtax);
          const insurance = expiryStatus(car.insurance);
          const archiveButton = car.vehicleId
            ? `<button class="action" onclick="archiveGarageVehicle('${escapeHTML(car.vehicleId)}')">ARKIB KENDERAAN</button>`
            : `<p class="muted">Kenderaan lama: arkib tersedia selepas migrasi ID disahkan.</p>`;

          return `
            <div class="card">
              <h3>${escapeHTML(car.brand)} ${escapeHTML(car.model)}</h3>
              <div class="muted">
                Tahun: ${escapeHTML(car.year)}<br>
                No. pendaftaran: ${escapeHTML(car.registration || "-")}<br>
                Mileage: ${Number(car.mileage).toLocaleString("en-US")} km
              </div>
              <hr>
              <div class="muted">
                <strong>ROAD TAX</strong><br>
                Tarikh tamat: ${escapeHTML(car.roadtax || "Belum diisi")}<br>
                <span style="color:${road.color}">${road.text}</span><br><br>
                <strong>INSURANS</strong><br>
                Tarikh tamat: ${escapeHTML(car.insurance || "Belum diisi")}<br>
                <span style="color:${insurance.color}">${insurance.text}</span>
              </div>
              ${archiveButton}
            </div>`;
        }).join("")
      : '<div class="garage-empty">Belum ada kereta aktif didaftarkan.<br>Tekan SIMPAN KERETA untuk bermula.</div>';

    const archivedHTML = archived.length
      ? `
        <div class="card">
          <h3>ARKIB KENDERAAN (${archived.length})</h3>
          ${archived.map(({car}) => `
            <div class="card">
              <h3>${escapeHTML(car.brand)} ${escapeHTML(car.model)}</h3>
              <div class="muted">
                Tahun: ${escapeHTML(car.year)}<br>
                No. pendaftaran: ${escapeHTML(car.registration || "-")}<br>
                Status: DIARKIBKAN
              </div>
              ${car.vehicleId
                ? `<button class="action" onclick="restoreGarageVehicle('${escapeHTML(car.vehicleId)}')">PULIHKAN KENDERAAN</button>`
                : '<p class="muted">ID kenderaan belum tersedia.</p>'}
            </div>
          `).join("")}
        </div>`
      : "";

    list.innerHTML = activeHTML + archivedHTML;
  }

  window.addGarageVehicle = function(){
    const brand = document.getElementById("garageBrand")?.value.trim();
    const model = document.getElementById("garageModel")?.value.trim();
    const year = document.getElementById("garageYear")?.value;
    const registration = document.getElementById("garageRegistration")?.value.trim();
    const mileage = document.getElementById("garageMileage")?.value;
    const roadtax = document.getElementById("garageRoadtax")?.value || "";
    const insurance = document.getElementById("garageInsurance")?.value || "";

    if(!brand || !model || !year || mileage === ""){
      alert("Sila isi jenama, model, tahun dan mileage.");
      return;
    }

    try {
      const vehicles = getVehicles();
      const store = window.KarDriverVehicleStore;

      if(!store || typeof store.createVehicleId !== "function"){
        throw new Error("Vehicle Store belum tersedia.");
      }

      const existingIds = new Set(
        vehicles.map(vehicle => vehicle.vehicleId).filter(Boolean)
      );

      vehicles.push({
        vehicleId: store.createVehicleId(existingIds),
        archived: false,
        brand, model, year, registration,
        mileage: Math.max(0, Number(mileage)),
        roadtax, insurance,
        createdAt: new Date().toISOString()
      });

      saveVehicles(vehicles);
      document.getElementById("garageForm").reset();
      renderGarage();
      if(window.renderDashboard) window.renderDashboard();
      alert("Kereta berjaya didaftarkan!");
    } catch(error) {
      alert("Gagal menyimpan kereta. Sila semak storan telefon.");
      console.error(error);
    }
  };

  window.archiveGarageVehicle = function(vehicleId){
    if(!vehicleId) return;

    if(!confirm("Arkibkan kenderaan ini? Sejarah servis dan Car Health akan dikekalkan.")){
      return;
    }

    try {
      const store = window.KarDriverVehicleStore;
      if(!store) throw new Error("Vehicle Store belum tersedia.");

      store.archiveVehicle(vehicleId);
      renderGarage();
      if(window.renderDashboard) window.renderDashboard();
      alert("Kenderaan berjaya diarkibkan. Sejarahnya dikekalkan.");
    } catch(error) {
      alert("Gagal mengarkibkan kenderaan: " + error.message);
      console.error(error);
    }
  };

  window.restoreGarageVehicle = function(vehicleId){
    if(!vehicleId) return;

    try {
      const store = window.KarDriverVehicleStore;
      if(!store) throw new Error("Vehicle Store belum tersedia.");

      store.restoreVehicle(vehicleId);
      renderGarage();
      if(window.renderDashboard) window.renderDashboard();
      alert("Kenderaan berjaya dipulihkan.");
    } catch(error) {
      alert("Gagal memulihkan kenderaan: " + error.message);
      console.error(error);
    }
  };

  // Keserasian sementara untuk panggilan lama berasaskan indeks.
  window.deleteGarageVehicle = function(index){
    const active = getVehicles().filter(car => car.archived !== true);
    const vehicle = active[Number(index)];

    if(!vehicle || !vehicle.vehicleId){
      alert("Kenderaan lama perlu melalui migrasi ID sebelum boleh diarkibkan.");
      return;
    }

    window.archiveGarageVehicle(vehicle.vehicleId);
  };

  window.renderGarage = renderGarage;
  document.addEventListener("DOMContentLoaded", renderGarage);
})();
