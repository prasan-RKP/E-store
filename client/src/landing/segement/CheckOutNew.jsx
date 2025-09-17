import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiCreditCard,
  FiTruck,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiSun,
  FiMoon,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCw,
  FiClock,
  FiTag,
  FiStar,
  FiShield,
  FiX,
  FiDownload,
  FiEye,
  FiCalendar,
  FiPackage,
  FiHome,
  FiGift,
  FiSmartphone,
  FiHeart,
  FiShare2,
  FiCopy,
  FiMessageCircle,
  FiTrendingUp,
  FiAward,
  FiZap
} from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";

// Mock data for demonstration
const mockUser = {
  username: "John Doe",
  email: "john.doe@example.com",
  contact: "+91 98765 43210",
  address: "123 Main Street, Apartment 4B",
  city: "Mumbai",
  state: "Maharashtra",
  zipCode: "400001",
  paymentMethod: "credit card",
  cart: [
    { id: 1, product: { name: "Premium Wireless Headphones", price: 299.99, image: "/api/placeholder/80/80" }, quantity: 1 },
    { id: 2, product: { name: "Smart Fitness Watch", price: 199.99, image: "/api/placeholder/80/80" }, quantity: 2 },
    { id: 3, product: { name: "Bluetooth Speaker", price: 79.99, image: "/api/placeholder/80/80" }, quantity: 1 }
  ]
};

