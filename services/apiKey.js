import ApiKey from "../models/apikey.js";
import { generateApiKey } from "../utils/generateApiKey.js";
import { hashValue } from "../utils/hash.js";

export class ApiKeyService {
  static async create(userId, name) {
    const activeCount = await ApiKey.countDocuments({ userId, isActive: true });
    if (activeCount >= 3) throw new Error("Maximum of 3 active API keys allowed");

    const rawKey = generateApiKey();
    const keyHash = await hashValue(rawKey);

    const apiKey = await ApiKey.create({
      userId,
      name,
      keyHash,
      last4: rawKey.slice(-4),
    });

    return { apiKey, rawKey };
  }

  static async list(userId) {
    return ApiKey.find({ userId }).select("-keyHash");
  }

  static async revoke(userId, id) {
    const key = await ApiKey.findOne({ _id: id, userId });
    if (!key) throw new Error("API key not found");

    key.isActive = false;
    await key.save();
    return key;
  }

  static async rotate(userId, id) {
    const oldKey = await ApiKey.findOne({ _id: id, userId });
    if (!oldKey) throw new Error("API key not found");

    const rawKey = generateApiKey();
    const keyHash = await hashValue(rawKey);

    const newKey = await ApiKey.create({
      userId,
      name: oldKey.name + "_rotated",
      keyHash,
      last4: rawKey.slice(-4)
    });

    oldKey.expiresAt = new Date(Date.now() + 24*60*60*1000);
    await oldKey.save();

    return { newKey, rawKey };
  }
}