import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbLoader2 } from "react-icons/tb";
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
import { Link } from "react-router-dom";

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
  //const [showConfetti, setShowConfetti] = useState(false);
  const swiperRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [loadQuantity, setLoadQuantity] = useState(null);
  const [storeProdId, setStoreProdId] = useState(null);
  const [openSizeDropdown, setOpenSizeDropdown] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isAddingProdId, setIsAddingProdId] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  // console.log("CartItems from compo", cartItems)

  // Available sizes
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Calculate total amount
  const subtotal = cartItems?.reduce(
    (total, item) => total + item?.product?.price * item?.quantity,
    0 // ← initial value
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
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

      // 🎉 Trigger canvas confetti
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

    // deleteAll cartItem

    //console.log(`ProductId:${productId}, size:${size}`);
    //console.log(`The selectedSize`, selectedSizes);
    setIsAddingProdId(productId);
    await updateProdSize({ productId, size });
    setIsAddingProdId(null);
    // todo from here....

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
    // Simulate buying process
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
        initialSizes[item.productId] = item.size || "M";
      });
      setSelectedSizes(initialSizes);
    }
  }, [verifiedUser?.cart]);

  useEffect(() => {
    setWishlistItems(verifiedUser?.wishlist || []);
  }, [verifiedUser?.wishlist]);

  //cartItems.map((item) => console.log("he", item || "No img avialable"));
  // console.log("VerifiedUser carts", verifiedUser?.wishlist?.length);

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
                  <h1 className="ml-2 text-xl font-bold text-gray-800 truncate">
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
                      // <-- connect to your function
                      className="bg-red-700 hover:bg-red-500 hover:cursor-pointer text-white text-sm sm:text-base px-4 py-2 rounded-lg shadow-sm transition dur ation-200"
                      onClick={removeAllCartItems}
                    >
                      {isRemovingAllCartItem ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </>
                      ) : (
                        "Remove All"
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row">
                            {/* Product Image */}
                            <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0">
                              <Link to={`/productshow/${item?.productId}`}>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="relative bg-gray-100 rounded-xl overflow-auto w-24 h-24 mx-auto sm:mx-0"
                                >
                                  <img
                                    src={item?.product?.img}
                                    alt={item?.name}
                                    className="w-full h-full object-cover"
                                  />
                                </motion.div>
                              </Link>
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div className="text-center sm:text-left">
                                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                                    {item?.product?.name}
                                  </h3>
                                  <div className="flex justify-center sm:justify-start text-sm text-gray-500 mb-3 relative z-10">
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
                                            className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white hover:bg-gray-50"
                                          >
                                            {isAddingProdId ===
                                            item?.productId ? (
                                              <>
                                                {" "}
                                                <Loader2 className="h-6 w-6 animate-spin" />{" "}
                                              </>
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
                                        // Show only Regular (no dropdown)
                                        <div className="px-2 py-1 border border-gray-300 rounded-md bg-white">
                                          Size: Regular
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-lg font-bold text-gray-800 text-center sm:text-right">
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
                                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
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
                                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>

                                  {/* Buy Now Button */}
                                  <button
                                    onClick={() => handleBuyNow(item)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                                  >
                                    Buy Now
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item?.productId)}
                                  className="text-red-500 hover:text-red-700 flex items-center cursor-pointer"
                                >
                                  {storeProdId === item?.productId ? (
                                    <span className="flex items-center justify-center">
                                      <Loader2 className="w-5 h-5 animate-spin" />
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
                      <button className="btn btn-primary">
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
                        640: { slidesPerView: 2.2, spaceBetween: 16 },
                        768: { slidesPerView: 2.5, spaceBetween: 16 },
                        1024: { slidesPerView: 3, spaceBetween: 16 },
                        1280: { slidesPerView: 4, spaceBetween: 16 },
                      }}
                      className="pb-6"
                    >
                      {suggestedProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md overflow-auto h-full"
                          >
                            <div className="aspect-square relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="absolute h-full w-full object-cover"
                              />
                              <div className="absolute top-0 right-0 m-3">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-white hover:bg-blue-500 hover:text-white text-blue-600 font-medium p-2 rounded-full shadow-md transition-colors"
                                >
                                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                </motion.button>
                              </div>
                            </div>
                            <div className="p-3 sm:p-4">
                              <h3 className="font-medium text-gray-800 mb-1 text-sm sm:text-base">
                                {product.name}
                              </h3>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600 font-bold text-sm sm:text-base">
                                  ${product.price.toFixed(2)}
                                </span>
                                {/* Buy Now Button for Suggested Products */}
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  Buy Now
                                </motion.button>
                              </div>
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
                className="w-full lg:w-1/3 mt-6 lg:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* For mobile: Sticky bottom bar for order summary on small screens */}
                {isMobile && cartItems.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-800 font-medium">Total:</span>
                      <span className="text-xl font-bold text-blue-600">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={isChecking}
                      className={`w-full btn ${
                        isChecking ? "loading btn-disabled" : "btn-primary"
                      } text-white py-3 px-4 rounded-xl flex items-center justify-center`}
                    >
                      {isChecking ? "Processing..." : "Checkout"}
                      {!isChecking && <ArrowRight className="ml-2 h-5 w-5" />}
                    </button>
                  </div>
                )}

                {/* Regular order summary for desktop and tablets */}
                <div className="bg-white rounded-2xl shadow-lg overflow-auto sticky top-24">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                      Order Summary
                    </h2>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-800 font-medium">
                          ₹{subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-800 font-medium">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-800 font-medium">
                          ₹{tax.toFixed(2)}
                        </span>
                      </div>

                      {shipping === 0 && (
                        <div className="bg-green-50 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center">
                          <FaShippingFast className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          <span className="text-xs sm:text-sm font-medium">
                            Free shipping applied!
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4 sm:mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-bold text-gray-800">
                          Total
                        </span>
                        <motion.span
                          className="text-xl sm:text-2xl font-bold text-blue-600"
                          key={total}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          ₹{total.toFixed(2)}
                        </motion.span>
                      </div>
                    </div>

                    {/* Hide on mobile as we already have the fixed bottom bar */}
                    <div className={isMobile ? "hidden" : ""}>
                      <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0 || isChecking}
                        className={`w-full btn ${
                          isChecking ? "loading btn-disabled" : "btn-primary"
                        } text-white py-2 sm:py-3 px-4 rounded-xl flex items-center justify-center`}
                      >
                        {isChecking ? "Processing..." : "Checkout"}
                        {!isChecking && <ArrowRight className="ml-2 h-5 w-5" />}
                      </button>
                    </div>

                    <div className="mt-4 sm:mt-6 flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                      <FaLock className="mr-2" />
                      <span>Secure checkout</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-grow px-3 sm:px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button className="btn btn-outline bg-cyan-900 hover:bg-cyan-950 text-sm px-3 py-2">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Add padding at the bottom to account for the fixed checkout bar on mobile */}
            {isMobile && cartItems.length > 0 && <div className="h-24"></div>}
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;

// 680eee3dc4437f263a02c807
