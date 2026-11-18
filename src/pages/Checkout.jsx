import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, formatPrice, getProductImage } from '../context/StoreContext';
import { toast } from 'sonner';

export default function Checkout() {
  const { products, cart, user, placeOrder, openAuthModal } = useStore();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const subtotal = cart.reduce((total, item) => {
    const p = products.find((prod) => prod.id === item.productId);
    return total + (p ? (p.sale_price ?? p.price) * item.quantity : 0);
  }, 0);

  const shippingCost = subtotal >= 100 ? 0 : 8;
  const estimatedTax = subtotal * 0.08;
  const total = subtotal + shippingCost + estimatedTax;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    const form = new FormData(e.currentTarget);
    const orderItems = cart.map((item) => {
      const prod = products.find((p) => p.id === item.productId);
      return {
        product_id: item.productId,
        product_name: prod ? prod.name : 'Morrow piece',
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null,
        price: prod ? prod.sale_price ?? prod.price : 0
      };
    });

    const orderData = {
      customer_name: String(form.get('name')),
      email: String(form.get('email')),
      phone: String(form.get('phone') || ''),
      address: {
        street: String(form.get('street')),
        city: String(form.get('city')),
        state: String(form.get('state')),
        postal_code: String(form.get('postal')),
        country: String(form.get('country'))
      },
      order_items: orderItems,
      total,
      coupon: promoCode
    };

    setTimeout(() => {
      const orderId = placeOrder(orderData);
      setSubmitting(false);
      toast.success('Order placed');
      navigate(`/order-success?id=${orderId}`);
    }, 600);
  };

  return (
    <main className="narrow-page">
      <span className="eyebrow">ALMOST THERE</span>
      <h1>
        Checkout<span className="period">.</span>
      </h1>

      {cart.length > 0 ? (
        <div className="cart-layout checkout-layout">
          <form id="checkout-form" onSubmit={handleSubmit}>
            {!user && (
              <div className="mb-6 p-4 rounded bg-muted/40 border border-border flex items-center justify-between text-xs">
                <span>Already have a Morrow account?</span>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="font-bold underline text-foreground hover:opacity-80"
                >
                  Sign in for saved address ↗
                </button>
              </div>
            )}
            <h2>01 / Your details</h2>
            <div className="form-grid">
              <label>
                Full name
                <input
                  name="name"
                  required
                  placeholder="Your full name"
                  defaultValue={user?.full_name || ''}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  defaultValue={user?.email || ''}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  defaultValue={user?.phone || ''}
                />
              </label>
            </div>

            <h2>02 / Shipping address</h2>
            <div className="form-grid">
              <label className="span-2">
                Street address
                <input
                  name="street"
                  required
                  placeholder="House number and street"
                />
              </label>
              <label>
                City
                <input name="city" required />
              </label>
              <label>
                State / region
                <input name="state" />
              </label>
              <label>
                Postal code
                <input name="postal" required />
              </label>
              <label>
                Country
                <input name="country" required defaultValue="United States" />
              </label>
            </div>

            <h2>03 / Payment</h2>
            <p className="payment-notice">
              Online payments are not connected yet. Submitting creates an order awaiting payment; our team will confirm next steps.
            </p>

            {!user && (
              <p className="payment-notice">
                You’ll need to{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="underline font-semibold text-primary"
                >
                  sign in
                </button>{' '}
                before placing your order.
              </p>
            )}

            {formError && (
              <p role="alert" className="form-error">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="wide-btn"
            >
              {submitting ? 'Placing order…' : 'Place order — payment pending'}
            </button>
          </form>

          <aside className="order-summary">
            <h2>Your order</h2>
            {cart.map((item, idx) => {
              const prod = products.find((p) => p.id === item.productId);
              if (!prod) return null;
              const price = (prod.sale_price ?? prod.price) * item.quantity;

              return (
                <div key={idx} className="checkout-item">
                  <img src={getProductImage(prod)} alt="" />
                  <span>
                    {prod.name}
                    <small>
                      Qty {item.quantity} {item.size ? `· ${item.size}` : ''}
                    </small>
                  </span>
                  <strong>{formatPrice(price)}</strong>
                </div>
              );
            })}

            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div>
              <span>Estimated shipping</span>
              <span>
                {subtotal >= 100 ? 'Complimentary' : formatPrice(shippingCost)}
              </span>
            </div>

            <div>
              <span>Estimated tax</span>
              <span>{formatPrice(estimatedTax)}</span>
            </div>

            <label className="coupon-label">
              PROMO CODE
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
              />
            </label>

            <p>
              Final total is calculated from current prices and stock when your order is placed.
            </p>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <h2>Your bag is empty.</h2>
          <Link to="/shop">Explore the collection →</Link>
        </div>
      )}
    </main>
  );
}
