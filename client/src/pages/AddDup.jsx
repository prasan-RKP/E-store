// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { TbLoader2 } from "react-icons/tb";
// import {
//   ShoppingCart,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Minus,
//   Trash2,
//   ArrowRight,
//   Heart,
//   Loader,
//   Loader2,
//   ChevronDown,
//   Star,
// } from "lucide-react";
// import { FaShippingFast, FaLock } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import confetti from "canvas-confetti";
// import { userAuthStore } from "../store/authStore.js";
// import AddToCartSkeleton from "../skeletons/AddToCartSkeleton.jsx";
// import { Link } from "react-router-dom";

// const AddToCart = () => {
//   const {
//     showAddToCart,
//     isShowingAddToCartItems,
//     verifiedUser,
//     incrementQuantity,
//     decrementQuantity,
//     deleteCartProduct,
//   } = userAuthStore();

//   const [showCart, setShowCart] = useState(true);
//   const [isChecking, setIsChecking] = useState(false);
//   //const [showConfetti, setShowConfetti] = useState(false);
//   const swiperRef = useRef(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [loadQuantity, setLoadQuantity] = useState(null);
//   const [storeProdId, setStoreProdId] = useState(null);
//   const [openSizeDropdown, setOpenSizeDropdown] = useState(null);
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [isMobile, setIsMobile] = useState(false);

//   // Available sizes
//   const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

//   // Calculate total amount
//   const subtotal = cartItems.reduce(
//     (total, item) => total + item?.product?.price * item?.quantity,
//     0
//   );
//   const shipping = subtotal > 100 ? 0 : 9.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   // Check if device is mobile
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     // Initial check
//     checkIfMobile();
    
//     // Add event listener for window resize
//     window.addEventListener('resize', checkIfMobile);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   //IncrementProductQuantity
//   const handleQuantityInc = async (id) => {
//     setLoadQuantity(id);
//     await incrementQuantity({ pid: id });
//     setLoadQuantity(null);
//   };

//   //Decrement productQuantity
//   const handleQuantityDec = async (id) => {
//     setLoadQuantity(id);
//     await decrementQuantity({ pid: id });
//     setLoadQuantity(null);
//   };

//   // Remove item from cart
//   const removeItem = async (id) => {
//     setStoreProdId(id);
//     await deleteCartProduct({ pid: id });
//     setStoreProdId(null);
//   };

//   // Handle checkout process
//   const handleCheckout = () => {
//     setIsChecking(true);
//     setTimeout(() => {
//       setIsChecking(false);

//       // 🎉 Trigger canvas confetti
//       confetti({
//         particleCount: 150,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     }, 2000);
//   };

//   // Handle size selection
//   const handleSizeSelect = (productId, size) => {
//     setSelectedSizes({
//       ...selectedSizes,
//       [productId]: size
//     });
//     setOpenSizeDropdown(null);
//   };

//   // Toggle size dropdown
//   const toggleSizeDropdown = (productId) => {
//     setOpenSizeDropdown(openSizeDropdown === productId ? null : productId);
//   };

//   // Close size dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (openSizeDropdown && !event.target.closest('.size-dropdown-container')) {
//         setOpenSizeDropdown(null);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [openSizeDropdown]);

//   // Handle Buy Now
//   const handleBuyNow = (item) => {
//     setIsChecking(true);
//     // Simulate buying process
//     setTimeout(() => {
//       setIsChecking(false);
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     }, 1500);
//   };

//   // You may also like products
//   const suggestedProducts = [
//     {
//       id: 101,
//       name: "Casual Linen Shirt",
//       price: 39.99,
//       image:
//         "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745046272/ecom_store/menCloth/yfjsrlirrziekck3gzve.jpg",
//     },
//     {
//       id: 102,
//       name: "Slim Fit Chinos",
//       price: 49.99,
//       image:
//         "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044521/ecom_store/menCloth/glemuykpdfvswabdu05j.jpg",
//     },
//     {
//       id: 103,
//       name: "Leather Belt",
//       price: 29.99,
//       image:
//         "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044389/ecom_store/menCloth/kbmg9i2m5twg9tqijdhq.jpg",
//     },
//     {
//       id: 104,
//       name: "Casual Canvas Shoes",
//       price: 54.99,
//       image:
//         "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044225/ecom_store/menCloth/ad8pj9s8iizirjpx2p9v.jpg",
//     },
//     {
//       id: 105,
//       name: "Wool Sweater",
//       price: 64.99,
//       image:
//         "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044280/ecom_store/menCloth/xmrkk3xovybmxrcvxfbr.jpg",
//     },
//     {
//       id: 106,
//       name: "Designer Watch",
//       price: 129.99,
//       image:
//         "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044467/ecom_store/menCloth/bpnw9dzw8yxb1tdlozqe.jpg",
//     },
//   ];

