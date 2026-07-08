import React from "react";
import { MarginaliaMark } from "./MarginaliaMark";

interface MarginaliaLogoProps {
  variant?: "mark" | "wordmark" | "lockup" | "vertical-lockup" | "watermark";
  size?: number; // size of the mark
  textColor?: string;
  className?: string;
  tagline?: boolean;
}

export const MarginaliaLogo: React.FC<MarginaliaLogoProps> = ({
  variant = "lockup",
  size = 24,
  textColor = "text-[#1C1916]",
  className = "",
  tagline = false,
}) => {
  const brandColor = "#C5895A";

  if (variant === "mark") {
    return <MarginaliaMark size={size} dotColor={brandColor} className={className} />;
  }

  if (variant === "wordmark") {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className={`font-display font-bold tracking-[0.25em] uppercase text-sm md:text-base ${textColor}`}>
          Marginalia
        </span>
        {tagline && (
          <span className="font-serif italic text-[10px] text-stone-500 tracking-wide mt-0.5">
            o que fica em você
          </span>
        )}
      </div>
    );
  }

  if (variant === "vertical-lockup") {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <div className="p-3 bg-[#FAF8F3] rounded-2xl shadow-xs border border-[#BDAB9C]/25">
          <MarginaliaMark size={size * 1.5} dotColor={brandColor} />
        </div>
        <div className="flex flex-col">
          <span className={`font-display font-bold tracking-[0.3em] uppercase text-base md:text-lg ${textColor}`}>
            Marginalia
          </span>
          <span className="font-serif italic text-[11px] text-[#3D3D3D]/75 mt-0.5">
            o que fica em você
          </span>
        </div>
      </div>
    );
  }

  if (variant === "watermark") {
    return (
      <div className={`flex items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity ${className}`}>
        <MarginaliaMark size={14} strokeWidth={2.8} dotColor={brandColor} color="currentColor" />
        <span className="font-display text-[10px] tracking-[0.18em] uppercase font-semibold text-current">
          Marginalia • o que fica em você
        </span>
      </div>
    );
  }

  // default: horizontal lockup
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <MarginaliaMark size={size} dotColor={brandColor} />
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold tracking-[0.22em] uppercase text-sm md:text-base ${textColor}`}>
          Marginalia
        </span>
        {tagline && (
          <span className="font-serif italic text-[9.5px] text-[#3D3D3D]/70 tracking-wide mt-1">
            o que fica em você
          </span>
        )}
      </div>
    </div>
  );
};
