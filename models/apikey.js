import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    keyHash: { type: String, required: true },
    last4: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("ApiKey", ApiKeySchema);
