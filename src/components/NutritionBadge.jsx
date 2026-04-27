import React from "react";
import { getGradeStyle } from "./constants";

export default function NutritionBadge({ grade, size = 28, fontSize = 13 }) {
  if (!grade) return <span className="badge-na">?</span>;
  const { bg, text } = getGradeStyle(grade);
  return (
    <span
      className="nutrition-badge"
      style={{ background: bg, color: text, width: size, height: size, fontSize }}
    >
      {grade.toUpperCase()}
    </span>
  );
}
