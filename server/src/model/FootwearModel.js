import mongoose from "mongoose";

const footwearSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['formal', 'sport', 'loafer', 'sneaker', 'casual'],
    index: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  img: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    required: true,
    default: 0,
  },
  sizes: {
    type: [String],
    required: true,
    enum: ['7', '8', '9', '10', '11'],
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  desc: {
    type: String,
    trim: true,
    default: "",
  },
  new: {
    type: Boolean,
    default: false,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ['m', 'f', 'u'], // m: male, f: female, u: unisex (optional)
    required: true,
  }
}, { timestamps: true });

const Footwear = mongoose.model("Footwear", footwearSchema);

export default Footwear;
