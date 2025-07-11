import { v4 as uuid } from "uuid";
import { createStartTransactionPayload } from "../models/transaction.model.js";
import { log } from "../utils/logger.js";

let pendingStartTransactionId = null;

export function getPendingStartTxMessageId() {
  return pendingStartTransactionId;
}

export function sendStartTransaction(ws, idTag , customConnectorId) {
  const connectorId = customConnectorId || 1;
  const messageId = uuid();
  const payload = createStartTransactionPayload(idTag, connectorId);
  const message = [2, messageId, "StartTransaction", payload];

  try {
    ws.send(JSON.stringify(message));
    pendingStartTransactionId = messageId;
    log(`🚗 StartTransaction sent | connectorId: ${connectorId}, idTag: ${idTag}`);
  } catch (err) {
    log("❌ Error sending StartTransaction: " + err.message);
  }

  return messageId;
}