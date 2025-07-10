import { v4 as uuid } from "uuid";
import { config } from "../config/index.js";
import { createBootPayload } from "../models/boot.model.js";
import { log } from "../utils/logger.js";

let heartbeatIntervalSec = 60;

export function sendBootNotification(ws) {
  const payload = createBootPayload(config);

  const messageId = uuid();
  const message = [2, messageId, "BootNotification", payload];

  try {
    ws.send(JSON.stringify(message));
    log("✅ BootNotification (2.0.1) sent");
  } catch (err) {
    log("❌ Error sending BootNotification: " + err.message);
  }

  return messageId;
}

export function setHeartbeatInterval(value) {
  heartbeatIntervalSec = value;
}

export function getHeartbeatInterval() {
  return heartbeatIntervalSec;
}
