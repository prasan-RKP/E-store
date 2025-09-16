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
} from "react-icons/fi";
import ShippingForm from "./segement/ShippingForm.jsx";
import PaymentForm from "./segement/PaymentForm.jsx";
import { userAuthStore } from "../store/authStore.js";
import { TbLoader3 } from "react-icons/tb";
import SuccessModal from "./segement/SuccessModal.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { FaArrowAltCircleLeft, FaBackward } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdHighlight } from "react-icons/md";

const OrderSummary = ({
  subtotal,
  shipping,
  shippingAmount,
  handlingFee,
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
      className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${isDark
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
            <span className="text-gray-600 dark:text-gray-400">Handling Fee</span>
            <span className="font-semibold">₹{handlingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Shipping Fee</span>
            <span className="font-semibold">{shippingAmount === 0 ? "Free" : `₹${shippingAmount.toFixed(2)}`}</span>
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
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${isDark
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
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${currentStep >= step
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
            <span className={`mt-2 text-sm font-medium ${currentStep >= step
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
              }`}>
              {label}
            </span>
          </div>
          {step < 3 && (
            <div
              className={`w-20 h-1 mx-6 rounded-full transition-all duration-500 ${currentStep > step
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

// Main Component
const SimplifiedCheckout = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [cartBackup, setCartBackup] = useState([]); // backup cart
  //const [subtotal, setSubTotal] = useState(0);
  const [initialCartCheckDone, setInitialCartCheckDone] = useState(false);

  // to open/clsoe the orderSuccess modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetailsForModal, setOrderDetailsForModal] = useState(null);
  const [isGoingBack, setIsGoingBack] = useState(false);

  const { isSavingShippingAddress2, verifiedUser, isCheckingOut, checkout, placeOrder, isPlacingOrder, removeAllCartItems } = userAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentStep === 3) {
      //checkAuthVerify();
      // checkout();
    }
  }, [currentStep]);

  useEffect(() => {
    const runCheckout = async () => {
      await checkout();
    };
    runCheckout();
  }, [checkout]);

  //setting cartItems
  useEffect(() => {
    const fetchCart = async () => {
      setIsCartLoading(true);
      try {
        if (verifiedUser?.cart) {
          setCartItems(verifiedUser.cart);
          setCartBackup(cartItems); // backup cart
        }
      } finally {
        setIsCartLoading(false);
      }
    };

    fetchCart();
  }, [verifiedUser?.cart]);

  console.log("The cartBackup is here", cartBackup);


  // BackUp useEffect
  useEffect(() => {
    if (cartItems.length === 0 && cartBackup.length > 0) {
      setCartItems(cartBackup);
    }
  }, [cartItems, cartBackup]);



  console.log("CartItems from parent", verifiedUser);

  //console.log("Verified User from Parent:", verifiedUser);

  // SuccessModel Close Fucntion is here



  // new functionality start here 
  const paymentFormRef = useRef();

  const handleContinue = () => {
    if (currentStep === 2) {
      paymentFormRef.current?.submitForm(); // ← this triggers child form
    } else {
      nextStep(); // normal for other steps 
    }
  };

  // new functionality end here

  // Form Data
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "",
  });

  console.log("FormData from Parent", formData);

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");


  // Pricing
  const effectiveCart = cartItems.length > 0 ? cartItems : cartBackup;
  //const subtotal = effectiveCart.reduce((total, item) => total + item?.product?.price * item?.quantity, 0) || 0;
  const subtotal = isCartLoading ?
    // Show loading state in UI or use previous value
    cartItems.reduce((total, item) => total + item?.product?.price * item?.quantity, 0) || 0
    :
    effectiveCart.reduce((total, item) => total + item?.product?.price * item?.quantity, 0) || 0;

  const shippingCosts = { standard: 7.99, express: 15.99, overnight: 29.99 };
  const shipping = shippingCosts[shippingMethod];
  const tax = subtotal * 0.015;
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = Number(subtotal + shipping + tax - discount);
  const handlingCharge = total > 1000 ? 6 : 10;
  const shippingCharge  = total > 1000 ? 0 : 7.99;

  const now = new Date();
  const year = now.getFullYear();                        // 2025
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 07
  const date = String(now.getDate()).padStart(2, '0');       // 21
  const weekdayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayName = weekdayNames[now.getDay()];            // MON

  const orderNumber = `ORD-${year}-${month}-${date}-${dayName}`;


  // Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  
  const prevStep = async() => {
    if (currentStep === 2) {
      setIsGoingBack(true);

      // Subscribe to Zustand store updates
      const unsubscribe = userAuthStore.subscribe((state) => {
        if (state.verifiedUser?.cart && state.verifiedUser.cart.length > 0) {
          unsubscribe();
          setIsGoingBack(false);
          setCartItems(state.verifiedUser.cart); // refresh local cart
          setCurrentStep(1); // only go back when ready
        }
      });

      // Trigger a refresh of checkout/cart if needed
     //await checkout();
     window.location.reload();
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };



  //if someone having no cart item then he/she should navigate to homePage
  // conditional rendering test - 1



  // conditional rendering test - 3
  useEffect(() => {
    // Only check for empty cart when initially loading the checkout page
    if (currentStep === 1 && !isCartLoading && cartItems.length === 0) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
        toast.info("Your cart is empty ☹️");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isCartLoading, cartItems.length, navigate]);




  // Success Modal Close Handler
  const successModalCloseHandler = async () => {
    try {
      // 1️⃣ Close the modal UI
      setShowSuccessModal(false);
      setOrderPlaced(false);

      // 2️⃣ Clear the cart in the backend / global store
      await removeAllCartItems();        // waits for server → store to settle

      // 3️⃣ Clear local UI copy (not strictly required, but keeps things tidy)
      setCartItems([]);

      // 4️⃣ Soft‑navigate to the homepage (SPA‑style, no full reload)
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Failed to clear cart or navigate:", err);
      // Even if something goes wrong, fall back to a hard redirect
      window.location.href = "/";
    }
  };


  console.log("Checking the verofiedUser whole data", verifiedUser?.cart);

  const handleSubmit = async () => {
    // STEP 1️⃣: Prepare data for BACKEND API
    const backendOrderData = {
      shippingAddress: verifiedUser?.address,
      customerName: verifiedUser?.username,
      customerEmail: verifiedUser?.email,
      customerPhoneNo: verifiedUser?.contact,
      orderNumber: orderNumber,
      totalAmount: total,
      paymentMethod: verifiedUser?.paymentMethod,
      deliveryTime: "3-4 days",
      zipCode: verifiedUser?.zipCode,
      //update made here
      carts: verifiedUser?.cart

    };

    // STEP 2️⃣: Prepare data for SuccessModal (Frontend only)
    const frontendOrderData = {
      verifiedUser: {
        username: verifiedUser?.username,
        email: verifiedUser?.email,
        contact: verifiedUser?.contact,
        address: verifiedUser?.address,
        city: verifiedUser?.city,
        state: verifiedUser?.state,
        zipCode: verifiedUser?.zipCode,
        paymentMethod: verifiedUser?.paymentMethod,
      },
    };

    // STEP 3️⃣: Place Order & show SuccessModal
    try {
      await placeOrder(backendOrderData); // 🔄 Backend API call
      setOrderPlaced(true);
      setOrderDetailsForModal(frontendOrderData); // 🎉 For SuccessModal only
      setShowSuccessModal(true); // ✅ Show modal
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };


  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${isDark
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900"
        }`}
    >
      {/* Header */}
      <header
        className={`border-b backdrop-blur-sm transition-all duration-300 ${isDark
          ? "border-gray-700/50 bg-gray-900/80"
          : "border-gray-200/50 bg-white/80"
          }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FiShoppingCart className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Luxe
                </h1>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiStar className="text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              {/* NavItems added here */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-200 ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-green-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  } transform hover:scale-105 active:scale-95`}
              >
                <FaArrowAltCircleLeft className="text-lg" />
              </button>
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-200 ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-violet-500"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  } transform hover:scale-105 active:scale-95`}
              >
                <HiHome className="text-lg" />
              </button>
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-200 ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  } transform hover:scale-105 active:scale-95`}
              >
                {isDark ? <MdHighlight className="text-lg" /> : <FiMoon className="text-lg" />}
              </button>
              
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className={`border-b ${isDark ? "border-gray-700/50" : "border-gray-200/50"}`}>
        <div className="container mx-auto px-6">
          <ProgressBar currentStep={currentStep} isDark={isDark} />
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
              className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${isDark
                ? "border-gray-700/50 bg-gray-800/80 shadow-xl shadow-gray-900/20"
                : "border-gray-200/50 bg-white/80 shadow-xl shadow-gray-100/20"
                }`}
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
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <FiTruck className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Shipping Information</h2>
                        <p className="text-gray-600 dark:text-gray-400">Where should we deliver your order?</p>
                      </div>
                    </div>

                    <ShippingForm
                      nextstep={nextStep}
                      formData={formData}
                      setFormData={setFormData}
                      onShippingValid={() => setIsShippingValid(true)}
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
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <FiCreditCard className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Payment Information</h2>
                        <p className="text-gray-600 dark:text-gray-400">Choose your preferred payment method</p>
                      </div>
                    </div>

                    <PaymentForm
                      ref={paymentFormRef}
                      payMode={verifiedUser?.paymentMethod}
                      formData={formData}
                      setFormData={setFormData}
                      onShippingValid={() => setIsShippingValid(true)}
                      nextstep={nextStep}
                      isDark={isDark}
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
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <FiCheck className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Review Order</h2>
                        <p className="text-gray-600 dark:text-gray-400">Please review your order details</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <FiMapPin className="text-blue-500" />
                          Shipping Details
                        </h3>
                        <div
                          className={`p-6 rounded-xl border transition-all duration-200 ${isDark
                            ? "bg-gray-700/50 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                            }`}
                        >
                          <div className="space-y-2">
                            <p className="font-medium">{verifiedUser?.username}</p>
                            <p className="text-gray-600 dark:text-gray-400">{verifiedUser?.address}</p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {verifiedUser?.city}, {verifiedUser?.state} {verifiedUser?.zipCode}
                            </p>
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                              <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <FiMail className="text-xs" />
                                {verifiedUser?.email}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <FiPhone className="text-xs" />
                                {verifiedUser?.contact}
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
                        <div
                          className={`p-6 rounded-xl border transition-all duration-200 ${isDark
                            ? "bg-gray-700/50 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                            }`}
                        >
                          <p className="capitalize font-medium">{verifiedUser?.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={orderPlaced || isPlacingOrder}
                      className={`w-full py-4 hover:cursor-pointer rounded-xl font-bold text-lg transition-all duration-200 mt-8 ${orderPlaced || isPlacingOrder
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
                        }`}
                    >
                      {isPlacingOrder ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="loader border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin" />
                          Placing Order...
                        </span>
                      ) : orderPlaced ? (
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

              {/* Navigation */}
              <div className="flex justify-between items-center p-8 pt-0">
                {currentStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevStep}
                    disabled={isGoingBack} // ✅ Only disable when loading back
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all duration-200 ${isDark
                      ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                      : "border-gray-300 hover:bg-gray-50 text-gray-600"
                      } ${isGoingBack ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isGoingBack ? (
                      <>
                        <TbLoader3 className="h-5 w-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <FiArrowLeft />
                        Previous
                      </>
                    )}
                  </motion.button>
                )}


                {currentStep < 3 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    disabled={currentStep !== 2 ? !isShippingValid : false}
                    className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 ${currentStep !== 2 && !isShippingValid
                      ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30"
                      }`}
                  >
                    {isSavingShippingAddress2 ? (
                      <TbLoader3 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Continue
                        <FiArrowRight />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                handlingFee={handlingCharge}
                shippingAmount={shippingCharge}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={promoCode}
                onPromoCodeChange={handlePromoCodeChange}
                onApplyPromo={applyPromoCode}
                isDark={isDark}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* SuccessModal will show here */}
      {/* <SuccessModal
        isOpen={showSuccessModal}
        onClose={successModalCloseHandler}
        orderData={{ total, verifiedUser }}
        isDark={isDark}
        orderNumber={orderNumber}
      /> */}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={successModalCloseHandler}
        orderData={orderDetailsForModal} // ✅ this now has full UI info
        isDark={isDark}
        orderNumber={orderNumber}
        totalAmount={total}
      />
    </div>
  );
};

export default SimplifiedCheckout;