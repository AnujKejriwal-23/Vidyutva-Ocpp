import { v4 as uuid } from "uuid";
import { createStopTransactionPayload } from "../models/transaction.model.js";
import { log } from "../utils/logger.js";

export function sendStopTransaction(ws, transactionId, meterStop, idTag) {
  const messageId = uuid();
  const payload = createStopTransactionPayload(transactionId, meterStop, idTag);
  const message = [2, messageId, "StopTransaction", payload];

  try {
    ws.send(JSON.stringify(message));
    log(`🛑 StopTransaction sent | transactionId: ${transactionId}, idTag: ${idTag}`);
  } catch (err) {
    log("❌ Error sending StopTransaction: " + err.message);
  }

  return messageId;
}