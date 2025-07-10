import WebSocket from "ws";
import { log } from "../utils/logger.js";

let ws = null;

export function createWebSocketClient(url) {
  if (ws) ws.close();
  ws = new WebSocket(url, ["ocpp2.0.1"]);

  ws.on("open", () => {
    log(`🔌 Connected to ${url}`);
  });

  ws.on("message", (message) => {
    log(`📩 Message from CSMS: ${message}`);
  });

  ws.on("error", (err) => {
    log(`❌ WebSocket error: ${err.message}`);
  });

  ws.on("close", () => {
    log(`🔌 WebSocket disconnected`);
  });
}

export function getCurrentWs() {
  return ws;
}