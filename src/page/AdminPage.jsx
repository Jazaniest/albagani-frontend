import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getProducts, removeProduct, updateProductData } from '../data/product';
import AdminStats from '../components/admin/AdminStats';
import ProductForm from '../components/admin/ProductForm';
import ProductTable from '../components/admin/ProductTable';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if(!storedToken || storedToken === 'undefined' || storedToken === 'null') {
      navigate('/');
      return;
    }

    const loadProducts = async () => {
      try {
        const products = await getProducts();
        setItems(Array.isArray(products) ? products : []);
      } catch (err) {
        setError('Gagal mengambil data produk.', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [navigate]);

  const handleAdd = (payload) => {
    setItems(prevItems => [...prevItems, payload]);
  };

  const handleRemove = async (id) => {
    try {
      await removeProduct(id);
      setItems(prevItems => prevItems.filter(item => item.product_id !== id));
    } catch (err) {
      setError(err.message || 'Gagal menghapus produk');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const updated = await updateProductData(id, updatedData);
      setItems(prevItems =>
        prevItems.map(item =>
          item.product_id === id ? updated : item
        )
      );
    } catch (err) {
      setError(err.message || 'Gagal mengedit produk');
    }
  };

  const totalProducts = items.length;
  const totalClicks = Array.isArray(items) ? items.reduce((total, item) => total + (item.clicks || 0), 0) : 0;

  return (
    <div className="min-h-screen bg-deepblue">
      <Header onMenuToggle={() => setIsMenuOpen(v => !v)} isMenuOpen={isMenuOpen} />

      <main className="container px-4 mx-auto pt-32 pb-16">
        <div className="mx-auto shadow-2xl bg-goldenbeige rounded-3xl max-w-[1000px] md:max-w-[1200px] lg:max-w-[1500px] p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-deepblue mb-4">
            Admin Panel
          </h1>
          <p className="text-deepblue/80 mb-6">
            Kelola produk, hapus produk, dan edit produk anda.
          </p>

          <AdminStats totalProducts={totalProducts} totalClicks={totalClicks} />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-deepblue mb-4">
                Tambah Produk
              </h2>
              <ProductForm onSubmit={handleAdd} />
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-deepblue mb-4">
                Daftar Produk
              </h2>
              {loading ? (
                <p>Memuat produk...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ProductTable items={items} onRemove={handleRemove} onEdit={handleUpdate} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
