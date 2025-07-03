import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ShoppingBag,
  Star,
  Truck,
  Shield,
  Heart,
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

// Tooltip Component
const Tooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "-top-12 left-1/2 transform -translate-x-1/2",
    bottom: "-bottom-12 left-1/2 transform -translate-x-1/2",
    left: "-left-12 top-1/2 transform -translate-y-1/2",
    right: "-right-12 top-1/2 transform -translate-y-1/2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800",
    bottom:
      "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800",
    right:
      "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: position === "top" ? 10 : -10,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: position === "top" ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          >
            <div className={`bg-red-400  text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-green-600 backdrop-blur-sm bg-opacity-90 flex items-center gap-2`}>
              <MessageCircle className="h-3 w-3" />
              {text}
            </div>
            <div
              className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Product Card with Tooltip
const ProductCard = ({ product, index }) => {
  return (
    <div style={{ width: "300px", height: "450px" }} className="mx-2">
      <Tooltip
        text={`${product.name} - Premium quality with ${product.reviews} reviews`}
      >
        <motion.div
          whileHover={{ y: -10, scale: 1.03 }}
          className="h-full rounded-2xl overflow-hidden group relative bg-gradient-to-b from-gray-900 to-black border border-white/10 cursor-pointer"
        >
          {product.tag && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600">
              {product.tag}
            </div>
          )}

          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image || "/api/placeholder/300/250"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="flex space-x-3">
                <Tooltip text="Add to Cart">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </motion.button>
                </Tooltip>
                <Tooltip text="Add to Wishlist">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                </Tooltip>
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-sm ml-2 text-gray-400">
                ({product.reviews})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                ${product.price}
              </p>
              <Tooltip text="View Details">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Tooltip>
            </div>
          </div>
        </motion.div>
      </Tooltip>
    </div>
  );
};

// Main Component
const ClaudeLand = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  // Featured Products Data
  const featuredProducts = [
    {
      id: 1,
      name: "Quantum Headphones",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
      rating: 4.9,
      reviews: 120,
      tag: "New",
    },
    {
      id: 2,
      name: "Nebula Smart Watch",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989",
      rating: 4.7,
      reviews: 86,
      tag: "Best Seller",
    },
    {
      id: 3,
      name: "Echo Wireless Earbuds",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000",
      rating: 4.8,
      reviews: 94,
      tag: "Sale",
    },
    {
      id: 4,
      name: "Pulse Portable Speaker",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000",
      rating: 4.6,
      reviews: 72,
      tag: "Limited",
    },
    {
      id: 5,
      name: "Aura Fitness Tracker",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000",
      rating: 4.5,
      reviews: 65,
      tag: "Popular",
    },
  ];

  // Categories Data
  const categories = [
    {
      name: "Electronics",
      icon: "💻",
      color: "from-blue-500 to-indigo-600",
      description: "Latest tech gadgets",
    },
    {
      name: "Fashion",
      icon: "👕",
      color: "from-pink-500 to-rose-600",
      description: "Trendy clothing",
    },
    {
      name: "Home",
      icon: "🏠",
      color: "from-green-500 to-emerald-600",
      description: "Home essentials",
    },
    {
      name: "Beauty",
      icon: "✨",
      color: "from-purple-500 to-violet-600",
      description: "Beauty products",
    },
    {
      name: "Sports",
      icon: "🏀",
      color: "from-orange-500 to-amber-600",
      description: "Sports equipment",
    },
    {
      name: "Books",
      icon: "📚",
      color: "from-yellow-500 to-amber-400",
      description: "Knowledge hub",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "The products are amazing and the delivery was super fast. Will definitely shop here again!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content:
        "Great selection of tech products. The quality exceeds expectations every time.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Emma Williams",
      role: "Fashion Blogger",
      content:
        "I love the fashion collection. Always on trend and great quality for the price.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              NOVA
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex space-x-6 lg:space-x-8"
            >
              <Tooltip text="Go to Homepage">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors text-sm lg:text-base"
                >
                  Home
                </a>
              </Tooltip>
              <Tooltip text="Browse Products">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors text-sm lg:text-base"
                >
                  Shop
                </a>
              </Tooltip>
              <Tooltip text="View Categories">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors text-sm lg:text-base"
                >
                  Categories
                </a>
              </Tooltip>
              <Tooltip text="About Us">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors text-sm lg:text-base"
                >
                  About
                </a>
              </Tooltip>
              <Tooltip text="Contact Support">
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors text-sm lg:text-base"
                >
                  Contact
                </a>
              </Tooltip>
            </motion.div>

            {/* Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              <Tooltip text="Search Products">
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </Tooltip>
              <Tooltip text="Shopping Cart">
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-xs rounded-full h-4 w-4 flex items-center justify-center text-white">
                    3
                  </span>
                </button>
              </Tooltip>
              <button
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/10 md:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#"
                className="py-2 hover:text-purple-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="py-2 hover:text-purple-400 transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                className="py-2 hover:text-purple-400 transition-colors"
              >
                Categories
              </a>
              <a
                href="#"
                className="py-2 hover:text-purple-400 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="py-2 hover:text-purple-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-600/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 sm:w-60 sm:h-60 bg-pink-600/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs sm:text-sm font-medium inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4"
            >
              Next Generation Shopping
            </motion.div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Future of{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              Shopping
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-lg mx-auto lg:mx-0">
              Experience the revolution in online shopping with our curated
              collection of premium products and immersive shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Tooltip text="Start Shopping Now">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium flex items-center justify-center gap-2 transition-all"
                >
                  Shop Now <ShoppingBag className="ml-1 h-5 w-5" />
                </motion.button>
              </Tooltip>
              <Tooltip text="Explore Our Collection">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                >
                  Explore <ChevronRight className="ml-1 h-5 w-5" />
                </motion.button>
              </Tooltip>
            </div>
          </motion.div>

          <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-20 blur-3xl absolute inset-0 animate-pulse"></div>
              <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl relative z-10 flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-500">
                <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-white" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="text-white/70 text-sm mb-2"
          >
            Scroll Down
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 0.5,
            }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={targetRef} className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        </div>

        <motion.div
          style={{ opacity, scale, y }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Discover our handpicked selection of premium products that combine
              style, quality, and innovation.
            </motion.p>
          </div>

          {/* Products Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full max-w-sm"
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Shop by Category
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <Tooltip key={category.name} text={category.description}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  className={`rounded-2xl p-4 sm:p-6 text-center cursor-pointer bg-gradient-to-br ${category.color} relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="text-2xl sm:text-4xl mb-2 sm:mb-3"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: index * 0.2,
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {category.name}
                    </h3>
                  </div>
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Tooltip text="Free and fast delivery on all orders over $50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 sm:p-8 group"
              >
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  Fast Delivery
                </h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                  Free shipping on all orders over $50. Fast delivery to your
                  doorstep within 2-3 business days.
                </p>
              </motion.div>
            </Tooltip>

            <Tooltip text="Your payments are 100% secure with encryption">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 sm:p-8 group"
              >
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-pink-500 to-red-500 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors">
                  Secure Payment
                </h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                  Your payments are protected with end-to-end encryption and
                  verified security protocols.
                </p>
              </motion.div>
            </Tooltip>
            <Tooltip text="Exclusive deals and top-notch customer service">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 sm:p-8 group"
              >
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  Customer Satisfaction
                </h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                  We value our customers and provide 24/7 support to ensure a
                  seamless shopping experience.
                </p>
              </motion.div>
            </Tooltip>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClaudeLand;
