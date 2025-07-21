// cleanInvalidOrders.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./userModel.js";     // adjust path based on your project
import Order from "./OrderPlace.js";   // adjust path based on your project

dotenv.config();

const cleanInvalidOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = await User.find({});
    console.log(`🔍 Found ${users.length} users`);

    for (const user of users) {
      const validOrderIds = [];

      for (const orderId of user.orderPlaced) {
        const exists = await Order.exists({ _id: orderId });
        if (exists) validOrderIds.push(orderId);
      }

      if (validOrderIds.length !== user.orderPlaced.length) {
        user.orderPlaced = validOrderIds;
        await user.save();
        console.log(`🧹 Cleaned invalid order references for user: ${user._id}`);
      }
    }

    console.log("✅ Finished cleaning orderPlaced references");
    process.exit(0); // Exit cleanly
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1); // Exit with error
  }
};

cleanInvalidOrders();
