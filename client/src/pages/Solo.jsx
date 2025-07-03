import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, Star, Menu, X, ChevronRight, ChevronLeft, Plus, Minus, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const Solo = () => {
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock data
  const productImages = [
    "/man3.jpg",
    "/man4.jpg",
    "/man2.jpg",
    "/man5.jpg"
  ];

  const relatedProducts = [
    { id: 1, name: "Similar Jeans 1", price: "$89.99", image: "/pexels-ana-dvoranen-2949550-4490019.jpg" },
    { id: 2, name: "Similar Jeans 2", price: "$79.99", image: "/pexels-chuck-3261068.jpg" },
    { id: 3, name: "Similar Jeans 3", price: "$94.99", image: "/pexels-madisyn-427081259-15242186.jpg" },
    { id: 4, name: "Similar Jeans 4", price: "$109.99", image: "/pexels-lazarus-ziridis-351891426-28580375.jpg" }
  ];

  const reviews = [
    { id: 1, name: "John Doe", rating: 5, text: "Great product, highly recommend! The quality is excellent and the fit is perfect." },
    { id: 2, name: "Jane Smith", rating: 4, text: "Excellent quality, will buy again! The color is slightly different than in the pictures though." },
    { id: 3, name: "Robert Johnson", rating: 5, text: "These are the best jeans I've ever owned. Extremely comfortable and durable." }
  ];

  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Image navigation
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + productImages.length) % productImages.length);
  };

  // Handle size change
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Toggle love
  const toggleLove = () => {
    setIsLoved(!isLoved);
  };

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">DENIM</div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-300 w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-indigo-600 font-medium">Home</a></li>
                <li><a href="#" className="hover:text-indigo-600 font-medium">Shop</a></li>
                <li><a href="#" className="hover:text-indigo-600 font-medium">Categories</a></li>
                <li><a href="#" className="hover:text-indigo-600 font-medium">About</a></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <Heart className="text-gray-600 hover:text-indigo-600 cursor-pointer" size={20} />
              <div className="relative">
                <ShoppingCart className="text-gray-600 hover:text-indigo-600 cursor-pointer" size={20} />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white overflow-hidden"
            >
              <div className="px-4 py-3">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <nav>
                  <ul className="space-y-3">
                    <li><a href="#" className="block py-2 hover:text-indigo-600 font-medium">Home</a></li>
                    <li><a href="#" className="block py-2 hover:text-indigo-600 font-medium">Shop</a></li>
                    <li><a href="#" className="block py-2 hover:text-indigo-600 font-medium">Categories</a></li>
                    <li><a href="#" className="block py-2 hover:text-indigo-600 font-medium">About</a></li>
                  </ul>
                </nav>
                <div className="flex items-center space-x-4 mt-4">
                  <Heart className="text-gray-600 hover:text-indigo-600 cursor-pointer" size={20} />
                  <div className="relative">
                    <ShoppingCart className="text-gray-600 hover:text-indigo-600 cursor-pointer" size={20} />
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-300 py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-700">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <ChevronRight size={16} className="mx-1" />
            <a href="#" className="hover:text-indigo-600">Clothing</a>
            <ChevronRight size={16} className="mx-1" />
            <a href="#" className="hover:text-indigo-600">Jeans</a>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-gray-700">Premium Comfort Denim</span>
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8"
        
        >
          {/* Left Section: Product Images */}
          <div className="lg:w-3/5">
            <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden h-[700px]">
              <motion.img
                src={`/man1.jpg`}
                alt="Premium Comfort Denim"
                className="w-full h-full object-cover"
                style={{ maxHeight: '100%' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <button 
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                onClick={toggleLove}
              >
                <Heart fill={isLoved ? "#f43f5e" : "none"} stroke={isLoved ? "#f43f5e" : "currentColor"} className='text-red-500' size={20} />
              </button>
              
              {/* Image navigation arrows */}
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md opacity-75 hover:opacity-100"
                onClick={prevImage}
              >
                <ChevronLeft size={20} className='text-black' />
              </button>
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md opacity-75 hover:opacity-100"
                onClick={nextImage}
              >
                <ChevronRight size={20} className='text-black' />
              </button>
            </div>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === index ? 'border-indigo-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`Product view ${index + 1}`} 
                    className="w-full h-44 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="lg:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-2">
                <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">New Arrival</span>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">In Stock</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Comfort Denim</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill={star <= 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.0 (28 reviews)</span>
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-indigo-600 mb-2">$99.99</div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">$129.99</span>
                  <span className="ml-2 text-green-600">Save 23%</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">
                  Premium comfort denim jeans with modern stretch technology. These jeans combine style with all-day comfort, featuring a contemporary fit and durable construction.
                </p>
              </div>
              
              {/* Size selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Select Size</h3>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Size Guide</a>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className={`py-2 rounded-md transition-colors ${
                        selectedSize === size 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={decreaseQuantity}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center focus:outline-none py-2 text-black"
                  />
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Add to cart and buy now buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Buy Now
                </button>
              </div>
              
              {/* Delivery and returns info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <ShoppingCart size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Free delivery on orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center mr-3">
                    <ChevronLeft size={16} className="text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Free returns within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-700 text-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'details' ? 'text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'reviews' ? 'text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'faq' ? 'text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-200'}`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Premium stretch denim fabric</li>
                      <li>Regular fit with tapered leg</li>
                      <li>Five-pocket styling</li>
                      <li>Button closure with zip fly</li>
                      <li>Belt loops at waistband</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Material & Care</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>98% Cotton, 2% Elastane</li>
                      <li>Machine wash cold</li>
                      <li>Wash inside out with like colors</li>
                      <li>Do not bleach</li>
                      <li>Tumble dry low</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Dimensions</h4>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Size</div>
                        <div className="font-medium">M</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Waist</div>
                        <div className="font-medium">32 inches</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Inseam</div>
                        <div className="font-medium">32 inches</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <button 
                    className="text-green-400 hover:text-green-600 text-xl font-medium"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                </div>
                
                {showReviewForm && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-3 text-black">Your Review</h4>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={20} className="text-gray-400 hover:text-yellow-400 cursor-pointer" />
                      ))}
                    </div>
                    <textarea
                      className="w-full border border-gray-300  text-black rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-3"
                      rows="4"
                      placeholder="Share your experience with this product..."
                    ></textarea>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                      Submit Review
                    </button>
                  </div>
                )}
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-gray-400">2 weeks ago</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} fill={star <= review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-gray-400">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'faq' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">How do these jeans fit?</h4>
                    <p className="text-gray-600">These jeans have a regular fit with a slightly tapered leg. They're designed to be comfortable while maintaining a modern silhouette.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Do these jeans stretch over time?</h4>
                    <p className="text-gray-600">The denim has a moderate amount of stretch for comfort, but is designed to maintain its shape with proper care.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">What is the inseam length?</h4>
                    <p className="text-gray-600">The inseam length varies by size, but is typically 32 inches for standard sizes.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Do you offer alterations?</h4>
                    <p className="text-gray-600">We don't offer alterations directly, but can recommend local tailors for customizing your fit.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed and Related Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 text-black">{product.name}</h3>
                <div className="text-indigo-600 font-medium">{product.price}</div>
                <div className="flex text-yellow-400 mt-1 mb-3">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                </div>
                <button className="w-full bg-gray-400 hover:bg-gray-500 text-gray-800 py-2 rounded text-sm font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
{/* Footer */}
<footer className="bg-gray-800 text-white py-12 mt-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-4">DENIM</h3>
        <p className="text-gray-400 mb-4">
          Premium quality denim and apparel for everyday comfort and style.
        </p>
        <div className="flex space-x-4">
          {/* Facebook Icon */}
          <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
          <Facebook className="w-5 h-5 text-white" />
          </a>

          {/* Instagram Icon */}
          <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
          <Instagram className="w-5 h-5 text-white" />
          </a>

          <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
          <Linkedin className="w-5 h-5 text-white" />
          </a>

          <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
          <Twitter className="w-5 h-5 text-white" />
          </a>

          {/* Add more icons as needed */}
        </div>
      </div>

      {/* Add more footer sections here if needed */}
    </div>
  </div>
</footer>
</div>
  )
};
export default Solo;   
