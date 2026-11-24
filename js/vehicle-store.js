(function () {
  "use strict";

  const KEYS = {
    vehicles: "kardriver_autohub_vehicles_v1",
    services: "kardriver_autohub_services_v1",
    health: "kardriver_car_health_v1",
    healthById: "kardriver_car_health_by_vehicle_v1",
    backup: "kardriver_vehicle_migration_backup_v1",
    migrated: "kardriver_vehicle_id_migration_v1"
  };

  function readJSON(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      throw new Error("Data storan tidak sah: " + key);
    }
  }

  function createVehicleId(existingIds) {
    let id;

    do {
      if (typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function") {
        id = "veh_" + crypto.randomUUID();
      } else {
        id = "veh_" + Date.now().toString(36) +
          "_" + Math.random().toString(36).slice(2, 12);
      }
    } while (existingIds.has(id));

    existingIds.add(id);
    return id;
  }

  function getVehicles() {
    const vehicles = readJSON(KEYS.vehicles, []);
    if (!Array.isArray(vehicles)) {
      throw new Error("Format Garage tidak sah.");
    }
    return vehicles;
  }

  function getActiveVehicles() {
    return getVehicles().filter(vehicle => vehicle.archived !== true);
  }

  function getServices() {
    const services = readJSON(KEYS.services, []);
    if (!Array.isArray(services)) {
      throw new Error("Format Service tidak sah.");
    }
    return services;
  }

  function getHealthByVehicleId() {
    return readJSON(KEYS.healthById, {});
  }

  function migrateLegacyData() {
    if (localStorage.getItem(KEYS.migrated)) {
      return { success: true, alreadyMigrated: true };
    }

    const vehicles = getVehicles();
    const services = getServices();
    const health = readJSON(KEYS.health, {});
    const healthById = readJSON(KEYS.healthById, {});

    if (!health || typeof health !== "object" || Array.isArray(health)) {
      throw new Error("Format Car Health tidak sah.");
    }

    if (!healthById || typeof healthById !== "object" ||
        Array.isArray(healthById)) {
      throw new Error("Format Car Health baharu tidak sah.");
    }

    const snapshot = {};
    Object.values(KEYS).forEach(key => {
      if (key !== KEYS.backup) {
        snapshot[key] = localStorage.getItem(key);
      }
    });

    if (!localStorage.getItem(KEYS.backup)) {
      localStorage.setItem(KEYS.backup, JSON.stringify({
        version: 2,
        createdAt: new Date().toISOString(),
        data: snapshot
      }));
    }

    try {
      const existingIds = new Set();

      vehicles.forEach(vehicle => {
        if (!vehicle || typeof vehicle !== "object" ||
            Array.isArray(vehicle)) {
          throw new Error("Rekod kenderaan tidak sah.");
        }

        if (typeof vehicle.vehicleId === "string" &&
            vehicle.vehicleId.trim()) {
          if (existingIds.has(vehicle.vehicleId)) {
            throw new Error("ID kenderaan pendua dikesan.");
          }
          existingIds.add(vehicle.vehicleId);
        }
      });

      vehicles.forEach(vehicle => {
        if (!vehicle.vehicleId) {
          vehicle.vehicleId = createVehicleId(existingIds);
        }

        if (typeof vehicle.archived !== "boolean") {
          vehicle.archived = false;
        }
      });

      let unlinkedServiceCount = 0;

      services.forEach(record => {
        if (!record || typeof record !== "object" ||
            Array.isArray(record)) {
          return;
        }

        if (record.vehicleId &&
            existingIds.has(record.vehicleId)) {
          record.vehicleLinkStatus = "verified";
        } else {
          record.vehicleLinkStatus = "needs_review";
          unlinkedServiceCount++;
        }
      });

      // Jangan pindahkan Car Health lama berdasarkan indeks.
      // Data asal dikekalkan sepenuhnya untuk pengesahan manual.

      localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
      localStorage.setItem(KEYS.services, JSON.stringify(services));
      localStorage.setItem(KEYS.healthById, JSON.stringify(healthById));

      localStorage.setItem(KEYS.migrated, JSON.stringify({
        version: 2,
        completedAt: new Date().toISOString(),
        vehicleCount: vehicles.length,
        unlinkedServiceCount,
        legacyHealthCount: Object.keys(health).length
      }));

      return {
        success: true,
        vehicleCount: vehicles.length,
        unlinkedServiceCount,
        legacyHealthCount: Object.keys(health).length
      };
    } catch (error) {
      Object.entries(snapshot).forEach(([key, value]) => {
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }
      });

      throw error;
    }
  }

  function getLegacyHealth() {
    return readJSON(KEYS.health, {});
  }

  function getUnlinkedServices() {
    return getServices()
      .map((record, index) => ({ record, index }))
      .filter(item =>
        !item.record.vehicleId ||
        item.record.vehicleLinkStatus === "needs_review"
      );
  }

  function linkLegacyService(recordIndex, vehicleId) {
    const vehicles = getVehicles();
    const services = getServices();

    if (!Number.isInteger(recordIndex) ||
        !services[recordIndex]) {
      throw new Error("Rekod servis tidak ditemui.");
    }

    if (!vehicles.some(vehicle =>
        vehicle.vehicleId === vehicleId)) {
      throw new Error("Kenderaan tidak ditemui.");
    }

    const record = services[recordIndex];
    record.vehicleId = vehicleId;
    record.vehicleLinkStatus = "verified";
    record.vehicleLinkedAt = new Date().toISOString();

    localStorage.setItem(KEYS.services, JSON.stringify(services));
    return true;
  }

  function linkLegacyHealth(legacyIndex, vehicleId) {
    const vehicles = getVehicles();
    const legacy = getLegacyHealth();
    const healthById = getHealthByVehicleId();
    const key = String(legacyIndex);

    if (!Object.prototype.hasOwnProperty.call(legacy, key)) {
      throw new Error("Penilaian lama tidak ditemui.");
    }

    if (!vehicles.some(vehicle =>
        vehicle.vehicleId === vehicleId)) {
      throw new Error("Kenderaan tidak ditemui.");
    }

    if (Object.prototype.hasOwnProperty.call(healthById, vehicleId)) {
      throw new Error("Kenderaan sudah mempunyai penilaian.");
    }

    const alreadyLinked = Object.values(healthById).some(item =>
      item && String(item._legacySourceIndex) === key
    );

    if (alreadyLinked) {
      throw new Error("Penilaian lama ini sudah dipautkan kepada kenderaan lain.");
    }

    const copiedAssessment = JSON.parse(JSON.stringify(legacy[key]));
    copiedAssessment._legacySourceIndex = key;
    healthById[vehicleId] = copiedAssessment;

    localStorage.setItem(KEYS.healthById, JSON.stringify(healthById));
    return true;
  }

  function archiveVehicle(vehicleId) {
    if (!vehicleId) throw new Error("vehicleId diperlukan.");

    const vehicles = getVehicles();
    const vehicle = vehicles.find(item => item.vehicleId === vehicleId);

    if (!vehicle) throw new Error("Kenderaan tidak ditemui.");
    if (vehicle.archived === true) return false;

    vehicle.archived = true;
    vehicle.archivedAt = new Date().toISOString();

    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
    return true;
  }

  function restoreVehicle(vehicleId) {
    if (!vehicleId) throw new Error("vehicleId diperlukan.");

    const vehicles = getVehicles();
    const vehicle = vehicles.find(item => item.vehicleId === vehicleId);

    if (!vehicle) throw new Error("Kenderaan tidak ditemui.");

    vehicle.archived = false;
    delete vehicle.archivedAt;

    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
    return true;
  }

  window.KarDriverVehicleStore = Object.freeze({
    getVehicles,
    getActiveVehicles,
    getServices,
    getHealthByVehicleId,
    getLegacyHealth,
    getUnlinkedServices,
    migrateLegacyData,
    linkLegacyService,
    linkLegacyHealth,
    createVehicleId,
    archiveVehicle,
    restoreVehicle
  });

  console.log("KARDRIVER VEHICLE STORE READY");
})();
