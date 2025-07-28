import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Search,
  ShoppingCart,
  Star,
  ChevronDown,
  Filter,
  Heart,
  Eye,
  X,
  Clock,
  Loader2,
  HeartCrack,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
//import { allProducts } from "../../../../server/assets/access.js";
import { useProdStore } from "../../store/prodStore.js";
import SkeletonProductCard from "../../skeletons/SkeletonProductCard.jsx";
import { toast } from "sonner";
import AccSkeleton from "../../skeletons/AccSkeleton.jsx";
import { userAuthStore } from "../../store/authStore.js";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MenAccessories = () => {
  const [isAddingToWishList, setIsAddingToWishList] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [addingProductId, setAddingProductId] = useState(null);
  const isFetched = useRef(false);
  const [wishItems, setWishItems] = useState([]);
  //const [wishlist, setWishlist] = useState({});
  //console.log('IMported heroSlides:', Array.isArray(heroSlides1) ? heroSlides1 : 'Not an array');

  const { fetchAccs, products } = useProdStore();
  const { addCart, verifiedUser, fetchWishListProd, setStatus, wishlist } =
    userAuthStore();

  const handleAddToCart = async (productId) => {
    setAddingProductId(productId);
    await addCart({ productId });
    setAddingProductId(null);

    // store total cart values
    //setCartCount()
  };

  // Real Total cart values

  let totalCartItems =
    verifiedUser?.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // const allProducts = useMemo(()=> products || [], [products]);

  // if(!allProducts) {return <AccSkeleton />}
  useEffect(() => {
    fetchAccs();
    setCartItems(verifiedUser?.cart || []);
    setWishItems(verifiedUser?.wishlist || []);
  }, [fetchAccs, verifiedUser?.cart, verifiedUser?.wishlist]);

  const allProducts = useMemo(() => {
    return products || [];
  }, [products]);

  let isLoading = allProducts.length === 0;

  // Categories for filtering
  const categories = useMemo(
    () => [
      { uid: "all", name: "All", count: 124 },
      { uid: "masks", name: "masks", count: 42 },
      { uid: "caps", name: "caps", count: 36 },
      { uid: "bracelets", name: "bracelets", count: 28 },
      { uid: "rings", name: "rings", count: 18 },
    ],
    []
  );

  // Size options
  const sizeOptions = useMemo(() => ["S", "M", "L", "XL", "XXL"], []);

  // Discount options
  const discountOptions = useMemo(
    () => ["10%", "20%", "30%", "40%", "50%+"],
    []
  );

  // Hero section slides
  const heroSlides = useMemo(
    () => [
      {
        uid: 1,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508396/ecom_store/slider/sjrkvgp6mmfh4adgoqwg.jpg",
        title: "Summer Collection",
        subtitle: "Discover the latest trends for hot days",
        cta: "Shop Now",
      },
      {
        uid: 2,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508408/ecom_store/slider/scgi4a2cyx0ucflj0dbm.jpg",
        title: "Premium Denim",
        subtitle: "Quality jeans for every occasion",
        cta: "View Collection",
      },
      {
        uid: 3,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508415/ecom_store/slider/bub0xfkz3dyv18gkdpkt.jpg",
        title: "New Arrivals",
        subtitle: "Be the first to wear our latest styles",
        cta: "Explore",
      },
      {
        uid: 4,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508458/ecom_store/slider/xlmdpofqx9vtnp7xsznv.jpg",
        title: "Spring Sale",
        subtitle: "Up to 40% off select items",
        cta: "Shop Sale",
      },
    ],
    []
  );


  // Featured outfit combinations


  //Sample products

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // second useEffec
  // setting skeleton
  // WishList item
  const handleWishlist = async (product) => {
    // setWishlist((prev) => ({
    //   ...prev,
    //   [product._id]: !prev[product._id],
    // }));

    // giving the value to backend
    setIsAddingToWishList(product._id);
    await fetchWishListProd({ pid: product._id });
    setIsAddingToWishList(null);
  };

  // Toggle size selection
  const toggleSize = useCallback(
    (size) => {
      setSelectedSizes((prev) =>
        prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
      );
    },
    [setSelectedSizes]
  );

  // Memoized toggleDiscount function
  const toggleDiscount = useCallback(
    (discount) => {
      setSelectedDiscounts((prev) =>
        prev.includes(discount)
          ? prev.filter((d) => d !== discount)
          : [...prev, discount]
      );
    },
    [setSelectedDiscounts]
  );

  // Memoized filteredProducts computation
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory.toLowerCase();

      // Search query filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Size filter
      const matchesSize =
        selectedSizes.length === 0 ||
        (Array.isArray(product.sizes) && product.sizes.some((size) => selectedSizes.includes(size)));

      // Rating filter
      const matchesRating =
        selectedRating === 0 || product.rating >= selectedRating;

      // Discount filter
      let matchesDiscount = true;
      if (selectedDiscounts.length > 0) {
        matchesDiscount = false;
        for (const discountOption of selectedDiscounts) {
          const discountValue = parseInt(discountOption);
          if (discountOption === "50%+" && product.discount >= 50) {
            matchesDiscount = true;
            break;
          } else if (
            product.discount >= discountValue &&
            product.discount < discountValue + 10
          ) {
            matchesDiscount = true;
            break;
          }
        }
      }

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesSize &&
        matchesRating &&
        matchesDiscount
      );
    });
  }, [
    allProducts,
    activeCategory,
    searchQuery,
    priceRange,
    selectedSizes,
    selectedRating,
    selectedDiscounts,
  ]);

  return (
    <>
      {isLoading ? (
        <AccSkeleton />
      ) : (
        <div
          className="min-h-screen"
          style={{ backgroundColor: "oklch(0.27 0.02 252.42)" }}
        >
          {/* Top Navigation Bar */}
          <div
            className="sticky top-0 z-50 shadow-md"
            style={{ backgroundColor: "oklch(0.27 0.02 252.42)" }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <h1 className="text-white text-2xl font-bold">
                    LU<span className="text-primary">XE</span>
                  </h1>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-xl mx-8">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search for men's clothing..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full pl-12 pr-4 py-2 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-300" />
                  </div>
                </div>

                {/* Right Navigation Items */}
                <div className="flex items-center space-x-4">
                  {/* <button className="text-white flex items-center hover:text-primary transition-colors cursor-pointer">
                    <Star className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">Rate Us</span>
                  </button> */}

                  <div className="relative ">
                    <Link to={"/addtocart"}>
                      <button className="text-white flex items-center hover:text-primary transition-colors cursor-pointer">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItems?.length}
                        </span>
                      </button>
                    </Link>
                  </div>

                  <div className="relative">
                    <Link to={"/wishlist"}>
                      <button className="text-white hover:cursor-pointer flex items-center hover:text-primary transition-colors">
                        <HeartCrack className="h-6 w-6" />
                        <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {wishItems?.length}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Search - Shows below header on mobile */}
              <div className="mt-3 md:hidden">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for clothing..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Carousel Section */}
          <div className="max-w-7xl mx-auto px-4 py-6 h-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-[550px] md:h-[610px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        {heroSlides[currentSlide].title}
                      </h2>
                      <p className="text-lg text-gray-200 mb-6">
                        {heroSlides[currentSlide].subtitle}
                      </p>
                      <button
                        onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
                        className="bg-primary hover:bg-primary-focus text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        {heroSlides[currentSlide].cta}
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                        ? "w-8 bg-primary"
                        : "bg-white bg-opacity-50 hover:bg-opacity-75"
                      }`}
                  />
                ))}
              </div>

              {/* Time indicator */}
              <div className="absolute top-4 right-4 flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1">
                <Clock className="h-4 w-4 text-white mr-1" />
                <span className="text-white text-xs">Next in 5s</span>
              </div>
            </div>
          </div>

          {/* Outfit Combinations Section */}
          {/* <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Trending Combinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outfitCombinations.map((outfit) => (
                <motion.div
                onClick={()=> toast.info('Feature Coming Soon 🔜 ...')}
                  key={outfit.uid}
                  className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  
                >
                  <div className="relative" >
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">
                        {outfit.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1">
                      {outfit.items.map((item, index) => (
                        <li
                          key={index}
                          className="text-gray-300 text-sm flex items-center"
                        >
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-4 bg-black bg-opacity-10 hover:bg-primary text-white py-2 rounded-lg transition-colors" 
                    >
                      Shop This Look
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div> */}

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Mobile Filter Toggle */}

            {/* from 'fotwear.jsx code */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden bg-[#1d1c23] bg-opacity-80 backdrop-blur-sm p-2 rounded-full text-white shadow-lg flex items-center gap-4">
              <h2 className="text-sm font-semibold whitespace-nowrap">
                {activeCategory}{" "}
                <span className="text-gray-300">
                  ({filteredProducts.length})
                </span>
              </h2>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-1 bg-[#403e4e] bg-opacity-40 p-2 rounded-full text-white hover:scale-105 transition"
              >
                <Filter className="h-5 w-5" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters Sidebar - Desktop */}
              <div className="hidden md:block w-64 flex-shrink-0">
                {/* Scrollable inner container */}
                <div className="h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Categories Filter */}
                  <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Filter className="h-5 w-5 mr-2 text-primary" />
                      Categories
                    </h2>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => setActiveCategory(category.name)}
                            className={`w-full flex justify-between items-center py-2.5 px-4 rounded-xl transition-all ${activeCategory === category.name
                                ? "bg-primary text-white font-medium"
                                : "text-white hover:bg-gray-700 hover:bg-opacity-10"
                              }`}
                          >
                            <span>{category.name}</span>
                            <span
                              className={`text-sm px-2 py-0.5 rounded-full ${activeCategory === category.name
                                  ? "bg-white bg-opacity-20"
                                  : "bg-white bg-opacity-10"
                                }`}
                            >
                              {category.count}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Range Filter */}
                  <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Price Range
                    </h2>
                    <div className="mb-4">
                      <div className="flex justify-between text-white text-sm mb-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full mb-2 accent-primary"
                      />
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full accent-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-1/2 bg-gray-700 bg-opacity-10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-1/2 bg-gray-700 bg-opacity-10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Size Filter */}
                  {/* <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">Size</h2>
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`flex items-center justify-center w-12 h-12 rounded-lg text-black transition-colors ${
                            selectedSizes.includes(size)
                              ? "bg-primary"
                              : "bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  {/* Discount Filter */}
                  <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Discount
                    </h2>
                    <div className="space-y-2">
                      {discountOptions.map((discount) => (
                        <div key={discount} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`discount-${discount}`}
                            checked={selectedDiscounts.includes(discount)}
                            onChange={() => toggleDiscount(discount)}
                            className="mr-3 h-4 w-4 accent-primary"
                          />
                          <label
                            htmlFor={`discount-${discount}`}
                            className="text-white"
                          >
                            {discount} off
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Rating Filter */}
                  <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Customer Rating
                    </h2>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center text-white"
                        >
                          <input
                            type="radio"
                            id={`rating-${rating}`}
                            name="rating"
                            checked={selectedRating === rating}
                            onChange={() => setSelectedRating(rating)}
                            className="mr-3 h-4 w-4 accent-primary"
                          />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="flex items-center"
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${index < rating
                                    ? "text-yellow-400"
                                    : "text-gray-500"
                                  }`}
                                fill={index < rating ? "#FACC15" : "none"}
                              />
                            ))}
                            <span className="ml-2">& Up</span>
                          </label>
                        </div>
                      ))}
                      <div className="mt-3">
                        <button
                          onClick={() => setSelectedRating(0)}
                          className="text-sm text-primary hover:underline"
                        >
                          Clear rating filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Filters Sidebar */}
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 h-full w-4/5 max-w-sm overflow-y-auto"
                      style={{ backgroundColor: "oklch(0.27 0.02 252.42)" }}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "tween" }}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-bold text-white">
                            Filters
                          </h2>
                          <button
                            onClick={() => setShowMobileFilters(false)}
                            className="p-1 rounded-full hover:bg-white hover:bg-opacity-10"
                          >
                            <X className="h-6 w-6 text-white" />
                          </button>
                        </div>

                        {/* Categories for Mobile */}
                        <div className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Categories
                          </h2>
                          <ul className="space-y-2">
                            {categories.map((category) => (
                              <li key={category.uid}>
                                <button
                                  onClick={() => {
                                    setActiveCategory(category.name);
                                  }}
                                  className={`w-full flex justify-between items-center py-2 px-3 rounded-xl transition-all ${activeCategory === category.name
                                      ? "bg-primary text-white font-medium"
                                      : "text-white hover:bg-gray-500 hover:bg-opacity-10"
                                    }`}
                                >
                                  <span>{category.name}</span>
                                  <span
                                    className={`text-sm px-2 py-0.5 rounded-full ${activeCategory === category.name
                                        ? "bg-white bg-opacity-20"
                                        : "bg-white bg-opacity-10"
                                      }`}
                                  >
                                    {category.count}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Price Range for Mobile */}
                        <div className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Price Range
                          </h2>
                          <div className="mb-4">
                            <div className="flex justify-between text-white text-sm mb-2">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="200"
                              value={priceRange[0]}
                              onChange={(e) =>
                                setPriceRange([
                                  parseInt(e.target.value),
                                  priceRange[1],
                                ])
                              }
                              className="w-full mb-2 accent-primary"
                            />
                            <input
                              type="range"
                              min="0"
                              max="200"
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([
                                  priceRange[0],
                                  parseInt(e.target.value),
                                ])
                              }
                              className="w-full accent-primary"
                            />
                          </div>
                        </div>

                        {/* Size Filter for Mobile */}
                        <div className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Size
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {sizeOptions.map((size) => (
                              <button
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`flex items-center justify-center w-12 h-12 rounded-lg text-gray-700 transition-colors ${selectedSizes.includes(size)
                                    ? "bg-primary text-white"
                                    : "bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
                                  }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Discount Filter for Mobile */}
                        <div className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Discount
                          </h2>
                          <div className="space-y-2">
                            {discountOptions.map((discount) => (
                              <div key={discount} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`mobile-discount-${discount}`}
                                  checked={selectedDiscounts.includes(discount)}
                                  onChange={() => toggleDiscount(discount)}
                                  className="mr-3 h-4 w-4 accent-primary"
                                />
                                <label
                                  htmlFor={`mobile-discount-${discount}`}
                                  className="text-white"
                                >
                                  {discount} off
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Rating Filter for Mobile */}
                        <div className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl p-4">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Customer Rating
                          </h2>
                          <div className="space-y-2">
                            {[5, 4, 3, 2].map((rating) => (
                              <div
                                key={rating}
                                className="flex items-center text-white"
                              >
                                <input
                                  type="radio"
                                  id={`mobile-rating-${rating}`}
                                  name="mobile-rating"
                                  checked={selectedRating === rating}
                                  onChange={() => setSelectedRating(rating)}
                                  className="mr-3 h-4 w-4 accent-primary"
                                />
                                <label
                                  htmlFor={`mobile-rating-${rating}`}
                                  className="flex items-center"
                                >
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                      key={index}
                                      className={`h-4 w-4 ${index < rating
                                          ? "text-yellow-400"
                                          : "text-gray-500"
                                        }`}
                                      fill={index < rating ? "#FACC15" : "none"}
                                    />
                                  ))}
                                  <span className="ml-2">& Up</span>
                                </label>
                              </div>
                            ))}
                            <div className="mt-3">
                              <button
                                onClick={() => setSelectedRating(0)}
                                className="text-sm text-primary hover:underline"
                              >
                                Clear rating filter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product?.uid}
                      className="bg-gray-700 bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden group"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Link to={`/productshow/${product?._id}`}>
                        <div className="relative">
                          <img
                            src={product?.img}
                            alt={product?.name}
                            className="w-full h-64 object-cover"
                          />

                          {product.discount > 0 && (
                            <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                              {product?.discount}% OFF
                            </div>
                          )}
                          {product.new && (
                            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              NEW
                            </div>
                          )}

                          {/* Heart Icon Button */}
                          <div className="absolute bottom-2 right-3 z-20">
                            {isAddingToWishList === product?._id ? (
                              <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse"></div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleWishlist(product);
                                }}
                                className="hover:cursor-pointer bg-gray-100 bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full shadow-md transition-colors"
                              >
                                {wishlist[product._id] ? (
                                  <FaHeart className="text-red-500 w-5 h-5" />
                                ) : (
                                  <FaRegHeart className="text-gray-400 w-5 h-5" />
                                )}
                              </button>
                            )}
                          </div>

                          {/* HeartIcon button Ends here.. */}

                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-bold text-white">
                              {product.name}
                            </h3>
                            <div className="flex items-center mt-2">
                              <div className="flex text-yellow-400 mr-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-4 w-4 ${index < product.rating
                                        ? "text-yellow-400"
                                        : "text-gray-500"
                                      }`}
                                    fill={
                                      index < product.rating
                                        ? "#FACC15"
                                        : "none"
                                    }
                                  />
                                ))}
                              </div>
                              <span className="text-white text-sm">
                                ({product.reviewCount})
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-white text-lg font-bold">
                                ₹{product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-gray-400 text-sm line-through">
                                  ₹{product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="p-4">
                        {/* Size dropdown for tasting.... */}

                        {/* Size dropdown Ends here.... */}
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="w-full bg-[#4b447b] bg-opacity-10 hover:bg-primary text-white py-2 rounded-lg transition-colors"
                        >
                          {addingProductId === product._id ? (
                            <span className="flex items-center justify-center">
                              <Loader2 className="w-5 h-5 animate-spin" />
                            </span>
                          ) : (
                            "Add to Cart"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenAccessories;
