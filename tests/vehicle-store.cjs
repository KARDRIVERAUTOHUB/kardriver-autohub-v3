const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const storage = new Map();

const localStorage = {
  getItem: key => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: key => storage.delete(key)
};

const context = {
  localStorage,
  window: {},
  console: { log() {}, error() {} },
  Date, Math, JSON, Set, Object, Number, String, crypto: undefined
};

const vehicles = [
  { brand: "Proton", model: "Saga" },
  { brand: "Perodua", model: "Axia" },
  { brand: "Honda", model: "Jazz" }
];

const services = [
  { vehicleIndex: 0, type: "Minyak enjin", cost: 150 },
  { vehicleIndex: 1, type: "Servis brek", cost: 200 },
  { vehicleIndex: null, type: "Rekod tidak dikenal pasti", cost: 50 },
  { vehicleIndex: "", type: "Rekod indeks kosong", cost: 60 },
  { vehicleIndex: 99, type: "Rekod indeks luar julat", cost: 70 }
];

const health = {
  "0": { engine: { score: 85, source: "manual", updatedAt: "2026-01-01" } },
  "1": { brakes: { score: 70, source: "manual", updatedAt: "2026-01-02" } },
  "unknown": { engine: { score: 50 } }
};

storage.set("kardriver_autohub_vehicles_v1", JSON.stringify(vehicles));
storage.set("kardriver_autohub_services_v1", JSON.stringify(services));
storage.set("kardriver_car_health_v1", JSON.stringify(health));

vm.runInNewContext(
  fs.readFileSync("js/vehicle-store.js", "utf8"),
  context
);

const store = context.window.KarDriverVehicleStore;
assert.ok(store, "Vehicle Store mesti dimuatkan");

const result = store.migrateLegacyData();

assert.strictEqual(result.success, true);
assert.strictEqual(result.vehicleCount, 3);
assert.strictEqual(result.unlinkedServiceCount, 5);
assert.strictEqual(result.legacyHealthCount, 3);

const migratedVehicles = store.getVehicles();
const ids = migratedVehicles.map(v => v.vehicleId);

assert.ok(ids.every(id => typeof id === "string" && id.length > 4));
assert.strictEqual(new Set(ids).size, 3);

const migratedServices = store.getServices();

assert.ok(migratedServices.every(
  record => record.vehicleLinkStatus === "needs_review"
));
assert.ok(migratedServices.every(record => !record.vehicleId));
assert.strictEqual(store.getUnlinkedServices().length, 5);

const legacyHealth = store.getLegacyHealth();
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(legacyHealth)),
  health
);

assert.deepStrictEqual(
  JSON.parse(JSON.stringify(store.getHealthByVehicleId())),
  {}
);

assert.ok(localStorage.getItem("kardriver_vehicle_migration_backup_v1"));

assert.strictEqual(store.linkLegacyService(0, ids[0]), true);
assert.strictEqual(store.getServices()[0].vehicleId, ids[0]);
assert.strictEqual(store.getServices()[0].vehicleLinkStatus, "verified");
assert.strictEqual(store.getUnlinkedServices().length, 4);

assert.strictEqual(store.linkLegacyHealth("0", ids[0]), true);
assert.strictEqual(store.getHealthByVehicleId()[ids[0]].engine.score, 85);
assert.strictEqual(
  store.getHealthByVehicleId()[ids[0]].engine.updatedAt,
  "2026-01-01"
);
assert.strictEqual(
  String(store.getHealthByVehicleId()[ids[0]]._legacySourceIndex),
  "0"
);
assert.throws(
  () => store.linkLegacyHealth("0", ids[1]),
  /sudah dipautkan/
);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(store.getLegacyHealth())),
  health
);

const archivedId = ids[0];

assert.strictEqual(store.archiveVehicle(archivedId), true);
assert.strictEqual(store.getActiveVehicles().length, 2);
assert.strictEqual(store.getVehicles().length, 3);
assert.strictEqual(store.getServices()[0].vehicleId, archivedId);
assert.strictEqual(store.restoreVehicle(archivedId), true);
assert.strictEqual(store.getActiveVehicles().length, 3);

assert.strictEqual(
  store.migrateLegacyData().alreadyMigrated,
  true
);

console.log("PASS: ID unik bagi setiap kenderaan");
console.log("PASS: Rekod servis lama tidak dipautkan secara automatik");
console.log("PASS: Rekod lama ditandakan untuk semakan");
console.log("PASS: Car Health lama dikekalkan tanpa perubahan");
console.log("PASS: Backup data asal diwujudkan");
console.log("PASS: Pengaitan rekod servis secara manual");
console.log("PASS: Pengaitan Car Health secara manual");
console.log("PASS: Arkib dan pemulihan mengekalkan sejarah");
console.log("PASS: Migrasi dilindungi daripada pengulangan");
console.log("SEMUA UJIAN MIGRASI KONSERVATIF LULUS");
