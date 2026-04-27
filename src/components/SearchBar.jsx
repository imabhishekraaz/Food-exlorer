import React, { useState } from "react";
import { CATEGORIES } from "./constants";

export default function SearchBar({
  query, category, sortBy,
  onQueryChange, onCategoryChange, onSortChange,
  onBarcodeSearch,
}) {
  const [mode, setMode] = useState("name");
  const [barcode, setBarcode] = useState("");
  const [barcodeError, setBarcodeError] = useState("");

  const handleBarcodeSearch = async () => {
    if (!barcode.trim()) { setBarcodeError("Please enter a barcode."); return; }
    setBarcodeError("");
    await onBarcodeSearch(barcode, () => setBarcodeError("No product found for this barcode."));
  };

  return (
    <div className="search-bar-wrapper">
      {/* Mode tabs */}
      <div className="mode-tabs">
        {[
          { key: "name", label: "Search by name" },
          { key: "barcode", label: "Search by barcode" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`mode-tab ${mode === key ? "active" : ""}`}
            onClick={() => { setMode(key); setBarcodeError(""); }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Name search */}
      {mode === "name" && (
        <div className="name-search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search food products by name…"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
          />
          <select
            className="filter-select"
            value={category}
            onChange={e => onCategoryChange(e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value="">Sort by…</option>
            <option value="name_asc">Name A → Z</option>
            <option value="name_desc">Name Z → A</option>
            <option value="grade_asc">Nutrition grade: best first</option>
            <option value="grade_desc">Nutrition grade: worst first</option>
          </select>
        </div>
      )}

      {/* Barcode search */}
      {mode === "barcode" && (
        <div className="barcode-search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Enter barcode (e.g. 737628064502)"
            value={barcode}
            onChange={e => { setBarcode(e.target.value); setBarcodeError(""); }}
            onKeyDown={e => e.key === "Enter" && handleBarcodeSearch()}
          />
          <button className="btn btn-primary" onClick={handleBarcodeSearch}>
            Search barcode
          </button>
        </div>
      )}
      {barcodeError && <p className="error-inline">{barcodeError}</p>}
    </div>
  );
}
