
import React from 'react';

const Categories = ({ categories, onCategoryClick, activeCategory }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-white text-2xl font-bold mb-6 text-center md:text-left">
        Shop by Category
      </h3>
      <div className="flex justify-center md:justify-start space-x-4 md:space-x-8 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.name.toLowerCase())}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-2xl md:text-3xl hover:scale-110 transition-transform shadow-lg ${
              activeCategory === category.name.toLowerCase() ? 'ring-4 ring-goldenbeige' : ''
            }`}
            title={category.name}
          >
            {category.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;