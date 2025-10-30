import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductsShowcase from "../components/ProductShowcase";
import { getProducts } from "../data/product";
import LoginModal from "../components/LoginModal";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //eslint-disable-next-line
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Fetched data is not an array.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoginSubmit = async ({ username, password }) => {
    console.log("Do login:", { username, password });
    setLoginOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  //eslint-disable-next-line
  const handleCategoryClick = (category) => setActiveCategory(category);

  return (
    <div className="min-h-screen bg-deepblue">
      <Header
        onMenuToggle={toggleMenu}
        isMenuOpen={isMenuOpen}
        onOpenLogin={() => setLoginOpen(true)}
      />

      <HeroSection />
      {isLoading ? (
        <div className="text-center text-white">Loading products...</div>
      ) : error ? (
        <div className="text-center text-white">Belum ada produk</div>
      ) : (
        <ProductsShowcase products={products} />
      )}

      <footer className="py-1 md:py-4 mt-12 mb-0 bg-goldenbeige">
        <div className="container px-4 mx-auto text-center text-deepblue">
          <p className="text-xl opacity-80">
            © 2025 Albagani.com <br />
            Hak Cipta Dilindungi
          </p>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={handleLoginSubmit}
      />
    </div>
  );
}

export default Dashboard;
