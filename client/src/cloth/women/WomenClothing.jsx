import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
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
  ChevronUp,
  HeartCrack,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { outfitCombinations1 } from "../../assets/female/outfitCombinations.js";
import { womenProds } from "../../../../server/assets/women.js";
import { useProdStore } from "../../store/prodStore.js";
import { userAuthStore } from "../../store/authStore.js";
import AccSkeleton from "../../skeletons/AccSkeleton.jsx";
import { toast } from "sonner";
import { RiLoader4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../../customs/WomenCloth.css";
import { useOrderStore } from "../../store/OrderStore.js";
import { GoPackage } from "react-icons/go";

// <img alt="Casual Linen Shirt" class="w-full h-72 object-cover" src="https://res.cloudinary.com/dkaxf2nqt/image/upload/v1713692108/womenCollection/shirt1.jpg">

const WomenClothing = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  // const [cartCount, setCartCount] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const intervalRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [isAddingToWishList, setIsAddingToWishList] = useState(null);
  const [wishItems, setWishItems] = useState([]);
  const [length, setLength] = useState(0)


  //console.log("Imported outfit", outfitCombinations1);
  // Store Values from the store like 'userAuthStore' ,'useProdStore' & 'useOrderStore'
  const { fetchingWomenCloth, products } = useProdStore();
  const { verifiedUser, addCart, fetchWishListProd } = userAuthStore();
  const {orderItemLength, fetchOrder}  =  useOrderStore();


  // Categories for filtering
  const categories = [
    { id: "all", name: "All", count: 124 },
    { id: "jeans", name: "Jeans", count: 42 },
    { id: "shirts", name: "Shirts", count: 36 },
    { id: "traditionals", name: "traditionals", count: 28 },
    { id: "jackets", name: "Jackets", count: 18 },
  ];

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
      id: 1,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508518/ecom_store/slider/oxuoikjldsxasp0pxsp3.jpg",
      title: "Summer Collection",
      subtitle: "Discover the latest trends for hot days",
      cta: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508523/ecom_store/slider/c02xq3qs2npgxnflmvca.jpg",
      title: "Premium Coat-V",
      subtitle: "Feel the Premium version",
      cta: "View Collection",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508532/ecom_store/slider/zudaoad4woxxi4aocvsk.jpg",
      title: "New Arrivals Bomber Jacket",
      subtitle: "Be the first to wear our latest styles",
      cta: "Explore",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508536/ecom_store/slider/stiwcwcftrl8e4bqlqrc.jpg",
      title: "Coming soon the BlackRock mdl..",
      subtitle: "Up to 4% on Drop",
      cta: "Shop Sale",
    },
  ],
  []
);

  // Featured outfit combinations
  const outfitCombinations = useMemo(
    () => [
      {
        id: 1,
        name: "Casual Weekend",
        image:
          "https://images.pexels.com/photos/3615455/pexels-photo-3615455.jpeg?_gl=1*5nq5i0*_ga*MjA0OTA3MjcyLjE2OTUwMTk2NDQ.*_ga_8JE65Q40S6*czE3NTAzNDc1NDIkbzgwJGcxJHQxNzUwMzQ3NTkzJGo5JGwwJGgw",
        items: [
          "Relaxed Fit Jeans",
          "Premium Cotton T-Shirt",
          "Vintage Denim Jacket",
        ],
      },
      {
        id: 2,
        name: "Office Smart",
        image:
          "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?_gl=1*10y5ls4*_ga*MjA0OTA3MjcyLjE2OTUwMTk2NDQ.*_ga_8JE65Q40S6*czE3NTAzNDc1NDIkbzgwJGcxJHQxNzUwMzQ3NjQ5JGozNiRsMCRoMA..",
        items: [
          "Slim Fit Jeans",
          "Oxford Button-Down Shirt",
          "Water-Resistant Bomber Jacket",
        ],
      },
    ],
    []
  );

  //const allSizes = ["M", "L", "XL", "XXL"];

  // Fectching orders And set the length of orders
