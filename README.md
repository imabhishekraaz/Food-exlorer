# FoodExplorer 🥗

A React application for exploring food products using the [Open Food Facts](https://world.openfoodfacts.org/) API.

## Features

| Feature | Details |
|---|---|
| **Search by name** | Debounced search (600ms) as you type |
| **Search by barcode** | Enter any barcode (e.g. `737628064502`) to look up a product |
| **Category filter** | 14 categories — beverages, dairy, snacks, cereals, meats, etc. |
| **Sort** | Name A→Z / Z→A, Nutrition grade best→worst / worst→best |
| **Product grid** | Responsive — auto-fills columns; shows image, name, category, ingredients snippet, brand, Nutri-Score |
| **Load more** | Pagination via "Load more" button (24 products per page, appends to list) |
| **Product detail** | Full view with image, ingredients, nutritional table per 100g, labels & certifications |
| **Responsive design** | Works on mobile (360px) through wide desktop |

## Project structure

```
src/
├── api/
│   └── openFoodFacts.js     # All API calls (fetchProducts, fetchProductByBarcode, fetchProductDetail)
├── components/
│   ├── constants.js          # CATEGORIES, GRADE_CONFIG, helpers
│   ├── Header.jsx            # Sticky header with logo + grade legend
│   ├── SearchBar.jsx         # Mode tabs + name/barcode search inputs + filters
│   ├── NutritionBadge.jsx    # Coloured A–E grade pill
│   ├── ProductCard.jsx       # Grid card component
│   ├── ProductGrid.jsx       # Grid layout + Load More + loading/empty states
│   └── ProductDetail.jsx     # Full-page product detail view
├── hooks/
│   └── useProducts.js        # Custom hook managing products state, pagination, sort, debounce
├── App.jsx                   # Root — wires everything, handles page navigation
├── App.css                   # All styles (no CSS framework required)
└── index.js                  # React entry point
```

## Getting started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run dev
```

The app will open at `http://localhost:3000`.

## API endpoints used

| Purpose | Endpoint |
|---|---|
| Search by name | `GET /cgi/search.pl?action=process&search_terms={q}&json=true` |
| Filter by category | `GET /cgi/search.pl?action=process&tagtype_0=categories&tag_0={cat}&json=true` |
| Barcode lookup | `GET /api/v0/product/{barcode}.json` |
| Product detail | `GET /api/v0/product/{code}.json` |

> **Note:** Open Food Facts is a free, open database maintained by a French non-profit. If the server is slow, wait a moment and retry.

## Tech stack

- **React 18** with functional components and hooks
- **Custom hooks** (`useProducts`) for state management — no Redux needed
- **Plain CSS** (no framework) with CSS custom properties
- **DM Sans** + **Playfair Display** via Google Fonts
