import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag, Star, ChevronDown, X } from 'lucide-react';

const MensJeansPage = () => {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [sortOption, setSortOption] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample data
  const brands = ["Levi's", "Diesel", "Wrangler", "Lee", "Calvin Klein", "True Religion"];
  const sizes = ["28", "30", "32", "34", "36", "38", "40", "42"];
  
  const products = [
    { id: 1, name: "Slim Fit Jeans", brand: "Levi's", price: 89.99, originalPrice: 119.99, rating: 4.5, image: "/api/placeholder/300/400" },
    { id: 2, name: "Straight Fit Jeans", brand: "Diesel", price: 129.99, originalPrice: 169.99, rating: 4.2, image: "/api/placeholder/300/400" },
    { id: 3, name: "Relaxed Fit Jeans", brand: "Wrangler", price: 69.99, originalPrice: 89.99, rating: 4.7, image: "/api/placeholder/300/400" },
    { id: 4, name: "Skinny Fit Jeans", brand: "Calvin Klein", price: 99.99, originalPrice: 149.99, rating: 4.0, image: "/api/placeholder/300/400" },
    { id: 5, name: "Bootcut Jeans", brand: "Lee", price: 79.99, originalPrice: 99.99, rating: 4.3, image: "/api/placeholder/300/400" },
    { id: 6, name: "Distressed Jeans", brand: "True Religion", price: 149.99, originalPrice: 199.99, rating: 4.8, image: "/api/placeholder/300/400" },
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (selectedRating > 0 && product.rating < selectedRating) {
      return false;
    }
    
    // Discount filter
    const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;
    if (selectedDiscount > 0 && discountPercentage < selectedDiscount) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  // Toggle brand selection
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Toggle size selection
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white">Men's Jeans</h1>
          <p className="text-gray-400 mt-1">Find your perfect fit</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for jeans by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="btn gap-2 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
          <select 
            className="select bg-gray-900 text-white border-gray-700 w-full md:w-48"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        {/* Filter Sidebar (Responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div 
            className={`${isFilterOpen ? 'block' : 'hidden'} lg:block bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-lg sticky top-4 h-fit`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Filters</h2>
              <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-300">Brand</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary mr-2 border-gray-600"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="text-gray-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Size Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-300">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-blue-700'
                    }`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-300">Price Range</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">${priceRange[0]}</span>
                <span className="text-gray-400">${priceRange[1]}+</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="range range-primary range-sm w-full" 
              />
            </div>
            
            {/* Customer Rating */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-300">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center cursor-pointer">
                    <input 
                      type="radio"
                      name="rating"
                      className="radio radio-sm radio-primary mr-2"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                    />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className="h-4 w-4"
                          fill={i < rating ? "currentColor" : "none"}
                          color={i < rating ? "#FBBF24" : "#4B5563"}
                        />
                      ))}
                      <span className="ml-2 text-gray-300">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Discount */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-300">Discount</h3>
              <div className="space-y-2">
                {[10, 20, 30, 40].map(discount => (
                  <label key={discount} className="flex items-center cursor-pointer">
                    <input 
                      type="radio"
                      name="discount"
                      className="radio radio-sm radio-primary mr-2"
                      checked={selectedDiscount === discount}
                      onChange={() => setSelectedDiscount(discount)}
                    />
                    <span className="text-gray-300">{discount}% or more</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Clear All Filters */}
            <button 
              className="btn btn-outline btn-sm w-full text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
              onClick={() => {
                setSelectedBrands([]);
                setSelectedSizes([]);
                setPriceRange([0, 200]);
                setSelectedRating(0);
                setSelectedDiscount(0);
              }}
            >
              Clear All Filters
            </button>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-400">{sortedProducts.length} products found</p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedProducts.map(product => (
                <motion.div 
                  key={product.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-blue-900/20 transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.originalPrice > product.price && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{product.brand}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className="h-4 w-4"
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            color={i < Math.floor(product.rating) ? "#FBBF24" : "#4B5563"}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-400">{product.rating}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-white">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <motion.button 
                        className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-blue-700 text-white"
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800 p-8">
                <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensJeansPage;