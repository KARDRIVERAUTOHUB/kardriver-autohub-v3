(function(){
  const STORAGE_KEY = "kardriver_autohub_services_v1";
  const VEHICLE_KEY = "kardriver_autohub_vehicles_v1";

  function getServices(){
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(error) {
      return [];
    }
  }

  function getVehicles(){
    try {
      return JSON.parse(localStorage.getItem(VEHICLE_KEY)) || [];
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

  function renderService(){
    const vehicleSelect = document.getElementById("serviceVehicle");
    const list = document.getElementById("serviceRecordList");

    if(!vehicleSelect || !list) return;

    const vehicles = getVehicles();
    const selected = vehicleSelect.value;

    vehicleSelect.innerHTML =
      '<option value="">Pilih kereta dari My Garage</option>' +
      vehicles.map((car,index) =>
        `<option value="${index}">${escapeHTML(car.brand)} ${escapeHTML(car.model)} - ${escapeHTML(car.registration || "-")}</option>`
      ).join("");

    if(selected !== "" && vehicles[selected]){
      vehicleSelect.value = selected;
    }

    const records = getServices();

    if(!records.length){
      list.innerHTML = '<div class="garage-empty">Belum ada rekod servis.</div>';
      return;
    }

    const filter = window.dashboardServiceFilter || "all";

    const filteredRecords = records.map((record,index) => ({
      record,
      index
    })).filter(function(item){
      const record = item.record;
      const car = vehicles[Number(record.vehicleIndex)];

      if(record.nextMileage === "" || record.nextMileage == null || !car){
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
      const car = vehicles[record.vehicleIndex];
      const remaining = Number(record.nextMileage) - Number(car?.mileage || 0);
      let reminder = "TIADA JADUAL SERVIS";
      let alertColor = "#9bb9cc";

      if(record.nextMileage !== "" && record.nextMileage != null){
        if(remaining <= 0){
          reminder = "SERVIS LEWAT / PERLU DIBUAT";
          alertColor = "#ff6878";
        } else if(remaining <= 1000){
          reminder = "HAMPIR SERVIS — BAKI " + remaining.toLocaleString("en-US") + " KM";
          alertColor = "#ffc857";
        } else {
          reminder = "NORMAL — BAKI " + remaining.toLocaleString("en-US") + " KM";
          alertColor = "#48e0a0";
        }
      }

      return `
        <div class="garage-car">
          <h3>${escapeHTML(record.type)}</h3>
          <div class="garage-meta">
            Kenderaan: ${car ? escapeHTML(car.brand + " " + car.model) : "Rekod kenderaan tiada"}<br>
            Tarikh: ${escapeHTML(record.date)}<br>
            Mileage servis: ${Number(record.mileage).toLocaleString("en-US")} KM<br>
            Kos: RM ${Number(record.cost || 0).toFixed(2)}<br>
            Servis seterusnya: ${record.nextMileage ? Number(record.nextMileage).toLocaleString("en-US") + " KM" : "-"}<br>
            <strong style="color:${alertColor}">${reminder}</strong><br>
            Catatan: ${escapeHTML(record.notes || "-")}
          </div>
          <button class="garage-delete" onclick="deleteServiceRecord(${index})">PADAM REKOD</button>
        </div>`;
    }).join("");
  }

  window.addServiceRecord = function(){
    const vehicleIndex = document.getElementById("serviceVehicle").value;
    const vehicles = getVehicles();

    if(vehicleIndex === "" || !vehicles[vehicleIndex]){
      alert("Sila daftar dan pilih kereta dalam My Garage dahulu.");
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
        vehicleIndex: Number(vehicleIndex),
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

  window.deleteServiceRecord = function(index){
    if(!confirm("Anda pasti mahu memadam rekod servis ini?")) return;

    const records = getServices();
    records.splice(index,1);
    saveServices(records);
    renderService();
    if(window.renderDashboard) window.renderDashboard();
  };

  window.renderService = renderService;
})();
