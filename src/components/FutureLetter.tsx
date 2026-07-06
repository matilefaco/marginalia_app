import React, { useRef, useState, useEffect } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { Download, Mail, Star, Sparkles, Send, Check } from "lucide-react";
import { UserProfile, Margem } from "../types";

interface FutureLetterProps {
  userProfile: UserProfile;
  margens: Margem[];
}

export const FutureLetter: React.FC<FutureLetterProps> = ({ userProfile, margens }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPastMargin, setSelectedPastMargin] = useState<Margem | null>(null);

  // Filter margins belonging to the user
  const userMargins = margens.filter(
    (m) => m.authorAvatar === userProfile.avatarSeed || m.authorName === userProfile.name
  );

  useEffect(() => {
    if (userMargins.length > 0) {
      // Choose a deterministic margin (first one or based on profile name length)
      const index = (userProfile.name?.length || 0) % userMargins.length;
      setSelectedPastMargin(userMargins[index]);
    }
  }, [margens, userProfile]);

  const handleSaveResponse = () => {
    if (!response.trim()) return;
    try {
      const stored = localStorage.getItem("marginalia_future_letter_responses") || "[]";
      const parsed = JSON.parse(stored);
      parsed.push({
        margemId: selectedPastMargin?.id || "future-seed",
        response,
        date: new Date().toISOString()
      });
      localStorage.setItem("marginalia_future_letter_responses", JSON.stringify(parsed));
      setSubmitted(true);
    } catch (e) {
      console.error("Failed to save response:", e);
    }
  };

  const handleExport = async () => {
    if (!containerRef.current || exporting) return;
    setExporting(true);

    try {
      await exportNodeAsPng(
        containerRef.current,
        "marginalia-carta-do-futuro"
      );
    } catch (err) {
      console.error("Erro ao exportar Carta:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
      {/* Visual letter / envelope layout */}
      <div 
        ref={containerRef}
        className="bg-[#FAF8F3] border border-[#1C1916] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between aspect-square md:aspect-video text-left"
      >
        <div className="absolute inset-0 tactile-overlay opacity-30 pointer-events-none" />
        <div className="absolute top-3 right-4 flex items-center gap-1 opacity-40">
          <Mail className="w-3.5 h-3.5 text-[#1C1916]" />
          <span className="text-[8px] font-mono tracking-widest uppercase">CORRESPONDÊNCIA ÍNTIMA</span>
        </div>

        {selectedPastMargin ? (
          <div className="space-y-4 my-auto">
            <span className="text-[9px] font-mono tracking-wider text-[#BDAB9C] uppercase block font-semibold">
              UM PENSAMENTO SEU ESCRITO HÁ 30 DIAS
            </span>
            
            <div className="space-y-1.5 border-l-2 border-[#C5A880]/60 pl-3">
              <p className="font-serif italic text-stone-800 text-xs md:text-sm">
                "{selectedPastMargin.quote}"
              </p>
              <span className="text-[9px] font-mono text-[#BDAB9C] uppercase block">
                {selectedPastMargin.bookTitle}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[8.5px] font-mono text-[#C5A880] tracking-wider uppercase block font-semibold">
                SEU SENTIMENTO ANOTADO NA ÉPOCA
              </span>
              <p className="font-sans text-xs text-[#1C1916] leading-relaxed font-light italic">
                "{selectedPastMargin.thought}"
              </p>
            </div>

            <div className="pt-2 border-t border-[#BDAB9C]/10">
              <p className="text-[10.5px] font-serif italic text-amber-900 leading-relaxed font-semibold">
                "Essa frase ainda te encontra, ou você já se despediu dela?"
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 my-auto text-center py-4">
            <div className="w-10 h-10 rounded-full bg-[#BDAB9C]/10 flex items-center justify-center mx-auto mb-2 border border-[#BDAB9C]/30">
              <Mail className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h4 className="font-serif italic text-base text-[#1C1916] font-semibold">
              Escreva hoje uma margem para o futuro
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
              Adicione pensamentos ao seu livro preferido no feed. Em algumas semanas, nós te lembraremos desse rastro emocional para ver como sua alma mudou.
            </p>
          </div>
        )}

        {/* Brand signoff for export */}
        <div className="text-center pt-2 border-t border-[#BDAB9C]/10 mt-2">
          <span className="text-[7.5px] font-mono tracking-widest text-[#BDAB9C]/70 uppercase block">
            CONVERSAS COM SEU EU DO PASSADO · MARGINALIA.APP
          </span>
        </div>
      </div>

      {/* Control Actions / Repliers - NO EXPORT */}
      {selectedPastMargin && !submitted && (
        <div className="no-export space-y-2">
          <label className="text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider block">
            Escrever Resposta ao seu Eu Antigo
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="O que mudou em você desde essa leitura?"
              className="flex-1 bg-[#FAF8F3] border border-[#BDAB9C]/60 rounded-lg px-3 py-1.5 text-xs text-[#1C1916] focus:outline-hidden focus:border-[#1C1916] transition-all"
            />
            <button
              onClick={handleSaveResponse}
              className="bg-[#1C1916] text-[#FAF8F3] hover:bg-stone-800 p-2 rounded-lg cursor-pointer flex items-center justify-center transition-colors shadow-xs"
              title="Salvar resposta"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="no-export bg-green-50/50 border border-green-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-green-800 font-sans font-medium">
          <Check className="w-4 h-4 text-green-700 flex-shrink-0" />
          <span>Sua resposta foi selada e guardada na sua cápsula do tempo local.</span>
        </div>
      )}

      <div className="no-export flex justify-end gap-2 pt-1 border-t border-[#BDAB9C]/10">
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="text-[10px] font-sans font-semibold text-stone-800 hover:text-[#1C1916] flex items-center gap-1 bg-[#BDAB9C]/15 px-3 py-1.5 rounded-lg border border-[#BDAB9C]/30 cursor-pointer transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{exporting ? "Compilando..." : "Exportar Carta"}</span>
        </button>
      </div>
    </div>
  );
};
