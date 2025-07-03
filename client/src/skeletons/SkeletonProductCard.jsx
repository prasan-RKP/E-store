import React from "react";

const SkeletonProductCard = () => {
    return (
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-700 bg-opacity-5 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="relative">
                  <div className="w-full h-64 bg-gray-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                    <div className="flex items-center mt-2">
                      <div className="flex text-gray-400 space-x-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <div key={idx} className="h-4 w-4 bg-gray-400 rounded"></div>
                        ))}
                      </div>
                      <span className="h-4 bg-gray-400 rounded w-10 ml-2"></span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="h-6 bg-gray-400 rounded w-1/3"></span>
                      <span className="h-5 bg-gray-400 rounded w-1/4"></span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-10 bg-gray-400 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default SkeletonProductCard;
