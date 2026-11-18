import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { products, favorites } = useStore();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="narrow-page">
      <span className="eyebrow">YOUR SAVED PIECES</span>
      <h1>
        Your wishlist <em>({favoriteProducts.length})</em>
      </h1>

      {favoriteProducts.length > 0 ? (
        <div className="product-grid">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nothing saved just yet.</h2>
          <p>Find pieces you love and tap the heart icon on any card to save them here.</p>
          <Link to="/shop">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </main>
  );
}
