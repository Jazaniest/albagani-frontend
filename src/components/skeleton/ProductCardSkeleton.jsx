import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="relative mt-20 sm:mt-30">
      {/* Hot Product Label Skeleton */}
      <div className="h-4 w-20 bg-gray-400 rounded"></div>

      {/* Product Card Skeleton */}
      <div className="overflow-hidden shadow-xl bg-goldenbeige rounded-3xl animate-pulse mt-6">
        {/* Image placeholder */}
        <div className="bg-gray-300 aspect-square w-full"></div>

        {/* Content placeholder */}
        <div className="p-2 space-y-3">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-8 bg-gray-400 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;