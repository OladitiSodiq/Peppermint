import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
