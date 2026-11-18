import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore, formatPrice } from '../context/StoreContext';
import { Check, ArrowRight, Package } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { orders } = useStore();

  const currentOrder = orders.find((o) => o.id === id) || orders[0];

  return (
    <main className="success-page max-w-xl mx-auto py-16 px-6">
      <div className="success-icon mb-4">
        <Check size={28} />
      </div>
      <span className="eyebrow">THANK YOU FOR CHOOSING MORROW</span>
      <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-3">
        Good things <em>are coming.</em>
      </h1>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
        We’ve received your order. We’re preparing your pieces in our studio and will send an update as soon as they dispatch.
      </p>

      {currentOrder && (
        <div className="bg-card border border-border rounded p-6 text-left my-8 shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                ORDER REFERENCE
              </span>
              <p className="font-mono text-sm font-bold text-foreground">
                {currentOrder.id.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                TOTAL
              </span>
              <p className="text-sm font-bold text-foreground">
                {formatPrice(currentOrder.total)}
              </p>
            </div>
          </div>

          {currentOrder.order_items && currentOrder.order_items.length > 0 && (
            <div className="space-y-3 mb-4">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block">
                ORDERED PIECES
              </span>
              {currentOrder.order_items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {item.product_name} × {item.quantity}
                    {item.size ? ` (${item.size})` : ''}
                    {item.color ? ` / ${item.color}` : ''}
                  </span>
                  <strong className="text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>
          )}

          {currentOrder.address && (
            <div className="border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-1">
                DELIVERING TO
              </span>
              <p className="text-foreground font-medium">{currentOrder.customer_name}</p>
              <p>{currentOrder.address.street}</p>
              <p>{currentOrder.address.city}, {currentOrder.address.state} {currentOrder.address.postal_code}</p>
            </div>
          )}
        </div>
      )}

      <div className="success-actions">
        <Link to="/order-tracking" className="success-btn-primary">
          <Package size={15} /> Track this order
        </Link>
        <Link to="/shop" className="success-btn-secondary">
          Continue shopping <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
