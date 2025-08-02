import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "../server/routes/auth.route.js";
import productRoute from "../server/routes/product.route.js";
import orderRoute from "../server/routes/order.route.js";
import mongoose from "mongoose";

dotenv.config();
//MONGO_URI=mongodb://127.0.0.1:27017/EcomDB

const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT isn't set in .env

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Ensure this is the correct client-side URL
    // for mobile testing
    //origin: "http://192.168.3.238:5173",
    credentials: true,
  })
);

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/EcomDB";

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Successfully connected to DB✅`);

    // Start the server after DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect with DB:", err);
    process.exit(1); // Exit the application if~ DB connection fails
  });

// Routes
app.use("/auth", authRoute);
app.use("/prod", productRoute);
app.use("/ord", orderRoute);
