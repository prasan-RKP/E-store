import React, { useState, useRef, useEffect } from "react";
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
  FiHeart,
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiRefreshCw,
  FiClock,
} from "react-icons/fi";
import { userAuthStore } from "../store/authStore.js";
import CheckOutSkeleton from "../skeletons/CheckOutSkeleton.jsx";
import { useLocation } from "react-router-dom";
import Shipping from "./Checkout/Shipping.jsx";
import OrderSummary from "./Checkout/OrderSummary.jsx";

const MyCheckOut = () => {
  const formRef = useRef();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [isDark, setIsDark] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      price: 399.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Laptop Pro 16-inch",
      price: 1299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    },
  ]);

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const location = useLocation();
  const myCartTotal = location.state?.total.toFixed(2);

  //   ------ 'UseAuthStore.js Access -----
  const { isFetchingShippingAddress, setShippingAddress, cartTotal } =
    userAuthStore();

  ///set the total price
  //let myCartTotal = userAuthStore((state)=> state.cartTotal)
  console.log("The total cartPrice", myCartTotal);
  useEffect(() => {
    setTotalPrice(myCartTotal);
  }, [myCartTotal]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const theme = newTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  };

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  const subtotal = Number(myCartTotal) || 0;

  const shipping =
    shippingMethod === "express"
      ? 15.99
      : shippingMethod === "overnight"
      ? 29.99
      : 7.99;
  const tax = subtotal * 0.08;
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + shipping + tax - discountAmount;

  const applyPromoCode = () => {
    const codes = {
      SAVE10: 10,
      WELCOME20: 20,
      FIRST15: 15,
    };
    if (codes[promoCode.toUpperCase()]) {
      setDiscount(codes[promoCode.toUpperCase()]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log("Form submitted with data:", formData);
    nextStep();
  };

  //   All the frontend-backend connections here..
  useEffect(() => {}, []);

  // frontend-backend connections Ends here...

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  console.log("myFormData", formData);

  return (
    <>
      {isFetchingShippingAddress ? (
        <CheckOutSkeleton />
      ) : (
        <div
          className={`min-h-screen transition-all duration-500 ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
              : "bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900"
          }`}
        >
          {/* Header */}
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`sticky top-0 z-50 border-b transition-all duration-500 backdrop-blur-xl ${
              isDark
                ? "bg-black/80 border-gray-800 shadow-lg shadow-black/20"
                : "bg-white/80 border-gray-200 shadow-lg shadow-black/5"
            }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div
                  className={`p-2 rounded-xl ${
                    isDark
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600"
                  }`}
                >
                  <FiShoppingCart className="text-xl text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CheckoutPro
                  </span>
                  <p className="text-xs opacity-60 hidden sm:block">
                    Secure & Fast
                  </p>
                </div>
              </motion.div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  <FiLock className="text-green-500" />
                  <span>Secure Checkout</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDark
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-400/25"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                  }`}
                >
                  {isDark ? (
                    <FiSun className="text-lg" />
                  ) : (
                    <FiMoon className="text-lg" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.header>
          {/* Progress Bar */}

          <div
            className={`border-b ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="relative max-w-2xl mx-auto">
                {/* Static background bar */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-0" />

                {/* Dynamic progress fill */}
                <div
                  className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-10 transition-all duration-500"
                  style={{
                    width:
                      currentStep === 1
                        ? "0%"
                        : currentStep === 2
                        ? "50%"
                        : orderPlaced
                        ? "100%"
                        : "50%",
                  }}
                />

                {/* Circles + Labels */}
                <div className="relative flex items-center justify-between z-20">
                  {[1, 2, 3].map((step) => (
                    <motion.div
                      key={step}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: step * 0.1 }}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                            currentStep > step || (step === 3 && orderPlaced)
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                              : currentStep === step
                              ? "ring-4 ring-blue-500 bg-white text-blue-600 font-extrabold"
                              : isDark
                              ? "bg-gray-800 text-gray-400 border-2 border-gray-700"
                              : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                          }`}
                        >
                          {currentStep > step || (step === 3 && orderPlaced) ? (
                            <FiCheck className="text-lg" />
                          ) : (
                            step
                          )}
                        </div>
                        {(currentStep > step ||
                          (step === 3 && orderPlaced)) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25"
                          />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          currentStep >= step || (step === 3 && orderPlaced)
                            ? "text-blue-600"
                            : "opacity-60"
                        }`}
                      >
                        {step === 1
                          ? "Shipping"
                          : step === 2
                          ? "Payment"
                          : "Confirm"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* // Replace your existing per-step connector logic with this single container
// This ensures 0%, 50%, and 100% fill states work perfectly across 3 steps */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
              {/* Main Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-3"
              >
                <AnimatePresence mode="wait">
                  {/* Step 1: Shipping Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`rounded-2xl border transition-all duration-500 ${
                        isDark
                          ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl shadow-black/20"
                          : "border-gray-200 bg-white shadow-xl shadow-black/5"
                      }`}
                    >
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center space-x-3 mb-8">
                          <div
                            className={`p-3 rounded-xl ${
                              isDark
                                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                : "bg-gradient-to-r from-blue-500 to-indigo-600"
                            }`}
                          >
                            <FiTruck className="text-xl text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Shipping Information
                            </h2>
                            <p className="text-sm opacity-60">
                              Where should we send your order?
                            </p>
                          </div>
                        </div>

                        {/* Shipping form starts here */}
                        {/* form segment start here .. */}
                        {/* <Shipping nextStep={nextStep} isDark={isDark} /> */}
                        <div>
                              <form onSubmit={handleFormSubmit} ref={formRef} className="space-y-6">
                                {/* Contact Information */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                                    <FiUser className="text-blue-500" />
                                    <span>Contact Information</span>
                                  </h3>
                        
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">Email Address</label>
                                      <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                          type="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleInputChange}
                                          className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                                            isDark
                                              ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                              : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                          } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                          placeholder="john@example.com"
                                        />
                                      </div>
                                    </div>
                        
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">Phone Number</label>
                                      <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                          type="tel"
                                          name="phone"
                                          value={formData.phone}
                                          onChange={handleInputChange}
                                          className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                                            isDark
                                              ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                              : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                          } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                          placeholder="+1 (555) 123-4567"
                                        />
                                      </div>
                                    </div>
                                  </div>
                        
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">Username</label>
                                      <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                          isDark
                                            ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                            : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                        } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                        placeholder="@John Doe.."
                                      />
                                    </div>
                                  </div>
                                </div>
                        
                                {/* Shipping Address */}
                                <div className="space-y-4">
                                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                                    <FiMapPin className="text-blue-500" />
                                    <span>Shipping Address</span>
                                  </h3>
                        
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">
                                        Street Address
                                      </label>
                                      <div className="relative">
                                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                          type="text"
                                          name="address"
                                          value={formData.address}
                                          onChange={handleInputChange}
                                          className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                                            isDark
                                              ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                              : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                          } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                          placeholder="123 Main Street"
                                        />
                                      </div>
                                    </div>
                        
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                      <div className="space-y-2">
                                        <label className="block text-sm font-medium">City</label>
                                        <input
                                          type="text"
                                          name="city"
                                          value={formData.city}
                                          onChange={handleInputChange}
                                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                            isDark
                                              ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                              : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                          } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                          placeholder="New York"
                                        />
                                      </div>
                        
                                      <div className="space-y-2">
                                        <label className="block text-sm font-medium">State</label>
                                        <input
                                          type="text"
                                          name="state"
                                          value={formData.state}
                                          onChange={handleInputChange}
                                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                            isDark
                                              ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                              : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                          } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                          placeholder="NY"
                                        />
                                      </div>
                        
                                      <div className="space-y-2">
                                        <label className="block text-sm font-medium">ZIP Code</label>
                                        <input
                                          type="text"
                                          name="zipCode"
                                          value={formData.zipCode}
                                          onChange={handleInputChange}
                                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                            isDark
                                              ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                              : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                          } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                          placeholder="10001"
                                        />
                                      </div>
                                    </div>
                        
                                    <div className="space-y-2">
                                      <label className="block text-sm font-medium">Country</label>
                                      <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                          isDark
                                            ? "border-gray-700 bg-gray-800 focus:border-blue-500 focus:bg-gray-700"
                                            : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:bg-white"
                                        } focus:ring-4 focus:ring-blue-500/20 focus:outline-none`}
                                      >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                        
                                {/* Shipping Forms Ends here */}
                        
                                {/* Shipping Methods */}
                                
                              </form>
                            </div>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">
                            Shipping Method
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                id: "standard",
                                name: "Standard Shipping",
                                time: "5-7 business days",
                                price: 7.99,
                                icon: FiTruck,
                              },
                              {
                                id: "express",
                                name: "Express Shipping",
                                time: "2-3 business days",
                                price: 15.99,
                                icon: FiRefreshCw,
                              },
                              {
                                id: "overnight",
                                name: "Overnight Shipping",
                                time: "Next business day",
                                price: 29.99,
                                icon: FiClock,
                              },
                            ].map((method) => (
                              <motion.label
                                key={method.id}
                                whileHover={{ scale: 1.02 }}
                                className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                  shippingMethod === method.id
                                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/20"
                                    : isDark
                                    ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="shipping"
                                  value={method.id}
                                  checked={shippingMethod === method.id}
                                  onChange={(e) =>
                                    setShippingMethod(e.target.value)
                                  }
                                  className="sr-only"
                                />
                                <method.icon
                                  className={`mr-4 text-xl ${
                                    shippingMethod === method.id
                                      ? "text-blue-500"
                                      : "text-gray-400"
                                  }`}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold">
                                      {method.name}
                                    </span>
                                    <span className="font-bold text-lg">
                                      ₹{method.price}
                                    </span>
                                  </div>
                                  <span className="text-sm opacity-75">
                                    {method.time}
                                  </span>
                                </div>
                              </motion.label>
                            ))}
                          </div>
                        </div>
                        {/* form segment ends here .. */}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Payment Information */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`rounded-2xl border transition-all duration-500 ${
                        isDark
                          ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl shadow-black/20"
                          : "border-gray-200 bg-white shadow-xl shadow-black/5"
                      }`}
                    >
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center space-x-3 mb-8">
                          <div
                            className={`p-3 rounded-xl ${
                              isDark
                                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                                : "bg-gradient-to-r from-green-500 to-emerald-600"
                            }`}
                          >
                            <FiCreditCard className="text-xl text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Payment Information
                            </h2>
                            <p className="text-sm opacity-60">
                              How would you like to pay?
                            </p>
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">
                              Payment Method
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {[
                                {
                                  id: "card",
                                  name: "Credit Card",
                                  icon: FiCreditCard,
                                },
                                { id: "paypal", name: "PayPal", icon: FiUser },
                                {
                                  id: "apple",
                                  name: "Apple Pay",
                                  icon: FiPhone,
                                },
                              ].map((method) => (
                                <motion.label
                                  key={method.id}
                                  whileHover={{ scale: 1.05 }}
                                  className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                    paymentMethod === method.id
                                      ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg shadow-green-500/20"
                                      : isDark
                                      ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                                      : "border-gray-300 bg-gray-50 hover:border-gray-400"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="payment"
                                    value={method.id}
                                    checked={paymentMethod === method.id}
                                    onChange={(e) =>
                                      setPaymentMethod(e.target.value)
                                    }
                                    className="sr-only"
                                  />
                                  <method.icon
                                    className={`mr-2 text-xl ${
                                      paymentMethod === method.id
                                        ? "text-green-500"
                                        : "text-gray-400"
                                    }`}
                                  />
                                  <span className="font-semibold">
                                    {method.name}
                                  </span>
                                </motion.label>
                              ))}
                            </div>
                          </div>

                          {/* Credit Card Form */}
                          {paymentMethod === "card" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="space-y-4"
                            >
                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Card Number
                                </label>
                                <div className="relative">
                                  <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                                      isDark
                                        ? "border-gray-700 bg-gray-800 focus:border-green-500 focus:bg-gray-700"
                                        : "border-gray-300 bg-gray-50 focus:border-green-500 focus:bg-white"
                                    } focus:ring-4 focus:ring-green-500/20 focus:outline-none`}
                                    placeholder="1234 5678 9012 3456"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2 sm:col-span-2">
                                  <label className="block text-sm font-medium">
                                    Expiry Date
                                  </label>
                                  <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                      isDark
                                        ? "border-gray-700 bg-gray-800 focus:border-green-500 focus:bg-gray-700"
                                        : "border-gray-300 bg-gray-50 focus:border-green-500 focus:bg-white"
                                    } focus:ring-4 focus:ring-green-500/20 focus:outline-none`}
                                    placeholder="MM/YY"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">
                                    CVV
                                  </label>
                                  <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                      type="text"
                                      name="cvv"
                                      value={formData.cvv}
                                      onChange={handleInputChange}
                                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                                        isDark
                                          ? "border-gray-700 bg-gray-800 focus:border-green-500 focus:bg-gray-700"
                                          : "border-gray-300 bg-gray-50 focus:border-green-500 focus:bg-white"
                                      } focus:ring-4 focus:ring-green-500/20 focus:outline-none`}
                                      placeholder="123"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium">
                                  Name on Card
                                </label>
                                <input
                                  type="text"
                                  name="nameOnCard"
                                  value={formData.nameOnCard}
                                  onChange={handleInputChange}
                                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                                    isDark
                                      ? "border-gray-700 bg-gray-800 focus:border-green-500 focus:bg-gray-700"
                                      : "border-gray-300 bg-gray-50 focus:border-green-500 focus:bg-white"
                                  } focus:ring-4 focus:ring-green-500/20 focus:outline-none`}
                                  placeholder="John Doe"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Confirmation */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`rounded-2xl border transition-all duration-500 ${
                        isDark
                          ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl shadow-black/20"
                          : "border-gray-200 bg-white shadow-xl shadow-black/5"
                      }`}
                    >
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center space-x-3 mb-8">
                          <div
                            className={`p-3 rounded-xl ${
                              isDark
                                ? "bg-gradient-to-r from-purple-600 to-blue-600"
                                : "bg-gradient-to-r from-indigo-500 to-blue-600"
                            }`}
                          >
                            <FiCheck className="text-xl text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Order Confirmation
                            </h2>
                            <p className="text-sm opacity-60">
                              Review your order details
                            </p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Shipping Information
                            </h3>
                            <div
                              className={`p-4 border-red-600 rounded-xl ${
                                isDark ? "bg-gray-800" : "bg-gray-50"
                              }`}
                            >
                              <p>
                                {formData.firstName} {formData.lastName}
                              </p>
                              <p>{formData.address}</p>
                              <p>
                                {formData.city}, {formData.state}{" "}
                                {formData.zipCode}
                              </p>
                              <p>{formData.country}</p>
                              <p>{formData.email}</p>
                              <p>{formData.phone}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Payment Method
                            </h3>
                            <div
                              className={`p-4 rounded-xl ${
                                isDark ? "bg-gray-800" : "bg-gray-50"
                              }`}
                            >
                              <p className="capitalize">{paymentMethod}</p>
                              {paymentMethod === "card" &&
                                formData.cardNumber && (
                                  <p>
                                    Card ending in
                                    {formData.cardNumber.slice(-4)}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Order Summary
                            </h3>
                            <div className="space-y-2">
                              {cartItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between"
                                >
                                  <span>
                                    {item.name} x {item.quantity}
                                  </span>
                                  <span>
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 border-t pt-4 space-y-1">
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{shipping.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                              </div>
                              {discount > 0 && (
                                <div className="flex justify-between text-green-500">
                                  <span>Discount ({discount}%)</span>
                                  <span>-₹{discountAmount.toFixed(2)}</span>
                                </div>
                              )}
                              <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-8">
                            <motion.button
                              disabled={orderPlaced}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                // Trigger the alert first
                                alert("Order placed!");

                                // Then visually complete the progress bar
                                requestAnimationFrame(() => {
                                  setOrderPlaced(true);
                                  setCurrentStep(3); // Force it to reach the 'Confirm' circle
                                });
                              }}
                              className={`px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 ${
                                orderPlaced
                                  ? "bg-gray-400 cursor-not-allowed text-white"
                                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              }`}
                            >
                              {orderPlaced ? "Order Placed" : "Place Order"}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                  {currentStep > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={prevStep}
                      className={`flex items-center px-6 py-3 rounded-xl border font-semibold transition-all duration-300 ${
                        isDark
                          ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <FiArrowLeft className="mr-2" />
                      Previous
                    </motion.button>
                  )}
                  {currentStep < 3 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="hover:cursor-pointer ml-auto flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20"
                    >
                      Continue
                      <FiArrowRight className="ml-2" />
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Order Summary Sidebar */}
              <OrderSummary
                isDark={isDark}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                discountAmount={discountAmount}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                applyPromoCode={applyPromoCode}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCheckOut;
