// add all the import statements
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiX, FiPackage, FiMapPin, FiMail, FiPhone, FiCopy, FiDownload, FiEye, FiShare2, FiMessageCircle, FiZap, FiShoppingCart, FiClock, FiTruck } from 'react-icons/fi';

const SuccessModal = ({ isOpen, onClose, orderData, isDark }) => {
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

    const mockUser = {
  username: "John Doe",
  address: "123 Main Street",
  city: "Mumbai",
  state: "MH",
  zipCode: "400001",
  email: "johndoe@example.com",
  contact: "+91 9876543210"
};

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
                    className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${isDark
                            ? "bg-gray-800/95 border-gray-700/50 backdrop-blur-xl"
                            : "bg-white/95 border-gray-200/50 backdrop-blur-xl"
                        }`}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={`hover:bg-red-500 bg-gray-300  absolute top-6 right-6 z-10 p-2 rounded-full transition-all duration-200 ${isDark
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
                                className={`p-6 rounded-2xl border ${isDark
                                        ? "bg-gray-700/50 border-gray-600"
                                        : "bg-gray-50/80 border-gray-200"
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FiPackage className="text-blue-500 text-xl" />
                                    <h3 className="font-semibold text-gray-600 text-lg">Order Information</h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Order Number</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-semibold text-red-300">#{orderNumber}</span>
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
                                        <span className="font-semibold capitalize">{orderData?.verifiedUser?.paymentMethod
}</span>
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
                                className={`p-6 rounded-2xl border ${isDark
                                        ? "bg-gray-700/50 border-gray-600"
                                        : "bg-gray-50/80 border-gray-200"
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FiMapPin className="text-purple-500 text-xl" />
                                    <h3 className="font-semibold text-lg text-gray-600">Shipping Address</h3>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-semibold text-blue-400">{orderData?.verifiedUser?.username}</p>
                                    <p className="text-gray-600 dark:text-gray-400">{orderData?.verifiedUser?.address}</p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {orderData?.verifiedUser?.city}, {orderData?.verifiedUser?.state} {orderData?.verifiedUser?.zipCode}
                                    </p>
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            <FiMail className="text-xs" />
                                            {orderData?.verifiedUser?.email}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            <FiPhone className="text-xs" />
                                            {orderData?.verifiedUser?.contact}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
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
                            className={`p-6 rounded-2xl border ${isDark
                                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
                                    : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FiZap className="text-yellow-500 text-xl" />
                                <h3 className="font-semibold text-lg text-gray-600">What's Next?</h3>
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
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${isDark
                                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                        : "bg-gray-300 hover:bg-gray-200 text-gray-600"
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

export default SuccessModal;