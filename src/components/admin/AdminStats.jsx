import React from 'react';


const StatCard = ({ label, value }) => (
    <div className="bg-white rounded-2xl p-5 shadow-xl text-center">
        <div className="text-sm text-deepblue/70">{label}</div>
        <div className="text-3xl font-extrabold text-deepblue mt-1">{value}</div>
    </div>
);


const AdminStats = ({ totalProducts, totalClicks }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Produk" value={totalProducts} />
            <StatCard label="Total Klik" value={totalClicks} />
            <StatCard label="Publikasi" value="-" />
            <StatCard label="Status" value="Simulasi" />
        </div>
    );
};


export default AdminStats;