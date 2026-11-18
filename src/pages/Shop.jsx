import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'featured';
  const max = Number(searchParams.get('max')) || 0;
  const available = searchParams.get('available') === 'true';
  const size = searchParams.get('size') || '';
  const color = searchParams.get('color') || '';
  const page = Number(searchParams.get('page')) || 1;

  const updateParam = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v === '' || v === 0 || v === false || v === null || v === undefined) {
        next.delete(k);
      } else {
        next.set(k, String(v));
      }
    });
    next.set('page', '1');
    setSearchParams(next);
  };

  const allSizes = useMemo(
    () => [...new Set(products.flatMap((p) => p.sizes || []))],
    [products]
  );
  const allColors = useMemo(
    () => [...new Set(products.flatMap((p) => p.colors || []))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category?.slug !== category) return false;
      if (
        q &&
        !`${p.name} ${p.category?.name || ''} ${p.sku || ''} ${p.description || ''}`
          .toLowerCase()
          .includes(q.toLowerCase())
      ) {
        return false;
      }
      if (max && (p.sale_price ?? p.price) > max) return false;
      if (available && p.stock <= 0) return false;
      if (size && !p.sizes?.includes(size)) return false;
      if (color && !p.colors?.includes(color)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'newest') return Date.parse(b.created_at) - Date.parse(a.created_at);
      if (sort === 'low') return (a.sale_price ?? a.price) - (b.sale_price ?? b.price);
      if (sort === 'high') return (b.sale_price ?? b.price) - (a.sale_price ?? a.price);
      if (sort === 'best') return Number(b.best_seller) - Number(a.best_seller);
      return Number(b.featured) - Number(a.featured);
    });

    return list;
  }, [products, category, q, max, available, size, color, sort]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <main className="shop-page">
      <div className="page-intro">
        <span className="eyebrow">THE MORROW COLLECTION</span>
        <h1>
          Good things, <em>gathered.</em>
        </h1>
        <p>Considered finds for wherever the day takes you.</p>
      </div>

      <div className="shop-toolbar">
        <span>{filteredProducts.length} pieces</span>
        <div>
          <button
            type="button"
            className="plain-btn"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            Filters {filtersOpen ? '−' : '+'}
          </button>

          <select
            aria-label="Sort products"
            value={sort}
            onChange={(e) => updateParam({ sort: e.target.value })}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="best">Best selling</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        {filtersOpen && (
          <aside className="filter-panel">
            <label>
              SEARCH
              <input
                placeholder="Search collection"
                value={q}
                onChange={(e) => updateParam({ q: e.target.value })}
              />
            </label>

            <label>
              CATEGORY
              <select
                value={category}
                onChange={(e) => updateParam({ category: e.target.value })}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              MAXIMUM PRICE
              <input
                type="number"
                min="0"
                value={max || ''}
                onChange={(e) => updateParam({ max: Number(e.target.value) || 0 })}
                placeholder="Any price"
              />
            </label>

            <label>
              SIZE
              <select
                value={size}
                onChange={(e) => updateParam({ size: e.target.value })}
              >
                <option value="">Any size</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label>
              COLOR
              <select
                value={color}
                onChange={(e) => updateParam({ color: e.target.value })}
              >
                <option value="">Any color</option>
                {allColors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="check-label">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => updateParam({ available: e.target.checked })}
              />{' '}
              In stock only
            </label>

            <button
              type="button"
              className="plain-btn"
              onClick={() => {
                setSearchParams(new URLSearchParams());
              }}
            >
              Clear filters
            </button>
          </aside>
        )}

        <div className="shop-results">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="product-grid">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {filteredProducts.length > itemsPerPage && (
                <div className="pagination">
                  <button
                    disabled={page <= 1}
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.set('page', String(page - 1));
                      setSearchParams(next);
                    }}
                  >
                    Previous
                  </button>
                  <span>
                    {page} / {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.set('page', String(page + 1));
                      setSearchParams(next);
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <h2>No pieces found.</h2>
              <p>Try changing your search or filters.</p>
              <Link to="/shop" onClick={() => setSearchParams(new URLSearchParams())}>
                See everything →
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
