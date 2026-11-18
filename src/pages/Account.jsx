import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore, formatPrice } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { toast } from 'sonner';

export default function Account({ defaultTab = 'orders' }) {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!user) {
    return (
      <main className="narrow-page">
        <span className="eyebrow">YOUR MORROW</span>
        <h1>Welcome.</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Please sign in to view your orders, saved pieces, and profile.
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="underlined-link"
          >
            Sign in or create account ↗
          </button>
          <button
            type="button"
            onClick={() => signIn('eleanor@example.com', 'demo123')}
            className="underlined-link"
          >
            Demo sign in ↗
          </button>
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
    toast.success('Profile details saved');
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
    <main className="narrow-page">
      <span className="eyebrow">YOUR MORROW</span>
      <h1>
        Good to see you<span className="period">.</span>
      </h1>

      <div className="account-tabs">
        {['orders', 'favorites', 'profile', 'addresses'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'active' : ''}
            onClick={() => {
              setActiveTab(tab);
              setSearchParams({ tab });
            }}
          >
            {tab === 'orders'
              ? `Orders (${orders.length})`
              : tab === 'favorites'
              ? `Saved (${favorites.length})`
              : tab === 'profile'
              ? 'Profile & Details'
              : `Addresses (${addresses.length})`}
          </button>
        ))}

        <div className="account-tabs-end">
          <span className="account-email-tag">{user.email}</span>
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
                    {ord.status || 'Confirmed'} · Payment {ord.payment_status?.replaceAll('_', ' ')}
                  </strong>
                </div>
                <p>
                  {ord.order_items
                    ?.map(
                      (item) =>
                        `${item.product_name} × ${item.quantity}${item.size ? ` (${item.size})` : ''}`
                    )
                    .join(' · ')}
                </p>
                <div className="flex justify-between items-center">
                  <strong>{formatPrice(ord.total)}</strong>
                  <Link to="/order-tracking" className="text-xs underline text-foreground hover:opacity-80">
                    Track dispatch →
                  </Link>
                </div>
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
        <div className="account-content">
          <form className="simple-form" onSubmit={handleProfileSubmit}>
            <h2>Personal details</h2>
            <label>
              FULL NAME
              <input name="name" defaultValue={user.full_name || ''} placeholder="Your full name" />
            </label>
            <label>
              EMAIL ADDRESS
              <input type="email" disabled defaultValue={user.email || ''} />
            </label>
            <label>
              PHONE
              <input name="phone" defaultValue={user.phone || ''} placeholder="+1 555-0100" />
            </label>
            <label>
              PREFERRED FIT / SIZE
              <select name="size" defaultValue="M">
                <option value="XS">Extra Small (XS)</option>
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
              </select>
            </label>
            <button type="submit">Save changes</button>
          </form>

          <form
            className="simple-form mt-12 border-t border-border pt-8"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Password updated successfully');
              e.currentTarget.reset();
            }}
          >
            <h2>Security & Password</h2>
            <label>
              NEW PASSWORD
              <input type="password" required minLength={6} placeholder="At least 6 characters" />
            </label>
            <label>
              CONFIRM PASSWORD
              <input type="password" required minLength={6} placeholder="Repeat password" />
            </label>
            <button type="submit">Update password</button>
          </form>
        </div>
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
