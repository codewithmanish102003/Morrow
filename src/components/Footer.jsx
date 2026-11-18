import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

function InstagramIcon({ size = 18 }) {
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
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-block mt-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
          </div>

          <div>
            <h4>EXPLORE</h4>
            <Link to="/shop">Shop all</Link>
            {categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`}>
                {cat.name}
              </Link>
            ))}
          </div>

          <div>
            <h4>INFORMATION</h4>
            <Link to="/about">Our story</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">Frequently asked</Link>
            <Link to="/policies">Shipping & returns</Link>
            <Link to="/policies">Privacy & terms</Link>
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
