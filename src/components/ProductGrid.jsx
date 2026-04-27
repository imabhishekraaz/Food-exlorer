import React from "react";
import ProductCard from "./ProductCard";

export function LoadingGrid() {
  return (
    <div className="loading-center">
      <span className="spinner spinner-lg" />
      <p>Loading products…</p>
    </div>
  );
}

export function EmptyState({ query, category }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">🔍</span>
      <h2>No products found</h2>
      <p>
        {query
          ? `No results for "${query}"${category ? ` in selected category` : ""}.`
          : "Try selecting a different category or search term."}
      </p>
    </div>
  );
}

/**
 * Responsive grid of ProductCard components + Load More button.
 */
export default function ProductGrid({ products, loading, loadingMore, hasMore, onSelect, onLoadMore }) {
  if (loading) return <LoadingGrid />;
  if (!products.length) return <EmptyState />;

  return (
    <section className="product-grid-section">
      <div className="product-grid">
        {products.map((p, i) => (
          <ProductCard key={p.code || p._id || i} product={p} onClick={onSelect} />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-row">
          <button
            className="btn btn-load-more"
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <><span className="spinner spinner-sm" /> Loading…</>
            ) : (
              "Load more products"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
