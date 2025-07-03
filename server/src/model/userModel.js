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

  // Shipping address details added from here 
  city: {
    type: String,
    maxlength: 50,
    default: "Not specified"
  },

  country: {
    type: String,
    required: true,
    default: 'India'
  },

  state: {
    type: String,
    maxlength: 50,
    default: "Not specified"
  },

  zipCode: {
  type: String,
  minlength: 5,
  maxlength: 6,
  default: "000000"
  },

  // Shipping adress deteils Ends from here

  orders: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      itemModel: {
        type: String,
        enum: ["Accessory", "Men", "Women", "Footwear"], // Allows multiple schema references
        required: true,
      },
    },
  ],

  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      itemModel: {
        type: String,
        enum: ["Accessory", "Men", "Women", "Footwear"],
        required: true,
      },
      size: {
        type: String,
        default: null,
      },
      color: {
        type: String,
        default: null,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  paymentMethod: {
    type: String,
    enum: ["C.O.D", "googlePay", "PhonePe", "Paytm", "AmazonPay"],
    default: "C.O.D",
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
        enum: ["Accessory", "Men", "Women", "Footwear"], // Allows multiple schema references for cart items
        required: true,
      },

      size: {
        type: String,
        default: null,
      },

      color: {
        type: String,
        default: null,
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
