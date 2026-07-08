import React from "react";
import { MarginaliaMark } from "./MarginaliaMark";

interface BrandSealProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export const BrandSeal: React.FC<BrandSealProps> = ({
  className = "",
  size = "md",
  dark = false,
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-[8px] gap-1",
    md: "px-3.5 py-1.5 text-[9.5px] gap-1.5",
    lg: "px-4.5 py-2 text-[11px] gap-2",
  };

  const borderClass = dark 
    ? "border-[#FAF8F3]/15 bg-[#1C1916]/60 text-[#FAF8F3] backdrop-blur-xs" 
    : "border-[#1C1916]/10 bg-[#FAF8F3]/80 text-[#1C1916] backdrop-blur-xs";

  return (
    <div 
      className={`inline-flex items-center rounded-full border font-sans tracking-wide select-none ${sizeClasses[size]} ${borderClass} ${className}`}
    >
      <MarginaliaMark 
        size={size === "sm" ? 11 : size === "md" ? 13 : 15} 
        dotColor="#C5895A" 
        color="currentColor" 
        strokeWidth={3.5}
        className="opacity-95"
      />
      <span className="font-display tracking-[0.15em] font-semibold uppercase">Marginalia</span>
      <span className="opacity-50 text-[0.9em]">•</span>
      <span className="opacity-80 text-[0.9em] italic font-serif">o que fica em você</span>
    </div>
  );
};
