import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Policies() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <main className="simple-page policies-page">
      <span className="eyebrow">THE DETAILS</span>
      <h1>Good to know.</h1>

      <div className="flex gap-4 mb-8 text-xs font-bold tracking-widest uppercase text-muted-foreground border-b border-border pb-3">
        <a href="#shipping" className="hover:text-foreground transition-colors">Shipping</a>
        <span>·</span>
        <a href="#returns" className="hover:text-foreground transition-colors">Returns</a>
        <span>·</span>
        <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
        <span>·</span>
        <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
      </div>

      <section id="shipping" className="pt-4">
        <h2>Shipping & Dispatch</h2>
        <p>
          Each order is processed within 1–2 business days from our studio. Complimentary shipping is provided on all orders over ₹100. Standard courier dispatch takes 3–5 business days within the country. You can track your real-time dispatch progress anytime using our <Link to="/order-tracking" className="underline text-foreground">Order Tracking</Link> page.
        </p>
      </section>

      <section id="returns" className="pt-6">
        <h2>Returns & Exchanges</h2>
        <p>
          We want you to love every piece you wear. Standard returns and size exchanges are accepted within 30 days of delivery in original, unworn condition with tags attached. Please contact our support team or manage your returns from your <Link to="/account" className="underline text-foreground">Account</Link>.
        </p>
      </section>

      <section id="privacy" className="pt-6">
        <h2>Privacy & Data Security</h2>
        <p>
          Your personal details, saved addresses, and order history are securely stored in your local session. We respect your personal privacy and never share, monetize, or sell customer information to third-party advertisers.
        </p>
      </section>

      <section id="terms" className="pt-6 mb-12">
        <h2>Terms & Service</h2>
        <p>
          Morrow is an independent editorial design and commerce studio. By browsing and shopping with us, you agree to our fair usage standards and transparent checkout conditions.
        </p>
      </section>
    </main>
  );
}
