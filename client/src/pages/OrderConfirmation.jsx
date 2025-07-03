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
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Mock data for wishlist items
const initialWishlistItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644560/ecom_store/footwear/uco0tuo6uxlcie0mdglc.jpg",
    description:
      "Noise-cancelling wireless headphones with premium sound quality",
    rating: 4.8,
    discount: 15,
    addedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644568/ecom_store/footwear/bzl61e8y9rpgqevaycqw.jpg",
    description: "Latest smartwatch with health tracking and notifications",
    rating: 4.5,
    discount: 0,
    addedDate: "1 week ago",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    image: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644562/ecom_store/footwear/e6otgthvbzlfl6cgmgxc.jpg",
    description:
      "Comfortable organic cotton t-shirt, perfect for everyday wear",
    rating: 4.2,
    discount: 10,
    addedDate: "3 days ago",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644575/ecom_store/footwear/vrmmdzrs9xaehezo7trf.jpg",
    description: "Waterproof bluetooth speaker with 24-hour battery life",
    rating: 4.7,
    discount: 20,
    addedDate: "5 days ago",
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 49.99,
    image: "/api/placeholder/400/400",
    description: "Genuine leather wallet with RFID protection",
    rating: 4.3,
    discount: 0,
    addedDate: "2 weeks ago",
  },
];

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

export default function WishlistComponent() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const controls = useAnimation();

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

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    showNotificationMsg("Item removed from wishlist");
  };

  const moveToCart = (item) => {
    setCartItems([...cartItems, item]);
    setWishlistItems(wishlistItems.filter((product) => product.id !== item.id));
    showNotificationMsg("Item moved to cart successfully");
  };

  const showNotificationMsg = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filterItems = (filterType) => {
    setActiveFilter(filterType);
  };

  return (
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
                ShopEase
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <motion.a
                whileHover={{ scale: 1.05, color: "#c084fc" }}
                href="#"
                className="text-gray-300 transition duration-300 ease-in-out"
              >
                Home
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, color: "#c084fc" }}
                href="#"
                className="text-gray-300 transition duration-300 ease-in-out"
              >
                Shop
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="relative font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Wishlist
                <span className="absolute -top-2 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="text-gray-300 hover:text-purple-400 transition" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.div>
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
                  Wishlist ({wishlistItems.length})
                </motion.a>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 py-2"
                >
                  <ShoppingCart className="text-gray-300" size={18} />
                  <span className="text-gray-300">
                    Cart ({cartItems.length})
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-400">
              Discover and save your favorite items
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center mt-4 md:mt-0"
          >
            <Heart className="text-pink-400 mr-2" size={22} />
            <span className="text-gray-300 text-lg">
              {wishlistItems.length} items
            </span>
          </motion.div>
        </div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex flex-wrap gap-2 md:gap-4"
        >
          <motion.button
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            onClick={() => filterItems("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "all"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            All Items
          </motion.button>
          <motion.button
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            onClick={() => filterItems("discount")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "discount"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            On Sale
          </motion.button>
          <motion.button
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            onClick={() => filterItems("recent")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === "recent"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-800 text-gray-300 border border-gray-700"
            }`}
          >
            Recently Added
          </motion.button>
        </motion.div>

        {/* Empty Wishlist State */}
        {wishlistItems.length === 0 && (
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
            <motion.button
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-lg transition shadow-lg shadow-purple-500/30"
            >
              Browse Products
            </motion.button>
          </motion.div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/20 shadow-xl relative h-full"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[302px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Discount Badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      {item.discount}% OFF
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-red-500 p-3 rounded-full hover:cursor-pointer shadow-lg"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} className="text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => moveToCart(item)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 hover:cursor-pointer rounded-full shadow-lg"
                      aria-label="Move to cart"
                    >
                      <ShoppingCart size={18} className="text-white" />
                    </motion.button>

                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-pink-400 mr-2">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.discount > 0 && (
                      <span className="text-gray-400 line-through text-sm mr-2">
                        ${(item.price / (1 - item.discount / 100)).toFixed(2)}
                      </span>
                    )}
                    <span className="flex items-center text-yellow-400 text-sm ml-auto">
                      <Star className="mr-1" size={16} />
                      {item.rating}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-0.5 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">
                      Added {item.addedDate}
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
  );
}
