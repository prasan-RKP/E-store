import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Card container animations
const skeletonCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

// Shimmer effect animation
const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 1.5,
      ease: "linear",
    },
  },
};

const WishSkeleton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const numberOfSkeletons = 6;

  // Create an array to render multiple skeleton cards
  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      {/* Navbar with Glassmorphism - same as the actual component */}
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
                  ...
                </span>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="text-gray-300 hover:text-purple-400 transition" />
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
                  Wishlist (...)
                </motion.a>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 py-2"
                >
                  <ShoppingCart className="text-gray-300" size={18} />
                  <span className="text-gray-300">Cart (...)</span>
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
              {/* Skeleton loading for item count */}
              <div className="h-6 w-10 bg-gray-700 rounded-md animate-pulse"></div>
            </span>
          </motion.div>
        </div>

        {/* Filter Options - Skeleton version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex flex-wrap gap-2 md:gap-4"
        >
          {/* Skeleton buttons for filters */}
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 md:w-32 bg-gray-800 rounded-full overflow-hidden relative"
            >
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
              />
            </div>
          ))}
        </motion.div>

        {/* Skeleton Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {skeletonArray.map((index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={skeletonCardVariants}
              className="bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/20 shadow-xl h-full"
            >
              {/* Skeleton image */}
              <div className="relative h-[300px] bg-gray-700 overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                />
              </div>
              
              <div className="p-6 flex flex-col h-full">
                {/* Skeleton title */}
                <div className="h-7 w-5/6 bg-gray-700 rounded-md mb-4 overflow-hidden relative">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                  />
                </div>
                
                {/* Skeleton price and rating */}
                <div className="flex items-center mb-4">
                  <div className="h-6 w-20 bg-gray-700 rounded-md mr-2 overflow-hidden relative">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                    />
                  </div>
                  <div className="ml-auto h-5 w-16 bg-gray-700 rounded-md overflow-hidden relative">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                    />
                  </div>
                </div>
                
                {/* Skeleton description */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="h-4 bg-gray-700 rounded-md w-full overflow-hidden relative">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                    />
                  </div>
                  <div className="h-4 bg-gray-700 rounded-md w-5/6 overflow-hidden relative">
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                    />
                  </div>
                </div>
                
                {/* Skeleton footer */}
                <div className="h-4 w-24 bg-gray-700 rounded-md mt-auto overflow-hidden relative">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Loading spinner at the bottom */}
      <div className="flex justify-center items-center py-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
        />
      </div>
    </div>
  );
};

export default WishSkeleton;