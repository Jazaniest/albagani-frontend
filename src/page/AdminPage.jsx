import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getProducts, addProduct, removeProduct } from '../data/product';
import AdminStats from '../components/admin/AdminStats';
import ProductForm from '../components/admin/ProductForm';
import ProductTable from '../components/admin/ProductTable';

const AdminPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await getProducts();
                if (Array.isArray(products) && products.length > 0) {
                    setItems(products);
                } else {
                    setItems([]);
                }
            } catch (err) {
                setError('Gagal mengambil data produk.', err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleAdd = (payload) => {
        addProduct(payload);
        setItems(prevItems => [...prevItems, payload]);
    };

    const handleRemove = (id) => {
        removeProduct(id);
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const totalProducts = items.length;

    const totalClicks = Array.isArray(items)
        ? items.reduce((total, item) => total + item.clicks, 0)
        : 0;

    return (
        <div className="min-h-screen bg-deepblue">
            <Header onMenuToggle={() => setIsMenuOpen(v => !v)} isMenuOpen={isMenuOpen} />

            <main className="container px-4 mx-auto pt-32 pb-16">
                <div className="mx-auto shadow-2xl bg-goldenbeige rounded-3xl max-w-[1000px] md:max-w-[1200px] lg:max-w-[1500px] p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-deepblue mb-4">Admin Panel</h1>
                    <p className="text-deepblue/80 mb-6">Kelola produk, hapus produk, dan pantau total klik.</p>

                    <AdminStats totalProducts={totalProducts} totalClicks={totalClicks} />

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
                            <h2 className="text-lg font-semibold text-deepblue mb-4">Tambah Produk</h2>
                            <ProductForm onSubmit={handleAdd} />
                        </div>
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
                            <h2 className="text-lg font-semibold text-deepblue mb-4">Daftar Produk</h2>
                            {loading ? (
                                <p>Memuat produk...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <ProductTable items={items} onRemove={handleRemove} />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
