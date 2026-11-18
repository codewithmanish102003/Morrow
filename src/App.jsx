import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import WelcomeSplash from './components/WelcomeSplash';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Account from './pages/Account';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import OrderSuccess from './pages/OrderSuccess';
import Policies from './pages/Policies';
import ResetPassword from './pages/ResetPassword';
import Shop from './pages/Shop';
import Category from './pages/Category';
import Product from './pages/Product';
import Wishlist from './pages/Wishlist';
import FAQ from './pages/FAQ';
import OrderTracking from './pages/OrderTracking';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WelcomeSplash />
      <ScrollToTop />
      <AuthModal />
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
