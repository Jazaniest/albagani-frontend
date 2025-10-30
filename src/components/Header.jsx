import React, { useEffect } from "react";
import { Menu, X } from "lucide-react";
import iconWeb from "../assets/img/icon.png";
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';


const Header = ({ onMenuToggle, isMenuOpen, onOpenLogin }) => {

  useEffect(() => {
    const { style } = document.body;
    if (isMenuOpen) {
      style.overflow = "hidden";
    } else {
      style.overflow = "";
    }
    return () => {
      style.overflow = "";
    };
  }, [isMenuOpen]);


  return (
    <header className="fixed top-0 left-0 right-0 z-[60] px-4 pt-4 md:pt-6 md:px-8">
      <div className="mx-auto shadow-2xl bg-goldenbeige rounded-3xl max-w-[1000px] md:max-w-[1200px] lg:max-w-[1500px]">
        <div className="px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img src={iconWeb} alt="Albagani.com" className="w-24 sm:w-20 md:w-20 lg:w-20 xl:w-26" />
              </Link>
            </div>


            <button
              onClick={onMenuToggle}
              className="transition-transform text-deepblue hover:scale-110 rounded-full"
              aria-expanded={isMenuOpen}
              aria-controls="sidebar"
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>


      {/* Smooth sidebar */}
      <Sidebar isOpen={isMenuOpen} onClose={onMenuToggle} onOpenLogin={onOpenLogin} />
    </header>
  );
};


export default Header;