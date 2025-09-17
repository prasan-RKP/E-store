import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";

import authRoute from "../server/routes/auth.route.js";
import productRoute from "../server/routes/product.route.js";
import orderRoute from "../server/routes/order.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

// Get current directory (for deployment build serving)
const _dirname = path.resolve();

/* -------------------- Middlewares -------------------- */
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // update with your client URL when deploying
    // origin: "http://192.168.29.238:5173", // for mobile testing
    credentials: true,
  })
);

/* -------------------- API Routes -------------------- */
app.use("/auth", authRoute);
app.use("/prod", productRoute);
app.use("/ord", orderRoute);

/* -------------------- Serve Frontend (Deployment) -------------------- */
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get(/^\/(?!auth|prod|ord).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

/* -------------------- DB Connection & Server Start -------------------- */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to DB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
