import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, formatPrice, getProductImage } from '../context/StoreContext';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { products, cart, update, remove } = useStore();

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const p = products.find((prod) => prod.id === item.productId);
    if (!p) return total;
    return total + (p.sale_price ?? p.price) * item.quantity;
  }, 0);

  const shippingCost = subtotal >= 100 ? 0 : 8;

  return (
    <main className="narrow-page">
      <span className="eyebrow">THE GOOD THINGS YOU FOUND</span>
      <h1>
        Your bag <em>({totalCount})</em>
      </h1>

      {cart.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, idx) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              const itemPrice = (product.sale_price ?? product.price) * item.quantity;

              return (
                <article
                  key={`${item.productId}-${item.size || ''}-${item.color || ''}-${idx}`}
                  className="cart-item"
                >
                  <Link to={`/product/${product.slug}`}>
                    <img src={getProductImage(product)} alt={product.name} />
                  </Link>

                  <div>
                    <span className="eyebrow">{product.category?.name || 'Morrow'}</span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="cart-product-name"
                    >
                      {product.name}
                    </Link>
                    <p>{[item.size, item.color].filter(Boolean).join(' / ')}</p>

                    <div className="quantity">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          item.quantity === 1 ? remove(idx) : update(idx, item.quantity - 1)
                        }
                      >
                        <Minus size={15} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        disabled={item.quantity >= (product.stock || 99)}
                        onClick={() => update(idx, item.quantity + 1)}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-end">
                    <strong>{formatPrice(itemPrice)}</strong>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => remove(idx)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              );
            })}

            <Link to="/shop" className="underlined-link">
              ← Continue shopping
            </Link>
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <span>{subtotal >= 100 ? 'Complimentary' : formatPrice(8)}</span>
            </div>
            <p>Taxes and any discounts are confirmed at checkout.</p>
            <Link to="/checkout" className="wide-btn">
              Continue to checkout <ArrowRight size={17} />
            </Link>
            <span className="secure-note">SECURE CHECKOUT · EASY RETURNS</span>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nothing in here just yet.</h2>
          <p>There’s a whole collection waiting for you.</p>
          <Link to="/shop">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </main>
  );
}
