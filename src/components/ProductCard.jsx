import React from 'react';
import { recordClick } from '../data/product';


const ProductCard = ({ product }) => {
    const formatPrice = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);


    const onBuy = () => {
        recordClick(product.id);
        if (product.product_link && product.product_link) {
            window.open(product.product_link, '_blank');
        } else (
            alert('link tidak tersedia atau salah')
        )
    };


    return (
        <div className="overflow-hidden transition-all shadow-xl bg-goldenbeige rounded-3xl hover:shadow-2xl hover:scale-105 group">
            <div className="overflow-hidden bg-gray-200 aspect-square">
                <img src={product.product_photo} alt={product.product_name} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-2">
                <h4 className="text-lg font-bold truncate text-deepblue">{product.product_name}</h4>
                <p className="mb-3 text-md text-deepblue">{formatPrice(product.product_price)}</p>
                <button onClick={onBuy} className="w-full py-2 font-semibold text-white transition-colors rounded-full bg-deepblue hover:bg-opacity-90">Beli Sekarang</button>
            </div>
        </div>
    );
};


export default ProductCard;