import React from "react";

const OrderListSkeleton = () => {
  return (
    <div className="h-[500px] overflow-y-auto pr-2 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center justify-between animate-pulse"
        >
          {/* Left: Image + text */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-md" />
            <div>
              <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-700 rounded" />
            </div>
          </div>

          {/* Right: Amount + status + details button */}
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <div>
              <div className="h-4 w-16 bg-gray-700 rounded mb-1" />
              <div className="h-5 w-12 bg-gray-700 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-700 rounded-full" />
            <div className="h-7 w-16 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListSkeleton;
