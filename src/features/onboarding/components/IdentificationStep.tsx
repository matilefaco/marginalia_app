import React from "react";
import { ChevronRight } from "lucide-react";
import { OnboardingForm } from "../types";

interface IdentificationStepProps {
  form: OnboardingForm;
  onFormChange: (updates: Partial<OnboardingForm>) => void;
  onNext: () => void;
}

export const IdentificationStep: React.FC<IdentificationStepProps> = ({
  form,
  onFormChange,
  onNext
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <p className="font-serif italic text-base text-[#1C1916] leading-relaxed max-w-md mx-auto">
          "Não é sobre o que você leu. É sobre o que ficou em você."
        </p>
        <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-widest leading-relaxed">
          Descubra a forma da sua alma leitora e encontre sintonias invisíveis.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
            Como deseja ser chamado nesta jornada?
          </label>
          <input
            type="text"
            required
            placeholder="ex: Clarice Albuquerque"
            value={form.name}
            onChange={(e) => onFormChange({ name: e.target.value })}
            className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 px-1 text-[#1C1916] font-serif placeholder-[#BDAB9C] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
            Apelido Literário (@username)
          </label>
          <div className="relative">
            <span className="absolute left-1 top-2 text-[#BDAB9C] font-mono">@</span>
            <input
              type="text"
              required
              placeholder="clarice_l"
              value={form.username}
              onChange={(e) => onFormChange({ username: e.target.value.replace(/\s+/g, "").toLowerCase() })}
              className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 pl-6 pr-1 text-[#1C1916] font-mono placeholder-[#BDAB9C] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!form.name || !form.username}
        className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <span>Avançar para Afinidades Literárias</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
