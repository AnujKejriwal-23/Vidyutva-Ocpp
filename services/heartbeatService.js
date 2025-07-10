import { v4 as uuid } from "uuid";
import { getHeartbeatInterval } from "./bootService.js";
import { log } from "../utils/logger.js";

export async function startHeartbeatLoop(ws) {
  while (ws.readyState === 1) {
    const message = [2, uuid(), "Heartbeat", {}];
    try {
      ws.send(JSON.stringify(message));
      log("💓 Heartbeat sent");
    } catch (err) {
      log("❌ Heartbeat error: " + err.message);
    }
    await new Promise((res) => setTimeout(res, getHeartbeatInterval() * 1000));
  }
}