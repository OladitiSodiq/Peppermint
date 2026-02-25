import express from "express";
import { ApiKeyController } from "../controllers/apiKey.js";
import { authMiddleware } from "../middlewares/auth.js";
import {
  validateCreateApiKey
} from "../middlewares/validation.js";

const router = express.Router();

router.post("/", authMiddleware, validateCreateApiKey, ApiKeyController.create);
router.get("/", authMiddleware, ApiKeyController.list);
router.patch("/:id/revoke", authMiddleware, ApiKeyController.revoke);
router.post("/:id/rotate", authMiddleware, ApiKeyController.rotate);

export default router;
