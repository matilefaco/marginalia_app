import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface PageErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const PageError: React.FC<PageErrorProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 px-6 text-center space-y-5 animate-fade-in">
      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-600">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md">
        <h3 className="font-serif italic text-lg text-[#1C1916] font-bold">Ocorreu um desvio inesperado</h3>
        <p className="text-xs font-sans text-[#3D3D3D] leading-relaxed">
          {error?.message || "Não conseguimos sintonizar os registros poéticos desta seção no momento."}
        </p>
      </div>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="bg-[#1C1916] hover:bg-stone-800 text-[#FAF8F3] font-sans font-semibold text-xs py-2 px-4 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Tentar Novamente</span>
        </button>
      )}
    </div>
  );
};

export default PageError;
