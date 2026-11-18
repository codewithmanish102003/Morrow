import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { slug } = useParams();
  const { categories, products } = useStore();

  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    return (
      <div className="empty-state py-20">
        <h1>Collection not found.</h1>
        <Link to="/shop">Shop all →</Link>
      </div>
    );
  }

  const categoryProducts = products.filter(
    (p) => p.category_id === currentCategory.id || p.category?.slug === slug
  );

  return (
    <main>
      <section className="category-hero">
        <img src={currentCategory.image_url} alt={currentCategory.name} />
        <div>
          <span className="eyebrow">THE MORROW EDIT</span>
          <h1>{currentCategory.name}</h1>
          <p>{currentCategory.description}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="shop-toolbar">
          <span>{categoryProducts.length} pieces</span>
          <Link to="/shop">
            Shop all <span>→</span>
          </Link>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="product-grid">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Something good is coming.</h2>
            <Link to="/shop">Explore everything →</Link>
          </div>
        )}
      </section>
    </main>
  );
}
