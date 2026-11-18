import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, formatPrice } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { products, favorites } = useStore();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="content-section py-16">
      <div className="page-intro text-center mb-12">
        <span className="eyebrow">YOUR SAVED PIECES</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-3">
          Wishlist <em>({favoriteProducts.length})</em>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Things you’re keeping an eye on for tomorrow, next week, or whenever the time is right.
        </p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="product-grid">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state text-center py-20">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4 text-muted-foreground">
            <Heart size={24} />
          </div>
          <h2 className="text-2xl font-serif mb-2">Nothing saved just yet.</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
            Tap the heart icon on any piece you love to save it here for later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-xs font-bold tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
          >
            Explore the collection <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </main>
  );
}
