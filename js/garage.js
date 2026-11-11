(function(){
  const STORAGE_KEY = "kardriver_autohub_vehicles_v1";

  function getVehicles(){
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(error) {
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

    const vehicles = getVehicles();
    count.textContent = vehicles.length;

    if(!vehicles.length){
      list.innerHTML = '<div class="garage-empty">Belum ada kereta didaftarkan.<br>Tekan SIMPAN KERETA untuk bermula.</div>';
      return;
    }

    list.innerHTML = vehicles.map(function(car,index){
      const road = expiryStatus(car.roadtax);
      const insurance = expiryStatus(car.insurance);

      return `
        <div class="garage-car">
          <h3>${escapeHTML(car.brand)} ${escapeHTML(car.model)}</h3>
          <div class="garage-meta">
            Tahun: ${escapeHTML(car.year)}<br>
            No. pendaftaran: ${escapeHTML(car.registration || "-")}<br>
            Mileage: ${Number(car.mileage).toLocaleString("en-US")} km
          </div>
          <hr>
          <div class="garage-meta">
            <strong>ROAD TAX</strong><br>
            Tarikh tamat: ${escapeHTML(car.roadtax || "Belum diisi")}<br>
            <span style="color:${road.color}">${road.text}</span><br><br>
            <strong>INSURANS</strong><br>
            Tarikh tamat: ${escapeHTML(car.insurance || "Belum diisi")}<br>
            <span style="color:${insurance.color}">${insurance.text}</span>
          </div>
          <button class="garage-delete" onclick="deleteGarageVehicle(${index})">PADAM KERETA</button>
        </div>`;
    }).join("");
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
      vehicles.push({
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
      alert("Gagal menyimpan kereta. Sila semak ruang storan telefon.");
      console.error(error);
    }
  };

  window.deleteGarageVehicle = function(index){
    if(!confirm("Anda pasti mahu memadam rekod kereta ini?")) return;
    const vehicles = getVehicles();
    vehicles.splice(index,1);
    saveVehicles(vehicles);
    renderGarage();
    if(window.renderDashboard) window.renderDashboard();
  };

  window.renderGarage = renderGarage;
  document.addEventListener("DOMContentLoaded", renderGarage);
})();
