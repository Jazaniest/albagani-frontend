import React, { useState } from "react";
import { fetchProductDataFromBackend, addProduct, category } from "../../data/product";

const ProductForm = ({ onSubmit }) => {
  const [mode, setMode] = useState("manual");
  const [form, setForm] = useState({
    name: "",
    title: "",
    price: "",
    image: "",
    link: "",
    category: "",
    file: null,
    number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeWhatsapp = (raw) => {
    if (!raw) return "";
    let digits = String(raw).replace(/\D/g, "");
    if (digits.startsWith("0")) digits = "62" + digits.slice(1);
    else if (digits.startsWith("8")) digits = "62" + digits;
    return digits;
  };

  const buildWhatsAppLink = (raw) => {
    const normalized = normalizeWhatsapp(raw);
    return normalized ? `https://wa.me/${normalized}` : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const waLink = buildWhatsAppLink(value);
      setForm((prev) => ({ ...prev, number: value, link: waLink }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
      setError("Gagal mengambil data produk. Pastikan URL valid.");
      console.log(error);
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
        product_category: form.category,
      };
    } else {
      // TikTok mode
      payload = {
        product_name: form.title,
        product_price: form.price,
        product_link: form.link,
        product_photo: form.image,
        product_category: form.category,
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
        setForm({ name: "", title: "", price: "", image: "", link: "", category: "", file: null, number: "" });
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
              No Whatsapp
            </label>
            <input
              type="number"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="08xxxxxxx"
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-deepblue mb-1">
              Kategori Produk
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            >
              <option value="">Pilih kategori</option>
              {category().map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
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
              Kategori Produk
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-deepblue"
            >
              <option value="">Pilih kategori</option>
              {category().map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
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
