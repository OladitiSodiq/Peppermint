import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // Check if Authorization header exists
    if (!header || !header.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }


    const token = header.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }


    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      apiKey: user.apiKey || null, 
    };

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};