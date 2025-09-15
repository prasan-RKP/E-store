import React from "react";

const WishlistSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 animate-pulse"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Image skeleton */}
            <div className="w-full sm:w-44 h-44 bg-gray-700 rounded-md" />

            {/* Text skeletons */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4 sm:mt-2">
                <div className="h-8 bg-gray-700 rounded w-20" />
                <div className="h-8 bg-gray-700 rounded w-10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSkeleton;
