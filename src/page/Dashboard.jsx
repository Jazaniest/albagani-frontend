import { useState } from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductsShowcase from "../components/ProductShowcase";
import { productsData, categoriesData } from "../data/product";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //eslint-disable-next-line
  const [activeCategory, setActiveCategory] = useState("all");
  const [products] = useState(productsData);
  //eslint-disable-next-line
  const [categories] = useState(categoriesData);

  // Hanya perlu satu fungsi toggle
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  //eslint-disable-next-line
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-deepblue">
      <Header onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
      <HeroSection />
      {/* Uncomment jika perlu kategori */}
      {/* <Categories 
        categories={categories} 
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      /> */}
      <ProductsShowcase products={products} />
      
      {/* Footer */}
      <footer className="py-8 mt-12 bg-goldenbeige">
        <div className="container px-4 mx-auto text-center text-deepblue">
          <p className="font-semibold">© 2025 Albagani.com - Your Premium Online Shop</p>
          <p className="mt-2 text-sm opacity-80">Quality Products, Trusted Service</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
