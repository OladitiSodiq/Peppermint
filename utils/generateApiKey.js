import crypto from "crypto";

export const generateApiKey = () => {
  return `PEPPERMINT_LIVE_${crypto.randomBytes(24).toString("hex")}`;
};