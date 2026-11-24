const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const storage = new Map([
  ["kardriver_autohub_vehicles_v1", JSON.stringify([
    {vehicleId:"veh-A",brand:"Proton",model:"Saga",year:2022,registration:"SAB1234",mileage:50000},
    {vehicleId:"veh-B",brand:"Honda",model:"Jazz",year:2015,registration:"SAC5678",mileage:90000,archived:true}
  ])],
  ["kardriver_autohub_services_v1", JSON.stringify([
    {vehicleId:"veh-A",vehicleLinkStatus:"verified",type:"Servis A",date:"2026-01-01",cost:100},
    {vehicleId:"veh-B",vehicleLinkStatus:"verified",type:"Servis B",date:"2026-02-01",cost:200},
    {vehicleIndex:0,type:"LEGACY TIDAK DIPAUTKAN",cost:999},
    {vehicleId:"veh-A",vehicleLinkStatus:"needs_review",type:"ITEM BELUM SAH UJIAN",cost:500}
  ])],
  ["kardriver_car_health_by_vehicle_v1", JSON.stringify({
    "veh-A": {engine:{score:90}}
  })]
]);

const elements = {
  vehicleReportContent: {innerHTML:""},
  reportVehicle: {
    value:"veh-A",
    selectedIndex:0,
    options:[{textContent:"Proton Saga - SAB1234"}]
  },
  selectedVehicleReport: {innerHTML:""}
};

const context = {
  localStorage: {
    getItem:key => storage.has(key) ? storage.get(key) : null
  },
  document: {
    getElementById:id => elements[id] || null
  },
  window: {},
  console,
  Date,
  Number,
  String,
  Object,
  JSON,
  Math
};

vm.runInNewContext(
  fs.readFileSync("js/vehicle-report.js", "utf8"),
  context
);

context.window.renderVehicleReport();

let report = elements.selectedVehicleReport.innerHTML;
assert.ok(report.includes("Proton"));
assert.ok(report.includes("Servis A"));
assert.ok(!report.includes("Servis B"));
assert.ok(!report.includes("LEGACY TIDAK DIPAUTKAN"));
assert.ok(report.includes("RM 100.00"));
assert.ok(report.includes("90 / 100"));
assert.ok(report.includes("<strong>2</strong>"));

elements.reportVehicle.value = "veh-B";
context.window.renderSelectedVehicleReport();

report = elements.selectedVehicleReport.innerHTML;
assert.ok(report.includes("Honda"));
assert.ok(report.includes("Servis B"));
assert.ok(!report.includes("Servis A"));
assert.ok(report.includes("KENDERAAN DIARKIBKAN"));
assert.ok(report.includes("Belum Dinilai"));

console.log("PASS: Laporan mengikut vehicleId");
console.log("PASS: Rekod servis kenderaan tidak bercampur");
console.log("PASS: Rekod lama/belum disahkan tidak dikira dalam kos");
console.log("PASS: Car Health dibaca mengikut vehicleId");
console.log("PASS: Kenderaan arkib masih boleh dilaporkan");
console.log("SEMUA UJIAN VEHICLE REPORT LULUS");
