
import React from 'react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="overflow-hidden transition-all shadow-xl bg-goldenbeige rounded-3xl hover:shadow-2xl hover:scale-105 group">
      <div className="overflow-hidden bg-gray-200 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-2">
        <h4 className="text-lg font-bold truncate text-deepblue">
          {product.name}
        </h4>
        <p className="mb-3 text-md text-deepblue">
          {formatPrice(product.price)}
        </p>
        <a href={product.link}>
          <button className="w-full py-2 font-semibold text-white transition-colors rounded-full bg-deepblue hover:bg-opacity-90">
            Buy Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;