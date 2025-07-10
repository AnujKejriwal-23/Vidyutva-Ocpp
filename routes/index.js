import express from "express";
import { handleBoot, handleConnectionUrl } from "../controllers/ocpp.controller.js";

const router = express.Router();

router.post("/connect", handleConnectionUrl);
router.post("/boot", handleBoot);

export default router;