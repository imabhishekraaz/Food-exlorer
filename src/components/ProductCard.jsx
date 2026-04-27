import React, { useState } from "react";
import NutritionBadge from "./NutritionBadge";
import { truncate } from "./constants";

function ProductImage({ src, alt, size = 120 }) {
  const [error, setError] = useState(false);
  return (
    <div className="product-image-wrapper">
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          style={{ maxWidth: size, maxHeight: size, objectFit: "contain" }}
        />
      ) : (
        <span className="product-image-placeholder">🥫</span>
      )}
    </div>
  );
}

export default function ProductCard({ product, onClick }) {
  const name = product.product_name || product.product_name_en || "Unknown product";
  const category = product.categories_tags?.[0]
    ?.replace(/^en:/, "")
    .replace(/-/g, " ") || "";
  const grade = product.nutrition_grades || product.nutriscore_grade;
  const imgSrc = product.image_front_url || product.image_url;
  const brand = product.brands?.split(",")[0] || "";

  return (
    <article className="product-card" onClick={() => onClick(product)} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick(product)}>
      <ProductImage src={imgSrc} alt={name} />
      <div className="product-card-body">
        <div className="product-card-header">
          <p className="product-name">{truncate(name, 55)}</p>
          <NutritionBadge grade={grade} />
        </div>
        {category && (
          <p className="product-category">{truncate(category, 30)}</p>
        )}
        {product.ingredients_text && (
          <p className="product-ingredients">{truncate(product.ingredients_text, 70)}</p>
        )}
        {brand && <p className="product-brand">{brand}</p>}
      </div>
    </article>
  );
}
