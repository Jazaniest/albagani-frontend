import { useState, useEffect } from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProductsShowcase from "../components/ProductShowcase";
import { getProducts } from "../data/product";
import LoginModal from "../components/LoginModal";
import HeroSectionSkeleton from "../components/HerSectionSkeleton";
import Footer from "../components/Footer";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoginSubmit = async () => {
    setLoginOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-deepblue">
      <Header
        onMenuToggle={toggleMenu}
        isMenuOpen={isMenuOpen}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Konten utama */}
      <main className="flex-grow">
        {isLoading ? <HeroSectionSkeleton /> : <HeroSection />}
        {isLoading ? (
          <ProductsShowcase products={[]} />
        ) : (
          <ProductsShowcase products={products} />
        )}
      </main>

      {/* Footer selalu di bawah */}
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSubmit={handleLoginSubmit}
      />
    </div>
  );
}

export default Dashboard;
