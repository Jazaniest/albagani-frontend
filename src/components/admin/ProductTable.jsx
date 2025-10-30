import React, { useState } from 'react';

const currency = (v) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v || 0);

const ProductTable = ({ items, onRemove }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const openModal = (id) => {
        setSelectedProductId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    const confirmRemove = () => {
        onRemove(selectedProductId);
        closeModal();
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-deepblue text-white">
                        <th className="px-3 py-2 text-left rounded-l-lg">Produk</th>
                        <th className="px-3 py-2 text-left">Harga</th>
                        <th className="px-3 py-2 text-left">Klik</th>
                        <th className="px-3 py-2 text-left">Link</th>
                        <th className="px-3 py-2 text-left rounded-r-lg">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-goldenbeige/20">
                    {items.map((p) => (
                        <tr key={p.product_id} className="border-b last:border-b-0">
                            <td className="px-3 py-2">
                                <div className="flex items-center gap-3">
                                    <img src={p.product_photo} alt={p.product_name} className="w-12 h-12 rounded-xl object-cover" />
                                    <div>
                                        <div className="font-semibold text-deepblue">{p.product_name}</div>
                                        <div className="text-xs text-deepblue/70">ID: {p.product_id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-3 py-2">{currency(p.product_price)}</td>
                            <td className="px-3 py-2">{p.clicks || 0}</td>
                            <td className="px-3 py-2 truncate max-w-[200px]">
                                <a href={p.product_link} className="text-deepblue underline" target="_blank" rel="noreferrer">{p.product_link}</a>
                            </td>
                            <td className="px-3 py-2">
                                <button 
                                    onClick={() => openModal(p.product_id)} 
                                    className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-3 py-6 text-center text-deepblue/70">Belum ada produk.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal Konfirmasi */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-95 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold text-center text-deepblue">Konfirmasi Penghapusan</h2>
                        <p className="mt-2 text-center text-deepblue/70">Apakah Anda yakin ingin menghapus produk ini?</p>
                        <div className="flex justify-around mt-4">
                            <button 
                                onClick={confirmRemove} 
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Ya, Hapus
                            </button>
                            <button 
                                onClick={closeModal} 
                                className="px-4 py-2 bg-gray-300 text-deepblue rounded-lg hover:bg-gray-400"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;
