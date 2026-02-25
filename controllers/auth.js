import User from "../models/user.js";
import { successResponse, errorResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return errorResponse(res, "Email already registered", 400);
    

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    successResponse(res, { user: { id: user._id, name, email }, token }, 201);
  } catch (err) {
    errorResponse(res, err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, "Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", 401);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    successResponse(res, {
      user: { id: user._id, name: user.name, email },
      token,
    });
  } catch (err) {
    errorResponse(res, err.message);
  }
};
