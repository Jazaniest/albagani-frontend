import React from "react";
import { X } from "lucide-react";
import iconWeb from '../assets/img/icon.png'

const Sidebar = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 right-0 w-64 h-full bg-deepblue shadow-lg z-50 p-6 transition-transform transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full"
    >
      {/* Tombol Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex items-center bg-goldenbeige justify-center rounded-md mt-8 space-x-3">
        <img
            src={iconWeb}
            alt="Albagani.com"
            className="w-24 sm:w-20 md:w-20 lg:w-20 xl:w-26"
        />
        </div>

      {/* Daftar menu */}
      <div className="space-y-4 mt-5 text-center">
        <a
          href="/login"
          className="block text-lg text-white hover:text-gray transition-colors duration-200"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
