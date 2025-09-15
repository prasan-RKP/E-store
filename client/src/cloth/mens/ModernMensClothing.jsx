import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  BookHeart,
  HeartCrack,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
//import { allProducts } from "../../../../server/assets/manData.js";
import { userAuthStore } from "../../store/authStore.js";
import { toast } from "sonner";
import { useProdStore } from "../../store/prodStore.js";
import AccSkeleton from "../../skeletons/AccSkeleton.jsx";
import { RiLoader4Line } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useOrderStore } from "../../store/OrderStore.js";
import { GoPackage } from "react-icons/go";
//import {Link} from 'react-router-dom';

const ModernMensClothing = () => {
  const [selectedSize, setSelectedSize] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(null);
  const [isAddingToWishList, setIsAddingToWishList] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [length, setLength] = useState(0);

  //console.log('IMported heroSlides:', Array.isArray(heroSlides1) ? heroSlides1 : 'Not an array');

  const { addCart, verifiedUser, fetchWishListProd, isWishListing } =
    userAuthStore();
  const { fetchingMenCloth, products } = useProdStore();
  const { orderItemLength, fetchOrder } = useOrderStore();

  const handleAddtoCart = async (id, size) => {
    const selected = selectedSize[id];

    if (!selected) {
      toast.error("Do Select Your Product Size");
      return false;
    }

    if (selected.id === id && selected.size === size) {
      //console.log(`✅ Match: selectedId ${id} & selectedSize ${size}`);
      setIsAddingToCart(id);
      await addCart({ productId: selected.id, size: selected.size });
    } else {
      toast.info(`❌ Mismatch: selectedId ${id} & selectedSize ${size}`);
      //console.log("What is stored:", selected.size);
    }

    setIsAddingToCart(null);

    setSelectedSize((prev) => ({
      ...prev,
      [id]: null, // or remove the key with destructuring if needed
    }));
  };

  // console.log("Selected Size", selectedSize);

  // Size DropDown Functionality
  const toggleDropdown = (productId) => {
    setDropdownOpen((prev) => (prev === productId ? null : productId));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [productId]: { id: productId, size: size },
    }));

    //console.log("SelectedSize", selectedSize);

    setDropdownOpen(null);
  };

  // WishListItem functionality
  const handleWishlist = async (product) => {
    setWishlist((prev) => ({
      ...prev,
      [product._id]: !prev[product._id],
    }));

    // giving the value to  backend
    setIsAddingToWishList(product._id);
    await fetchWishListProd({ pid: product._id });
    setIsAddingToWishList(null);
  };

  // Categories for filtering
  const categories = useMemo(
    () => [
      { id: "all", name: "All", count: 124 },
      { id: "jeans", name: "Jeans", count: 42 },
      { id: "shirts", name: "Shirts", count: 36 },
      { id: "tshirts", name: "tshirts", count: 28 },
      { id: "jackets", name: "Jackets", count: 18 },
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

  // ----------  Dynamic functionality goes here...   -------------

  /// Fetching OrdersLength 
  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrder();
    };
    loadOrders();
  }, [fetchOrder]);

  useEffect(() => {
    setLength(orderItemLength || 0);
  }, [orderItemLength])

  //console.log("Order Item Length:", length);

  useEffect(() => {
    fetchingMenCloth();
    setCartItems(verifiedUser?.cart || []);
    setWishItems(verifiedUser?.wishlist || []);
  }, [fetchingMenCloth, verifiedUser?.cart, verifiedUser?.wishlist]);

  const allProducts = useMemo(() => {
    return products || [];
  }, [products]);

  let isLoading = allProducts.length === 0;


  // ----------  Dynamic functionality Ends here...   -------------

  // Hero section slides
  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508490/ecom_store/slider/jpqxdflb8ifjc1u0h6qj.jpg",
        title: "Summer Collection",
        subtitle: "Discover the latest trends for hot days",
        cta: "Shop Now",
      },
      {
        id: 2,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508500/ecom_store/slider/ey9volxk4gj3qv1z9f0e.jpg",
        title: "Sports WearDrop",
        subtitle: "Quality for every occasion",
        cta: "View Collection",
      },
      {
        id: 3,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508505/ecom_store/slider/lvm4thyvppn9g27y8znl.jpg",
        title: "New Arrivals #Fashion On!",
        subtitle: "Be the first to wear our latest styles",
        cta: "Explore",
      },
      {
        id: 4,
        image:
          "https://res.cloudinary.com/dlkmhoueb/image/upload/f_auto,q_auto/v1751508511/ecom_store/slider/ybbyqtwymno2xszqvamn.jpg",
        title: "Spring Sale",
        subtitle: "Up to 10% on Drop Date",
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
          "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?_gl=1*bw0z29*_ga*MjA0OTA3MjcyLjE2OTUwMTk2NDQ.*_ga_8JE65Q40S6*czE3NTAzNDc1NDIkbzgwJGcxJHQxNzUwMzQ4MjQxJGoxNiRsMCRoMA..",
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
          "https://images.pexels.com/photos/32613549/pexels-photo-32613549.jpeg?_gl=1*za1d8r*_ga*MjA0OTA3MjcyLjE2OTUwMTk2NDQ.*_ga_8JE65Q40S6*czE3NTAzNDc1NDIkbzgwJGcxJHQxNzUwMzQ4Mzk2JGoxMyRsMCRoMA..",
        items: [
          "Slim Fit Jeans",
          "Oxford Button-Down Shirt",
          "Water-Resistant Bomber Jacket",
        ],
      },
    ],
    []
  );

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Toggle size selection
   const toggleSize = (size) => {
    setSelectedSizes([size]);
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

  // REmove ALL Filter
  const clearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setPriceRange([0, 2000]);
    setSelectedSizes([]);
    setSelectedRating(0);
    setSelectedDiscounts([]);
  };

  // Filter products based on all criteria
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
                    Lu<span className="text-primary">Xe</span>
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
                  {/* <button className="text-white flex items-center hover:text-primary transition-colors">
                    <Star className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">Rate Us</span>
                  </button> */}

                  <div className="relative">
                    <Link to={"/showorder"}>
                      <button className="text-white cursor-pointer flex items-center hover:text-primary transition-colors">
                        <GoPackage className="h-6 w-6" />
                        <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {length}
                        </span>
                      </button>
                    </Link>
                  </div>

                  <div className="relative">
                    <Link to={"/addtocart"}>
                      <button className="text-white cursor-pointer flex items-center hover:text-primary transition-colors">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                    className="w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-full pl-10 pr-4 py-2 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Carousel Section */}
          <div className="max-w-7xl mx-auto px-4 py-2.5 h-auto">
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
          {/* <div className="max-w-7xl mx-auto px-4 py-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Trending Combinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outfitCombinations.map((outfit) => (
                <motion.div
                  key={outfit.id}
                  className="bg-[#4b447b] bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => toast.info("Feature Coming Soon 🔜 ...")}
                >
                  <div className="relative">
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
                    <button className="w-full mt-4 bg-black bg-opacity-10 hover:bg-primary text-white py-2 rounded-lg transition-colors">
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
                    {/* Clearing All Filters */}
                    <button
                      onClick={clearFilters}
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-red-400 hover:bg-red-600 text-white font-semibold shadow-md transition-all"
                    >
                      <X className="h-5 w-5 " />
                      Clear Filters
                    </button>

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
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
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
                        max="2000"
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
                        max="2000"
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
                          className={`flex items-center justify-center w-12 h-12 rounded-lg text-black transition-colors ${selectedSizes.includes(size)
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
                    className="fixed inset-0 backdrop-blur bg-opacity-50 z-50 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                     onClick={() => setShowMobileFilters(false)}
                  >
                    <motion.div
                      className="absolute top-0 right-0 h-full w-4/5 max-w-sm overflow-y-auto"
                      style={{ backgroundColor: "oklch(0.27 0.02 252.42)" }}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "tween" }}
                      onClick={(e) => e.stopPropagation()}
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
                        {/* REmove all filgres logic here  */}
                        <button
                          onClick={clearFilters}
                          className="cursor-pointer flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-red-400 hover:bg-red-600 text-white font-semibold shadow-md transition-all"
                        >
                          <X className="h-5 w-5" />
                          Clear Filters
                        </button>

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
                                  className={`w-full flex justify-between items-center py-2 px-3 rounded-xl transition-all ${activeCategory === category.name
                                    ? "bg-primary text-white font-medium"
                                    : "text-white hover:bg-white hover:bg-opacity-10"
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
                        <div className="bg-slate-950 bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 mb-6">
                          <h2 className="text-lg font-bold text-white mb-3">
                            Price Range
                          </h2>
                          <div className="mb-4">
                            <div className="flex justify-between text-white text-sm mb-2">
                              <span>₹{priceRange[0]}</span>
                              <span>₹{priceRange[1]}</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="2000"
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
                              max="2000"
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
                          <h2 className="text-lg font-bold text-white mb-3">
                            Size
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {sizeOptions.map((size) => (
                              <button
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`flex items-center justify-center w-12 h-12 rounded-lg text-blue-900 transition-colors ${selectedSizes.includes(size)
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
                          <h2 className="text-lg font-bold text-gray-300 mb-3">
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
                  {filteredProducts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="col-span-full flex items-center justify-center py-20"
                    >
                      <div className="w-[400px] md:w-[500px] max-w-lg bg-white/10 backdrop-blur-md rounded-2xl px-10 py-14 shadow-lg text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">
                          No Product Found '{searchQuery}'
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Try adjusting your search or filter to find what you’re looking for.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    filteredProducts.map((product) => (
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
                              className="w-full h-[310px] object-cover"
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
                          {/* Size dropdown starts here....  */}
                          <div className="relative mb-4">
                            <button
                              onClick={() => {
                                //console.log("cliked prodcuctId");
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
                                {product.sizes.map((size) => (
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
                          {/* Size dropdown Ends here.... */}

                          <button
                            className="w-full bg-[#4b447b] bg-opacity-10 hover:bg-primary text-white py-2 rounded-lg transition-colors"
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
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernMensClothing;


