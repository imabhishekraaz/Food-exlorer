export const CATEGORIES = [
  { label: "All Categories", value: "" },
  { label: "Beverages", value: "beverages" },
  { label: "Dairy products", value: "dairies" },
  { label: "Snacks", value: "snacks" },
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Cereals", value: "cereals-and-their-products" },
  { label: "Meats", value: "meats" },
  { label: "Seafood", value: "seafood" },
  { label: "Sweets", value: "sweets" },
  { label: "Breads", value: "breads" },
  { label: "Sauces & Condiments", value: "condiments" },
  { label: "Frozen foods", value: "frozen-foods" },
  { label: "Chocolates", value: "chocolates" },
  { label: "Cheeses", value: "cheeses" },
];

export const GRADE_CONFIG = {
  a: { bg: "#1a7a4a", text: "#fff", label: "Best" },
  b: { bg: "#85bb2f", text: "#fff", label: "Good" },
  c: { bg: "#f5a623", text: "#fff", label: "Fair" },
  d: { bg: "#e07b00", text: "#fff", label: "Poor" },
  e: { bg: "#cc3d3d", text: "#fff", label: "Bad" },
};

export const getGradeStyle = (grade) =>
  GRADE_CONFIG[grade?.toLowerCase()] || { bg: "#9ca3af", text: "#fff", label: "N/A" };

export const truncate = (str = "", maxLen = 80) =>
  str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