const mockStore = {
  isSavingShippingAddress2: false,
  verifiedUser: mockUser,
  isCheckingOut: false,
  checkout: () =>alert("ChekOut called") //console.log("Checkout called")
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, orderData, cartItems, isDark }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());
  const [estimatedDelivery] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    alert("Order number copied to clipboard!");
  };

  const handleDownloadReceipt = () => {
    alert("Receipt download started!");
  };

  const handleShowOrders = () => {
    alert("Redirecting to order history...");
  };

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Order Confirmation',
        text: `I just placed an order #${orderNumber} on Luxe!`,
        url: window.location.href
      });
    } else {
      alert("Share feature not supported on this browser");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  scale: 0
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
            isDark
              ? "bg-gray-800/95 border-gray-700/50 backdrop-blur-xl"
              : "bg-white/95 border-gray-200/50 backdrop-blur-xl"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 z-10 p-2 rounded-full transition-all duration-200 ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            <FiX className="text-xl" />
          </button>

          {/* Header */}
          <div className="p-8 pb-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <FiCheck className="text-white text-3xl" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
              >
                Order Confirmed! 🎉
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                Thank you for your purchase! Your order has been successfully placed.
              </motion.p>
            </div>
          </div>

          {/* Order Details */}
          <div className="px-8 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Order Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50/80 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiPackage className="text-blue-500 text-xl" />
                  <h3 className="font-semibold text-lg">Order Information</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Order Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">#{orderNumber}</span>
                      <button
                        onClick={handleCopyOrderNumber}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <FiCopy className="text-sm text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                    <span className="font-semibold text-lg text-green-600">₹{orderData.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                    <span className="font-semibold capitalize">{orderData.paymentMethod}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Estimated Delivery</span>
                    <span className="font-semibold text-blue-600">{estimatedDelivery}</span>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-6 rounded-2xl border ${
                  isDark
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50/80 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiMapPin className="text-purple-500 text-xl" />
                  <h3 className="font-semibold text-lg">Shipping Address</h3>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold">{mockUser.username}</p>
                  <p className="text-gray-600 dark:text-gray-400">{mockUser.address}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mockUser.city}, {mockUser.state} {mockUser.zipCode}
                  </p>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <FiMail className="text-xs" />
                      {mockUser.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <FiPhone className="text-xs" />
                      {mockUser.contact}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-8 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`p-6 rounded-2xl border ${
                isDark
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-gray-50/80 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <FiShoppingCart className="text-orange-500 text-xl" />
                <h3 className="font-semibold text-lg">Order Items ({cartItems.length})</h3>
              </div>
              
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="px-8 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
              >
                <FiDownload className="text-sm" />
                <span className="text-sm font-medium">Receipt</span>
              </button>
              
              <button
                onClick={handleShowOrders}
                className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition-colors"
              >
                <FiEye className="text-sm" />
                <span className="text-sm font-medium">My Orders</span>
              </button>
              
              <button
                onClick={handleShareOrder}
                className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
              >
                <FiShare2 className="text-sm" />
                <span className="text-sm font-medium">Share</span>
              </button>
              
              <button
                className="flex items-center gap-2 p-3 rounded-xl bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition-colors"
              >
                <FiMessageCircle className="text-sm" />
                <span className="text-sm font-medium">Support</span>
              </button>
            </motion.div>
          </div>

          {/* Next Steps */}
          <div className="px-8 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className={`p-6 rounded-2xl border ${
                isDark
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
                  : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <FiZap className="text-yellow-500 text-xl" />
                <h3 className="font-semibold text-lg">What's Next?</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <FiCheck className="text-green-500 text-sm" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Order confirmation email sent
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FiClock className="text-blue-500 text-sm" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Processing your order (1-2 business days)
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <FiTruck className="text-purple-500 text-sm" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping updates via SMS & email
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 pb-8">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShowOrders}
                className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/30"
              >
                View My Orders
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                Continue Shopping
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  isDark,
}) => (
  <div className="sticky top-6">
    <div
      className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        isDark
          ? "border-gray-700/50 bg-gray-800/80 shadow-xl shadow-gray-900/20"
          : "border-gray-200/50 bg-white/80 shadow-xl shadow-gray-100/20"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <FiShoppingCart className="text-white text-lg" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Order Summary
          </h3>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-semibold">₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="font-semibold">₹{tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center"
            >
              <span className="text-green-500 flex items-center gap-1">
                <FiTag className="text-sm" />
                Discount
              </span>
              <span className="font-semibold text-green-500">-₹{discount.toFixed(2)}</span>
            </motion.div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Promo Code
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={promoCode}
                onChange={onPromoCodeChange}
                placeholder="Enter promo code"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  isDark
                    ? "border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700"
                    : "border-gray-200 bg-gray-50 placeholder-gray-500 focus:border-blue-500 focus:bg-white"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            <button
              onClick={onApplyPromo}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium shadow-lg shadow-blue-500/25"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <FiShield className="text-lg" />
            <span className="font-medium text-sm">Secure Checkout</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ currentStep, isDark }) => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center space-x-8">
      {[
        { step: 1, label: "Shipping", icon: FiTruck },
        { step: 2, label: "Payment", icon: FiCreditCard },
        { step: 3, label: "Review", icon: FiCheck },
      ].map(({ step, label, icon: Icon }, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                currentStep >= step
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                  : isDark
                  ? "bg-gray-700 text-gray-400 border-2 border-gray-600"
                  : "bg-gray-100 text-gray-400 border-2 border-gray-200"
              }`}
            >
              {currentStep > step ? (
                <FiCheck className="text-xl" />
              ) : (
                <Icon className="text-xl" />
              )}
            </motion.div>
            <span className={`mt-2 text-sm font-medium ${
              currentStep >= step
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}>
              {label}
            </span>
          </div>
          {step < 3 && (
            <div
              className={`w-20 h-1 mx-6 rounded-full transition-all duration-500 ${
                currentStep > step
                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                  : isDark
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

// Mock Form Components
const ShippingForm = ({ nextstep, formData, setFormData, onShippingValid }) => {
  useEffect(() => {
    onShippingValid(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
            defaultValue="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
            defaultValue="john.doe@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Address</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
          defaultValue="123 Main Street, Apartment 4B"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
            defaultValue="Mumbai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
            defaultValue="Maharashtra"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
            defaultValue="400001"
          />
        </div>
      </div>
    </div>
  );
};

const PaymentForm = React.forwardRef(({ formData, setFormData, onShippingValid, nextstep, isDark }, ref) => {
  const [paymentMethod, setPaymentMethod] = useState(formData?.paymentMethod || "credit card");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  // Expose submit to parent if needed
  React.useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (paymentMethod) {
        nextstep();
      } else {
        alert("Please select a payment method!");
      }
    }
  }));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Payment Method</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="credit card"
              checked={paymentMethod === "credit card"}
              onChange={handleChange}
            />
            Credit Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
        </div>
      </div>
    </div>
  );
});

// Main Checkout Component
const CheckOutNew = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    paymentMethod: "credit card"
  });
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock values for summary
  const subtotal = 579.97;
  const shipping = 40;
  const tax = 30;
  const total = subtotal + shipping + tax - discount;

  const paymentFormRef = useRef();

  const handlePromoCodeChange = (e) => setPromoCode(e.target.value);
  const applyPromoCode = () => {
    if (promoCode === "SAVE10") setDiscount(10);
    else setDiscount(0);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleContinue = () => {
    if (currentStep === 2) {
      if (paymentFormRef.current) {
        paymentFormRef.current.submitForm();
      }
    } else {
      nextStep();
    }
  };

  const handleSubmit = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setOrderPlaced(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="border-b border-gray-200/50">
        <div className="container mx-auto px-6">
          <ProgressBar currentStep={currentStep} isDark={false} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-white/80 shadow-xl shadow-gray-100/20"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Shipping */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <ShippingForm
                      nextstep={nextStep}
                      formData={formData}
                      setFormData={setFormData}
                      onShippingValid={setIsShippingValid}
                    />
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <PaymentForm
                      ref={paymentFormRef}
                      formData={formData}
                      setFormData={setFormData}
                      onShippingValid={setIsShippingValid}
                      nextstep={nextStep}
                      isDark={false}
                    />
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-8"
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <FiMapPin className="text-blue-500" />
                          Shipping Details
                        </h3>
                        <div className="p-6 rounded-xl border bg-gray-50 border-gray-200">
                          <div className="space-y-2">
                            <p className="font-medium">{formData.fullName}</p>
                            <p className="text-gray-600">{formData.address}</p>
                            <p className="text-gray-600">
                              {formData.city}, {formData.state} {formData.zipCode}
                            </p>
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <FiMail className="text-xs" />
                                {formData.email}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <FiPhone className="text-xs" />
                                {formData.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <FiCreditCard className="text-green-500" />
                          Payment Method
                        </h3>
                        <div className="p-6 rounded-xl border bg-gray-50 border-gray-200">
                          <p className="capitalize font-medium">{formData.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={orderPlaced}
                      className={`w-full py-4 hover:cursor-pointer rounded-xl font-bold text-lg transition-all duration-200 mt-8 ${
                        orderPlaced
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
                      }`}
                    >
                      {orderPlaced ? (
                        <span className="flex items-center justify-center gap-2">
                          <FiCheck />
                          Order Placed!
                        </span>
                      ) : (
                        `Place Order - ₹${total.toFixed(2)}`
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center p-8 pt-0">
                {currentStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all duration-200 border-gray-300 hover:bg-gray-50 text-gray-600"
                  >
                    <FiArrowLeft />
                    Previous
                  </motion.button>
                )}

                {currentStep < 3 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    disabled={currentStep !== 2 ? !isShippingValid : false}
                    className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                      currentStep !== 2 && !isShippingValid
                        ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
                    }`}
                  >
                    Continue
                    <FiArrowRight />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={promoCode}
                onPromoCodeChange={handlePromoCodeChange}
                onApplyPromo={applyPromoCode}
                isDark={false}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        orderData={{ total, paymentMethod: formData.paymentMethod }}
        cartItems={mockUser.cart}
        isDark={false}
      />
    </div>
  );
};

export default CheckOutNew;