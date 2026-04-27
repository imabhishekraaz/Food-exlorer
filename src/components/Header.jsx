import React from "react";
import { GRADE_CONFIG } from "./constants";

export default function Header({ totalCount }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="brand-icon">🥗</span>
          <div>
            <h1 className="brand-name">FoodExplorer</h1>
            <p className="brand-sub">Powered by Open Food Facts</p>
          </div>
        </div>

        <div className="header-right">
          <div className="grade-legend">
            {Object.entries(GRADE_CONFIG).map(([grade, { bg, text, label }]) => (
              <span key={grade} className="legend-item" title={label}>
                <span
                  className="legend-badge"
                  style={{ background: bg, color: text }}
                >
                  {grade.toUpperCase()}
                </span>
                <span className="legend-label">{label}</span>
              </span>
            ))}
          </div>
          {totalCount > 0 && (
            <span className="header-count">
              {totalCount.toLocaleString()} products
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
