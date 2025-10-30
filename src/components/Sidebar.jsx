import React, { useEffect } from "react";
import { X } from "lucide-react";
import iconWeb from "../assets/img/icon.png";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../data/auth";
import LoginModal from "./LoginModal";

const Sidebar = ({ isOpen, onClose, onOpenLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (isOpen) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  const handleLoginClick = () => {
    onOpenLogin?.();
    onClose?.();
    if (isLoggedIn()) {
      navigate('/');
      localStorage.removeItem('auth_token');
    } else {
      <LoginModal 
        isOpen
        onClose
        onSubmit
      />
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-90 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel Sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar navigasi"
        className={`fixed top-0 right-0 h-full w-64 bg-deepblue shadow-lg z-50 p-6 transform transition-transform duration-300 ease-in-out will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray rounded-full"
          aria-label="Tutup sidebar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center bg-goldenbeige justify-center rounded-md mt-8 space-x-3">
          <img src={iconWeb} alt="Albagani.com" className="w-24 sm:w-20 md:w-20 lg:w-20 xl:w-26" />
        </div>

        {/* Daftar menu */}
        <nav className="space-y-4 mt-5 text-center">
          <button
            type="button"
            onClick={handleLoginClick}
            className="block w-full text-lg text-white hover:text-gray transition-colors duration-200"
          >
            {isLoggedIn() ? "Logout" : "Login"}
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
