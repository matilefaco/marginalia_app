import React from "react";

interface MarginaliaWordmarkProps {
  className?: string;
  textColor?: string;
  tagline?: boolean;
}

export const MarginaliaWordmark: React.FC<MarginaliaWordmarkProps> = ({
  className = "",
  textColor = "text-[#1C1916]",
  tagline = false,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`font-display font-bold tracking-[0.25em] uppercase text-sm md:text-base ${textColor}`}>
        Marginalia
      </span>
      {tagline && (
        <span className="font-serif italic text-[10px] text-[#3D3D3D]/70 tracking-wide mt-0.5">
          o que fica em você
        </span>
      )}
    </div>
  );
};
