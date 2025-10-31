import React, { useState } from 'react';

const currency = (v) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(v || 0);

const ProductTable = ({ items, onRemove, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editForm, setEditForm] = useState({
    product_name: '',
    product_price: '',
    product_photo: '',
    product_link: '',
  });

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

  // Buka modal edit dan isi form dengan data produk
  const openEditModal = (product) => {
    setEditProductId(product.product_id);
    setEditForm({
      product_name: product.product_name || '',
      product_price: product.product_price || '',
      product_photo: product.product_photo || '',
      product_link: product.product_link || '',
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProductId(null);
    setEditForm({
      product_name: '',
      product_price: '',
      product_photo: '',
      product_link: '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmEdit = async () => {
    if (!editProductId) return;

    // Pastikan semua field terisi
    if (
        !editForm.product_name ||
        !editForm.product_price ||
        !editForm.product_link ||
        !editForm.product_photo
    ) {
        return; // Tidak menyimpan jika ada field kosong
    }

    setIsLoading(true); // Mulai loading saat operasi edit dimulai

    try {
        await onEdit(editProductId, editForm);
        closeEditModal();
    } catch (error) {
        console.error('Error editing product:', error);
    } finally {
        setIsLoading(false); // Hentikan loading setelah selesai
    }
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
                  <img
                    src={p.product_photo}
                    alt={p.product_name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <div className="font-semibold text-deepblue">{p.product_name}</div>
                    <div className="text-xs text-deepblue/70">ID: {p.product_id}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2">{currency(p.product_price)}</td>
              <td className="px-3 py-2">{p.clicks || 0}</td>
              <td className="px-3 py-2 truncate max-w-[200px]">
                <a
                  href={p.product_link}
                  className="text-deepblue underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.product_link}
                </a>
              </td>
              <td className="px-3 py-2">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => openModal(p.product_id)}
                    className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => openEditModal(p)}
                    className="px-3 py-1 text-white bg-deepblue rounded-lg"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-center text-deepblue/70">
                Belum ada produk.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Konfirmasi Hapus */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-95 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-center text-deepblue">
              Konfirmasi Penghapusan
            </h2>
            <p className="mt-2 text-center text-deepblue/70">
              Apakah Anda yakin ingin menghapus produk ini?
            </p>
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

      {/* Modal Edit Produk */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-95 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-center text-deepblue">Edit Produk</h2>
            <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); confirmEdit(); }}>
              <div>
                <label className="block text-sm font-medium text-deepblue mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={editForm.product_name}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-deepblue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-deepblue mb-1">
                  Harga (IDR)
                </label>
                <input
                  type="number"
                  name="product_price"
                  value={editForm.product_price}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-deepblue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-deepblue mb-1">
                  Link Produk
                </label>
                <input
                  type="url"
                  name="product_link"
                  value={editForm.product_link}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-deepblue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-deepblue mb-1">URL Foto</label>
                <input
                  type="text"
                  name="product_photo"
                  value={editForm.product_photo}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-deepblue"
                />
              </div>
              <div className="flex justify-around mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-deepblue text-white rounded-lg"
                >
                  {isLoading ? "Memproses..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 text-deepblue rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
