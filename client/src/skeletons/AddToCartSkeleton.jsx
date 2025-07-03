import React from 'react';
import { motion } from 'framer-motion';

const AddToCartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-gray-200 animate-pulse h-8 w-8"></div>
              <div className="ml-2 h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="absolute -top-2 -right-2 bg-gray-200 animate-pulse rounded-full w-5 h-5"></div>
              </div>

              <div className="relative">
                <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="absolute -top-2 -right-2 bg-gray-200 animate-pulse rounded-full w-5 h-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section Skeleton */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="h-7 w-48 bg-gray-200 animate-pulse rounded"></div>
              </div>

              {/* Cart Item Skeletons */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-100 last:border-b-0">
                  <div className="p-6 flex flex-col sm:flex-row">
                    {/* Product Image Skeleton */}
                    <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0">
                      <div className="bg-gray-200 animate-pulse rounded-xl overflow-hidden w-full sm:w-24 h-24"></div>
                    </div>

                    {/* Product Details Skeleton */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-1"></div>
                          <div className="flex mb-3">
                            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mr-4"></div>
                            <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                        <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                      </div>

                      {/* Quantity Control and Remove Skeleton */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg h-8 w-24 bg-gray-100"></div>
                        <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* You May Also Like Section Skeleton */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
                <div className="flex space-x-2">
                  <div className="p-2 rounded-full bg-gray-200 animate-pulse h-9 w-9"></div>
                  <div className="p-2 rounded-full bg-gray-200 animate-pulse h-9 w-9"></div>
                </div>
              </div>
              
              <div className="flex space-x-4 overflow-hidden pb-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden h-full min-w-[200px]">
                    <div className="aspect-square bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-5 w-28 bg-gray-200 animate-pulse rounded mb-1"></div>
                      <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary Section Skeleton */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <div className="h-7 w-36 bg-gray-200 animate-pulse rounded"></div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex justify-between">
                      <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}

                  <div className="bg-gray-200 animate-pulse h-12 w-full rounded-lg"></div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>

                <div className="w-full h-12 bg-gray-200 animate-pulse rounded-xl"></div>

                <div className="mt-6 flex items-center justify-center">
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>

              {/* Promo Code Skeleton */}
              <div className="p-6 bg-gray-50">
                <div className="flex gap-2">
                  <div className="flex-grow h-10 bg-gray-200 animate-pulse rounded-lg"></div>
                  <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSkeleton;