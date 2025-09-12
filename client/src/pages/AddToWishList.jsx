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
  Shirt
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { userAuthStore } from "../store/authStore.js";
import WishSkeleton from "../skeletons/WishSkeleton.jsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "../customs/Wishlist.css";

// Card hover variant
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow:
      "0 20px 25px -5px rgba(76, 29, 149, 0.25), 0 10px 10px -5px rgba(76, 29, 149, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Button animation variants
const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#7e22ce",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const WishlistComponent = () => {
  // const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishItems, setWishItems] = useState([]);
  const [storeProdId, setStoreProdId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartLength, setCartLength] = useState(0);
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
    // Animate cards when component loads
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
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
    //console.log(`Getting the prodId:${id}, size:${size}`);
    setCartId(id);
    await moveToAddCart({ productId: id, size });
    setCartId(null);
    //toast.success("Product moved to Cart ✅");
  };

  return (
    <>
      {isShowingWishlistItem ? (
        <WishSkeleton />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
          {/* Navbar with Glassmorphism */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 bg-opacity-80 backdrop-blur-lg backdrop-filter shadow-lg border-b border-purple-900/30 sticky top-0 z-50"
          >
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    Luxe
                  </motion.div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                  <Link to={"/"}
                    whileHover={{ scale: 1.05, color: "#c084fc" }}
                    className="text-gray-300 transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                  <Link to={"/#products"}
                    whileHover={{ scale: 1.05, color: "#c084fc" }}
                    href="/#products"
                    className="text-gray-300 transition duration-300 ease-in-out"
                  >
                    <Shirt className="w-6 h-6 hover:text-amber-200" />
                  </Link>

                  <Link to={"/addtocart"}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative cursor-pointer"
                    >
                      <ShoppingCart className="text-gray-300 hover:text-purple-400 transition" />
                      {verifiedUser?.cart?.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {verifiedUser?.cart?.length}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-300 p-2 rounded-full bg-gray-700 bg-opacity-50"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="md:hidden bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-lg border-t border-purple-900/30"
                >
                  <div className="px-4 py-4 space-y-4">
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="block text-gray-300 hover:text-purple-400 transition py-2"
                    >
                      Home
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="block text-gray-300 hover:text-purple-400 transition py-2"
                    >
                      Shop
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="block text-purple-400 font-medium py-2"
                    >
                      Wishlist ({wishItems?.length})
                    </motion.a>
                    <Link to={"/addtocart"}>
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

          {/* Main Content */}
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 mb-2">
                  Explore WishList
                </h1>
                <p className="text-gray-400">
                  Discover and save your favorite items
                </p>
              </motion.div>

              
            </div>

            {/* Empty Wishlist State */}
            {wishItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="flex flex-col items-center justify-center py-20 px-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-900/20"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3,
                  }}
                >
                  <Heart className="text-pink-400 mb-6" size={80} />
                </motion.div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-400 mb-8 text-center">
                  Start saving items you love to your wishlist
                </p>

                <Link to={"/#products"}>
                  <motion.button
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                    className="hover:cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-lg transition shadow-lg shadow-purple-500/30"
                  >
                    Browse Products
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Wishlist Items */}
            {wishItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                {wishItems?.map((item, index) => (
                  <motion.div
                    key={item?.product?._id}
                    custom={index}
                    animate={controls}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/20 shadow-xl relative w-[96%] h-[96%]"
                  >
                    <div className="relative group">
                      <Link to={`/productshow/${item?.product?._id}`}>
                        <img
                          src={item?.product?.img}
                          alt={item?.product?.name}
                          className="w-full prod-height object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                      </Link>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />

                      {/* Discount Badge */}
                      {item?.product?.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          {item?.product?.discount}% OFF
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div
                        className="absolute bottom-4 left-0 right-0 flex justify-center 
  opacity-100 md:opacity-0 md:group-hover:opacity-100 
  transition-opacity duration-300 space-x-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeWishItem(item?.product?._id)}
                          className="bg-red-500 p-3 rounded-full hover:cursor-pointer shadow-lg"
                          aria-label="Remove from wishlist"
                        >
                          {storeProdId === item?.product?._id ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                            </>
                          ) : (
                            <>
                              <Trash2 size={18} className="text-white" />
                            </>
                          )}
                        </motion.button>
                        {/* MoveTOCartButton */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            handleMoveToCart(item?.product?._id, item?.size);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 hover:cursor-pointer rounded-full shadow-lg"
                          aria-label="Move to cart"
                        >
                          {cartId === item?.product?._id ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={18} className="text-white" />
                            </>
                          )}
                        </motion.button>

                        {/*  */}
                        <Link to={`/productshow/${item?.product?._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-slate-900 text-gray-500 hover:bg-slate-700 p-3 hover:cursor-pointer rounded-full shadow-lg"
                            aria-label="Move to cart"
                          >
                            <ArrowRight size={18} className="text-white" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col h-full">
                      <h4 className="text-lg font-bold text-white mb-2">
                        {item?.product?.name}
                      </h4>
                      <div className="flex items-center mb-2">
                        <span className="text-medium font-bold text-pink-400 mr-2">
                          ₹{item?.product?.price}
                        </span>
                        {item?.product?.discount > 0 && (
                          <span className="text-gray-400 line-through text-xs mr-2">
                            ₹
                            {(
                              item?.product?.price /
                              (1 - item?.product?.discount / 100)
                            ).toFixed(2)}
                          </span>
                        )}
                        <span className="flex items-center text-yellow-400 text-xs ml-auto">
                          <Star className="mr-1" size={16} />
                          {item?.product?.rating}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-0.5 flex-1">
                        {item?.product?.desc}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-400">
                          {/* Modification needed */}
                          Added {item?.addedDate}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Notification Snackbar */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
              >
                {notificationMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default WishlistComponent;
