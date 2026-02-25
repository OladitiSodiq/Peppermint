import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/auth.js";
import apiKeyRoutes from "./routes/apiKey.js";


const app = express();
app.use(express.json());

connectDB();
app.use("/api/v1/users", userRoutes); 
app.use("/api/v1/api-keys", apiKeyRoutes);  

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});
