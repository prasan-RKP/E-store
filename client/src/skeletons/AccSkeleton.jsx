import React from "react";

const AccSkeleton = () => {
  // Array for multiple skeleton items
  const skeletonItems = Array(9).fill(0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.27 0.02 252.42)" }}>
      {/* Hero Carousel Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-6 h-auto">
        <div className="relative rounded-2xl overflow-hidden animate-pulse">
          <div className="w-full h-64 md:h-80 bg-white bg-opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-40"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <div className="h-8 md:h-10 bg-white bg-opacity-20 rounded-md w-3/4 md:w-1/2 mb-3"></div>
            <div className="h-5 bg-white bg-opacity-20 rounded-md w-full md:w-2/3 mb-6"></div>
            <div className="h-12 bg-primary bg-opacity-20 rounded-xl w-36"></div>
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full bg-white bg-opacity-50 ${index === 0 ? 'w-8' : 'w-2'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Filter Toggle Skeleton */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <div className="h-7 bg-white bg-opacity-10 rounded-lg w-40 animate-pulse"></div>
          <div className="h-10 bg-white bg-opacity-10 rounded-lg w-24 animate-pulse"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar Skeleton - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              {/* Categories Filter Skeleton */}
              <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6 animate-pulse">
                <div className="h-7 bg-white bg-opacity-20 rounded-md w-32 mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="flex justify-between items-center py-2.5 px-4 rounded-xl bg-white bg-opacity-10">
                      <div className="h-5 bg-white bg-opacity-20 rounded-md w-16"></div>
                      <div className="h-5 bg-white bg-opacity-20 rounded-full w-8"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter Skeleton */}
              <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6 animate-pulse">
                <div className="h-7 bg-white bg-opacity-20 rounded-md w-32 mb-4"></div>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-white bg-opacity-20 rounded-md w-12"></div>
                    <div className="h-4 bg-white bg-opacity-20 rounded-md w-12"></div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full w-full mb-2"></div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full w-full"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2 h-10 bg-gray-700 bg-opacity-10 rounded-lg"></div>
                  <div className="w-1/2 h-10 bg-gray-700 bg-opacity-10 rounded-lg"></div>
                </div>
              </div>

              {/* Size Filter Skeleton */}
              <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 mb-6 animate-pulse">
                <div className="h-7 bg-white bg-opacity-20 rounded-md w-20 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((_, index) => (
                    <div key={index} className="w-12 h-12 bg-white bg-opacity-10 rounded-lg"></div>
                  ))}
                </div>
              </div>

              {/* Rating Filter Skeleton */}
              <div className="bg-[#302b4d] bg-opacity-5 backdrop-blur-sm rounded-2xl p-5 animate-pulse">
                <div className="h-7 bg-white bg-opacity-20 rounded-md w-40 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-4 w-4 bg-white bg-opacity-20 rounded-full mr-3"></div>
                      <div className="flex space-x-1">
                        {Array(5).fill(0).map((_, starIndex) => (
                          <div key={starIndex} className="w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
                        ))}
                        <div className="h-4 bg-white bg-opacity-20 rounded-md w-12 ml-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skeletonItems.map((_, index) => (
                <div 
                  key={index}
                  className="bg-gray-700 bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse"
                >
                  {/* Image placeholder with discount/new tag placeholders */}
                  <div className="relative">
                    <div className="w-full h-64 bg-white bg-opacity-10"></div>
                    
                    {/* Discount tag placeholder - show on some items */}
                    {index % 3 === 0 && (
                      <div className="absolute top-3 left-3 h-5 w-16 bg-primary bg-opacity-50 rounded-full"></div>
                    )}
                    
                    {/* New tag placeholder - show on some items */}
                    {index % 4 === 0 && (
                      <div className="absolute top-3 right-3 h-5 w-12 bg-green-500 bg-opacity-50 rounded-full"></div>
                    )}
                    
                    {/* Bottom gradient and product info placeholder */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Title placeholder */}
                      <div className="h-6 bg-white bg-opacity-20 rounded-md w-3/4 mb-2"></div>
                      
                      {/* Rating stars placeholder */}
                      <div className="flex items-center mt-2">
                        <div className="flex space-x-1">
                          {Array(5).fill(0).map((_, starIndex) => (
                            <div key={starIndex} className="w-4 h-4 bg-yellow-400 bg-opacity-30 rounded-full"></div>
                          ))}
                        </div>
                        <div className="w-12 h-4 bg-white bg-opacity-20 rounded-md ml-2"></div>
                      </div>
                      
                      {/* Price placeholder */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="h-6 bg-white bg-opacity-20 rounded-md w-20"></div>
                        {index % 2 === 0 && (
                          <div className="h-4 bg-gray-400 bg-opacity-20 rounded-md w-16"></div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Button placeholder */}
                  <div className="p-4">
                    <div className="w-full h-10 bg-white bg-opacity-10 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccSkeleton;