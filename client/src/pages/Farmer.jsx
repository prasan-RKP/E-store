import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const Farmer = () => {
  const [selectedSize, setSelectedSize] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null); // Which product's dropdown is open

  const filteredProducts = [
    {
      id: 1,
      name: "Nike Jordon Air-7",
      category: "sneaker",
      price: 1299.99,
      img: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644522/ecom_store/footwear/xhysyzgaaugblcpeayon.jpg",
      rating: 4.5,
      reviewCount: 128,
      sizes: ["7", "8", "9", "10", "11"],
      discount: 0,
      gender: "m",
    },
    {
      id: 2,
      name: "Nike Pink Air-9",
      category: "sneaker",
      price: 1559.79,
      img: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644618/ecom_store/footwear/trw2pqix9hsmnfaknpi1.jpg",
      rating: 4.1,
      reviewCount: 110,
      sizes: ["7", "8", "9", "10"],
      discount: 4,
      gender: "m",
    },
    {
      id: 3,
      name: "Nike White Leather Sneaker",
      category: "sneaker",
      price: 1739.29,
      img: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644620/ecom_store/footwear/gorckzpeemmwl74r4ejb.jpg",
      rating: 4.1,
      reviewCount: 190,
      sizes: ["7", "8", "9", "10"],
      discount: 0,
      gender: "m",
      new: true,
    },
    {
      id: 4,
      name: "Black & White JD/2",
      category: "sneaker",
      price: 2159.29,
      img: "https://res.cloudinary.com/dlkmhoueb/image/upload/v1745644626/ecom_store/footwear/hc52kg5rjtkwbz33qbgq.jpg",
      rating: 4.9,
      reviewCount: 130,
      sizes: ["7", "8", "9", "10"],
      discount: 2,
      gender: "m",
    },
  ];

  //

  const toggleDropdown = (productId) => {
    setDropdownOpen((prev) => (prev === productId ? null : productId));
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSize((prev) => ({ ...prev, [productId]: size }));
    setDropdownOpen(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-700 bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden group"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-[340px] object-cover"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400 mr-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4"
                        fill={index + 1 <= Math.round(product.rating) ? "#FACC15" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-white text-sm">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white text-lg font-bold">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Size Dropdown */}
              <div className="relative mb-4">
                <button
                  onClick={() => toggleDropdown(product.id)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 flex items-center justify-between hover:bg-gray-100"
                >
                  <span>Size: {selectedSize[product.id] || "Select"}</span>
                  {dropdownOpen === product.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </button>

                {/* Dropdown opens UPWARD now */}
                {dropdownOpen === product.id && (
                  <div className="absolute bottom-full mb-2 bg-gray-300 border border-gray-300 rounded-md shadow-lg w-full max-h-48 overflow-y-auto z-10">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(product.id, size)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-black hover:text-white"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-[#4b447b] bg-opacity-10 hover:bg-primary text-white py-2 rounded-lg transition-colors">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Farmer;
