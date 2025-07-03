import React from "react";
import { motion } from "framer-motion";
import { FiLock, FiTruck, FiHeart } from "react-icons/fi";

const OrderSummary = ({
  isDark,
  subtotal,
  shipping,
  discount,
  discountAmount,
  promoCode,
  setPromoCode,
  applyPromoCode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-6 h-fit sticky top-24 transition-all duration-500 ${
        isDark
          ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl shadow-black/20"
          : "border-gray-200 bg-white shadow-xl shadow-black/5"
      } lg:col-span-2`}
    >
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹2.00</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount ({discount}%)</span>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <hr className={isDark ? "border-gray-700" : "border-gray-300"} />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{(subtotal + shipping - discountAmount + 2).toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Promo Code</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className={`flex-1 px-3 py-2 rounded-xl border transition-all duration-300 ${
              isDark
                ? "border-gray-700 bg-gray-800 focus:border-green-500 focus:bg-gray-700"
                : "border-gray-300 bg-gray-50 focus:border-green-500 focus:bg-white"
            } focus:ring-4 focus:ring-green-500/20 focus:outline-none`}
            placeholder="Enter code"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={applyPromoCode}
            className="hover:cursor-pointer px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/20"
          >
            Apply
          </motion.button>
        </div>
        <p className="text-xs mt-1 opacity-75">
          Try: SAVE10, WELCOME20, FIRST15
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <FiLock className="text-green-500" />
          <span>SSL Secured Checkout</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <FiTruck className="text-blue-500" />
          <span>Free Returns Within 30 Days</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <FiHeart className="text-red-500" />
          <span>24/7 Customer Support</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
