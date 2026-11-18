import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  {
    category: 'ORDERS & SHIPPING',
    items: [
      {
        q: 'How long does shipping typically take?',
        a: 'Orders are processed within 1–2 business days. Standard shipping takes 3–5 business days within the continental US. Complimentary standard shipping applies to all orders over $100.'
      },
      {
        q: 'Can I track my order once it has been shipped?',
        a: 'Yes, as soon as your order leaves our studio you can check its status anytime via our Order Tracking page or under your Account dashboard.'
      },
      {
        q: 'Do you offer international shipping?',
        a: 'We currently ship throughout North America and select European destinations. International shipping rates and duties are calculated at checkout.'
      }
    ]
  },
  {
    category: 'RETURNS & EXCHANGES',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns of unworn, unwashed items in their original packaging with tags attached within 30 days of delivery. Return shipping is free on your first exchange.'
      },
      {
        q: 'How do I start a return or exchange?',
        a: 'Simply head over to your Account page, select the order you would like to return, or send a note to our care team via the Contact page.'
      }
    ]
  },
  {
    category: 'SIZING & MATERIALS',
    items: [
      {
        q: 'How do Morrow pieces fit?',
        a: 'Our silhouettes are designed for an easy, relaxed drape. If you prefer a closer, more tailored fit, we recommend sizing down one size. Detailed garment measurements are provided on each product page.'
      },
      {
        q: 'Where are your fabrics sourced?',
        a: 'We work directly with heritage mills using OEKO-TEX certified natural linen, heavy organic cotton canvas, and durable natural fibers made to age gracefully with wear.'
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="simple-page max-w-3xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <span className="eyebrow">COMMON INQUIRIES</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-2 mb-3">
          Frequently asked questions<span className="period">.</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Everything you need to know about our pieces, shipping, returns, and materials.
        </p>
      </div>

      <div className="space-y-10">
        {faqs.map((sec, sIdx) => (
          <div key={sIdx} className="border-t border-border pt-6">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase block mb-4">
              {sec.category}
            </span>

            <div className="divide-y divide-border/60">
              {sec.items.map((item, iIdx) => {
                const key = `${sIdx}-${iIdx}`;
                const isOpen = !!openItems[key];
                return (
                  <div key={iIdx} className="py-4">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between text-left font-serif text-lg text-foreground hover:text-primary transition-colors py-1"
                      onClick={() => toggleItem(key)}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-muted-foreground transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mt-3 text-sm text-muted-foreground leading-relaxed pr-6 animate-fadeIn">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 rounded bg-muted/50 border border-border text-center">
        <h3 className="font-serif text-xl mb-2">Still have questions?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Our friendly customer care team is always here to help.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-xs font-bold tracking-wider uppercase rounded hover:opacity-90 transition-opacity"
        >
          Contact our team <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
