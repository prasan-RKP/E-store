import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
  FiTrash2,
  FiPlus,
  FiMinus,
  FiCheck,
  FiGift,
  FiPercent,
  FiStar,
  FiHeart,
  FiEye,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

const Checkout = () => {
  const formRef = useRef();
  const [isDark, setIsDark] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 324,
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      price: 399.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 512,
    },
    {
      id: 3,
      name: "Laptop Pro 16-inch",
      price: 1299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 892,
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

  const featuredProducts = [
    {
      id: 4,
      name: "Gaming Mouse RGB",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
      rating: 4.8,
    },
    {
      id: 6,
      name: "4K Webcam",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=300&fit=crop",
      rating: 4.5,
    },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const theme = newTheme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log("Form submitted with data:", formData);
    nextStep();
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
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

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          isDark ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
        } backdrop-blur-md`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <FiShoppingCart className="text-2xl" />
            <span className="text-xl font-bold">CheckoutPro</span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <FiLock className="text-green-500" />
              <span>Secure Checkout</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div
        className={`border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: step * 0.1 }}
                className="flex items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep >= step
                      ? "bg-black text-white"
                      : isDark
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? <FiCheck /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      currentStep > step
                        ? "bg-black"
                        : isDark
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span>Cart</span>
            <span>Shipping</span>
            <span>Payment</span>
            <span>Confirm</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`rounded-lg border p-6 ${
                    isDark
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FiShoppingCart className="mr-2" />
                    Shopping Cart ({cartItems.length} items)
                  </h2>

                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          isDark
                            ? "border-gray-700 bg-gray-800"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <div className="flex items-center space-x-1 mt-1">
                              <FiStar className="text-yellow-500 text-sm" />
                              <span className="text-sm">{item.rating}</span>
                              <span className="text-sm text-gray-500">
                                ({item.reviews} reviews)
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold">
                                ₹{item.price}
                              </span>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className={`p-1 rounded ${
                                    isDark
                                      ? "bg-gray-700 hover:bg-gray-600"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                                >
                                  <FiMinus />
                                </motion.button>
                                <span className="px-3 py-1 rounded bg-black text-white">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className={`p-1 rounded ${
                                    isDark
                                      ? "bg-gray-700 hover:bg-gray-600"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                                >
                                  <FiPlus />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeItem(item.id)}
                                  className="p-1 rounded text-red-500 hover:bg-red-50"
                                >
                                  <FiTrash2 />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recommended Products */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FiGift className="mr-2" />
                      You might also like
                    </h3>
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={20}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                      }}
                      className="pb-12"
                    >
                      {featuredProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                          <motion.div
                            whileHover={{ y: -5 }}
                            className={`p-4 rounded-lg border ${
                              isDark
                                ? "border-gray-700 bg-gray-800"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-medium mb-1">{product.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="font-bold ">
                                ₹{product.price}
                              </span>
                              <div className="flex items-center space-x-1">
                                <FiStar className="text-yellow-500 text-sm" />
                                <span className="text-sm">
                                  {product.rating}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              Add to Cart
                            </motion.button>
                          </motion.div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`rounded-lg border p-6 ${
                    isDark
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FiTruck className="mr-2" />
                    Shipping Information
                  </h2>

                  <form onSubmit={handleFormSubmit} ref={formRef}>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* LEFT SECTION */}

                      <div className="space-y-4">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <FiMail className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        {/* Username */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            UserName
                          </label>
                          <div className="relative">
                            <FiUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="John"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone
                          </label>
                          <div className="relative">
                            <FiPhone className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SECTION */}
                      <div className="space-y-4">
                        {/* Address */}
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Address
                          </label>
                          <div className="relative">
                            <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="123 Main Street"
                            />
                          </div>
                        </div>

                        {/* City + State */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="NY"
                            />
                          </div>
                        </div>

                        {/* ZIP Code + Country */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="10001"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Country
                            </label>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
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
                    </div>
                  </form>

                  {/* Shipping Methods */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          id: "standard",
                          name: "Standard Shipping",
                          time: "5-7 business days",
                          price: 7.99,
                        },
                        {
                          id: "express",
                          name: "Express Shipping",
                          time: "2-3 business days",
                          price: 15.99,
                        },
                        {
                          id: "overnight",
                          name: "Overnight Shipping",
                          time: "Next business day",
                          price: 29.99,
                        },
                      ].map((method) => (
                        <motion.label
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                            shippingMethod === method.id
                              ? "border-black bg-black text-white"
                              : isDark
                              ? "border-gray-700 bg-gray-800"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{method.name}</span>
                              <span className="font-bold">${method.price}</span>
                            </div>
                            <span className="text-sm opacity-75">
                              {method.time}
                            </span>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`rounded-lg border p-6 ${
                    isDark
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FiCreditCard className="mr-2" />
                    Payment Information
                  </h2>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: "card", name: "Credit Card", icon: FiCreditCard },
                        { id: "paypal", name: "PayPal", icon: FiUser },
                        { id: "apple", name: "Apple Pay", icon: FiPhone },
                      ].map((method) => (
                        <motion.label
                          key={method.id}
                          whileHover={{ scale: 1.05 }}
                          className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer ${
                            paymentMethod === method.id
                              ? "border-black bg-black text-white"
                              : isDark
                              ? "border-gray-700 bg-gray-800"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <method.icon className="mr-2" />
                          <span className="font-medium">{method.name}</span>
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
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                              isDark
                                ? "border-gray-700 bg-gray-800"
                                : "border-gray-300 bg-white"
                            } focus:ring-2 focus:ring-black focus:border-black`}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isDark
                                ? "border-gray-700 bg-gray-800"
                                : "border-gray-300 bg-white"
                            } focus:ring-2 focus:ring-black focus:border-black`}
                            placeholder="MM/YY"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            CVV
                          </label>
                          <div className="relative">
                            <FiLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                isDark
                                  ? "border-gray-700 bg-gray-800"
                                  : "border-gray-300 bg-white"
                              } focus:ring-2 focus:ring-black focus:border-black`}
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isDark
                              ? "border-gray-700 bg-gray-800"
                              : "border-gray-300 bg-white"
                          } focus:ring-2 focus:ring-black focus:border-black`}
                          placeholder="John Doe"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Security Features */}
                  <div
                    className={`mt-6 p-4 rounded-lg ${
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FiLock className="text-green-500" />
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-sm opacity-75">
                          Your payment information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Order Confirmation */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`rounded-lg border p-6 ${
                    isDark
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <FiCheck className="mr-2 text-green-500" />
                    Order Confirmation
                  </h2>

                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Order Summary
                      </h3>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Shipping Information
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${
                          isDark ? "bg-gray-800" : "bg-white"
                        }`}
                      >
                        <p>{formData.username}</p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.country}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Payment Method
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${
                          isDark ? "bg-gray-800" : "bg-white"
                        }`}
                      >
                        <p className="capitalize">{paymentMethod}</p>
                        {paymentMethod === "card" && formData.cardNumber && (
                          <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                        )}
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`p-6 rounded-lg border-2 border-green-500 ${
                        isDark ? "bg-green-900/20" : "bg-green-50"
                      }`}
                    >
                      <div className="text-center">
                        <FiCheck className="text-4xl text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          Order Placed Successfully!
                        </h3>
                        <p className="text-green-600">
                          Order #ORD-2024-
                          {Math.random()
                            .toString(36)
                            .substr(2, 9)
                            .toUpperCase()}
                        </p>
                        <p className="mt-2 text-sm opacity-75">
                          You will receive a confirmation email shortly
                        </p>
                      </div>
                    </motion.div>
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
                  className={`flex items-center px-6 py-3 rounded-lg border ${
                    isDark
                      ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <FiArrowLeft className="mr-2" />
                  Previous
                </motion.button>
              )}

              {currentStep < 4 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="Submit"
                  onClick={(e) => {
                    const form = document.querySelector("form");
                    if (form) {
                      e.preventDefault();
                      // manually trigger form submit
                      form.requestSubmit();
                    } else {
                      nextStep(); // No form present, proceed normally
                    }
                  }}
                  className="ml-auto flex items-center px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800"
                >
                  {currentStep === 3 ? "Place Order" : "Continue"}
                  <FiArrowRight className="ml-2" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-lg border p-6 h-fit sticky top-24 ${
              isDark
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>

            <div className="space-y-3">
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

              <hr className={isDark ? "border-gray-700" : "border-gray-300"} />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-300 bg-white"
                  } focus:ring-2 focus:ring-black focus:border-black`}
                  placeholder="Enter code"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Apply
                </motion.button>
              </div>
              <p className="text-xs mt-1 opacity-75">
                Try: SAVE10, WELCOME20, FIRST15
              </p>
            </div>

            {/* Trust Badges */}
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
