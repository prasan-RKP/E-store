import React from "react";
import { motion } from "framer-motion";

const ProductDisplaySkeleton = () => {
  // Animation variants for skeleton items
  const skeletonVariants = {
    initial: { opacity: 0.5 },
    animate: { opacity: 0.8 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-gray-100">
      {/* Header Skeleton */}
      <header className="bg-slate-900 text-white py-4 px-4 md:px-0">
        <div className="container mx-auto flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center space-x-7">
            <div className="h-8 w-24 bg-slate-700 rounded-md"></div>
            <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
          </div>
          <nav className="hidden md:block">
            <div className="flex space-x-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-slate-700 rounded"></div>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Skeleton */}
      <nav className="md:hidden bg-slate-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </nav>

      {/* Product Navigation Skeleton */}
      <nav className="bg-slate-900 shadow-sm py-3 overflow-x-auto whitespace-nowrap px-4 md:px-0 border-t border-slate-800">
        <div className="container mx-auto flex justify-center md:justify-center space-x-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-20 bg-slate-700 rounded"></div>
          ))}
        </div>
      </nav>

      {/* Product Display Skeleton */}
      <div className="container mx-auto flex flex-col md:flex-row py-6 px-4 md:px-6 gap-8">
        {/* Left Section: Product Images Skeleton */}
        <div className="md:w-1/2 flex flex-col space-y-4">
          {/* Main Image Skeleton - Fills the container */}
          <motion.div
            className="relative overflow-hidden rounded-lg bg-slate-800 w-full h-130"
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          >
            {/* Heart button skeleton */}
            <div className="absolute top-4 right-4 h-8 w-8 bg-slate-700 rounded-full"></div>
            
            {/* Navigation arrows skeleton */}
            <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-2">
              <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
              <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
            </div>
            
            {/* Image placeholder - fills the container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
            </div>
          </motion.div>

          {/* Thumbnail images skeleton - hidden on mobile */}
          <div className="hidden md:flex space-x-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1/4 aspect-square bg-slate-800 rounded-md border-2 border-transparent"></div>
            ))}
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <div className="flex-1 py-3 px-6 bg-slate-700 rounded-lg h-12"></div>
            <div className="flex-1 py-3 px-6 bg-slate-700 rounded-lg h-12"></div>
          </div>
        </div>

        {/* Right Section: Product Details Skeleton */}
        <div className="md:w-1/2 flex flex-col space-y-6">
          {/* Product Title Skeleton */}
          <div>
            <div className="h-8 w-3/4 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
          </div>

          {/* Price Skeleton */}
          <div className="h-6 w-1/4 bg-slate-700 rounded"></div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-700 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-700 rounded"></div>
            <div className="h-4 w-4/6 bg-slate-700 rounded"></div>
          </div>

          {/* Size Selection Skeleton */}
          <div>
            <div className="h-4 w-1/4 bg-slate-700 rounded mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-slate-700 rounded-md"></div>
              ))}
            </div>
          </div>

          {/* Product Details Accordion Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 cursor-pointer bg-slate-800">
                  <div className="h-5 w-1/3 bg-slate-700 rounded"></div>
                  <div className="h-5 w-5 bg-slate-700 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Items Skeleton */}
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-slate-700 rounded-md"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
            <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth space-x-4 pb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="snap-start flex-shrink-0 w-64 bg-slate-800 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-slate-700 rounded"></div>
                <div className="h-4 w-1/3 bg-slate-700 rounded"></div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 w-3 bg-slate-700 rounded-full mr-1"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="space-y-2">
              <div className="h-6 w-24 bg-slate-700 rounded-md"></div>
              <div className="h-4 w-48 bg-slate-700 rounded"></div>
            </div>
            <nav>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-20 bg-slate-700 rounded"></div>
                ))}
              </div>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="h-4 w-48 bg-slate-700 rounded mx-auto"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDisplaySkeleton;