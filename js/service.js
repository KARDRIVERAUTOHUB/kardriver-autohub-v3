(function(){
  const STORAGE_KEY = "kardriver_autohub_services_v1";
  const VEHICLE_KEY = "kardriver_autohub_vehicles_v1";

  function getServices(){
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch(error) {
      console.error("Service storage error:", error);
      return [];
    }
  }

  function getVehicles(){
    const store = window.KarDriverVehicleStore;
    if(store && typeof store.getVehicles === "function"){
      return store.getVehicles();
    }

    try {
      const data = JSON.parse(localStorage.getItem(VEHICLE_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch(error) {
      return [];
    }
  }

  function saveServices(data){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function escapeHTML(value){
    return String(value ?? "").replace(/[&<>"']/g, c =>
      ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]
    );
  }

  function getVehicleLabel(car){
    return `${car.brand || ""} ${car.model || ""}`.trim() +
      (car.registration ? " - " + car.registration : "");
  }

  function renderService(){
    const vehicleSelect = document.getElementById("serviceVehicle");
    const list = document.getElementById("serviceRecordList");
    if(!vehicleSelect || !list) return;

    const vehicles = getVehicles();
    const activeVehicles = vehicles.filter(car => car.archived !== true && car.vehicleId);
    const selected = vehicleSelect.value;

    vehicleSelect.innerHTML =
      '<option value="">Pilih kereta dari My Garage</option>' +
      activeVehicles.map(car =>
        `<option value="${escapeHTML(car.vehicleId)}">${escapeHTML(getVehicleLabel(car))}</option>`
      ).join("");

    if(activeVehicles.some(car => car.vehicleId === selected)){
      vehicleSelect.value = selected;
    }

    const records = getServices();

    if(!records.length){
      list.innerHTML = '<div class="garage-empty">Belum ada rekod servis.</div>';
      return;
    }

    const vehiclesById = new Map(
      vehicles.filter(car => car.vehicleId).map(car => [car.vehicleId, car])
    );
    const filter = window.dashboardServiceFilter || "all";

    const filteredRecords = records.map((record,index) => ({record,index}))
      .filter(({record}) => {
        const verified = record.vehicleId &&
          record.vehicleLinkStatus === "verified";
        if(!verified) return filter === "all";

        const car = vehiclesById.get(record.vehicleId);
        if(!car || car.archived === true) return filter === "all";

        if(record.nextMileage === "" || record.nextMileage == null){
          return filter === "all";
        }

        const remaining = Number(record.nextMileage) - Number(car.mileage || 0);
        if(filter === "overdue") return remaining <= 0;
        if(filter === "upcoming") return remaining > 0 && remaining <= 1000;
        return true;
      });

    if(!filteredRecords.length){
      list.innerHTML = '<div class="garage-empty">Tiada rekod untuk kategori ini.</div>';
      return;
    }

    list.innerHTML = filteredRecords.map(({record,index}) => {
      const verified = Boolean(
        record.vehicleId && record.vehicleLinkStatus === "verified"
      );
      const car = verified ? vehiclesById.get(record.vehicleId) : null;
      const linked = verified && Boolean(car);
      const remaining = linked
        ? Number(record.nextMileage) - Number(car.mileage || 0)
        : null;

      let reminder = "BELUM DISAHKAN — TIADA PERINGATAN";
      let alertColor = "#ffc857";

      if(linked && car.archived === true){
        reminder = "KENDERAAN DIARKIBKAN — SEJARAH DIKEKALKAN";
        alertColor = "#9bb9cc";
      } else if(linked){
        reminder = "TIADA JADUAL SERVIS";
        alertColor = "#9bb9cc";

        if(record.nextMileage !== "" && record.nextMileage != null){
          if(remaining <= 0){
            reminder = "SERVIS LEWAT / PERLU DIBUAT";
            alertColor = "#ff6878";
          } else if(remaining <= 1000){
            reminder = "HAMPIR SERVIS — BAKI " +
              remaining.toLocaleString("en-US") + " KM";
            alertColor = "#ffc857";
          } else {
            reminder = "NORMAL — BAKI " +
              remaining.toLocaleString("en-US") + " KM";
            alertColor = "#48e0a0";
          }
        }
      }

      const vehicleName = linked
        ? escapeHTML(getVehicleLabel(car))
        : "BELUM DISAHKAN";

      const manualLinkUI = linked ? "" : `
        <div class="card">
          <strong style="color:#ffc857">REKOD BELUM DISAHKAN</strong>
          <p class="muted">Pilih kenderaan yang betul berdasarkan sejarah sebenar. Sistem tidak membuat padanan automatik.</p>
          <select id="serviceLinkVehicle${index}">
            <option value="">Pilih kenderaan untuk dipautkan</option>
            ${activeVehicles.map(vehicle =>
              `<option value="${escapeHTML(vehicle.vehicleId)}">${escapeHTML(getVehicleLabel(vehicle))}</option>`
            ).join("")}
          </select>
          <button class="action" onclick="linkServiceRecord(${index})">
            PAUTKAN SECARA MANUAL
          </button>
        </div>`;

      return `
        <div class="card">
          <h3>${escapeHTML(record.type || "Servis")}</h3>
          <div class="muted">
            Kenderaan: ${vehicleName}<br>
            Tarikh: ${escapeHTML(record.date || "-")}<br>
            Mileage servis: ${Number(record.mileage || 0).toLocaleString("en-US")} KM<br>
            Kos: RM ${Number(record.cost || 0).toFixed(2)}<br>
            Servis seterusnya: ${record.nextMileage !== "" && record.nextMileage != null
              ? Number(record.nextMileage).toLocaleString("en-US") + " KM" : "-"}<br>
            <strong style="color:${alertColor}">${reminder}</strong><br>
            Catatan: ${escapeHTML(record.notes || "-")}
          </div>
          ${manualLinkUI}
          <button class="action" onclick="deleteServiceRecord(${index})">PADAM REKOD</button>
        </div>`;
    }).join("");
  }

  window.addServiceRecord = function(){
    const vehicleId = document.getElementById("serviceVehicle").value;
    const vehicles = getVehicles();
    const car = vehicles.find(vehicle =>
      vehicle.vehicleId === vehicleId && vehicle.archived !== true
    );

    if(!vehicleId || !car){
      alert("Sila pilih kenderaan aktif yang mempunyai ID dalam My Garage.");
      return;
    }

    const type = document.getElementById("serviceType").value;
    const date = document.getElementById("serviceDate").value;
    const mileage = document.getElementById("serviceMileage").value;
    const cost = document.getElementById("serviceCost").value;
    const nextMileage = document.getElementById("serviceNextMileage").value;
    const notes = document.getElementById("serviceNotes").value.trim();

    if(!date || mileage === ""){
      alert("Sila isi tarikh dan mileage servis.");
      return;
    }

    if(nextMileage !== "" && Number(nextMileage) <= Number(mileage)){
      alert("Mileage servis seterusnya mesti lebih tinggi daripada mileage semasa servis.");
      return;
    }

    try {
      const records = getServices();

      records.push({
        vehicleId,
        vehicleLinkStatus: "verified",
        type,
        date,
        mileage: Number(mileage),
        cost: Number(cost || 0),
        nextMileage: nextMileage === "" ? "" : Number(nextMileage),
        notes,
        createdAt: new Date().toISOString()
      });

      saveServices(records);
      document.getElementById("serviceForm").reset();
      renderService();
      if(window.renderDashboard) window.renderDashboard();
      alert("Rekod servis berjaya disimpan!");
    } catch(error) {
      alert("Gagal menyimpan rekod servis. Semak storan telefon.");
      console.error(error);
    }
  };

  window.linkServiceRecord = function(index){
    const select = document.getElementById("serviceLinkVehicle" + index);
    const vehicleId = select?.value;

    if(!vehicleId){
      alert("Sila pilih kenderaan terlebih dahulu.");
      return;
    }

    const store = window.KarDriverVehicleStore;
    if(!store || typeof store.linkLegacyService !== "function"){
      alert("Fungsi pautan manual Vehicle Store tidak tersedia.");
      return;
    }

    if(!confirm("Sahkan bahawa rekod servis ini memang milik kenderaan yang dipilih?")){
      return;
    }

    try {
      const result = store.linkLegacyService(Number(index), vehicleId);
      if(!result){
        alert("Pautan gagal. Semak rekod dan kenderaan.");
        return;
      }

      renderService();
      if(window.renderDashboard) window.renderDashboard();
      alert("Rekod servis berjaya dipautkan.");
    } catch(error) {
      alert("Gagal memautkan rekod: " + error.message);
      console.error(error);
    }
  };

  window.deleteServiceRecord = function(index){
    if(!confirm("Anda pasti mahu memadam rekod servis ini?")) return;

    const records = getServices();
    if(!Number.isInteger(Number(index)) || index < 0 || index >= records.length){
      alert("Rekod servis tidak dijumpai.");
      return;
    }

    records.splice(Number(index),1);
    saveServices(records);
    renderService();
    if(window.renderDashboard) window.renderDashboard();
  };

  window.renderService = renderService;
})();
