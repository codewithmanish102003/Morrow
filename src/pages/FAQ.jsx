import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  {
    category: 'ORDERS & SHIPPING',
    items: [
      {
        q: 'How long does shipping typically take?',
        a: 'Orders are processed within 1–2 business days. Standard shipping takes 3–5 business days. Complimentary standard shipping applies to all orders over ₹100.'
      },
      {
        q: 'Can I track my order once it has been shipped?',
        a: 'Yes, as soon as your order leaves our studio you can check its status anytime via our Order Tracking page or under your Account dashboard.'
      },
      {
        q: 'Do you offer international shipping?',
        a: 'We currently ship throughout North America, India, and select European destinations. International shipping rates and duties are calculated at checkout.'
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
  const [openItems, setOpenItems] = useState({ '0-0': true });
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = ['ALL', 'ORDERS & SHIPPING', 'RETURNS & EXCHANGES', 'SIZING & MATERIALS'];

  const filteredFaqs =
    selectedCategory === 'ALL'
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <main className="faq-page">
      <div className="faq-header">
        <span className="eyebrow">COMMON INQUIRIES</span>
        <h1>
          Frequently asked questions<span className="period">.</span>
        </h1>
        <p>
          Everything you need to know about our pieces, complimentary shipping, returns, and organic fabrics.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-foreground text-background shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              style={{
                outline: 'none',
                border: '1px solid var(--border)',
                background: selectedCategory === cat ? 'var(--foreground)' : 'transparent',
                color: selectedCategory === cat ? '#fbf9f4' : 'var(--muted-foreground)'
              }}
            >
              {cat === 'ALL' ? 'All Topics' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredFaqs.map((sec, sIdx) => (
          <section key={sIdx} className="faq-category-section">
            <span className="faq-category-title">{sec.category}</span>

            <div>
              {sec.items.map((item, iIdx) => {
                const key = `${sIdx}-${iIdx}`;
                const isOpen = !!openItems[key];
                return (
                  <div key={iIdx} className="faq-item">
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => toggleItem(key)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question">{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isOpen ? 'is-open' : ''}`}
                      />
                    </button>

                    <div className={`faq-collapse ${isOpen ? 'is-open' : ''}`}>
                      <div className="faq-collapse-inner">
                        <p className="faq-answer">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Still Have Questions Box */}
      <div className="faq-help-card">
        <h3>Still have questions?</h3>
        <p>
          Our friendly customer care team is always here to assist with sizing, bespoke inquiries, or shipping questions.
        </p>
        <Link to="/contact" className="success-btn-primary">
          Contact our team <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
