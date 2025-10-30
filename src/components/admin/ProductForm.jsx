import React, { useState } from "react";
import { fetchProductDataFromBackend, addProduct } from "../../data/product";

const ProductForm = () => {
  const [mode, setMode] = useState("manual");
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    link: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProductData = async (url) => {
    setIsLoading(true);
    setError("");

    try {
      const productData = await fetchProductDataFromBackend(url);

      if (productData.success) {
        setForm((prev) => ({
          ...prev,
          title: productData.title || prev.title,
          image: productData.image || prev.image,
        }));
      } else {
        setError("Gagal mengambil data produk dari backend.");
      }
    } catch (error) {
      setError("Gagal mengambil data produk. Pastikan URL valid.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      product_name: form.title,  
      product_price: form.price, 
      product_photo: form.image,
      product_link: form.link,
    };

    setIsLoading(true);
    try {
      const result = await addProduct(finalData);

      if (result) {
        setForm({ name: "", price: "", image: "", link: "" });
        setError("");
      } else {
        setError("Gagal menambahkan produk.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat menambah produk.", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Button Tabs */}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ${
            mode === "manual"
              ? "bg-deepblue text-white border-deepblue"
              : "bg-white text-deepblue border-gray-300 hover:bg-gray-100"
          }`}
        >
          Manual
        </button>

        <button
          type="button"
          onClick={() => setMode("tiktok")}
          className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ${
            mode === "tiktok"
              ? "bg-deepblue text-white border-deepblue"
              : "bg-white text-deepblue border-gray-300 hover:bg-gray-100"
          }`}
        >
          TikTok Shop
        </button>
      </div>

      {/* Form TikTok Shop */}
      {mode === "tiktok" && (
        <>
          <div className="mt-3">
            <label className="block text-sm font-medium text-deepblue mb-1">
              Link Produk TikTok Shop
            </label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://vt.tiktok.com/..."
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
          </div>

          {/* Tombol Ambil Data */}
          <button
            type="button"
            onClick={() => fetchProductData(form.link)}
            className="w-full py-2 font-semibold text-white rounded-full bg-deepblue hover:bg-opacity-90 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Memuat..." : "Ambil Data Produk"}
          </button>

          {error && <div className="text-red-500">{error}</div>}

          {/* Tampilkan Data yang Terambil */}
          {form.title && form.image && (
            <div className="mt-5">
              <p><strong>Title:</strong> {form.title}</p>
              <p><strong>Image:</strong> <img src={form.image} alt={form.title} className="w-16 h-16" /></p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-deepblue mb-1">
              Harga (IDR)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
          </div>
        </>
      )}

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full py-2 font-semibold text-white rounded-full bg-deepblue hover:bg-opacity-90 transition duration-200"
      >
        Tambah
      </button>
    </form>
  );
};

export default ProductForm;
