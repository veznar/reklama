import React from "react";

/**
 * Стилизованный знак «Л» (Лобачевский) — фирменный синий квадрат,
 * белая монограмма и голубое подчёркивание в духе брендбука ННГУ.
 */
export const EmblemUnn: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" aria-hidden {...props}>
    <rect width="48" height="48" fill="#003DA6" />
    {/* правая вертикальная стойка «Л» */}
    <rect x="25.6" y="10.5" width="5.6" height="26" fill="#FFFFFF" />
    {/* верхняя перекладина */}
    <rect x="18.8" y="10.5" width="12.4" height="5.2" fill="#FFFFFF" />
    {/* левая наклонная стойка */}
    <path d="M18.8 10.5 L24.6 10.5 L18.2 36.5 L12.2 36.5 Z" fill="#FFFFFF" />
    {/* голубое подчёркивание */}
    <rect x="12.2" y="40" width="23.4" height="3.2" fill="#55BCE8" />
  </svg>
);
