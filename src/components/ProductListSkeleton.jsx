import React from 'react';

export default function ProductListSkeleton({ count = 24 }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-300 rounded-xl" />
          <div className="p-2">
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}