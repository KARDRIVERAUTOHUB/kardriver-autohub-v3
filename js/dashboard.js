(function(){
  const VEHICLE_KEY = "kardriver_autohub_vehicles_v1";
  const SERVICE_KEY = "kardriver_autohub_services_v1";

  function readData(key){
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch(error) {
      return [];
    }
  }

  function openGarage(){
    go("garage");
  }

  function openService(filter){
    window.dashboardServiceFilter = filter;
    go("service");

    setTimeout(function(){
      const list = document.getElementById("serviceRecordList");
      if(list) list.scrollIntoView({behavior:"smooth",block:"start"});
    }, 150);
  }

  function renderDashboard(){
    const box = document.getElementById("vehicleDashboard");
    if(!box) return;

    const vehicles = readData(VEHICLE_KEY);
    const services = readData(SERVICE_KEY);

    let overdue = 0;
    let upcoming = 0;
    let totalCost = 0;

    services.forEach(function(record){
      totalCost += Number(record.cost) || 0;

      const car = vehicles[Number(record.vehicleIndex)];
      if(!car || record.nextMileage === "" || record.nextMileage == null) return;

      const remaining = Number(record.nextMileage) - Number(car.mileage || 0);

      if(remaining <= 0){
        overdue++;
      } else if(remaining <= 1000){
        upcoming++;
      }
    });

    box.innerHTML = `
      <h2>🚗 VEHICLE DASHBOARD</h2>
      <p class="muted">Ringkasan My Garage & Service Reminder</p>

      <div class="grid">
        <div class="stat dashboard-link" role="button" tabindex="0" onclick="openDashboardGarage()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDashboardGarage()}">
          <span class="muted">Jumlah Kenderaan</span>
          <strong>${vehicles.length}</strong>
          <span class="muted">My Garage ↗</span>
        </div>

        <div class="stat dashboard-link" role="button" tabindex="0" onclick="openDashboardService('all')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDashboardService('all')}">
          <span class="muted">Rekod Servis</span>
          <strong>${services.length}</strong>
          <span class="muted">Jumlah rekod ↗</span>
        </div>

        <div class="stat dashboard-link" role="button" tabindex="0" onclick="openDashboardService('overdue')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDashboardService('overdue')}">
          <span class="muted">Servis Lewat</span>
          <strong style="color:#ff6878">${overdue}</strong>
          <span class="muted">Perlu tindakan ↗</span>
        </div>

        <div class="stat dashboard-link" role="button" tabindex="0" onclick="openDashboardService('upcoming')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDashboardService('upcoming')}">
          <span class="muted">Hampir Servis</span>
          <strong style="color:#ffc857">${upcoming}</strong>
          <span class="muted">Baki 1,000 KM atau kurang ↗</span>
        </div>
      </div>

      <div class="card dashboard-link" role="button" tabindex="0" onclick="openDashboardService('all')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openDashboardService('all')}">
        <h3>💰 JUMLAH PERBELANJAAN SERVIS</h3>
        <h2 style="color:#48e0a0">RM ${totalCost.toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2})}</h2>
        <p class="muted">Berdasarkan semua rekod servis tersimpan. ↗</p>
      </div>
    `;
  }

  window.openDashboardGarage = openGarage;
  window.openDashboardService = openService;
  window.renderDashboard = renderDashboard;

  document.addEventListener("DOMContentLoaded", renderDashboard);
})();
