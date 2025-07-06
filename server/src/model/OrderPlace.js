import mongoose from "mongoose";

const orderPlaceSchema = new mongoose.Schema({
  shippingAddress: {
    type: String,
  },

  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhoneNo: {
    type: String,
    required: true,
  },

  // 2nd phase
  orderNumber: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  deliveryTime: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderPlaceSchema);

export default Order;
