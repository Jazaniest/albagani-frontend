
import React from 'react'
import ProductCard from './ProductCard';

const ProductsShowcase = ({ products }) => {
  return (
    <div className="container px-4 py-8 pt-0 pb-16 mx-auto">
      {/* <h3 className="mb-6 text-2xl font-bold text-center text-white md:text-left">
        Featured Products
      </h3> */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsShowcase;