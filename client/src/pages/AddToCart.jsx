import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbLoader2 } from "react-icons/tb";
import "../customs/Addtocart.css";
import {
  ShoppingCart,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Heart,
  Loader,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { FaShippingFast, FaLock } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import confetti from "canvas-confetti";
import { userAuthStore } from "../store/authStore.js";
import AddToCartSkeleton from "../skeletons/AddToCartSkeleton.jsx";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

const AddToCart = () => {
  const {
    showAddToCart,
    isShowingAddToCartItems,
    verifiedUser,
    incrementQuantity,
    decrementQuantity,
    deleteCartProduct,
    updateProdSize,
    isUpdatingProdSize,
    showWishListItem,
    removeAllCartItems,
    isRemovingAllCartItem,
  } = userAuthStore();

  const [showCart, setShowCart] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const swiperRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [loadQuantity, setLoadQuantity] = useState(null);
  const [storeProdId, setStoreProdId] = useState(null);
  const [openSizeDropdown, setOpenSizeDropdown] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isAddingProdId, setIsAddingProdId] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Calculate total amount
  const subtotal = cartItems?.reduce(
    (total, item) => total + item?.product?.price * item?.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;


  

  // Check if device is mobile (keeping this for general mobile-specific logic if needed elsewhere)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  //IncrementProductQuantity
  const handleQuantityInc = async (id) => {
    setLoadQuantity(id);
    await incrementQuantity({ pid: id });
    setLoadQuantity(null);
  };

  //Decrement productQuantity
  const handleQuantityDec = async (id) => {
    setLoadQuantity(id);
    await decrementQuantity({ pid: id });
    setLoadQuantity(null);
  };

  // Remove item from cart
  const removeItem = async (id) => {
    setStoreProdId(id);
    await deleteCartProduct({ pid: id });
    setStoreProdId(null);
  };

  // Handle checkout process
  const handleCheckout = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2000);
  };

  // Handle size selection
  const handleSizeSelect = async (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
    setIsAddingProdId(productId);
    await updateProdSize({ productId, size });
    setIsAddingProdId(null);
    setOpenSizeDropdown(null);
  };

  // Toggle size dropdown
  const toggleSizeDropdown = (productId) => {
    setOpenSizeDropdown(openSizeDropdown === productId ? null : productId);
  };

  // Close size dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openSizeDropdown &&
        !event.target.closest(".size-dropdown-container")
      ) {
        setOpenSizeDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSizeDropdown]);

  // Handle Buy Now
  const handleBuyNow = (item) => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);
  };

  // You may also like products
  const suggestedProducts = [
    {
      id: 101,
      name: "Casual Linen Shirt",
      price: 39.99,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745046272/ecom_store/menCloth/yfjsrlirrziekck3gzve.jpg",
    },
    {
      id: 102,
      name: "Slim Fit Chinos",
      price: 49.99,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044521/ecom_store/menCloth/glemuykpdfvswabdu05j.jpg",
    },
    {
      id: 103,
      name: "Leather Belt",
      price: 29.99,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044389/ecom_store/menCloth/kbmg9i2m5twg9tqijdhq.jpg",
    },
    {
      id: 104,
      name: "Casual Canvas Shoes",
      price: 54.99,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044225/ecom_store/menCloth/ad8pj9s8iizirjpx2p9v.jpg",
    },
    {
      id: 105,
      name: "Wool Sweater",
      price: 64.99,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044280/ecom_store/menCloth/xmrkk3xovybmxrcvxfbr.jpg",
    },
    {
      id: 106,
      name: "Designer Watch",
      price: 129.99,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745044467/ecom_store/menCloth/bpnw9dzw8yxb1tdlozqe.jpg",
    },
  ];

  // Navigation functions for the Swiper carousel
  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  //for after refresh it will take to top of the cartItems
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  

  // API call for initial render
  useEffect(() => {
    showAddToCart();
  }, [showAddToCart]);

  // giving the value to CartItems
  useEffect(() => {
    setCartItems(verifiedUser?.cart || []);

    // Initialize selected sizes based on cart items
    if (verifiedUser?.cart) {
      const initialSizes = {};
      verifiedUser.cart.forEach((item) => {
        initialSizes[item.productId] = item.size || "M"; // Default to 'M' if no size is specified
      });
      setSelectedSizes(initialSizes);
    }
  }, [verifiedUser?.cart]);

  useEffect(() => {
    setWishlistItems(verifiedUser?.wishlist || []);
  }, [verifiedUser?.wishlist]);

  return (
    <>
      {isShowingAddToCartItems ? (
        <AddToCartSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Navbar */}
          <motion.nav
            className="sticky top-0 z-50 bg-white shadow-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  {/* Adjusted to be always visible and handle truncation better */}
                  <h1 className="ml-2 text-base sm:text-xl font-bold text-gray-800 truncate max-w-[calc(100vw-180px)] sm:max-w-none">
                    Your Shopping Cart
                  </h1>
                </div>

                <div className="flex items-center space-x-4">
                  <Link to={"/wishlist"}>
                    <button className="relative hover:cursor-pointer">
                      <Heart className="h-6 w-6 text-gray-600 hover:text-red-500 transition-colors" />
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {verifiedUser?.wishlist?.length}
                      </span>
                    </button>
                  </Link>

                  <button className="relative cursor-pointer">
                    <ShoppingCart className="h-6 w-6 text-gray-600" />
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Cart Items Section */}
              <motion.div
                className="w-full lg:w-2/3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-auto">
                  <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Shopping Cart ({cartItems.length} items)
                    </h2>

                    <button
                      className="bg-red-700 hover:bg-red-500 hover:cursor-pointer text-white text-sm sm:text-base px-4 py-2 rounded-lg shadow-sm transition duration-200"
                      onClick={removeAllCartItems}
                      disabled={isRemovingAllCartItem || cartItems.length === 0}
                    >
                      {isRemovingAllCartItem ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin inline-block mr-2" />{" "}
                          Removing...
                        </>
                      ) : (
                        "Remove All"
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item?.productId}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <div className="p-3 sm:p-6">
                          {/* Mobile Layout (<= 639px - Tailwind's default 'sm' breakpoint) */}
                          <div className="block sm:hidden">
                            {/* Product Name */}
                            <h2 className="text-2xl font-bold text-slate-700 mb-2 text-center">
                              {item?.product?.name}
                            </h2>

                            {/* Product Image - Full width on mobile */}
                            <div className="mb-3 max-h-[400px] sm:max-h-none">
                              <Link to={`/productshow/${item?.productId}`}>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative bg-gray-100 rounded-lg overflow-hidden w-full h-full max-h-[400px] sm:max-h-none"
                                >
                                  <img
                                    src={item?.product?.img}
                                    alt={item?.product?.name}
                                    className="w-full h-full object-cover max-h-[400px] sm:max-h-none"
                                  />
                                </motion.div>
                              </Link>
                            </div>

                            {/* Two Column Layout for Controls */}
                            <div className="flex gap-2 mb-3">
                              {/* Left Column - Size & Quantity */}
                              <div className="flex-1 space-y-2">
                                {/* Size Selector */}
                                <div className="size-dropdown-container">
                                  {item?.product?.sizes &&
                                  item.product.sizes.length > 0 ? (
                                    <div className="relative">
                                      <button
                                        onClick={() =>
                                          toggleSizeDropdown(item?.productId)
                                        }
                                        className="w-full flex items-center justify-between border border-gray-300 rounded-md px-2 py-1 bg-white hover:bg-gray-50 text-xs"
                                        disabled={isUpdatingProdSize}
                                      >
                                        {isAddingProdId === item?.productId ? (
                                          <Loader2 className="h-3 w-3 animate-spin mx-auto" />
                                        ) : (
                                          <>
                                            <span className="text-xs">
                                              Size:{" "}
                                              {selectedSizes[item?.productId] ||
                                                "Select"}
                                            </span>
                                            <ChevronDown className="h-3 w-3" />
                                          </>
                                        )}
                                      </button>

                                      {openSizeDropdown === item?.productId && (
                                        <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                          <div className="max-h-16 overflow-y-auto">
                                            {item.product.sizes.map((size) => (
                                              <button
                                                key={size}
                                                onClick={() =>
                                                  handleSizeSelect(
                                                    item?.productId,
                                                    size
                                                  )
                                                }
                                                className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100"
                                                disabled={
                                                  isAddingProdId ===
                                                  item?.productId
                                                }
                                              >
                                                {size}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="px-2 py-1 border border-gray-300 rounded-md bg-white text-xs text-gray-700">
                                      Size: Regular
                                    </div>
                                  )}
                                </div>

                                {/* Quantity Control */}
                                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                  <button
                                    onClick={() =>
                                      handleQuantityDec(item?.productId)
                                    }
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                      loadQuantity === item?.productId ||
                                      item.quantity <= 1
                                    }
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="px-2 py-1 text-gray-800 font-medium text-xs min-w-[24px] text-center">
                                    {loadQuantity === item?.productId ? (
                                      <TbLoader2 className="h-3 w-3 animate-spin mx-auto" />
                                    ) : (
                                      item?.quantity
                                    )}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityInc(item?.productId)
                                    }
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loadQuantity === item?.productId}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Right Column - Buy Now & Price */}
                              <div className="flex-1 space-y-2">
                                {/* Buy Now Button */}
                                <button
                                 onClick={()=> toast.info('Feature Coming Soon 🔜 ...')}
                                  className="w-full px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={isChecking}
                                >
                                  {isChecking ? (
                                    <Loader2 className="h-3 w-3 animate-spin mx-auto" />
                                  ) : (
                                    "Buy Now"
                                  )}
                                </button>

                                {/* Product Price */}
                                <div className="text-center">
                                  <span className="text-sm font-bold text-gray-800">
                                    ₹
                                    {(
                                      item?.product?.price * item?.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Remove Button - Full width at bottom */}
                            <button
                              onClick={() => removeItem(item?.productId)}
                              className="w-full text-white bg-red-600  hover:text-red-700 flex items-center justify-center cursor-pointer text-xs py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                              disabled={storeProdId === item?.productId}
                            >
                              {storeProdId === item?.productId ? (
                                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <>
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  <span>Remove</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Tablet/Small Laptop Layout (640px to 767px) - Adjusted for better image display */}
                          <div className="hidden sm:flex md:hidden items-center">
                            {/* Product Image */}
                            <div className="flex-shrink-0 mr-4 w-24 h-auto max-h-20 sm:max-h-24">
                              <Link to={`/productshow/${item?.productId}`}>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative bg-gray-100 rounded-xl overflow-hidden w-full h-full"
                                >
                                  <img
                                    src={item?.product?.img}
                                    alt={item?.product?.name}
                                    className="w-full h-auto max-h-20 sm:max-h-24 object-cover"
                                  />
                                </motion.div>
                              </Link>
                            </div>

                            {/* Product Details and Controls */}
                            <div className="flex-grow flex flex-col justify-between">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-medium text-gray-800 leading-tight">
                                  {item?.product?.name}
                                </h3>
                                <div className="text-base font-bold text-gray-800 ml-4">
                                  ₹
                                  {(
                                    item?.product?.price * item?.quantity
                                  ).toFixed(2)}
                                </div>
                              </div>

                              <div className="flex items-center justify-between flex-wrap gap-y-2">
                                {" "}
                                {/* Added flex-wrap for better layout on smaller screens */}
                                {/* Size Selector */}
                                <div className="relative mr-4 size-dropdown-container  text-black">
                                  {item?.product?.sizes &&
                                  item.product.sizes.length > 0 ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          toggleSizeDropdown(item?.productId)
                                        }
                                        className="flex items-center border border-black rounded-md px-2 py-1  hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isUpdatingProdSize}
                                      >
                                        {isAddingProdId === item?.productId ? (
                                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                                        ) : (
                                          <>
                                            <span className="text-black">
                                              Size:{" "}
                                              {selectedSizes[item?.productId] ||
                                                "Select"}
                                            </span>
                                            <ChevronDown className="h-3 w-3 ml-1" />
                                          </>
                                        )}
                                      </button>

                                      {openSizeDropdown === item?.productId && (
                                        <div className="absolute z-50 top-full left-0 mt-1 w-32 border text-black  rounded-md shadow-lg ">
                                          <div className="max-h-20 overflow-y-auto text-black">
                                            {item.product.sizes.map((size) => (
                                              <button
                                                key={size}
                                                onClick={() =>
                                                  handleSizeSelect(
                                                    item?.productId,
                                                    size
                                                  )
                                                }
                                                className="block w-full text-left px-3 py-1 text-sm  text-black"
                                                disabled={
                                                  isAddingProdId ===
                                                  item?.productId
                                                }
                                              >
                                                {size}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="px-2 py-1 border  rounded-md  text-sm text-black">
                                      Size: Regular
                                    </div>
                                  )}
                                </div>
                                {/* Quantity Control */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    onClick={() =>
                                      handleQuantityDec(item?.productId)
                                    }
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                      loadQuantity === item?.productId ||
                                      item.quantity <= 1
                                    }
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="px-2 py-1 text-gray-800 font-medium text-sm min-w-[28px] text-center">
                                    {loadQuantity === item?.productId ? (
                                      <TbLoader2 className="h-4 w-4 animate-spin mx-auto" />
                                    ) : (
                                      item?.quantity
                                    )}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityInc(item?.productId)
                                    }
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loadQuantity === item?.productId}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                {/* Buy Now & Remove */}
                                <div className="flex items-center space-x-2 sm:ml-4">
                                  {" "}
                                  {/* Removed ml-4 to allow flex-wrap to handle spacing */}
                                  <button
                                    onClick={() => handleBuyNow(item)}
                                    className="px-3 py-1 buy-btn bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed "
                                    disabled={isChecking}
                                  >
                                    {isChecking ? (
                                      <Loader2 className="h-4 w-4 animate-spin inline-block" />
                                    ) : (
                                      "Buy Now"
                                    )}
                                  </button>
                                  <button
                                    onClick={() => removeItem(item?.productId)}
                                    className="text-red-500 hover:text-red-700 flex items-center cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={storeProdId === item?.productId}
                                  >
                                    {storeProdId === item?.productId ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout (>= 768px) */}
                          <div className="hidden md:flex">
                            {/* Product Image */}
                            <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                              <Link to={`/productshow/${item?.productId}`}>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative bg-gray-100 rounded-xl overflow-hidden w-24 h-24"
                                >
                                  <img
                                    src={item?.product?.img}
                                    alt={item?.product?.name}
                                    className="w-full h-full object-cover"
                                  />
                                </motion.div>
                              </Link>
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div className="text-left">
                                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                                    {item?.product?.name}
                                  </h3>
                                  <div className="flex text-sm text-gray-500 mb-3 relative z-10">
                                    {/* Size Selector */}
                                    <div className="relative mr-4 size-dropdown-container">
                                      {item?.product?.sizes &&
                                      item.product.sizes.length > 0 ? (
                                        <>
                                          {/* Dropdown Button */}
                                          <button
                                            onClick={() =>
                                              toggleSizeDropdown(
                                                item?.productId
                                              )
                                            }
                                            className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isUpdatingProdSize}
                                          >
                                            {isAddingProdId ===
                                            item?.productId ? (
                                              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                                            ) : (
                                              <>
                                                <span>
                                                  Size:{" "}
                                                  {selectedSizes[
                                                    item?.productId
                                                  ] || "Select"}
                                                </span>
                                                <ChevronDown className="h-4 w-4 ml-1" />
                                              </>
                                            )}
                                          </button>

                                          {/* Dropdown List */}
                                          {openSizeDropdown ===
                                            item?.productId && (
                                            <div className="absolute z-50 top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                                              <div
                                                className="max-h-24 overflow-y-auto"
                                                style={{
                                                  scrollbarWidth: "thin",
                                                  scrollbarColor:
                                                    "#CBD5E0 #F9FAFB",
                                                }}
                                              >
                                                {item.product.sizes.map(
                                                  (size) => (
                                                    <button
                                                      key={size}
                                                      onClick={() =>
                                                        handleSizeSelect(
                                                          item?.productId,
                                                          size
                                                        )
                                                      }
                                                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                      disabled={
                                                        isAddingProdId ===
                                                        item?.productId
                                                      }
                                                    >
                                                      {size}
                                                    </button>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      ) : (
                                        <div className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700">
                                          Size: Regular
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-lg font-bold text-gray-800 text-right">
                                  ₹
                                  {(
                                    item?.product?.price * item?.quantity
                                  ).toFixed(2)}
                                </div>
                              </div>

                              {/* Quantity Control, Buy Now and Remove */}
                              <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
                                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                                  <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                      onClick={() =>
                                        handleQuantityDec(item?.productId)
                                      }
                                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                      disabled={
                                        loadQuantity === item?.productId ||
                                        item.quantity <= 1
                                      }
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-3 py-1 text-gray-800 font-medium">
                                      {loadQuantity === item?.productId ? (
                                        <TbLoader2 className="h-5 w-5 animate-spin" />
                                      ) : (
                                        item?.quantity
                                      )}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleQuantityInc(item?.productId)
                                      }
                                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                      disabled={
                                        loadQuantity === item?.productId
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>

                                  {/* Buy Now Button */}
                                  <button
                                    onClick={() => handleBuyNow(item)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isChecking}
                                  >
                                    {isChecking ? (
                                      <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
                                    ) : (
                                      "Buy Now"
                                    )}
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item?.productId)}
                                  className="text-red-500 hover:text-red-700 flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={storeProdId === item?.productId}
                                >
                                  {storeProdId === item?.productId ? (
                                    <span className="flex items-center justify-center">
                                      <Loader2 className="w-5 h-5 animate-spin mr-1" />{" "}
                                      Removing...
                                    </span>
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      <span>Remove</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {cartItems.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 sm:p-12 text-center"
                    >
                      <div className="flex justify-center mb-4">
                        <ShoppingCart className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Looks like you haven't added any items to your cart yet.
                      </p>
                      <button className="btn btn-primary bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors">
                        <Link to={"/"}>Start Shopping</Link>
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* You May Also Like Section */}
                {cartItems.length > 0 && (
                  <motion.div
                    className="mt-6 sm:mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        You May Also Like
                      </h2>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={slidePrev}
                          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={slideNext}
                          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
                        </motion.button>
                      </div>
                    </div>
                    <Swiper
                      ref={swiperRef}
                      slidesPerView={1.2}
                      spaceBetween={12}
                      breakpoints={{
                        480: { slidesPerView: 2, spaceBetween: 12 },
                        640: { slidesPerView: 2.2, spaceBetween: 16 }, // This is the new 'sm' breakpoint for tablets
                        768: { slidesPerView: 2.5, spaceBetween: 16 }, // This is the new 'md' breakpoint for larger tablets/small laptops
                        1024: { slidesPerView: 3, spaceBetween: 16 },
                        1280: { slidesPerView: 4, spaceBetween: 16 },
                      }}
                      className="pb-6"
                    >
                      {suggestedProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
                            
                          >
                            <Link to={`/productshow/${product.id}`}>
                              <div className="aspect-square relative">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </Link>
                            <div className="p-3 flex-grow flex flex-col justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-800 mb-1">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  ₹{product.price.toFixed(2)}
                                </p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-3 w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                                onClick={()=> toast.info('Feature Coming Soon 🔜 ...')}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add to Cart
                              </motion.button>
                            </div>
                          </motion.div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </motion.div>
                )}
              </motion.div>

              {/* Order Summary Section */}
              <motion.div
                className="w-full lg:w-1/3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-20">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-3 border-b border-gray-200 pb-4">
                    <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                      <span>Shipping:</span>
                      <span>
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                      <span>Estimated Tax (8%):</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-lg sm:text-xl text-gray-800 pt-4">
                    <span>Order Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <Link to={"/checkout"} state={{total: total}}>
                  <button
                    // onClick={handleCheckout}
                    className="w-full h hover:cursor-pointer bg-green-600 text-white py-3 mt-6 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isChecking || cartItems.length === 0}
                  >
                    {isChecking ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-5 w-5 mr-2" />
                    )}
                    {isChecking ? "Processing..." : "Proceed to Checkout"}
                  </button>
                  </Link>

                  <div className="mt-6 space-y-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaShippingFast className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Free shipping on orders over ₹100.00</span>
                    </div>
                    <div className="flex items-center">
                      <FaLock className="h-5 w-5 mr-2 text-green-500" />
                      <span>Secure checkout powered by Stripe</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
