import { v4 as uuid } from "uuid";
import { createStartTransactionPayload } from "../models/transaction.model.js";
import { log } from "../utils/logger.js";

export function sendStartTransaction(ws, idTag) {
  const messageId = uuid();
  const payload = createStartTransactionPayload(idTag);
  const message = [2, messageId, "StartTransaction", payload];

  try {
    ws.send(JSON.stringify(message));
    log(`🚗 StartTransaction sent with idTag: ${idTag}`);
  } catch (err) {
    log("❌ Error sending StartTransaction: " + err.message);
  }

  return messageId;
}