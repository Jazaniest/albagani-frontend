import React, { useEffect, useState } from 'react';
import { getProducts } from '../data/product';
import SmallProductCard from '../components/SmallProductCard';
import ProductListSkeleton from '../components/ProductListSkeleton';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

//item show total
const PAGE_SIZE = 24;

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data) && mounted) setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetch();
    return () => (mounted = false);
  }, []);

  const filtered = products.filter((p) =>
    p.product_name?.toLowerCase().includes(query.toLowerCase())
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="min-h-screen bg-deepblue pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <Header />
          <h1 className="text-xl font-bold text-white">Daftar Produk</h1>
          <div className="w-full sm:max-w-sm">
            <label htmlFor="search-input" className="sr-only">Cari produk</label>
            <input
              id="search-input"
              type="search"
              placeholder="Cari nama produk..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-goldenbeige text-deepblue placeholder-deepblue focus:outline-none focus:ring-2 focus:ring-goldenbeige focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Grid produk */}
        <section>
          {isLoading ? (
            <ProductListSkeleton />
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white text-lg">
                {query ? `Tidak ada produk ditemukan untuk "${query}"` : 'Belum ada produk'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {paged.map((p) => (
                <SmallProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        {!isLoading && filtered.length > 0 && (
          <div className="mt-6">
            <Pagination
              current={page}
              total={pageCount}
              onChange={(p) => setPage(p)}
            />
          </div>
        )}

        {/* Ringkasan */}
        {!isLoading && filtered.length > 0 && (
          <p className="mt-4 text-sm text-gray-200 text-center">
            Menampilkan {paged.length} dari {filtered.length} produk. Halaman {page} dari {pageCount}.
          </p>
        )}
      </div>
    </div>
  );
}