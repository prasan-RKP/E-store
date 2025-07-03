import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    default: "",
  },

  category: {
    type: String,
    enum: ["masks", "watches", "caps", "bracelets", "rings"], // Matches categories from User schema
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },

  img: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    default: 0,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  colors: {
    type: [String], // optional: ["black", "blue", "red"]
    default: [],
  },

  inStock: {
    type: Boolean,
    default: true,
  },

  wishlistedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User schema
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Accessory = mongoose.model("Accessory", accessorySchema);

export default Accessory;
