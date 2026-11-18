import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore, formatPrice, getProductImage } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { ZoomIn, Minus, Plus, Heart, Truck, RotateCcw, X } from 'lucide-react';

export default function Product() {
  const { slug } = useParams();
  const { products, add, favorites, toggleFavorite } = useStore();

  const product = products.find((p) => p.slug === slug);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!product) {
    return (
      <div className="empty-state py-20">
        <h1>Piece not found.</h1>
        <Link to="/shop">Back to shop →</Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? [...product.images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    : [{ id: '1', url: getProductImage(product), alt: product.name }];

  const currentImage = images[activeImageIdx] || images[0];
  const isFav = favorites.includes(product.id);
  const currentPrice = product.sale_price ?? product.price;

  const handleAddToBag = () => {
    if (product.sizes?.length && !selectedSize) {
      document.getElementById('product-sizes')?.focus();
      return;
    }
    if (product.colors?.length && !selectedColor) {
      document.getElementById('product-colors')?.focus();
      return;
    }
    add({
      productId: product.id,
      quantity,
      ...(selectedSize ? { size: selectedSize } : {}),
      ...(selectedColor ? { color: selectedColor } : {})
    });
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="product-page">
      <div className="breadcrumbs">
        <Link to="/shop">Shop</Link>
        {' / '}
        <Link to={`/category/${product.category?.slug || 'clothing'}`}>
          {product.category?.name || 'Collection'}
        </Link>
        {' / '}
        {product.name}
      </div>

      <div className="product-detail">
        {/* Gallery */}
        <div className="detail-gallery">
          <div className="main-image" onClick={() => setZoomOpen(true)}>
            <img src={currentImage.url} alt={currentImage.alt || product.name} />
            <ZoomIn className="zoom-icon" size={20} />
          </div>

          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  aria-label={`View product image ${idx + 1}`}
                  className={activeImageIdx === idx ? 'selected' : ''}
                  onClick={() => setActiveImageIdx(idx)}
                >
                  <img src={img.url} alt={img.alt || product.name} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="detail-info">
          <span className="eyebrow">
            {product.category?.name || 'CLOTHING'} / MORROW EDIT
          </span>
          <h1>{product.name}</h1>

          <div className="rating">
            ★★★★★ <span>({product.rating || 5} / 5)</span>
          </div>

          <div className="detail-price">
            {product.sale_price ? (
              <>
                <strong>{formatPrice(product.sale_price)}</strong>
                <del>{formatPrice(product.price)}</del>
              </>
            ) : (
              <strong>{formatPrice(product.price)}</strong>
            )}
          </div>

          <p>{product.description}</p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <fieldset id="product-sizes" tabIndex={-1}>
              <legend>
                SIZE <span>{selectedSize || 'Select a size'}</span>
              </legend>
              <div className="option-row">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`inline-flex items-center justify-center px-4 py-2 border text-xs tracking-wider transition-colors ${
                      selectedSize === s
                        ? 'border-primary bg-primary text-primary-foreground font-semibold'
                        : 'border-border bg-background hover:border-foreground/40'
                    }`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <fieldset id="product-colors" tabIndex={-1}>
              <legend>
                COLOR <span>{selectedColor || 'Select a color'}</span>
              </legend>
              <div className="option-row">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`inline-flex items-center justify-center px-4 py-2 border text-xs tracking-wider transition-colors ${
                      selectedColor === c
                        ? 'border-primary bg-primary text-primary-foreground font-semibold'
                        : 'border-border bg-background hover:border-foreground/40'
                    }`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Purchase Row */}
          <div className="purchase-row">
            <div className="quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              className="add-to-bag"
              disabled={!product.stock}
              onClick={handleAddToBag}
            >
              {product.stock
                ? `Add to bag — ${formatPrice(currentPrice * quantity)}`
                : 'Sold out'}
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center p-3 border border-border hover:border-foreground transition-colors"
              aria-label="Toggle wishlist"
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="stock-note">
            {product.stock
              ? `● In stock · ${product.stock} available`
              : 'Currently unavailable'}
          </p>

          <div className="detail-perks">
            <span>
              <Truck size={19} /> Complimentary shipping over ₹100
            </span>
            <span>
              <RotateCcw size={19} /> Easy 30-day returns
            </span>
          </div>

          <details>
            <summary>Details & care</summary>
            <p>{product.description}</p>
            {Object.entries(product.specifications || {}).map(([key, val]) => (
              <p key={key}>
                {key}: {String(val)}
              </p>
            ))}
          </details>

          <details>
            <summary>Shipping & returns</summary>
            <p>
              Standard delivery and 30-day returns. Shipping charges are calculated at checkout.
            </p>
          </details>
        </div>
      </div>

      {/* Related Products */}
      <section className="content-section related-section">
        <SectionHeading
          eyebrow="A LITTLE MORE TO LOVE"
          title="You might also like."
          link="/shop"
        />
        <div className="product-grid">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomOpen && (
        <div className="zoom-overlay" onClick={() => setZoomOpen(false)}>
          <button
            type="button"
            className="absolute top-6 right-6 p-2 text-2xl"
            aria-label="Close zoom"
            onClick={() => setZoomOpen(false)}
          >
            <X size={28} />
          </button>
          <img src={currentImage.url} alt={product.name} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
