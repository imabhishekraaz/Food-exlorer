const BASE_URL = "https://world.openfoodfacts.org";
export const PAGE_SIZE = 24;

/**
 * Search products by name and/or category with pagination.
 */
export async function fetchProducts({ query = "", category = "", page = 1 }) {
  let url = `${BASE_URL}/cgi/search.pl?action=process&json=true&page_size=${PAGE_SIZE}&page=${page}`;
  if (query) url += `&search_terms=${encodeURIComponent(query)}`;
  if (category) {
    url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return { products: data.products || [], count: data.count || 0 };
}

/**
 * Fetch a single product by barcode.
 */
export async function fetchProductByBarcode(barcode) {
  const res = await fetch(`${BASE_URL}/api/v0/product/${barcode.trim()}.json`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  if (data.status !== 1) throw new Error("Product not found");
  return data.product;
}

/**
 * Fetch full product detail by barcode/code.
 */
export async function fetchProductDetail(code) {
  const res = await fetch(`${BASE_URL}/api/v0/product/${code}.json`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  if (data.status !== 1) throw new Error("Product not found");
  return data.product;
}
