import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { login } from "../data/auth";
import { useNavigate } from "react-router-dom";


const LoginModal = ({ isOpen, onClose, onSubmit }) => {
  const userRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEsc);
      setTimeout(() => userRef.current?.focus(), 0);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      username: fd.get("username"),
      password: fd.get("password"),
    };

    const token = await login(payload);
        if (token) {
        localStorage.setItem("auth_token", token);
        onClose();
        onSubmit && onSubmit(token);
        navigate("/admin");
        } else {
        console.log("Login gagal.");
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onClick={handleBackdrop}
    >
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl p-6">
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 id="login-title" className="text-2xl font-semibold text-gray-900 mb-1">
          Masuk
        </h2>
        <p className="text-sm text-gray-500 mb-6">Silakan login untuk melanjutkan.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Username</span>
            <input
              ref={userRef}
              type="text"
              name="username"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="yourname"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Password</span>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-deepblue text-white py-2.5 font-medium hover:opacity-90 transition"
          >
            {isLoading ? "Memuat..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
