import { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Loader2,
  ArrowRight,
  Shirt,
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  User,
  Bell
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { userAuthStore } from "../store/authStore.js";
import WishSkeleton from "../skeletons/WishSkeleton.jsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "../customs/Wishlist.css";

// Enhanced card hover variant with modern effects
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.6,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 5,
    boxShadow:
      "0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(147, 51, 234, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

// Enhanced button animation variants
const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(147, 51, 234, 0.9)",
    boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Search bar animation
const searchVariants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

const WishlistComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishItems, setWishItems] = useState([]);
  const [storeProdId, setStoreProdId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const controls = useAnimation();

  // 'AuthStore' & 'ProdStore'
  const {
    showWishListItem,
    verifiedUser,
    isShowingWishlistItem,
    removeWishListProd,
    moveToAddCart,
  } = userAuthStore();

  useEffect(() => {
    // Animate cards when component loads with staggered animation
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    }));
  }, [controls]);

  const showNotificationMsg = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filterItems = (filterType) => {
    setActiveFilter(filterType);
  };

  // fetch to show storedWishItems
  useEffect(() => {
    const fetchWishlist = async () => {
      await showWishListItem();
    };
    fetchWishlist();
  }, []);

  // Giving the wishList value to
  useEffect(() => {
    if (verifiedUser?.wishlist) {
      setWishItems(verifiedUser?.wishlist || []);
    }
  }, [verifiedUser?.wishlist]);

  // for smooth scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Remove the WishItems
  const removeWishItem = async (id) => {
    setStoreProdId(id);
    await removeWishListProd({ pid: id });
    setStoreProdId(null);
  };

  // Moving the productTo Cart
  const handleMoveToCart = async (id, size) => {
    setCartId(id);
    await moveToAddCart({ productId: id, size });
    setCartId(null);
  };

  // Filter and sort wishlist items
  const filteredWishItems = wishItems
    .filter(item =>
      item?.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.product?.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.product.price - b.product.price;
        case 'price-high':
          return b.product.price - a.product.price;
        case 'rating':
          return b.product.rating - a.product.rating;
        default:
          return 0;
      }
    });

  return (
    <>
      {isShowingWishlistItem ? (
        <WishSkeleton />
      ) : (

        //Header code


        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
          </div>

          {/* Modern Navbar with enhanced glassmorphism */}
          <motion.nav
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl"
          >
            <div className="container mx-auto px-4 lg:px-6">
              <div className="flex justify-between items-center h-20">
                {/* Logo with enhanced animation */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-3"
                >
                  {/* <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div> */}
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                    Luxe
                  </span>
                </motion.div>

                {/* Enhanced Search Bar */}
                <motion.div
                  variants={searchVariants}
                  whileFocus="focus"
                  className="flex md:hidden lg:flex flex-1 max-w-md mx-4"
                >
                  <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search your wishlist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-lg"
                    />
                  </div>
                </motion.div>


                {/* Desktop Navigation with enhanced styling */}
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10"
                    >
                      Home
                    </motion.div>
                  </Link>

                  <Link to="/#products">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2 text-gray-300 hover:text-amber-400 transition-all duration-300 rounded-lg hover:bg-white/10"
                    >
                      <Shirt className="w-6 h-6" />
                    </motion.div>
                  </Link>

                  {/* View mode toggle */}
                  <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      <List className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Enhanced Cart */}
                  <Link to="/addtocart">
                    <motion.div
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="relative cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <ShoppingCart className="text-gray-300 hover:text-purple-400 transition w-6 h-6" />
                      {verifiedUser?.cart?.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                        >
                          {verifiedUser?.cart?.length}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>

                  {/* User profile */}
                  <Link to={"/profile"}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <User className="w-4 h-4 text-white" />
                    </motion.div>
                  </Link>
                </div>

                {/* Enhanced Mobile menu button */}
                <div className="md:hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-300 p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20"
                  >
                    <motion.div
                      animate={{ rotate: isMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Enhanced Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10"
                >
                  <div className="px-4 py-6 space-y-4">
                    {/* Mobile Search */}
                    {/* <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search wishlist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                    </div> */}

                    <Link
                      whileHover={{ x: 5 }}
                      to={"/"}
                      className="block text-gray-300 hover:text-purple-400 transition py-2"
                    >
                      Home
                    </Link>
                     <Link
                      whileHover={{ x: 5 }}
                      to={"/profile"}
                      className="block text-gray-300 hover:text-purple-400 transition py-2"
                    >
                      Profile 👤
                    </Link>
                    <Link 
                      whileHover={{ x: 5 }}
                      to={"/#products"}
                      className="block text-gray-300 hover:text-purple-400 transition py-2"
                    >
                      Shop 🛍️
                    </Link>
                    <Link 
                      whileHover={{ x: 5 }}
                      to={"/showorder"}
                      className="block text-gray-300 hover:text-purple-400 transition py-2"
                    >
                      Orders 🍞
                    </Link>
                    <Link to="/addtocart">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2 py-2"
                      >
                        <ShoppingCart className="text-gray-300" size={18} />
                        <span className="text-gray-300">
                          Cart ({verifiedUser?.cart?.length})
                        </span>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Main Content with enhanced spacing */}
          <div className="container mx-auto px-4 lg:px-6 py-12">
            {/* Enhanced Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 mb-4"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Explore WishList
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                Discover and save your favorite items with style and elegance
              </motion.p>

            </motion.div>

            {/* Enhanced Empty Wishlist State */}
            {wishItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="flex flex-col items-center justify-center py-24 px-6 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 max-w-2xl mx-auto"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 4,
                  }}
                >
                  <div className="relative">
                    <Heart className="text-pink-400 mb-8" size={100} />
                    <div className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-300 mb-10 text-center text-lg max-w-md">
                  Start building your collection of favorite items and create your perfect wishlist
                </p>

                <Link to="/#products">
                  <motion.button
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-10 py-4 rounded-2xl transition shadow-2xl shadow-purple-500/30 text-lg font-medium flex items-center space-x-2"
                  >
                    <Shirt className="w-5 h-5" />
                    <span>Browse Products</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Enhanced Wishlist Items Grid */}
            {wishItems.length > 0 && (
              <>
                {filteredWishItems.length > 0 ? (
                  <div
                    className={`grid gap-8 ${viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
                        : 'grid-cols-1 max-w-4xl mx-auto'
                      }`}
                  >
                    {filteredWishItems.map((item, index) => (
                      <motion.div
                        key={item?.product?._id}
                        custom={index}
                        animate={controls}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group ${viewMode === 'list' ? 'flex' : ''
                          }`}
                      >
                        <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                          <Link to={`/productshow/${item?.product?._id}`}>
                            <img
                              src={item?.product?.img}
                              alt={item?.product?.name}
                              className={`${viewMode === 'list' ? 'h-48' : 'prod-height'
                                } w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110`}
                            />
                          </Link>

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Discount Badge */}
                          {item?.product?.discount > 0 && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', delay: index * 0.1 }}
                              className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-xl border border-white/20"
                            >
                              {item?.product?.discount}% OFF
                            </motion.div>
                          )}

                          {/* Quick Actions */}
                          <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeWishItem(item?.product?._id)}
                              className="bg-red-500/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-white/20 hover:bg-red-400"
                              aria-label="Remove from wishlist"
                            >
                              {storeProdId === item?.product?._id ? (
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                              ) : (
                                <Trash2 size={18} className="text-white" />
                              )}
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.15, rotate: -10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleMoveToCart(item?.product?._id, item?.size)}
                              className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-white/20"
                              aria-label="Move to cart"
                            >
                              {cartId === item?.product?._id ? (
                                <Loader2 className="w-5 h-5 animate-spin text-white" />
                              ) : (
                                <ShoppingCart size={18} className="text-white" />
                              )}
                            </motion.button>

                            <Link to={`/productshow/${item?.product?._id}`}>
                              <motion.button
                                whileHover={{ scale: 1.15, x: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-white/20 hover:bg-slate-700"
                                aria-label="View details"
                              >
                                <ArrowRight size={18} className="text-white" />
                              </motion.button>
                            </Link>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className={`p-6 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <h4 className="text-xl font-bold text-white mb-3 line-clamp-1">
                            {item?.product?.name}
                          </h4>

                          <div className="flex items-center mb-3">
                            <span className="text-lg font-bold text-pink-400 mr-3">
                              ₹{item?.product?.price}
                            </span>
                            {item?.product?.discount > 0 && (
                              <span className="text-gray-400 line-through text-sm mr-3">
                                ₹{(item?.product?.price / (1 - item?.product?.discount / 100)).toFixed(2)}
                              </span>
                            )}
                            <div className="flex items-center text-yellow-400 text-sm ml-auto bg-yellow-400/10 px-2 py-1 rounded-full">
                              <Star className="mr-1 fill-current" size={14} />
                              {item?.product?.rating}
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4 flex-1 line-clamp-2">
                            {item?.product?.desc}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                              Added {item?.addedDate}
                            </span>
                            <motion.div whileHover={{ scale: 1.1 }} className="w-2 h-2 bg-green-400 rounded-full shadow-lg" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400">
                    <h3 className="text-2xl font-semibold">No Product Found {searchQuery} ☹️</h3>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Enhanced Notification Toast */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 backdrop-blur-xl border border-white/20"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>{notificationMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default WishlistComponent;