//   // Navigation functions for the Swiper carousel
//   const slideNext = () => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.slideNext();
//     }
//   };

//   const slidePrev = () => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.slidePrev();
//     }
//   };

//   // API call for initial render
//   useEffect(() => {
//     showAddToCart();
//   }, [showAddToCart]);

//   // giving the value to CartItems
//   useEffect(() => {
//     setCartItems(verifiedUser?.cart || []);
    
//     // Initialize selected sizes based on cart items
//     if (verifiedUser?.cart) {
//       const initialSizes = {};
//       verifiedUser.cart.forEach(item => {
//         initialSizes[item.productId] = item.size || "M";
//       });
//       setSelectedSizes(initialSizes);
//     }
//   }, [verifiedUser?.cart]);

//   return (
//     <>
//       {isShowingAddToCartItems ? (
//         <AddToCartSkeleton />
//       ) : (
//         <div className="min-h-screen bg-gray-50">
//           {/* Navbar */}
//           <motion.nav
//             className="sticky top-0 z-50 bg-white shadow-md"
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             transition={{ type: "spring", stiffness: 100 }}
//           >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="flex justify-between items-center h-16">
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => setShowCart(false)}
//                     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
//                   </button>
//                   <h1 className="ml-2 text-base sm:text-xl font-bold text-gray-800 truncate">
//                     Your Shopping Cart
//                   </h1>
//                 </div>

//                 <div className="flex items-center space-x-3 sm:space-x-4">
//                   <button className="relative">
//                     <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 hover:text-red-500 transition-colors" />
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
//                       2
//                     </span>
//                   </button>

//                   <button className="relative cursor-pointer">
//                     <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
//                     <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
//                       {cartItems.length}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.nav>

//           {/* Main Content */}
//           <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-4 sm:py-6 lg:py-8">
//             <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
//               {/* Cart Items Section */}
//               <motion.div
//                 className="w-full lg:w-2/3"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                   <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
//                     <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
//                       Shopping Cart ({cartItems.length} items)
//                     </h2>
//                   </div>

//                   <AnimatePresence>
//                     {cartItems.map((item) => (
//                       <motion.div
//                         key={item?.productId}
//                         layout
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ type: "spring", damping: 25 }}
//                         className="border-b border-gray-100 last:border-b-0"
//                       >
//                         <div className="p-3 sm:p-4 lg:p-6">
//                           {/* Mobile and medium devices layout */}
//                           <div className="flex flex-row">
//                             {/* Left Section - Product Image and Quantity */}
//                             <div className="w-1/3 sm:w-1/4 flex flex-col items-center">
//                               <motion.div
//                                 whileHover={{ scale: 1.05 }}
//                                 className="relative bg-gray-100 rounded-xl overflow-hidden w-20 h-20 sm:w-24 sm:h-24"
//                               >
//                                 <img
//                                   src={item?.product?.img}
//                                   alt={item?.product?.name}
//                                   className="w-full h-full object-cover"
//                                 />
//                               </motion.div>
                              
//                               {/* Quantity Controls beneath image */}
//                               <div className="flex items-center border border-gray-300 rounded-lg mt-2">
//                                 <button
//                                   onClick={() => handleQuantityDec(item?.productId)}
//                                   className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
//                                 >
//                                   <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
//                                 </button>
//                                 <span className="px-2 py-1 text-gray-800 font-medium text-xs sm:text-sm">
//                                   {loadQuantity === item?.productId ? (
//                                     <TbLoader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
//                                   ) : (
//                                     item?.quantity
//                                   )}
//                                 </span>
//                                 <button
//                                   onClick={() => handleQuantityInc(item?.productId)}
//                                   className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
//                                 >
//                                   <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
//                                 </button>
//                               </div>
//                             </div>

//                             {/* Right Section - Product Details */}
//                             <div className="w-2/3 sm:w-3/4 pl-3 sm:pl-4">
//                               {/* Product Name */}
//                               <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-800 mb-1">
//                                 {item?.product?.name}
//                               </h3>
                              
