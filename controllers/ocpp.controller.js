import { sendBootNotification } from "../services/bootService.js";
import { startHeartbeatLoop } from "../services/heartbeatService.js";
import { createWebSocketClient, getCurrentWs } from "../sockets/index.js";

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