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
} from "react-icons/fi";
import ShippingForm from "./segement/ShippingForm.jsx";
import PaymentForm from "./segement/PaymentForm.jsx";
import { userAuthStore } from "../store/authStore.js";
import { TbLoader3 } from "react-icons/tb";

// Simplified Form Components
// const ShippingForm = ({ formData, onChange, isDark }) => (

// );

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
  <div
    className={`rounded-lg border p-6 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      }`}
  >
    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

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
          <span>Discount</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
      )}
      <hr className={isDark ? "border-gray-700" : "border-gray-200"} />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>

    <div className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={onPromoCodeChange}
          placeholder="Promo code"
          className={`flex-1 px-3 py-2 rounded border ${isDark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-300 bg-white"
            } focus:border-blue-500 focus:outline-none`}
        />
        <button
          onClick={onApplyPromo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ currentStep, isDark }) => (
  <div className="flex items-center justify-center space-x-8 py-6">
    {[
      { step: 1, label: "Shipping" },
      { step: 2, label: "Payment" },
      { step: 3, label: "Review" },
    ].map(({ step, label }) => (
      <div key={step} className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${currentStep >= step
            ? "bg-blue-500 text-white"
            : isDark
              ? "bg-gray-700 text-gray-400"
              : "bg-gray-200 text-gray-500"
            }`}
        >
          {currentStep > step ? <FiCheck /> : step}
        </div>
        {step < 3 && (
          <div
            className={`w-16 h-0.5 mx-4 ${currentStep > step
              ? "bg-blue-500"
              : isDark
                ? "bg-gray-700"
                : "bg-gray-200"
              }`}
          />
        )}
      </div>
    ))}
  </div>
);

// Main Component
const SimplifiedCheckout = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isShippingValid, setIsShippingValid] = useState(false);


  const { isSavingShippingAddress2,  checkAuthVerify, verifiedUser} = userAuthStore();


  useEffect(() => {
  if (currentStep === 3) {
    checkAuthVerify();
  }
}, [currentStep]);

console.log("Verified User from Parent:", verifiedUser);

  // new functionality start here 
  const paymentFormRef = useRef();

  const handleContinue = () => {
    if (currentStep === 2) {
      paymentFormRef.current?.submitForm(); // ← this triggers child form
    }
    else {
      nextStep(); // normal for other steps 
    }
  }

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
  //const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [promoCode, setPromoCode] = useState("");

  // Pricing
  const subtotal = 1999.97; // Example total from your cart
  const shippingCosts = { standard: 7.99, express: 15.99, overnight: 29.99 };
  const shipping = shippingCosts[shippingMethod];
  const tax = subtotal * 0.08;
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  // Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //console.log('formData after selecting Pay-method',paymentMethod);

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
    // Validate promo code here
    console.log("Applying promo code:", promoCode);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // check form validtion for that any of the filed should not missed out

  const handleSubmit = async () => {
    // Handle order submission
    const orderData = {
      ...formData,
      shippingMethod,
      paymentMethod,
      promoCode,
      total,
    };

    console.log("Order data:", orderData);

    // Simulate API call
    try {
      // await submitOrder(orderData);
      setOrderPlaced(true);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
    >
      {/* Header */}
      <header
        className={`border-b ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiShoppingCart className="text-2xl text-blue-500" />
            <span className="text-xl font-bold">Luxe</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div
        className={`border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
      >
        <ProgressBar currentStep={currentStep} isDark={isDark} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-lg border p-6 ${isDark
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-white"
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
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <FiTruck className="text-2xl text-blue-500" />
                      <h2 className="text-2xl font-bold">
                        Shipping Information
                      </h2>
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
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <FiCreditCard className="text-2xl text-green-500" />
                      <h2 className="text-2xl font-bold">
                        Payment Information
                      </h2>
                    </div>

                    <PaymentForm
                      ref={paymentFormRef}
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
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <FiCheck className="text-2xl text-purple-500" />
                      <h2 className="text-2xl font-bold">Review Order</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Shipping Details</h3>
                        <div
                          className={`p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"
                            }`}
                        >
                          <p>{verifiedUser?.username}</p>
                          <p>{verifiedUser?.address}</p>
                          <p>
                            {verifiedUser?.city}, {verifiedUser?.state} {verifiedUser?.zipCode}
                          </p>
                          <p>
                            {verifiedUser?.email} • {verifiedUser?.contact}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <div
                          className={`p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"
                            }`}
                        >
                          <p className="capitalize">{verifiedUser?.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={orderPlaced}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${orderPlaced
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        }`}
                    >
                      {orderPlaced
                        ? "Order Placed!"
                        : `Place Order - ₹${total.toFixed(2)}`}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border font-medium transition-colors ${isDark
                      ? "border-gray-600 hover:bg-gray-700"
                      : "border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <FiArrowLeft />
                    Previous
                  </button>
                )}

                {currentStep < 3 && (
                  <button
                    onClick={handleContinue} // ✅ calls your custom logic
                    disabled={currentStep !== 2 ? !isShippingValid : false} // ✅ only disables on shipping step
                    className={`hover:cursor-pointer ml-auto flex items-center gap-2 px-6 py-3 rounded-lg font-medium
                     ${currentStep !== 2 && !isShippingValid
                        ? "opacity-50 cursor-not-allowed bg-blue-300"
                        : "bg-blue-500 hover:bg-blue-600"
                      }
                    text-white`}
                  >
                    {isSavingShippingAddress2 ? <TbLoader3 className="h-7 w-7 animate-spin" /> : "Continue"}
                    <FiArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
              promoCode={promoCode}
              onPromoCodeChange={handlePromoCodeChange}
              onApplyPromo={applyPromoCode}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedCheckout;
