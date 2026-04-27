import { useState, useEffect, useCallback, useRef } from "react";
import { fetchProducts, fetchProductByBarcode, PAGE_SIZE } from "../api/openFoodFacts";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const debounceRef = useRef(null);

  const load = useCallback(async (q, cat, p, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);
    try {
      const { products: newProds, count } = await fetchProducts({ query: q, category: cat, page: p });
      setProducts(prev => (append ? [...prev, ...newProds] : newProds));
      setTotalCount(count);
      setHasMore(newProds.length === PAGE_SIZE);
    } catch {
      setError("Failed to fetch products. The server may be busy — please try again.");
    } finally {
      if (append) setLoadingMore(false);
      else setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    load("", "", 1);
  }, [load]);

  const handleQueryChange = useCallback((q) => {
    setQuery(q);
    setPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => load(q, category, 1), 600);
  }, [category, load]);

  const handleCategoryChange = useCallback((cat) => {
    setCategory(cat);
    setPage(1);
    load(query, cat, 1);
  }, [query, load]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    load(query, category, nextPage, true);
  }, [page, query, category, load]);

  const sortedProducts = sortProducts(products, sortBy);

  return {
    products: sortedProducts,
    loading,
    loadingMore,
    error,
    query,
    category,
    sortBy,
    hasMore,
    totalCount,
    setQuery: handleQueryChange,
    setCategory: handleCategoryChange,
    setSortBy,
    loadMore,
  };
}

export function useBarcodeSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (barcode, onSuccess) => {
    if (!barcode.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const product = await fetchProductByBarcode(barcode);
      onSuccess(product);
    } catch {
      setError("No product found for this barcode.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, search, setError };
}

// ─── Sorting helper ────────────────────────────────────────────────────────────
const GRADE_ORDER = { a: 1, b: 2, c: 3, d: 4, e: 5 };

function sortProducts(products, sortBy) {
  if (!sortBy) return products;
  const copy = [...products];
  switch (sortBy) {
    case "name_asc":
      return copy.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
    case "name_desc":
      return copy.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
    case "grade_asc":
      return copy.sort((a, b) =>
        (GRADE_ORDER[a.nutrition_grades] || 9) - (GRADE_ORDER[b.nutrition_grades] || 9)
      );
    case "grade_desc":
      return copy.sort((a, b) =>
        (GRADE_ORDER[b.nutrition_grades] || 9) - (GRADE_ORDER[a.nutrition_grades] || 9)
      );
    default:
      return copy;
  }
}
