import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PinterestIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.03-.94-.06-2.39.05-3.42.12-.93.81-6.19.81-6.19s-.21-.41-.21-1.03c0-.96.56-1.68 1.25-1.68.59 0 .87.44.87.97 0 .59-.38 1.48-.57 2.3-.16.69.34 1.25 1.02 1.25 1.22 0 2.16-1.29 2.16-3.15 0-1.65-1.18-2.8-2.88-2.8-1.96 0-3.11 1.47-3.11 2.99 0 .59.23 1.23.51 1.57.06.07.07.13.05.2-.05.23-.18.73-.2.83-.03.14-.11.17-.25.1-1-.46-1.62-1.92-1.62-3.09 0-2.52 1.83-4.83 5.28-4.83 2.77 0 4.93 1.97 4.93 4.62 0 2.76-1.74 4.97-4.15 4.97-.81 0-1.57-.42-1.83-.92l-.5 1.9c-.18.7-.67 1.57-1 2.1A12 12 0 1 0 12 0z"/>
    </svg>
  );
}

function XIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z"/>
    </svg>
  );
}

export default function Footer() {
  const { categories } = useStore();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thanks for joining us!');
      setEmail('');
    }
  };

  return (
    <>
      <section className="newsletter">
        <div>
          <span className="eyebrow">THE GOOD THINGS, DELIVERED</span>
          <h2>A little note from us.</h2>
          <p>New arrivals, seasonal stories, and the occasional lovely surprise.</p>
        </div>
        <form onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" aria-label="Join newsletter" className="inline-flex items-center justify-center p-2">
            <ArrowRight size={18} />
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <Link to="/" className="wordmark">
              MORROW <span>✳</span>
            </Link>
            <p>For all the moments in between.</p>
            <div className="footer-socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="footer-social-link"
                title="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="footer-social-link"
                title="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="footer-social-link"
                title="Pinterest"
              >
                <PinterestIcon size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="footer-social-link"
                title="X (Twitter)"
              >
                <XIcon size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="footer-social-link"
                title="LinkedIn"
              >
                <LinkedInIcon size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4>EXPLORE</h4>
            <Link to="/shop">Shop all</Link>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link key={cat.id} to={`/category/${cat.slug}`}>
                  {cat.name}
                </Link>
              ))
            ) : (
              <>
                <Link to="/category/clothing">Clothing</Link>
                <Link to="/category/seasonal">Seasonal</Link>
                <Link to="/category/beverages">Beverages</Link>
              </>
            )}
          </div>

          <div>
            <h4>INFORMATION</h4>
            <Link to="/about">Our story</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">Frequently asked</Link>
            <Link to="/policies#shipping">Shipping & returns</Link>
            <Link to="/policies#privacy">Privacy & terms</Link>
          </div>

          <div>
            <h4>YOUR MORROW</h4>
            <Link to="/account">Your account</Link>
            <Link to="/cart">Your bag</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/order-tracking">Track an order</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 MORROW. MADE FOR LIVING.</span>
          <span>THOUGHTFULLY FOUND. EASILY LOVED.</span>
        </div>
      </footer>
    </>
  );
}
