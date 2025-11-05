import React, { useState } from 'react';
import { recordClick } from '../data/product';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

export default function SmallProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const onOpen = () => {
    recordClick(product.id);
    if (product.product_link) {
      window.open(product.product_link, '_blank', 'noopener,noreferrer');
    } else {
      alert('Link produk tidak tersedia');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article className="overflow-hidden bg-goldenbeige rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 duration-200">
      <button 
        onClick={onOpen}
        onKeyPress={handleKeyPress}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-deepblue focus:ring-offset-2 rounded-xl"
        aria-label={`Buka ${product.product_name}`}
      >
        <div className="aspect-square overflow-hidden bg-gray-200">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center text-deepblue text-xs">
              <span>Gambar tidak tersedia</span>
            </div>
          ) : (
            <img
              src={product.product_photo}
              alt={product.product_name}
              className="object-cover w-full h-full"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>

        <div className="p-2">
          <h3 className="text-sm font-semibold truncate text-deepblue" title={product.product_name}>
            {product.product_name}
          </h3>
          <p className="text-xs text-deepblue font-medium">
            {formatPrice(product.product_price)}
          </p>
        </div>
      </button>
    </article>
  );
}