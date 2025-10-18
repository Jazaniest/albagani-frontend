import React from 'react';
import bagPhoto from '../assets/img/10283018.png'

const HeroSection = () => {
  return (
    <div className="container px-4 py-8 mx-auto pt-30 md:py-16 md:pt-30 lg:pt-18 lg:pb-0">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="order-2 space-y-6 text-center text-white md:order-1 md:text-left">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            LOREM IPSUM
          </h2>
          <p className="text-base leading-relaxed text-gray-200 md:text-lg">
            Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.
          </p>
          <button className="px-8 py-3 font-semibold transition-transform rounded-full shadow-lg bg-goldenbeige text-deepblue hover:scale-105">
            Shop Now
          </button>
        </div>
        <div className="flex justify-center order-1 md:justify-end md:order-2">
          <img src={bagPhoto} alt="shopping bag" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;