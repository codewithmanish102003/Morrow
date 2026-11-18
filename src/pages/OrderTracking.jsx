import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, formatPrice } from '../context/StoreContext';
import { Package, CheckCircle2, Clock, Truck, Home, Search } from 'lucide-react';

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
    { title: 'Order Confirmed', desc: 'Received & verified', icon: CheckCircle2, completed: true },
    { title: 'Preparing in Studio', desc: 'Carefully packed with tissue & card', icon: Package, completed: true },
    { title: 'In Transit', desc: 'Courier express dispatch', icon: Truck, completed: false },
    { title: 'Delivered', desc: 'Delivered to your door', icon: Home, completed: false }
  ];

  return (
    <main className="simple-page max-w-2xl mx-auto py-16 px-6">
      <div className="text-center mb-10">
        <span className="eyebrow">ORDER PROGRESS</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-3">
          Track your piece<span className="period">.</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Enter your Morrow order reference number to see real-time preparation and courier updates.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-10">
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="e.g. ord-8f921ab4"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded text-sm uppercase tracking-wider focus:outline-none focus:border-foreground"
          />
        </div>
        <button
          type="submit"
          className="bg-foreground text-background px-6 py-3 text-xs font-bold tracking-widest uppercase rounded hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          <Search size={15} /> Track
        </button>
      </form>

      {hasSearched && (
        <div className="bg-card border border-border rounded p-6 sm:p-8 animate-fadeIn mb-8">
          {searchedOrder ? (
            <div>
              <div className="flex flex-wrap items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    ORDER REFERENCE
                  </span>
                  <p className="font-mono text-sm font-bold">
                    {searchedOrder.id.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    STATUS
                  </span>
                  <p className="text-sm font-semibold text-primary">
                    {searchedOrder.status || 'Confirmed'}
                  </p>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="space-y-6 my-8">
                {steps.map((st, sIdx) => {
                  const Icon = st.icon;
                  return (
                    <div key={sIdx} className="flex items-start gap-4">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          st.completed
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground">{st.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Items summary */}
              {searchedOrder.order_items && searchedOrder.order_items.length > 0 && (
                <div className="border-t border-border pt-4 mt-6">
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-3">
                    ITEMS IN THIS DISPATCH
                  </span>
                  <div className="space-y-2 text-sm">
                    {searchedOrder.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-muted-foreground">
                        <span>
                          {item.product_name || 'Morrow piece'} × {item.quantity}
                          {item.size ? ` (${item.size})` : ''}
                        </span>
                        <strong className="text-foreground">
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
        <div className="mt-8 border-t border-border pt-6">
          <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-3">
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
                className="w-full text-left p-3 rounded border border-border hover:border-foreground/40 transition-colors flex items-center justify-between text-xs"
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