//                               {/* Size Selector */}
//                               <div className="relative mr-4 overflow-visible size-dropdown-container mb-2">
//                                 <div className="text-xs sm:text-sm text-gray-600 mb-1">Size:</div>
//                                 <button
//                                   onClick={() => toggleSizeDropdown(item?.productId)}
//                                   className="flex items-center border border-gray-300 rounded-md px-2 py-0.5 sm:py-1 bg-white hover:bg-gray-50 text-xs sm:text-sm"
//                                 >
//                                   <span>{selectedSizes[item?.productId] || "Select"}</span>
//                                   <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
//                                 </button>
                                
//                                 {/* Size Dropdown */}
//                                 {openSizeDropdown === item?.productId && (
//                                   <div className="absolute z-10 mt-1 w-24 sm:w-32 bg-white border border-gray-200 rounded-md shadow-lg">
//                                     {availableSizes.map((size) => (
//                                       <button
//                                         key={size}
//                                         onClick={() => handleSizeSelect(item?.productId, size)}
//                                         className="block w-full text-left px-3 py-1 text-xs sm:text-sm hover:bg-gray-100"
//                                       >
//                                         {size}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
                              
//                               {/* Rating */}
//                               <div className="flex items-center mb-2">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                   <Star 
//                                     key={star} 
//                                     className={`h-3 w-3 sm:h-4 sm:w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
//                                   />
//                                 ))}
//                                 <span className="text-xs sm:text-sm text-gray-600 ml-1">(4.0)</span>
//                               </div>
                              
//                               {/* Price */}
//                               <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-3">
//                                 ₹{(item?.product?.price * item?.quantity).toFixed(2)}
//                               </div>
                              
//                               {/* Action Buttons at bottom of card */}
//                               <div className="flex flex-col xs:flex-row justify-between gap-2">
//                                 <button
//                                   onClick={() => removeItem(item?.productId)}
//                                   className="text-xs sm:text-sm text-red-500 hover:text-red-700 flex items-center justify-center border border-red-500 rounded-lg px-2 py-1 hover:bg-red-50"
//                                 >
//                                   {storeProdId === item?.productId ? (
//                                     <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
//                                   ) : (
//                                     <>
//                                       <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//                                       <span>Remove</span>
//                                     </>
//                                   )}
//                                 </button>
                                
//                                 <button
//                                   onClick={() => handleBuyNow(item)}
//                                   className="text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors px-2 py-1 flex items-center justify-center"
//                                 >
//                                   <span>Buy Now</span>
//                                   <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>

//                   {cartItems.length === 0 && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="p-6 sm:p-8 lg:p-12 text-center"
//                     >
//                       <div className="flex justify-center mb-4">
//                         <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-gray-300" />
//                       </div>
//                       <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 mb-2">
//                         Your cart is empty
//                       </h3>
//                       <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
//                         Looks like you haven't added any items to your cart yet.
//                       </p>
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
//                         <Link to={"/"} className="flex items-center">
//                           Start Shopping
//                           <ArrowRight className="ml-2 h-4 w-4" />
//                         </Link>
//                       </button>
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* You May Also Like Section */}
//                 {cartItems.length > 0 && (
//                   <motion.div
//                     className="mt-4 sm:mt-6 lg:mt-8"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     <div className="flex justify-between items-center mb-3 sm:mb-4">
//                       <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
//                         You May Also Like
//                       </h2>
//                       <div className="flex space-x-2">
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={slidePrev}
//                           className="p-1 sm:p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//                         >
//                           <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={slideNext}
//                           className="p-1 sm:p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
//                         >
//                           <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
//                         </motion.button>
//                       </div>
//                     </div>
//                     <Swiper
//                       ref={swiperRef}
//                       slidesPerView={1.5}
//                       spaceBetween={8}
//                       breakpoints={{
//                         320: { slidesPerView: 2, spaceBetween: 8 },
//                         480: { slidesPerView: 2.2, spaceBetween: 12 },
//                         640: { slidesPerView: 2.5, spaceBetween: 16 },
//                         768: { slidesPerView: 3, spaceBetween: 16 },
//                         1024: { slidesPerView: 3.5, spaceBetween: 16 },
//                         1280: { slidesPerView: 4, spaceBetween: 16 },
//                       }}
//                       className="pb-6"
//                     >
//                       {suggestedProducts.map((product) => (
//                         <SwiperSlide key={product.id}>
//                           <motion.div
//                             whileHover={{ y: -5 }}
//                             className="bg-white rounded-xl shadow-md overflow-hidden h-full"
//                           >
//                             <div className="aspect-square relative">
//                               <img
//                                 src={product.image}
//                                 alt={product.name}
//                                 className="absolute h-full w-full object-cover"
//                               />
//                               <div className="absolute top-0 right-0 m-2 sm:m-3">
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   className="bg-white hover:bg-blue-500 hover:text-white text-blue-600 font-medium p-1 sm:p-2 rounded-full shadow-md transition-colors"
//                                 >
//                                   <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
//                                 </motion.button>
//                               </div>
//                             </div>
//                             <div className="p-2 sm:p-3">
//                               <h3 className="font-medium text-gray-800 mb-1 text-xs sm:text-sm truncate">
//                                 {product.name}
//                               </h3>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-blue-600 font-bold text-xs sm:text-sm">
//                                   ${product.price.toFixed(2)}
//                                 </span>
//                                 {/* Buy Now Button for Suggested Products */}
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                   Buy Now
//                                 </motion.button>
//                               </div>
//                             </div>
//                           </motion.div>
//                         </SwiperSlide>
//                       ))}
//                     </Swiper>
//                   </motion.div>
//                 )}
//               </motion.div>

