import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const OrderPlace = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 text-center px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FiCheckCircle className="text-green-500 text-5xl mx-auto mb-4 animate-bounce" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being processed and a confirmation has been sent to your email.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </motion.div>
    </motion.div>
  );
};

export default OrderPlace;
