import React, { useState } from 'react';
import { recordClick } from '../data/product';
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(price);

    const onBuy = () => {
        recordClick(product.id);
        if (product.product_link) {
            window.open(product.product_link, '_blank', 'noopener,noreferrer');
        } else {
            alert('Link tidak tersedia atau salah');
        }
    };

    return (
        <div className="relative">
            {/* Hot Product Label */}
            {/* <span className="text-xl font-semibold text-white">Hot Product</span> */}

            {/* Product Card */}
            <div className="overflow-hidden transition-all shadow-xl bg-goldenbeige rounded-3xl group mt-6">
                <div className="overflow-hidden bg-gray-200 aspect-square">
                    {imageError ? (
                        <div className="w-full h-full flex items-center justify-center text-deepblue">
                            <span className="text-sm">Gambar tidak tersedia</span>
                        </div>
                    ) : (
                        <img 
                            src={product.product_photo} 
                            alt={product.product_name} 
                            className="object-cover w-full h-full transition-transform duration-300"
                            onError={() => setImageError(true)}
                            loading="lazy"
                        />
                    )}
                </div>
                <div className="p-2">
                    <h4 className="text-lg font-bold truncate text-deepblue" title={product.product_name}>
                        {product.product_name}
                    </h4>
                    <p className="mb-3 text-md text-deepblue font-semibold">
                        {formatPrice(product.product_price)}
                    </p>
                    <button 
                        onClick={onBuy} 
                        className="w-full py-2 font-semibold text-white transition-colors rounded-full bg-deepblue focus:outline-none focus:ring-2 focus:ring-deepblue focus:ring-offset-2 cursor-pointer"
                    >
                        Beli Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;