import express from "express";
import { protectedRoute } from "../src/middleware/middleware";
import User from "../src/model/userModel";
import Women from "../src/model/womenModel";
import Men from "../src/model/manModel";
import Footwear from "../src/model/FootwearModel";
import Accessory from "../src/model/accessoryModel";
//import { use } from "react";

const router = express.Router();

// task 1 completed -> show AddTocart with populated cart
router.get("/showcart", protectedRoute, async (req, res) => {
  // step 1: first collect the 'userId' in variable through protected route

  const userId = req?.user.id;

  try {
    // step 2: by the help of 'userID'  extarct 'userDetails' in a variable
    const user = await User.findById(userId);

    // step 3: Now you can create the 'populated' functionality
    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;
        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    return res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    console.log("The error in showCart", error);
    return res.status(404).json({ message: "Internal server Error" });
  }
});

// task 2 pending -> increment

router.post("/decQnt", protectedRoute, async (req, res) => {
  const userId = req?.user.id;
  const { pid } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Found" });

    // lets find the particular Item

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === pid
    );

    if (!cartItem) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else if (cartItem.quantity <= 1) {
      return res
        .status(400)
        .json({ message: "Product Quantity cannot be less that 1" });
    }

    await user.save();

    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        let product = null;

        if (item.itemModel === "Women") {
          product = await Women.findById(item.productId);
        } else if (item.itemModel === "Footwear") {
          product = await Footwear.findById(item.productId);
        } else if (item.itemModel === "Men") {
          product = await Men.findById(item.productId);
        } else if (item.itemModel === "Accessory") {
          product = await Accessory.findById(item.productId);
        }

        return {
          ...item.toObject(),
          product,
        };
      })
    );

    return res.status(200).json({ ...user.toObject(), cart: populatedCart });
  } catch (error) {
    console.log("Error in decQnt", error);
    return res.status(404).json({ message: "Internal Server Error" });
  }
});

// update SIze code
router.post("/updateSize", protectedRoute, async (req, res) => {
  const userId = req?.user.id;
  const { productId, size } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Found" });

    if (!productId) {
      return res.status(400).json({ message: "Product not Found" });
    }

    if (!size) {
      return res.status(400).json({ message: "Do Select your Size" });
    }

    let itemModel = "";

    if (await Women.findById(productId)) itemModel = "Women";
    else if (await Men.findById(productId)) itemModel = "Men";
    else if (await Footwear.findById(productId)) itemModel = "Footwear";
    else if (await Accessory.findById(productId)) itemModel = "Accessory";

    const cartItem = user.cart.find(
      (item) =>
        item.productId.toString() === productId && item.itemModel === itemModel
    );

    if(!cartItem) {
      return res.status(400).json({message: "Product not Found"});
    }

    cartItem.size = size;
    await user.save();

    // populate cart  then 
    //-----

  } catch (error) {}
});
