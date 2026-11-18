import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, formatPrice } from '../context/StoreContext';
import { Package, CheckCircle2, Truck, Home, Search } from 'lucide-react';

export default function OrderTracking() {
  const { orders } = useStore();
  const [queryId, setQueryId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = queryId.trim().toLowerCase();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.id.replace('ord-', '').toLowerCase() === clean
    );
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Received & verified by our studio', icon: CheckCircle2, completed: true },
    { title: 'Preparing in Studio', desc: 'Carefully wrapped with tissue & note', icon: Package, completed: true },
    { title: 'In Transit', desc: 'Courier express dispatch in motion', icon: Truck, completed: false },
    { title: 'Delivered', desc: 'Arrived at your doorstep', icon: Home, completed: false }
  ];

  return (
    <main className="simple-page order-tracking-page">
      <span className="eyebrow">ORDER PROGRESS</span>
      <h1>
        Track your piece<span className="period">.</span>
      </h1>
      <p className="track-subtitle">
        Enter your Morrow order reference number to see real-time preparation and courier updates.
      </p>

      <form onSubmit={handleSearch} className="track-form">
        <input
          type="text"
          required
          placeholder="e.g. ord-8f921ab4"
          value={queryId}
          onChange={(e) => setQueryId(e.target.value)}
          className="track-input"
        />
        <button
          type="submit"
          className="track-btn"
        >
          <Search size={15} /> Track Order
        </button>
      </form>

      {hasSearched && (
        <div className="tracking-result-card animate-fadeIn">
          {searchedOrder ? (
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1">
                    ORDER REFERENCE
                  </span>
                  <p className="font-mono text-sm font-bold text-foreground">
                    {searchedOrder.id.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1">
                    STATUS
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                    {searchedOrder.status || 'Pending'}
                  </p>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="tracking-timeline">
                {steps.map((st, sIdx) => {
                  const Icon = st.icon;
                  return (
                    <div key={sIdx} className="tracking-timeline-step">
                      <div
                        className={`tracking-step-icon ${
                          st.completed ? 'is-completed' : 'is-pending'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="tracking-step-text">
                        <h4>{st.title}</h4>
                        <p>{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Items summary */}
              {searchedOrder.order_items && searchedOrder.order_items.length > 0 && (
                <div className="border-t border-border pt-5 mt-6">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-3">
                    ITEMS IN THIS DISPATCH
                  </span>
                  <div className="space-y-2 text-sm">
                    {searchedOrder.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-muted-foreground">
                        <span className="text-xs">
                          {item.product_name || 'Morrow piece'} × {item.quantity}
                          {item.size ? ` (${item.size})` : ''}
                          {item.color ? ` / ${item.color}` : ''}
                        </span>
                        <strong className="text-foreground text-xs font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
                No order found matching <span className="font-mono text-foreground">"{queryId}"</span>.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Check your recent orders in your{' '}
                <Link to="/account" className="underline text-foreground">
                  Account
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quick link to recent orders */}
      {orders.length > 0 && !hasSearched && (
        <div className="recent-orders-wrap border-t border-border pt-6">
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-3 text-center">
            RECENT ORDERS IN YOUR BROWSER
          </span>
          <div className="space-y-2">
            {orders.slice(0, 3).map((ord) => (
              <button
                key={ord.id}
                type="button"
                onClick={() => {
                  setQueryId(ord.id);
                  setSearchedOrder(ord);
                  setHasSearched(true);
                }}
                className="w-full text-left p-3 rounded border border-border hover:border-foreground/40 transition-colors flex items-center justify-between text-xs bg-background"
              >
                <span className="font-mono font-medium">{ord.id.toUpperCase()}</span>
                <span className="text-muted-foreground">
                  {new Date(ord.created_at).toLocaleDateString()} · {formatPrice(ord.total)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
