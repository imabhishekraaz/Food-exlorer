import React, { useState, useEffect } from "react";
import NutritionBadge from "./NutritionBadge";
import { fetchProductDetail } from "../api/openFoodFacts";
import { getGradeStyle, truncate } from "./constants";

function NutrientRow({ label, value, unit }) {
  if (value === undefined || value === null || value === "") return null;
  const display = typeof value === "number" ? value.toFixed(1) : value;
  return (
    <div className="nutrient-row">
      <span className="nutrient-label">{label}</span>
      <span className="nutrient-value">{display}{unit ? ` ${unit}` : ""}</span>
    </div>
  );
}

function DetailImage({ src, alt }) {
  const [error, setError] = useState(false);
  return (
    <div className="detail-image-box">
      {src && !error ? (
        <img src={src} alt={alt} onError={() => setError(true)} className="detail-image" />
      ) : (
        <span className="detail-image-placeholder">🥫</span>
      )}
    </div>
  );
}


export default function ProductDetail({ product, onBack }) {
  const [detail, setDetail] = useState(product);
  const [loading, setLoading] = useState(false);

  // Fetch richer detail if we only have the list-level product object
  useEffect(() => {
    if (!product.nutriments && product.code) {
      setLoading(true);
      fetchProductDetail(product.code)
        .then(p => setDetail(p))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [product]);

  const name = detail.product_name || detail.product_name_en || "Unknown product";
  const grade = detail.nutrition_grades || detail.nutriscore_grade;
  const n = detail.nutriments || {};
  const imgSrc = detail.image_front_url || detail.image_url;

  const labels = (detail.labels_tags || [])
    .map(l => l.replace(/^en:|^fr:/, "").replace(/-/g, " "))
    .filter(Boolean);

  const categories = (detail.categories_tags || [])
    .slice(0, 5)
    .map(c => c.replace(/^en:/, "").replace(/-/g, " "));

  const { bg, text } = getGradeStyle(grade);

  return (
    <div className="detail-page">
      <button className="btn btn-back" onClick={onBack}>
        ← Back to products
      </button>

      <div className="detail-card">
        {/* Hero section */}
        <div className="detail-hero">
          <DetailImage src={imgSrc} alt={name} />
          <div className="detail-meta">
            <h1 className="detail-name">{name}</h1>
            {detail.brands && (
              <p className="detail-field">
                <span className="detail-field-label">Brand</span> {detail.brands.split(",")[0]}
              </p>
            )}
            {detail.quantity && (
              <p className="detail-field">
                <span className="detail-field-label">Quantity</span> {detail.quantity}
              </p>
            )}
            {detail.countries && (
              <p className="detail-field">
                <span className="detail-field-label">Country</span> {detail.countries.split(",")[0]}
              </p>
            )}

            {/* Nutrition grade */}
            <div className="detail-grade-row">
              <span className="detail-field-label">Nutrition grade</span>
              {grade ? (
                <span
                  className="detail-grade-badge"
                  style={{ background: bg, color: text }}
                >
                  {grade.toUpperCase()}
                </span>
              ) : (
                <span className="na-text">Not available</span>
              )}
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="detail-tags">
                {categories.map(c => <span key={c} className="tag">{c}</span>)}
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="loading-row">
            <span className="spinner" />
            Loading full details…
          </div>
        )}

        {/* Ingredients */}
        {detail.ingredients_text && (
          <section className="detail-section">
            <h2 className="section-title">Ingredients</h2>
            <p className="ingredients-text">{detail.ingredients_text}</p>
          </section>
        )}

        {/* Nutritional values */}
        {Object.keys(n).length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">
              Nutritional values <span className="section-subtitle">per 100g</span>
            </h2>
            <div className="nutrient-table">
              <NutrientRow label="Energy" value={n["energy-kcal_100g"] || n.energy_100g}
                unit={n["energy-kcal_100g"] ? "kcal" : "kJ"} />
              <NutrientRow label="Fat" value={n.fat_100g} unit="g" />
              <NutrientRow label="— of which saturated" value={n["saturated-fat_100g"]} unit="g" />
              <NutrientRow label="Carbohydrates" value={n.carbohydrates_100g} unit="g" />
              <NutrientRow label="— of which sugars" value={n.sugars_100g} unit="g" />
              <NutrientRow label="Fiber" value={n.fiber_100g} unit="g" />
              <NutrientRow label="Proteins" value={n.proteins_100g} unit="g" />
              <NutrientRow label="Salt" value={n.salt_100g} unit="g" />
              <NutrientRow label="Sodium" value={n.sodium_100g} unit="g" />
            </div>
          </section>
        )}

        {/* Labels */}
        {labels.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">Labels & Certifications</h2>
            <div className="detail-tags">
              {labels.map(l => <span key={l} className="tag">{l}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