useEffect(() => {
    const loadOrders = async () => {
      await fetchOrder();
    };
    loadOrders();
  }, [fetchOrder]);

  useEffect(() => {
    setLength(orderItemLength || 0);
  }, [orderItemLength])
  

  // Fetching Women Collection
  useEffect(() => {
    fetchingWomenCloth();
    setCartItems(verifiedUser?.cart || []);
    setWishItems(verifiedUser?.wishlist || []);
  }, [fetchingWomenCloth, verifiedUser?.cart, verifiedUser?.wishlist]);

  const allProducts = useMemo(() => {
    return products || [];
  }, [products]);

  let isLoading = allProducts.length === 0;

  // Auto-rotate hero slides
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [heroSlides.length]);

  // Toggle size selection
  const toggleSize = useCallback(
    (size) => {
      if (selectedSizes.includes(size)) {
        setSelectedSizes((prev) => prev.filter((s) => s !== size));
      } else {
        setSelectedSizes((prev) => [...prev, size]);
      }
    },
    [selectedSizes]
  );

  // WishListItem functionality
  const handleWishlist = async (product) => {
    setWishlist((prev) => ({
      ...prev,
      [product._id]: !prev[product._id],
    }));

    // giving value to the backend
    setIsAddingToWishList(product._id);
    await fetchWishListProd({ pid: product._id });
    setIsAddingToWishList(null);
  };

  // Memoize toggleDiscount function
  const toggleDiscount = useCallback(
    (discount) => {
      if (selectedDiscounts.includes(discount)) {
        setSelectedDiscounts((prev) => prev.filter((d) => d !== discount));
      } else {
        setSelectedDiscounts((prev) => [...prev, discount]);
      }
    },
    [selectedDiscounts]
  );

  // Dropdown Functionality

  const toggleDropdown = (productId) => {
    setDropdownOpen((prev) => (prev === productId ? null : productId));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [productId]: { id: productId, size: size },
    }));
    setDropdownOpen(null);
  };

  const handleAddtoCart = async (id, size) => {
    const selected = selectedSize[id];

    if (!selected) {
      toast.error("Do Select Your Product Size");
      return false;
    }

    if (selected.id === id && selected.size === size) {
      setIsAddingToCart(id);
      await addCart({ productId: selected.id, size: selected.size });
    } else {
      toast.error("MisMatched product do check Logic");
    }

    setIsAddingToCart(null);
    setSelectedSize((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  // Memoize filtered products
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
        product.sizes.some((size) => selectedSizes.includes(size));

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
  // Todod from here ....

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
                      placeholder="Search for women's clothing..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full pl-12 pr-4 py-2 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-300" />
                  </div>
                </div>

                {/* Right Navigation Items */}
                <div className="flex items-center space-x-4">
                  {/* <button className="text-white flex items-center hover:text-primary transition-colors">
                    <Star className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">Rate Us</span>
                  </button> */}

                  <div className="relative ">
                    <Link to={"/showorder"}>
                      <button className="text-white flex items-center hover:text-primary hover:cursor-pointer transition-colors">
                        <GoPackage className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {length}
                        </span>
                      </button>
                    </Link>
                  </div>

                  <div className="relative ">
                    <Link to={"/addtocart"}>
                      <button className="text-white flex items-center hover:text-primary hover:cursor-pointer transition-colors">
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
          <div className="max-w-7xl mx-auto px-4 py-2.5 h-auto mb-10">
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
                        className="bg-primary hover:bg-primary-focus text-white px-6 py-3 rounded-xl font-medium transition-colors"
                        onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
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
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
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
                  key={outfit.id}
                  className="bg-[#2d434d] bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                   onClick={()=> toast.info('Feature Coming Soon 🔜 ...')}
                >
                  <div className="relative">
                    <img
                      src={outfit.image}
                      alt={outfit.name}
                      className="w-full h-72 object-cover"
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
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-4 bg-[#22537f] bg-opacity-10 hover:bg-[#1a609f] text-white py-2 rounded-lg transition-colors">
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
            {/* <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold text-white">
            {activeCategory}{" "}
            <span className="text-gray-400">({filteredProducts.length})</span>
          </h2>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm p-2 rounded-lg text-white"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div> */}

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
                  {/* Category Filter */}
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
                            className={`w-full flex justify-between items-center py-2.5 px-4 rounded-xl transition-all ${
                              activeCategory === category.name
                                ? "bg-primary text-white font-medium"
                                : "text-white hover:bg-gray-700 hover:bg-opacity-10"
                            }`}
                          >
                            <span>{category.name}</span>
                            <span
                              className={`text-sm px-2 py-0.5 rounded-full ${
                                activeCategory === category.name
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

                  {/* Price Filter */}
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
                  <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6">
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
                  </div>

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

                  {/* Rating Filter */}
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
                                className={`h-4 w-4 ${
                                  index < rating
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
                            <X className="h-6 w-6 text-red-700" />
                          </button>
                        </div>

                        {/* Categories for Mobile */}
                        <div className="bg-slate-950 bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Categories
                          </h2>
                          <ul className="space-y-2">
                            {categories.map((category) => (
                              <li key={category.id}>
                                <button
                                  onClick={() => {
                                    setActiveCategory(category.name);
                                  }}
                                  className={`w-full flex justify-between items-center py-2 px-3 rounded-xl transition-all ${
                                    activeCategory === category.name
                                      ? "bg-primary text-white font-medium"
                                      : "text-white hover:bg-white hover:bg-opacity-10"
                                  }`}
                                >
                                  <span>{category.name}</span>
                                  <span
                                    className={`text-sm px-2 py-0.5 rounded-full ${
                                      activeCategory === category.name
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
                        <div className="bg-slate-950 bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
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
                        <div className="bg-slate-950 bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-gray-300 mb-3">
                            Size
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {sizeOptions.map((size) => (
                              <button
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`flex items-center justify-center w-12 h-12 rounded-lg text-blue-900 transition-colors ${
                                  selectedSizes.includes(size)
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
                        <div className="bg-slate-950 bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-extrabold text-gray-300 mb-3">
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
                        <div className="bg-slate-950 bg-opacity-5 backdrop-blur-sm rounded-2xl p-4">
                          <h2 className="text-lg font-extrabold text-gray-300 mb-3">
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
                                      className={`h-4 w-4 ${
                                        index < rating
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
                            src={product.img}
                            alt={product.name}
                            className="w-full img-height object-cover"
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                              {product.discount}% OFF
                            </div>
                          )}
                          {product.new && (
                            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              NEW
                            </div>
                          )}

                          {/* Heart Icon Button */}
                          <div className="absolute bottom-2 right-3 z-20">
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
                                    className={`h-4 w-4 ${
                                      index < product.rating
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
                        {/* size dropDown starts here .... */}
                        <div className="relative mb-4">
                          <button
                            onClick={() => {
                              toggleDropdown(product?._id);
                            }}
                            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 flex items-center justify-between hover:bg-gray-100 hover:cursor-pointer"
                          >
                            <span>
                              Size:{" "}
                              {selectedSize[product?._id]?.size || "Select"}
                            </span>
                            {dropdownOpen === product?._id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )}
                          </button>

                          {/* Dropdown opens UPWARD now */}
                          {dropdownOpen === product?._id && (
                            <div className="absolute bottom-full mb-2 bg-slate-900 border text-white border-gray-300 rounded-md shadow-lg w-full max-h-48 overflow-y-auto z-10">
                              {product?.sizes.map((size) => (
                                <button
                                  key={size}
                                  onClick={() =>
                                    handleSizeSelect(product?._id, size)
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-500 hover:text-white"
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Size Dropdown ends here .... */}

                        <button
                          className="hover:cursor-pointer w-full bg-[#4b447b] bg-opacity-10 hover:bg-primary text-white py-2 rounded-lg transition-colors"
                          onClick={() =>
                            handleAddtoCart(
                              product?._id,
                              selectedSize[product?._id]?.size
                            )
                          }
                        >
                          {isAddingToCart === product?._id ? (
                            <span className="flex items-center justify-center">
                              <RiLoader4Line className="w-6 h-6 animate-spin" />
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

export default WomenClothing;
