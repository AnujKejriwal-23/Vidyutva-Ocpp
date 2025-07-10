import { v4 as uuid } from "uuid";
import { log } from "../utils/logger.js";
import { createAuthorizePayload } from "../models/authorize.model.js";

export function sendAuthorizeRequest(ws, idTag) {
  const messageId = uuid();
  const payload = createAuthorizePayload(idTag);
  const message = [2, messageId, "Authorize", payload];

  try {
    ws.send(JSON.stringify(message));
    log(`✅ Authorize request sent for idToken: ${idTag}`);
  } catch (err) {
    log("❌ Error sending Authorize: " + err.message);
  }

  return messageId;
}