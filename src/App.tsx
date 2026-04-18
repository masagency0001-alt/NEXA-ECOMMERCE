import React, { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

// Components
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Preloader from '@/src/components/Preloader';
import CustomCursor from '@/src/components/CustomCursor';
import FloatingElements from '@/src/components/FloatingElements';

// Pages
import Home from '@/src/pages/Home';
import Shop from '@/src/pages/Shop';
import ProductDetail from '@/src/pages/ProductDetail';
import CartCheckout from '@/src/pages/CartCheckout';
import AboutContact from '@/src/pages/AboutContact';
import CollectionPage from '@/src/pages/CollectionPage';

// Types/Constants
import { Product } from '@/src/constants';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load for preloader
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    // Basic quantity update logic (for demonstration, keeping simple)
    if (q <= 0) {
      removeFromCart(id);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <Header cartCount={cart.length} />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <main className="min-h-screen relative overflow-hidden">
        <FloatingElements />
        <AnimatePresence mode="wait">
          <Routes>
            <Route index element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="shop" element={<PageWrapper><Shop /></PageWrapper>} />
            <Route path="men" element={<PageWrapper>
              <CollectionPage 
                category="Men" 
                title="The Noir" 
                accentTitle="Gentlemen"
                subtitle="Redefining technical tailoring with a legacy of architectural silhouettes."
                bannerImage="https://picsum.photos/seed/men-banner/1920/1080?grayscale"
              />
            </PageWrapper>} />
            <Route path="women" element={<PageWrapper>
              <CollectionPage 
                category="Women" 
                title="Ethereal" 
                accentTitle="Silk"
                subtitle="Fluidity meeting structure in a symphony of premium sustainable textiles."
                bannerImage="https://picsum.photos/seed/women-banner/1920/1080?grayscale"
              />
            </PageWrapper>} />
            <Route path="perfumes" element={<PageWrapper>
              <CollectionPage 
                category="Perfumes" 
                title="Alchemy of" 
                accentTitle="Scents"
                subtitle="Masterpiece fragrances designed to linger in memory like a whispered secret."
                bannerImage="https://picsum.photos/seed/perfume-banner/1920/1080?grayscale"
              />
            </PageWrapper>} />
            <Route path="product/:id" element={<PageWrapper><ProductDetail onAddToCart={addToCart} /></PageWrapper>} />
            <Route path="cart" element={<PageWrapper><CartCheckout cart={cart} onRemoveFromCart={removeFromCart} updateQuantity={updateQuantity} /></PageWrapper>} />
            <Route path="about" element={<PageWrapper><AboutContact /></PageWrapper>} />
            <Route path="contact" element={<PageWrapper><AboutContact /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </Router>
  );
}
