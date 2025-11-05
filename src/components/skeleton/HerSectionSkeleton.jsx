import React from 'react';

const HeroSectionSkeleton = () => {
  return (
    <div className="container px-4 py-8 mx-auto pt-30 md:py-16 md:pt-30 lg:pt-18 lg:pb-0 animate-pulse">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Left text section */}
        <div className="order-2 space-y-6 text-center text-white md:order-1 md:text-left">
          <div className="hidden lg:block w-1/2 h-12 mx-auto md:mx-0 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-400 rounded w-3/4 mx-auto md:mx-0"></div>
          <div className="h-10 w-40 mx-auto md:mx-0 bg-gray-500 rounded-full"></div>
        </div>

        {/* Right image section */}
        <div className="flex w-full justify-center order-1 md:w-auto md:justify-end md:order-2">
          <div className="w-1/3 md:w-1/3 md:ml-auto bg-gray-300 aspect-square rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSkeleton;
