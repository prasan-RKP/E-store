import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  address: {
    type: String,
    default: "",
  },

  contact: {
    type: String,
    default: "",
  },

  profilePic: {
    type: String,
  },

  orders: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      itemModel: {
        type: String,
        enum: ["Accessory", "Men", "Women"], // Allows multiple schema references
        required: true,
      },
    },
  ],

  wishlist: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      itemModel: {
        type: String,
        enum: ["Accessory", "Men", "Women"], // Allows multiple schema references
        required: true,
      },
    },
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],

  
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "cod", "upi", "net_banking"],
    default: "cod",
  },

  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      itemModel: {
        type: String,
        enum: ["Accessory", "Men", "Women"], // Allows multiple schema references for cart items
        required: true,
      },
    },
  ],

  emailVerified: {
    type: Boolean,
    default: false,
  },

  phoneVerified: {
    type: Boolean,
    default: false,
  },

  lastLogin: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
