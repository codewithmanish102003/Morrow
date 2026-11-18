import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Home() {
  const { categories, products, settings } = useStore();

  const favoriteProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.new_arrival).slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <img
          src="/assets/hero-campaign-DwTIbiq1.jpg"
          alt="A sunlit afternoon in considered everyday style"
          width={1920}
          height={1088}
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="hero-eyebrow">
            A MORE CONSIDERED EVERYDAY <span>✳</span> EST. 2026
          </span>
          <h1>
            For the moments
            <br />
            <em>in between.</em>
          </h1>
          <p>Clothing, essentials and small pleasures for the life you live.</p>
          <div className="hero-actions">
            <Link to="/shop" className="hero-primary">
              Explore the collection <ArrowUpRight size={18} />
            </Link>
            <Link to="/about" className="hero-secondary">
              Discover our story <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <span className="hero-side">THE ART OF LIVING WELL — NO. 01</span>
        <div className="hero-bottom">
          <span>THOUGHTFULLY FOUND. EASILY LOVED.</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* Marquee Band */}
      <div className="marquee-band">
        <span>GOOD THINGS FOR GOOD DAYS</span>
        <span>✳</span>
        <span>MADE FOR EVERY MOMENT</span>
        <span>✳</span>
        <span>YOUR EVERYDAY, REIMAGINED</span>
        <span>✳</span>
      </div>

      {/* 01 / THE EDIT - Categories */}
      <section className="content-section categories-section">
        <SectionHeading
          eyebrow="01 / THE EDIT"
          title="Find your kind of good."
          link="/shop"
        />
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="category-tile"
            >
              <img src={cat.image_url} alt={cat.name} loading="lazy" />
              <div className="category-overlay">
                <span>0{idx + 1} / THE COLLECTION</span>
                <div>
                  <h3>{cat.name}</h3>
                  <span className="circle-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <p>{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 02 / THE FAVORITES - Featured Products */}
      <section className="content-section products-section">
        <SectionHeading
          eyebrow="02 / THE FAVORITES"
          title="Worth making room for."
          link="/shop"
        />
        <div className="product-grid">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 03 / THE SEASONAL EDIT */}
      <section className="editorial-band">
        <div className="editorial-copy">
          <div>
            <span className="eyebrow">03 / THE SEASONAL EDIT</span>
            <h2>{settings?.seasonal_title || 'The season, considered.'}</h2>
            <p>
              {settings?.seasonal_description ||
                'Pieces that invite you to slow down, step outside, and stay a little longer.'}
            </p>
            <Link to="/shop" className="underlined-link">
              Explore the edit <ArrowUpRight size={18} />
            </Link>
          </div>
          <span className="editorial-index">MORROW / SEASONAL JOURNAL</span>
        </div>
        <div className="editorial-image">
          <img
            src={
              settings?.seasonal_image_url ||
              categories[1]?.image_url ||
              '/assets/category-seasonal.jpg'
            }
            alt="Seasonal collection"
            loading="lazy"
          />
        </div>
      </section>

      {/* 04 / JUST LANDED - New Arrivals */}
      <section className="content-section products-section">
        <SectionHeading
          eyebrow="04 / JUST LANDED"
          title="The latest little things."
          link="/shop"
        />
        <div className="product-grid">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Story Band */}
      <section className="story-band">
        <img
          src="/assets/category-clothing-l1jdMIWr.jpg"
          alt="Carefully selected everyday clothing"
          loading="lazy"
        />
        <div>
          <span className="eyebrow">A NOTE FROM MORROW</span>
          <h2>
            Less ordinary.
            <br />
            <em>More everyday.</em>
          </h2>
          <p>
            We believe the best things aren’t saved for someday. They’re the pieces you reach for, the moments you make time for, and the little rituals that make a day yours.
          </p>
          <Link to="/about" className="underlined-link">
            Get to know us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
