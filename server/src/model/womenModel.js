import mongoose from "mongoose";

const WomenProductSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['jeans', 'shirts', 'jackets', 'traditionals'],
    index: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  img: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    required: true,
    default: 0
  },
  sizes: {
    type: [String],
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'XXL']
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  new: {
    type: Boolean,
    default: false
  },
  sale: {
    type: Boolean,
    default: false
  },
  originalPrice: {
    type: Number,
    min: 0
  }
}, { timestamps: true });

const Women = mongoose.model("Women", WomenProductSchema);

export default Women;