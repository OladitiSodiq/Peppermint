import { ApiKeyService } from "../services/apiKey.js";
import { successResponse, errorResponse } from "../utils/response.js";

export class ApiKeyController {
  static async create(req, res) {
    try {
      const { apiKey, rawKey } = await ApiKeyService.create(req.user.id, req.body.name);
      return successResponse(res, { id: apiKey._id, name: apiKey.name, key: rawKey, last4: apiKey.last4 }, 201);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async list(req, res) {
    const keys = await ApiKeyService.list(req.user.id);
    return successResponse(res, keys);
  }

  static async revoke(req, res) {
    try {
      const key = await ApiKeyService.revoke(req.user.id, req.params.id);
      return successResponse(res, key);
    } catch (err) {
      return errorResponse(res, "Api key Id is wrong", 404);
    }
  }

  static async rotate(req, res) {
    try {
      const { newKey, rawKey } = await ApiKeyService.rotate(req.user.id, req.params.id);
      return successResponse(res, { id: newKey._id, key: rawKey });
    } catch (err) {
      return errorResponse(res, err.message, 404);
    }
  }
}