//               {/* Order Summary Section */}
//               <motion.div
//                 className="w-full lg:w-1/3 mt-4 lg:mt-0"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 {/* For mobile: Sticky bottom bar for order summary on small screens */}
//                 {isMobile && cartItems.length > 0 && (
//                   <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 z-40">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm text-gray-800 font-medium">Total:</span>
//                       <span className="text-lg font-bold text-blue-600">
//                         ₹{total.toFixed(2)}
//                       </span>
//                     </div>
//                     <button
//                       onClick={handleCheckout}
//                       disabled={isChecking}
//                       className={`w-full ${
//                         isChecking ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//                       } text-white py-2 px-4 rounded-xl flex items-center justify-center transition-colors`}
//                     >
//                       {isChecking ? (
//                         <span className="flex items-center">
//                           <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                           Processing...
//                         </span>
//                       ) : (
//                         <span className="flex items-center">
//                           Checkout
//                           <ArrowRight className="ml-2 h-4 w-4" />
//                         </span>
//                       )}
//                     </button>
//                   </div>
//                 )}

//                 {/* Regular order summary for desktop and tablets */}
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-20">
//                   <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
//                     <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
//                       Order Summary
//                     </h2>
//                   </div>

//                   <div className="p-3 sm:p-4 lg:p-6">
//                     <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 lg:mb-6">
//                       <div className="flex justify-between">
//                         <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
//                         <span className="text-sm sm:text-base text-gray-800 font-medium">
//                           ₹{subtotal.toFixed(2)}
//                         </span>
//                       </div>

//                       <div className="flex justify-between">
//                         <span className="text-sm sm:text-base text-gray-600">Shipping</span>
//                         <span className="text-sm sm:text-base text-gray-800 font-medium">
//                           {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
//                         </span>
//                       </div>

//                       <div className="flex justify-between">
//                         <span className="text-sm sm:text-base text-gray-600">Tax</span>
//                         <span className="text-sm sm:text-base text-gray-800 font-medium">
//                           ₹{tax.toFixed(2)}
//                         </span>
//                       </div>

//                       {shipping === 0 && (
//                         <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg flex items-center">
//                           <FaShippingFast className="h-4 w-4 mr-2" />
//                           <span className="text-xs sm:text-sm font-medium">
//                             Free shipping applied!
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-3 sm:mb-4 lg:mb-6">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
//                           Total
//                         </span>
//                         <motion.span
//                           className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600"
//                           key={total}
//                           initial={{ scale: 1.1 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         >
//                           ₹{total.toFixed(2)}
//                         </motion.span>
//                       </div>
//                     </div>

//                     {/* Hide on mobile as we already have the fixed bottom bar */}
//                     <div className={isMobile ? "hidden" : ""}>
//                       <button
//                         onClick={handleCheckout}
//                         disabled={cartItems.length === 0 || isChecking}
//                         className={`w-full ${
//                           isChecking ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"