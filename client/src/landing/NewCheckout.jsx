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
    FiHome,
    FiPackage,
    FiHeart,
    FiGift,
} from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, onNavigateHome, onNavigateOrders, total, isDark }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 7000); // Auto close after 7 seconds

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className={`relative w-full max-w-md rounded-3xl border backdrop-blur-xl shadow-2xl ${isDark
                            ? "border-gray-700/50 bg-gray-800/90 text-white"
                            : "border-gray-200/50 bg-white/90 text-gray-900"
                        }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${isDark
                                ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <FiX className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <div className="p-8 text-center">
                        {/* Success Animation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                            className="mx-auto mb-6"
                        >
                            <div className="relative">
                                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <FiCheck className="w-10 h-10 text-white" />
                                </div>
                                {/* Floating particles */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 1, 0],
                                                x: [0, (i % 2 ? 1 : -1) * 30],
                                                y: [0, -30]
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: 0.5 + i * 0.1,
                                                repeat: Infinity,
                                                repeatDelay: 3
                                            }}
                                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                        >
                            Order Placed Successfully! 🎉
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 dark:text-gray-300 mb-6"
                        >
                            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
                        </motion.p>

                        {/* Order Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`p-4 rounded-2xl border mb-6 ${isDark
                                    ? "bg-gray-700/50 border-gray-600"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Order Total</span>
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    ₹{total.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <FiGift className="w-4 h-4" />
                                <span>Expected delivery: 3-5 business days</span>
                            </div>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 gap-4 mb-8"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <FiShield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-gray-600 dark:text-gray-300">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <FiTruck className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-gray-600 dark:text-gray-300">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <FiHeart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <span className="text-gray-600 dark:text-gray-300">Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                    <FiStar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <span className="text-gray-600 dark:text-gray-300">5-Star Service</span>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex gap-3"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onNavigateHome}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${isDark
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                                    }`}
                            >
                                <FiHome className="w-4 h-4" />
                                Home
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onNavigateOrders}
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 transition-all duration-200"
                            >
                                <FiPackage className="w-4 h-4" />
                                Track Order
                            </motion.button>
                        </motion.div>

                        {/* Auto-close indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-6 text-xs text-gray-400 dark:text-gray-500 text-center"
                        >
                            This modal will close automatically in a few seconds
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Shipping Form Component (placeholder)
const ShippingForm = ({ nextstep, formData, setFormData, onShippingValid }) => {
    useEffect(() => {
        onShippingValid();
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter your email"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter your full address"
                />
            </div>
        </div>
    );
};

// Payment Form Component (placeholder)
const PaymentForm = React.forwardRef(({ formData, setFormData, onShippingValid, nextstep, isDark }, ref) => {
    React.useImperativeHandle(ref, () => ({
        submitForm: () => {
            nextstep();
        }
    }));

    useEffect(() => {
        onShippingValid();
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

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
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Mock user data
    const verifiedUser = {
        username: "John Doe",
        email: "john.doe@example.com",
        contact: "+91 98765 43210",
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        paymentMethod: "Credit Card"
    };

    const paymentFormRef = useRef();

    const handleContinue = () => {
        if (currentStep === 2) {
            paymentFormRef.current?.submitForm();
        } else {
            nextStep();
        }
    };

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

    const [shippingMethod, setShippingMethod] = useState("standard");
    const [promoCode, setPromoCode] = useState("");

    // Pricing
    const subtotal = 1999.97;
    const shippingCosts = { standard: 7.99, express: 15.99, overnight: 29.99 };
    const shipping = shippingCosts[shippingMethod];
    const tax = subtotal * 0.08;
    const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
    const total = subtotal + shipping + tax - discount;

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const applyPromoCode = () => {
        //console.log("Applying promo code:", promoCode);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Success Modal Functions
    const showSuccessModalHandler = () => {
        setShowSuccessModal(true);
        setOrderPlaced(true);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const navigateToHome = () => {
        //console.log("Navigating to home...");
        // Add your home navigation logic here
        setShowSuccessModal(false);
    };

    const navigateToOrders = () => {
       // console.log("Navigating to orders...");
        // Add your orders navigation logic here
        setShowSuccessModal(false);
    };

    const handleSubmit = async () => {
        const orderData = {
            ...formData,
            shippingMethod,
            promoCode,
            total,
        };

       // console.log("Order data:", orderData);

        try {
            // Show success modal instead of alert
            showSuccessModalHandler();
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
            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={closeSuccessModal}
                onNavigateHome={navigateToHome}
                onNavigateOrders={navigateToOrders}
                total={total}
                isDark={isDark}
            />

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
                                <p className="text-xs text-gray-500 dark:text-gray-400">Premium Shopping</p>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <FiStar className="text-yellow-400" />
                                <span>4.9/5 Rating</span>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`p-3 rounded-xl transition-all duration-200 ${isDark
                                        ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                                    } transform hover:scale-105 active:scale-95`}
                            >
                                {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
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
                                    // ...existing code...

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
                                                        <p className="font-medium">{formData.fullName}</p>
                                                        <p className="text-gray-600 dark:text-gray-400">{formData.address}</p>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            {formData.city}, {formData.state} {formData.zipCode}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                                <FiMail className="text-xs" />
                                                                {formData.email}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
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
                                                <div
                                                    className={`p-6 rounded-xl border transition-all duration-200 ${isDark
                                                            ? "bg-gray-700/50 border-gray-600"
                                                            : "bg-gray-50 border-gray-200"
                                                        }`}
                                                >
                                                    <p className="capitalize font-medium">{formData.paymentMethod}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSubmit}
                                            disabled={orderPlaced}
                                            className={`w-full py-4 hover:cursor-pointer rounded-xl font-bold text-lg transition-all duration-200 mt-8 ${orderPlaced
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
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all duration-200 ${isDark
                                                ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                                                : "border-gray-300 hover:bg-gray-50 text-gray-600"
                                            }`}
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
                                        className={`ml-auto flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 ${currentStep !== 2 && !isShippingValid
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
                                isDark={isDark}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimplifiedCheckout;