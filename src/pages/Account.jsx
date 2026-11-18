import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, formatPrice } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Account() {
  const {
    user,
    orders,
    products,
    favorites,
    addresses,
    addAddress,
    removeAddress,
    updateProfile,
    signOut,
    openAuthModal,
    signIn
  } = useStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'favorites' | 'profile' | 'addresses'

  if (!user) {
    return (
      <main className="simple-page max-w-xl mx-auto py-16 px-6 text-center">
        <span className="eyebrow">YOUR MORROW</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-3">Welcome.</h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
          Sign in to view your order history, manage saved addresses, and update your personal details.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="w-full sm:w-auto bg-foreground text-background px-7 py-3 text-xs font-bold tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
          >
            Sign in or Register
          </button>
          <button
            type="button"
            onClick={() => signIn('eleanor@example.com', 'demo123')}
            className="w-full sm:w-auto border border-border px-7 py-3 text-xs font-bold tracking-widest uppercase rounded hover:border-foreground transition-colors"
          >
            Demo Customer Login
          </button>
        </div>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground">
          <span>Looking for your saved pieces? </span>
          <Link to="/wishlist" className="underline font-bold text-foreground">
            View your Wishlist ↗
          </Link>
        </div>
      </main>
    );
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateProfile({
      full_name: String(form.get('name')),
      phone: String(form.get('phone'))
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    addAddress({
      full_name: String(form.get('name')),
      phone: String(form.get('phone')),
      street: String(form.get('street')),
      city: String(form.get('city')),
      state: String(form.get('state')),
      postal_code: String(form.get('postal')),
      country: String(form.get('country'))
    });
    e.currentTarget.reset();
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="account-page">
      <div className="page-intro">
        <span className="eyebrow">YOUR MORROW</span>
        <h1>
          Good to see you<span className="period">.</span>
        </h1>
        <p>{user.email}</p>
      </div>

      <div className="account-tabs">
        {['orders', 'favorites', 'profile', 'addresses'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            signOut();
            navigate('/auth');
          }}
        >
          Sign out
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="account-content">
          {orders.length > 0 ? (
            orders.map((ord) => (
              <article key={ord.id} className="order-card">
                <div>
                  <span className="eyebrow">
                    ORDER {ord.id.replace('ord-', '').slice(0, 8).toUpperCase()}
                  </span>
                  <span>{new Date(ord.created_at).toLocaleDateString()}</span>
                  <strong>
                    {ord.status} · Payment {ord.payment_status?.replaceAll('_', ' ')}
                  </strong>
                </div>
                <p>
                  {ord.order_items
                    ?.map((item) => `${item.product_name} × ${item.quantity}`)
                    .join(' · ')}
                </p>
                <strong>{formatPrice(ord.total)}</strong>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Your story starts here.</h2>
              <p>No orders yet.</p>
              <Link to="/shop">Explore the collection →</Link>
            </div>
          )}
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="account-content">
          {favoriteProducts.length > 0 ? (
            <div className="product-grid">
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Nothing saved just yet.</h2>
              <p>Find pieces you love and tap the heart icon to save them here.</p>
              <Link to="/shop">Find something you love →</Link>
            </div>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <form className="simple-form" onSubmit={handleProfileSubmit}>
          <h2>Your details</h2>
          <label>
            FULL NAME
            <input name="name" defaultValue={user.full_name || ''} />
          </label>
          <label>
            PHONE
            <input name="phone" defaultValue={user.phone || ''} />
          </label>
          <button type="submit">Save changes</button>
        </form>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="account-content">
          <h2>Saved addresses</h2>
          {addresses.map((addr) => (
            <div key={addr.id} className="address-row">
              <span>
                {addr.full_name} · {addr.street}, {addr.city}, {addr.postal_code}
              </span>
              <button
                type="button"
                className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                onClick={() => removeAddress(addr.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <form className="simple-form mt-8" onSubmit={handleAddressSubmit}>
            <h3>Add an address</h3>
            <label>
              RECIPIENT NAME
              <input name="name" required placeholder="Full name" />
            </label>
            <label>
              PHONE
              <input name="phone" placeholder="Phone number" />
            </label>
            <label>
              STREET ADDRESS
              <input name="street" required placeholder="Street address" />
            </label>
            <div className="form-grid">
              <label>
                CITY
                <input name="city" required />
              </label>
              <label>
                STATE
                <input name="state" />
              </label>
              <label>
                POSTAL CODE
                <input name="postal" required />
              </label>
            </div>
            <label>
              COUNTRY
              <input name="country" required defaultValue="United States" />
            </label>
            <button type="submit">Save address</button>
          </form>
        </div>
      )}
    </main>
  );
}
