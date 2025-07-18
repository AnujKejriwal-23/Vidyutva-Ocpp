import express from "express";
import { handleBoot, handleConnectionUrl,  handleAuthorize , handleStartTransaction, handleStopTransaction} from "../controllers/ocpp.controller.js";

const router = express.Router();

router.post("/connect", handleConnectionUrl);
router.post("/boot", handleBoot);
router.post("/authorize", handleAuthorize);
router.post("/start-transaction", handleStartTransaction);
router.post("/stop-transaction", handleStopTransaction);


export default router;