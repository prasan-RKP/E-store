import React from 'react';
import {
  Package,
  Calendar,
  CreditCard,
  Search,
  Filter,
  MapPin,
  CheckCircle
} from 'lucide-react';

const OrderHistorySkeletonPage = () => {
  // Skeleton shimmer animation
  const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

  // Generate skeleton orders (3 items for loading state)
  const skeletonOrders = Array.from({ length: 3 }, (_, i) => ({
    id: `skeleton-${i}`,
    itemCount: i === 0 ? 3 : i === 1 ? 4 : 2 // Vary item counts
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      
      {/* Header Skeleton */}
      <div className="bg-white shadow-lg border-b backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className={`h-10 w-64 bg-gray-300 rounded-lg ${shimmer}`}></div>
                <div className={`h-5 w-48 bg-gray-300 rounded ${shimmer}`}></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-xl border border-blue-100">
                  <div className={`h-6 w-20 bg-gray-300 rounded ${shimmer}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <div className={`w-full h-14 pl-12 pr-4 border border-gray-200 rounded-xl bg-gray-200 ${shimmer}`}></div>
            </div>
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <div className={`w-48 h-14 pl-12 pr-4 border border-gray-200 rounded-xl bg-gray-200 ${shimmer}`}></div>
            </div>
          </div>
        </div>

        {/* Orders List Skeleton */}
        <div className="space-y-8">
          {skeletonOrders.map((skeletonOrder) => (
            <div key={skeletonOrder.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              <div className="p-8">
                {/* Order Header Skeleton */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                      <div className={`w-24 h-8 bg-gray-300 rounded-full ${shimmer}`}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div className={`w-24 h-5 bg-gray-300 rounded ${shimmer}`}></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right space-y-2">
                      <div className={`w-32 h-4 bg-gray-300 rounded ${shimmer}`}></div>
                      <div className={`w-20 h-8 bg-gray-300 rounded ${shimmer}`}></div>
                    </div>
                  </div>
                </div>

                {/* Order Items Skeleton */}
                <div className="space-y-4">
                  {Array.from({ length: skeletonOrder.itemCount }, (_, itemIndex) => (
                    <div key={itemIndex} className="group">
                      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-20 h-20 bg-gray-300 rounded-xl ${shimmer}`}></div>
                          <div className="flex-1 min-w-0 space-y-3">
                            <div className={`h-6 w-48 bg-gray-300 rounded ${shimmer}`}></div>
                            <div className={`h-4 w-24 bg-gray-300 rounded ${shimmer}`}></div>
                            <div className="flex items-center space-x-4">
                              <div className={`h-4 w-16 bg-gray-300 rounded ${shimmer}`}></div>
                              <div className={`h-4 w-20 bg-gray-300 rounded ${shimmer}`}></div>
                            </div>
                          </div>
                        </div>
                        <div className={`w-6 h-6 bg-gray-300 rounded ${shimmer}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics Skeleton */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Orders Skeleton */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className={`h-4 w-24 bg-gray-300 rounded ${shimmer}`}></div>
                <div className={`h-10 w-12 bg-gray-300 rounded ${shimmer}`}></div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Total Spent Skeleton */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className={`h-4 w-20 bg-gray-300 rounded ${shimmer}`}></div>
                <div className={`h-10 w-24 bg-gray-300 rounded ${shimmer}`}></div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Delivered Orders Skeleton */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className={`h-4 w-28 bg-gray-300 rounded ${shimmer}`}></div>
                <div className={`h-10 w-8 bg-gray-300 rounded ${shimmer}`}></div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistorySkeletonPage;