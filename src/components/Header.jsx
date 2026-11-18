import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, formatPrice, getProductImage } from '../context/StoreContext';
import {
  X,
  Search,
  User,
  Heart,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';

export default function Header() {
  const { categories, products, cart, favorites, user, signOut, openAuthModal } = useStore();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const matchingProducts = searchQuery.trim()
    ? products
        .filter((p) =>
          `${p.name} ${p.category?.name || ''} ${p.sku || ''}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  return (
    <>
      <div className="announcement">
        COMPLIMENTARY SHIPPING ON ORDERS OVER $100 <span>✳</span> A LITTLE MORE TO LOVE, EVERY DAY
      </div>

      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Left Column: Editorial Hamburger & Quick Shortcuts */}
          <div className="header-left">
            <button
              type="button"
              className="editorial-menu-btn"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="menu-icon-bars">
                <span className="bar" />
                <span className="bar" />
              </span>
              <span className="menu-text">MENU</span>
            </button>

            <Link to="/shop" className="quick-nav-pill desktop-only">
              Shop all
            </Link>
            <Link to="/category/seasonal" className="quick-nav-pill desktop-only">
              Seasonal
            </Link>
          </div>

          {/* Center Column: Wordmark */}
          <Link to="/" className="wordmark" aria-label="Morrow home">
            MORROW <span>✳</span>
          </Link>

          {/* Right Column: Header Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/60"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} />
            </button>

            {user ? (
              <Link
                to="/account"
                aria-label="Account"
                className="icon-link desktop-only"
              >
                <User size={19} />
              </Link>
            ) : (
              <button
                type="button"
                aria-label="Sign in"
                className="icon-link desktop-only inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/60"
                onClick={() => openAuthModal('login')}
              >
                <User size={19} />
              </button>
            )}

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="icon-link desktop-only"
            >
              <Heart size={19} />
            </Link>

            <Link
              to="/cart"
              aria-label={`Bag with ${cartItemCount} items`}
              className="bag-link"
            >
              <ShoppingBag size={19} />
              <span>{cartItemCount}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Editorial Slide-Over Drawer (Active on Desktop & Mobile) */}
      {drawerOpen && (
        <div className="overlay" onClick={() => setDrawerOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <span className="wordmark">
                MORROW <span>✳</span>
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/60"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-editorial-links">
              {[
                { num: '01', name: 'Home', path: '/' },
                { num: '02', name: 'Shop All Pieces', path: '/shop' },
                ...categories.map((c, i) => ({
                  num: `0${i + 3}`,
                  name: c.name,
                  path: `/category/${c.slug}`
                })),
                { num: `0${categories.length + 3}`, name: 'Saved Wishlist', path: '/wishlist' },
                { num: `0${categories.length + 4}`, name: 'Track Order', path: '/order-tracking' },
                { num: `0${categories.length + 5}`, name: 'FAQs & Sizing', path: '/faq' },
                { num: `0${categories.length + 6}`, name: 'Our Story', path: '/about' },
                { num: `0${categories.length + 7}`, name: 'Customer Care & Contact', path: '/contact' },
                { num: `0${categories.length + 8}`, name: 'Shipping & Policies', path: '/policies' },
                { num: `0${categories.length + 9}`, name: 'Your Account', path: '/account' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="drawer-editorial-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="link-label">
                    <span className="link-num">{item.num}</span>
                    <span>{item.name}</span>
                  </span>
                  <ArrowUpRight size={18} className="arrow-icon" />
                </Link>
              ))}
            </div>

            {/* Editorial Highlight Card */}
            <div className="drawer-card mt-6">
              <img
                src="/assets/hero-campaign-DwTIbiq1.jpg"
                alt="Morrow seasonal"
              />
              <div className="drawer-card-text">
                <span>THE EDITORIAL JOURNAL</span>
                <p>“Good things don’t have to wait for special occasions.”</p>
              </div>
            </div>

            {user ? (
              <button
                type="button"
                className="w-full mt-4 py-2.5 px-4 text-xs tracking-wider uppercase border border-border hover:bg-accent transition-colors"
                onClick={() => {
                  signOut();
                  setDrawerOpen(false);
                  navigate('/');
                }}
              >
                Sign out
              </button>
            ) : (
              <button
                type="button"
                className="w-full mt-4 py-2.5 px-4 text-xs tracking-wider uppercase bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors"
                onClick={() => {
                  setDrawerOpen(false);
                  openAuthModal('login');
                }}
              >
                Sign in / Register
              </button>
            )}
          </aside>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="overlay search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <div className="search-top">
              <span className="eyebrow">WHAT ARE YOU LOOKING FOR?</span>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/60"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-input">
              <Search size={18} />
              <input
                autoFocus
                placeholder="Search pieces, categories, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/60"
                aria-label="Submit search"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="search-suggestions">
              {matchingProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <img src={getProductImage(p)} alt="" />
                  <span>
                    {p.name}
                    <small>{formatPrice(p.sale_price ?? p.price)}</small>
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
