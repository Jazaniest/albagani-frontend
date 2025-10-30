import React from 'react';
import bagPhoto from '../assets/img/10283018.png';
import iconWebWhite from '../assets/img/icon-white.png';

const HeroSection = () => {
  return (
    <div className="container px-4 py-8 mx-auto pt-30 md:py-16 md:pt-30 lg:pt-18 lg:pb-0">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="order-2 space-y-6 text-center text-white md:order-1 md:text-left">
          <img className='hidden lg:block w-1/2 mx-auto md:mx-0' src={iconWebWhite} alt="" />
          <p className="text-base leading-relaxed text-gray-200 md:text-3xl md:text-bold">
            Saatnya temukan produk yang kamu suka
          </p>
          <button className="px-8 py-3 font-semibold transition-transform rounded-full shadow-lg bg-goldenbeige text-deepblue hover:scale-105">
            Beli Sekarang
          </button>
        </div>
        <div className="flex w-full justify-center order-1 md:w-auto md:justify-end md:order-2">
          <img className='w-1/2 md:w-1/2 md:ml-auto' src={bagPhoto} alt="shopping bag" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;