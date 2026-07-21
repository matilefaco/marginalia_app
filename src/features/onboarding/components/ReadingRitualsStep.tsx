import React from "react";
import { Sparkles } from "lucide-react";
import { OnboardingForm } from "../types";
import { SpoilerLevel } from "../../../types";

interface ReadingRitualsStepProps {
  form: OnboardingForm;
  onFormChange: (updates: Partial<OnboardingForm>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrev: () => void;
}

export const ReadingRitualsStep: React.FC<ReadingRitualsStepProps> = ({
  form,
  onFormChange,
  onSubmit,
  onPrev
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Seus Rituais das Margens</h3>
        <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider leading-relaxed">
          Sua proximidade com as páginas. Deixe rastros da sua sensibilidade.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-1">
            Livros de cabeceira (Que moldaram sua sensibilidade)
          </label>
          <input
            type="text"
            placeholder="ex: Cem Anos de Solidão, O Mito de Sísifo"
            value={form.favoriteBooks}
            onChange={(e) => onFormChange({ favoriteBooks: e.target.value })}
            className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 px-1 text-[#1C1916] font-serif placeholder-[#BDAB9C]/70 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-1">
            Autores prediletos (Mentes que sussurram em seus pensamentos)
          </label>
          <input
            type="text"
            placeholder="ex: Gabriel García Márquez, Camus, Clarice Lispector"
            value={form.favoriteAuthors}
            onChange={(e) => onFormChange({ favoriteAuthors: e.target.value })}
            className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 px-1 text-[#1C1916] font-serif placeholder-[#BDAB9C]/70 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
            Qual atmosfera ideal para desfolhar páginas?
          </label>
          <select
            value={form.habits}
            onChange={(e) => onFormChange({ habits: e.target.value })}
            className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/60 rounded-lg p-2 text-xs font-sans text-[#1C1916] focus:outline-none focus:ring-1 focus:ring-[#BDAB9C]"
          >
            <option>Todas as noites antes de dormir</option>
            <option>Nos cafés tranquilos aos fins de semana</option>
            <option>Sempre que tenho um minuto livre no ônibus ou fila</option>
            <option>Em longas horas meditativas de silêncio e chuva</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
            Tolerância com Spoilers (Premium UX)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "none", label: "Não permito nada", desc: "Sempre borrado" },
              { key: "moderate", label: "Aceito leves", desc: "Aviso elegante" },
            ].map((tol) => (
              <button
                type="button"
                key={tol.key}
                onClick={() => onFormChange({ spoilerTolerance: tol.key as SpoilerLevel })}
                className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                  form.spoilerTolerance === tol.key 
                    ? "bg-[#1C1916]/10 border-[#1C1916] font-semibold" 
                    : "border-[#BDAB9C]/30 opacity-70"
                }`}
              >
                <p className="text-xs font-sans text-[#1C1916]">{tol.label}</p>
                <p className="text-[10px] font-sans opacity-60">{tol.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
        >
          <span>Revelar Aura Literária</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
