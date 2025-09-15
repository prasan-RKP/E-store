// clearUserOrders.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./userModel.js"; // adjust path

dotenv.config();

const clearUserOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const result = await User.updateMany(
      {},
      { $set: { orderPlaced: [] } } // ✅ empty the array
    );

    console.log(`🧹 Cleared orderPlaced for ${result.modifiedCount} users`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error while clearing orderPlaced:", error);
    process.exit(1);
  }
};

clearUserOrders();
