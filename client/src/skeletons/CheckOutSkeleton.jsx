import React from "react";
import { motion } from "framer-motion";

const SkeletonBox = ({ className = "" }) => (
  <motion.div
    initial={{ opacity: 0.4 }}
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`}
  ></motion.div>
);

const CheckOutSkeleton = ({ isDark }) => (
  <div
    className={`min-h-screen transition-all duration-500 ${
      isDark
        ? "bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
        : "bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900"
    }`}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
        {/* Main Skeleton Content */}
        <div className="lg:col-span-3 space-y-10">
          {/* Step Title */}
          <div className="flex items-center space-x-4 mb-8">
            <SkeletonBox className="w-12 h-12 rounded-xl" />
            <div>
              <SkeletonBox className="w-40 h-6 mb-2 rounded-lg" />
              <SkeletonBox className="w-24 h-4 rounded" />
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-6">
            <SkeletonBox className="w-32 h-5 mb-2 rounded-md" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonBox className="h-12 rounded-lg" />
              <SkeletonBox className="h-12 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonBox className="h-12 rounded-lg" />
            </div>
          </div>

          {/* Address Skeleton */}
          <div className="space-y-6 mt-8">
            <SkeletonBox className="w-32 h-5 mb-2 rounded-md" />
            <SkeletonBox className="h-12 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SkeletonBox className="h-12 rounded-lg" />
              <SkeletonBox className="h-12 rounded-lg" />
              <SkeletonBox className="h-12 rounded-lg" />
            </div>
            <SkeletonBox className="h-12 rounded-lg" />
          </div>

          {/* Shipping Method Skeleton */}
          <div className="space-y-4 mt-8">
            <SkeletonBox className="w-32 h-5 mb-2 rounded-md" />
            <SkeletonBox className="h-16 rounded-xl" />
            <SkeletonBox className="h-16 rounded-xl" />
            <SkeletonBox className="h-16 rounded-xl" />
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`rounded-2xl border p-6 h-fit sticky top-24 transition-all duration-500 ${
            isDark
              ? "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl shadow-black/20"
              : "border-gray-200 bg-white shadow-xl shadow-black/5"
          } lg:col-span-2`}
        >
          <SkeletonBox className="w-32 h-6 mb-6 rounded-lg" />
          <div className="space-y-3">
            <SkeletonBox className="h-6 rounded-md" />
            <SkeletonBox className="h-6 rounded-md" />
            <SkeletonBox className="h-6 rounded-md" />
            <SkeletonBox className="h-6 rounded-md" />
            <SkeletonBox className="h-8 rounded-lg" />
          </div>
          <div className="mt-6">
            <SkeletonBox className="w-full h-10 mb-2 rounded-xl" />
            <SkeletonBox className="w-24 h-4 rounded" />
          </div>
          <div className="mt-6 space-y-3">
            <SkeletonBox className="h-5 rounded" />
            <SkeletonBox className="h-5 rounded" />
            <SkeletonBox className="h-5 rounded" />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default CheckOutSkeleton;
