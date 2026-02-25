import express from "express";
import { ApiKeyController } from "../controllers/apiKey.js";
import { authMiddleware } from "../middlewares/auth.js";
import { rateLimiter } from '../utils/rateLimiter.js';
import { auditLogger } from '../middlewares/auditLogger.js';


import {
  validateCreateApiKey
} from "../middlewares/validation.js";

const router = express.Router();

router.post("/", authMiddleware, validateCreateApiKey,rateLimiter,auditLogger, ApiKeyController.create);
router.get("/", authMiddleware,rateLimiter,auditLogger, ApiKeyController.list);
router.patch("/:id/revoke", authMiddleware,rateLimiter,auditLogger, ApiKeyController.revoke);
router.post("/:id/rotate", authMiddleware,rateLimiter,auditLogger, ApiKeyController.rotate);

export default router;
