
import React from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import iconWeb from '../assets/img/icon.png'

const Header = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:pt-6 md:px-8">
      <div className="mx-auto shadow-2xl bg-goldenbeige rounded-3xl max-w-[1000px] md:max-w-[1200px] lg:max-w-[1500px]">
        <div className="px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={iconWeb}
                alt="Albagani.com"
                className="w-24 sm:w-20 md:w-20 lg:w-20 xl:w-26"
              />
            </div>
            
            {/* <div className="items-center hidden space-x-6 md:flex">
              <button className="transition-transform hover:scale-110">
                <ShoppingCart className="w-6 h-6 text-deepblue" />
              </button>
            </div> */}

            <button
              onClick={onMenuToggle}
              className="transition-transform text-deepblue hover:scale-110"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;