import WebSocket from "ws";
import { log } from "../utils/logger.js";
import { getPendingStartTxMessageId } from "../services/transactionService.js";

let ws = null;
let transactionIdFromCsms = null;

export function createWebSocketClient(url) {
  if (ws) ws.close();
  ws = new WebSocket(url, ["ocpp1.6"]);

  ws.on("open", () => {
    log(`🔌 Connected to ${url}`);
  });

ws.on("message", (data) => {
  try {
    if (!data) return;

    const parsed = JSON.parse(data);
    const messagePreview = JSON.stringify(parsed, null, 2);

    log("📥 Received from CSMS:\n" + messagePreview);

    if (Array.isArray(parsed) && parsed[0] === 3) {
      const messageId = parsed[1];
      const response = parsed[2];

      if (messageId === getPendingStartTxMessageId() && response?.transactionId) {
        transactionIdFromCsms = response.transactionId;
        log(`💾 Stored transactionId from CSMS: ${transactionIdFromCsms}`);
      }
    }
  } catch (err) {
    log("❌ Error parsing incoming message: " + err.message);
  }
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
export function getTransactionId() {
  return transactionIdFromCsms;
}

export function setTransactionId(id) {
  transactionIdFromCsms = id;
}