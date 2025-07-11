import { sendBootNotification } from "../services/bootService.js";
import { startHeartbeatLoop } from "../services/heartbeatService.js";
import { sendAuthorizeRequest } from "../services/authorizeService.js";
import { sendStartTransaction } from "../services/transactionService.js";
import { sendStopTransaction } from "../services/stopTransactionService.js";
import { createWebSocketClient, getCurrentWs,getTransactionId } from "../sockets/index.js";

export const handleBoot = async (req, res) => {
  const ws = getCurrentWs();
  if (!ws || ws.readyState !== 1) {
    return res.status(500).json({ error: "WebSocket not connected" });
  }
  sendBootNotification(ws);
  startHeartbeatLoop(ws); 
  res.json({ status: "BootNotification + Heartbeat loop started" });
};

export const handleConnectionUrl = (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith("ws")) {
    return res.status(400).json({ error: "Invalid WebSocket URL" });
  }
  createWebSocketClient(url);
  res.json({ status: `Connecting to ${url}` });
};

export const handleAuthorize = (req, res) => {
  const { idTag } = req.body;
  const ws = getCurrentWs();
  if (!ws || ws.readyState !== 1) {
    return res.status(500).json({ error: "WebSocket not connected" });
  }
  if (!idTag) {
    return res.status(400).json({ error: "Missing idTag" });
  }
  sendAuthorizeRequest(ws, idTag);
  res.json({ status: `Authorize sent for ${idTag}` });
};

export const handleStartTransaction = (req, res) => {
  const ws = getCurrentWs();
  const idTag = req.body.idTag || "VID-USER-01";
  const connectorId = req.body.connectorId || 1;
  if (!ws || ws.readyState !== 1) {
    return res.status(500).json({ error: "WebSocket not connected" });
  }
  sendStartTransaction(ws, idTag,  connectorId);
  res.json({ status: `StartTransaction sent for idTag: ${idTag} on connectorId: ${connectorId}` });
};

// export const handleStopTransaction = (req, res) => {
//   const ws = getCurrentWs();
//   const transactionId = req.body.transactionId || "TX-VID-01";
//   const meterStop = req.body.meterStop || 1000;
//   const idTag = req.body.idTag || "VID-USER-01";

//   if (!ws || ws.readyState !== 1) {
//     return res.status(500).json({ error: "WebSocket not connected" });
//   }
//   sendStopTransaction(ws, transactionId, meterStop, idTag);
//   res.json({ status: `StopTransaction sent for transactionId: ${transactionId}` });
// };



export const handleStopTransaction = (req, res) => {
  const ws = getCurrentWs();

  if (!ws || ws.readyState !== 1) {
    return res.status(500).json({ error: "WebSocket not connected" });
  }

  // Fallback to stored transaction ID from CSMS
  const transactionId = getTransactionId();
  if (!transactionId) {
    return res.status(400).json({ error: "No transactionId from CSMS available" });
  }

  const meterStop = req.body.meterStop || 1000;
  const idTag = req.body.idTag || "VID-USER-01";

  sendStopTransaction(ws, transactionId, meterStop, idTag);
  res.json({ status: `StopTransaction sent for transactionId: ${transactionId}` });
};

