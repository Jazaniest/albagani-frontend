import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './skeleton/ProductCardSkeleton';

const ProductsShowcase = ({ products }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [products]);

  return (
    <div className="container px-4 py-8 pt-0 pb-16 mx-auto">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
        {isLoading
          ? // skeleton view
            Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : // product view
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductsShowcase;
