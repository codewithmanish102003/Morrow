import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, formatPrice, getProductImage } from '../context/StoreContext';
import { Heart, ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const { add, favorites, toggleFavorite } = useStore();
  const imageUrl = getProductImage(product);
  const isFav = favorites.includes(product.id);
  const hasOptions = (product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.slug}`} className="product-image-link">
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
          />
        </Link>

        {product.sale_price && <span className="product-badge">SALE</span>}

        <button
          type="button"
          className="favorite-btn"
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>

        {hasOptions ? (
          <Link to={`/product/${product.slug}`} className="quick-add">
            Choose options <ArrowUpRight size={16} />
          </Link>
        ) : (
          <button
            type="button"
            className="quick-add"
            onClick={(e) => {
              e.preventDefault();
              add({ productId: product.id, quantity: 1 });
            }}
          >
            Quick add <ArrowUpRight size={16} />
          </button>
        )}
      </div>

      <div className="product-info">
        <span>{product.category?.name || 'Morrow'} · ★ {product.rating || 5}</span>
        <Link to={`/product/${product.slug}`}>{product.name}</Link>
        <div>
          {product.sale_price ? (
            <>
              <strong>{formatPrice(product.sale_price)}</strong>
              <del>{formatPrice(product.price)}</del>
            </>
          ) : (
            <strong>{formatPrice(product.price)}</strong>
          )}
        </div>
        <small>
          {product.stock > 0
            ? product.stock < 6
              ? 'Only a few left'
              : 'In stock'
            : 'Sold out'}
        </small>
      </div>
    </article>
  );
}
