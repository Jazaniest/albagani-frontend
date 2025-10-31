import React, { useState } from "react";
import { fetchProductDataFromBackend, addProduct } from "../../data/product";

const ProductForm = ({ onSubmit }) => {
  const [mode, setMode] = useState("manual");
  const [form, setForm] = useState({
    name: "",
    title: "",
    price: "",
    image: "",
    link: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handler untuk perubahan file pada mode manual
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm((prev) => ({ ...prev, file }));
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
    // Menyiapkan payload berdasarkan mode
    let payload;
    if (mode === "manual") {
      payload = {
        product_name: form.name,
        product_price: form.price,
        product_link: form.link,
        product_photo: form.file,
      };
    } else {
      // TikTok mode
      payload = {
        product_name: form.title,
        product_price: form.price,
        product_link: form.link,
        product_photo: form.image,
      };
    }

    // Validasi sederhana
    if (
      !payload.product_name ||
      !payload.product_price ||
      !payload.product_link ||
      !payload.product_photo
    ) {
      setError("Semua field wajib diisi.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const result = await addProduct(payload);
      if (result) {
        // Reset form setelah berhasil
        setForm({ name: "", title: "", price: "", image: "", link: "", file: null });
        setError("");
        // Panggil callback onSubmit dari parent jika tersedia
        if (typeof onSubmit === "function") {
          onSubmit(result);
        }
      } else {
        setError("Gagal menambahkan produk.");
      }
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat menambah produk.");
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

      {/* Form Manual */}
      {mode === "manual" && (
        <>
          <div className="mt-3">
            <label className="block text-sm font-medium text-deepblue mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama produk"
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
          </div>

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
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deepblue mb-1">
              Link Produk
            </label>
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://contoh.com/produk"
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deepblue mb-1">
              Foto Produk
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
            {/* Preview gambar manual */}
            {form.file && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(form.file)}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            )}
          </div>
        </>
      )}

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

          {/* Tampilkan Data yang Terambil */}
          {form.title && form.image && (
            <div className="mt-5">
              <p>
                <strong>Title:</strong> {form.title}
              </p>
              <p>
                <strong>Image:</strong>{" "}
                <img
                  src={form.image}
                  alt={form.title}
                  className="w-16 h-16"
                />
              </p>
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

      {/* Tampilkan error jika ada */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full py-2 font-semibold text-white rounded-full bg-deepblue hover:bg-opacity-90 transition duration-200"
      >
        {isLoading ? "Memuat..." : "Tambah"}
      </button>
    </form>
  );
};

export default ProductForm;
