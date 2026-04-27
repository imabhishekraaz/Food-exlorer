import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import { useProducts } from "./hooks/useProducts";
import { fetchProductByBarcode } from "./api/openFoodFacts";
import "./App.css";

export default function App() {
  const {
    products,
    loading,
    loadingMore,
    error,
    query,
    category,
    sortBy,
    hasMore,
    totalCount,
    setQuery,
    setCategory,
    setSortBy,
    loadMore,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  const handleBarcodeSearch = async (barcode, onError) => {
    setGlobalError(null);
    try {
      const product = await fetchProductByBarcode(barcode);
      setSelectedProduct(product);
    } catch {
      const msg = "No product found for barcode: " + barcode;
      setGlobalError(msg);
      if (onError) onError(msg);
    }
  };

  if (selectedProduct) {
    return (
      <div className="app">
        <Header totalCount={totalCount} />
        <main className="main-content">
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Header totalCount={totalCount} />
      <main className="main-content">
        <SearchBar
          query={query}
          category={category}
          sortBy={sortBy}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
          onBarcodeSearch={handleBarcodeSearch}
        />

        {(error || globalError) && (
          <div className="error-banner">{error || globalError}</div>
        )}

        <ProductGrid
          products={products}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onSelect={setSelectedProduct}
          onLoadMore={loadMore}
        />
      </main>

      <footer className="app-footer">
        Data provided by{" "}
        <a href="https://world.openfoodfacts.org" target="_blank" rel="noreferrer">
          Open Food Facts
        </a>{" "}
        — open database under ODbL licence.
      </footer>
    </div>
  );
}
