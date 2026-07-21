import React from "react";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4 animate-fade-in">
      <div className="p-3.5 bg-[#BDAB9C]/10 border border-[#BDAB9C]/30 rounded-full text-[#BDAB9C]">
        <BookOpen className="w-6 h-6" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h4 className="font-serif italic text-base font-bold text-[#1C1916]">{title}</h4>
        <p className="text-xs font-sans text-[#3D3D3D] leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-[#1C1916] hover:bg-stone-800 text-[#FAF8F3] text-xs font-sans font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
