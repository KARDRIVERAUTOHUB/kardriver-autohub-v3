(function () {
  "use strict";

  const HEARTBEAT_INTERVAL = 30 * 1000;
  const AWAY_AFTER = 5 * 60 * 1000;

  let sessionId = null;
  let heartbeatTimer = null;
  let activityTimer = null;
  let started = false;
  let startingPromise = null;
  let lifecycleVersion = 0;
  let lastActivity = Date.now();
  let currentState = "AWAY";

  function createSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "session-" + Date.now() + "-" +
      Math.random().toString(36).slice(2, 12);
  }

  function getPresenceState() {
    if (document.visibilityState !== "visible") return "AWAY";
    return Date.now() - lastActivity >= AWAY_AFTER ? "AWAY" : "ONLINE";
  }

  async function sendHeartbeat() {
    if (!started || !sessionId) return;
    const nextState = getPresenceState();
    currentState = nextState;

    if (typeof window.firebasePresenceHeartbeat !== "function") {
      console.warn("Presence API belum tersedia.");
      return;
    }

    try {
      await window.firebasePresenceHeartbeat(sessionId, nextState);
    } catch (error) {
      console.error("Presence heartbeat gagal:", error);
    }
  }

  function recordActivity() {
    if (!started) return;
    lastActivity = Date.now();

    if (activityTimer) clearTimeout(activityTimer);
    activityTimer = setTimeout(sendHeartbeat, 500);

    if (currentState !== "ONLINE" &&
        document.visibilityState === "visible") {
      sendHeartbeat();
    }
  }

  function attachListeners() {
    document.addEventListener("visibilitychange", sendHeartbeat);
    window.addEventListener("focus", recordActivity);
    window.addEventListener("blur", sendHeartbeat);
    window.addEventListener("pointerdown", recordActivity);
    window.addEventListener("keydown", recordActivity);
    window.addEventListener("touchstart", recordActivity);
  }

  function detachListeners() {
    document.removeEventListener("visibilitychange", sendHeartbeat);
    window.removeEventListener("focus", recordActivity);
    window.removeEventListener("blur", sendHeartbeat);
    window.removeEventListener("pointerdown", recordActivity);
    window.removeEventListener("keydown", recordActivity);
    window.removeEventListener("touchstart", recordActivity);
  }

  async function start() {
    if (started) return;
    if (startingPromise) return startingPromise;

    if (typeof window.firebasePresenceStartSession !== "function") {
      console.warn("Presence API belum tersedia.");
      return;
    }

    const version = lifecycleVersion;
    const newSessionId = createSessionId();
    sessionId = newSessionId;
    lastActivity = Date.now();
    currentState = "ONLINE";

    startingPromise = (async function () {
      try {
        await window.firebasePresenceStartSession(newSessionId);

        if (version !== lifecycleVersion) {
          if (typeof window.firebasePresenceEndSession === "function") {
            await window.firebasePresenceEndSession(newSessionId);
          }
          return;
        }

        started = true;
        attachListeners();
        heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
        await sendHeartbeat();

        console.log("KARDRIVER LIVE PRESENCE READY:", newSessionId);
      } catch (error) {
        if (sessionId === newSessionId) {
          sessionId = null;
          started = false;
        }
        console.error("Presence session gagal dimulakan:", error);
      } finally {
        startingPromise = null;
      }
    })();

    return startingPromise;
  }

  async function stop() {
    lifecycleVersion++;
    const wasStarting = !!startingPromise;

    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (activityTimer) clearTimeout(activityTimer);
    heartbeatTimer = null;
    activityTimer = null;

    detachListeners();

    const oldSessionId = sessionId;
    started = false;
    sessionId = null;
    currentState = "AWAY";

    if (startingPromise) {
      try {
        await startingPromise;
      } catch (error) {
        console.error("Presence start cleanup gagal:", error);
      }
    }

    if (!wasStarting && oldSessionId &&
        typeof window.firebasePresenceEndSession === "function") {
      try {
        await window.firebasePresenceEndSession(oldSessionId);
      } catch (error) {
        console.error("Presence session cleanup gagal:", error);
      }
    }
  }

  window.startCommunityPresence = start;
  window.stopCommunityPresence = stop;

  console.log("KARDRIVER PRESENCE MODULE LOADED");
})();
