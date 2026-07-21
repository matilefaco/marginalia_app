import React from "react";
import { ChevronRight } from "lucide-react";
import { OnboardingForm } from "../types";

interface LiteraryAffinitiesStepProps {
  form: OnboardingForm;
  onGenreToggle: (genre: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LiteraryAffinitiesStep: React.FC<LiteraryAffinitiesStepProps> = ({
  form,
  onGenreToggle,
  onPrev,
  onNext
}) => {
  const GENRES = [
    "Literatura Clássica", "Poesia e Lírica", "Filosofia", 
    "Realismo Mágico", "Fantasia Sombria", "Romance Histórico",
    "Ensaios Modernos", "Suspense Psicológico", "Ficção Científica"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Sua Afinidade das Palavras</h3>
        <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider leading-relaxed">
          Selecione as atmosferas e obsessões literárias que fazem sua mente se perder por horas.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        {GENRES.map((g) => {
          const isSelected = form.genres.includes(g);
          return (
            <button
              key={g}
              type="button"
              onClick={() => onGenreToggle(g)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected 
                  ? "bg-[#1C1916] border-[#1C1916] text-[#FAF8F3]" 
                  : "border-[#BDAB9C]/40 text-[#3D3D3D] hover:bg-[#BDAB9C]/10"
              }`}
            >
              <span className="text-xs font-sans block">{g}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={form.genres.length === 0}
          className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
        >
          <span>Livros de Origem</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
