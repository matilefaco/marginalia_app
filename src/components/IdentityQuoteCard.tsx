import React, { useRef, useState } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { RefreshIcon, ExportIcon } from "./icons/MarginaliaIcons";
import { UserProfile, Margem } from "../types";
import { generateIdentityQuote } from "../utils/identityText";

interface IdentityQuoteCardProps {
  userProfile: UserProfile;
  margens: Margem[];
}

export const IdentityQuoteCard: React.FC<IdentityQuoteCardProps> = ({ userProfile, margens }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [variation, setVariation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const safeProfile = userProfile || {} as UserProfile;
  const activeQuote = generateIdentityQuote(safeProfile, margens, variation);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${activeQuote}" — @${safeProfile.username || "marginalia"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);

    try {
      await exportNodeAsPng(
        cardRef.current,
        `marginalia-frase-${safeProfile.username || "usuario"}`
      );
    } catch (err) {
      console.error("Erro ao exportar card de frase:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleRegenerate = () => {
    setVariation((prev) => prev + 1);
  };

  return (
    <div className="elevation-2 p-5 rounded-2xl space-y-4">
      {/* Visual Exportable area */}
      <div 
        ref={cardRef} 
        className="bg-[#FAF8F3] border-2 border-[#1C1916] rounded-xl p-8 relative overflow-hidden flex flex-col justify-between aspect-[4/3] md:aspect-video text-center group"
      >
        {/* Decorative Watermark for background export */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-[0.03]">
          <span className="font-serif italic text-6xl tracking-widest text-[#1C1916]">Marginalia</span>
        </div>

        {/* Vintage Frame borders */}
        <div className="absolute inset-3 border border-[#BDAB9C]/20 pointer-events-none rounded-lg" />

        {/* Top Header */}
        <div className="z-10 flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-mono tracking-wide text-[#BDAB9C] uppercase font-bold">
            INSCRIÇÃO DE ALMA LITERÁRIA
          </span>
          <div className="w-8 h-[1px] bg-[#BDAB9C]/40" />
        </div>

        {/* Center Quote */}
        <div className="z-10 px-4 md:px-8 my-auto">
          <p className="font-serif italic text-[17px] md:text-[21px] leading-relaxed text-[#1C1916] font-medium">
            “{activeQuote}”
          </p>
        </div>

        {/* Bottom Signature */}
        <div className="z-10 flex flex-col items-center gap-1">
          <span className="font-sans text-[13px] font-bold text-[#1C1916]">
            @{safeProfile.username || "leitor_marginalia"}
          </span>
          <span className="text-[10px] font-mono tracking-wide text-[#BDAB9C] uppercase">
            {safeProfile.dominantArchetype || safeProfile.title || "Membro Contemplativo"}
          </span>
        </div>
      </div>

      {/* Control Actions - NO EXPORT */}
      <div className="no-export flex flex-wrap justify-between items-center gap-2 pt-1">
        <button 
          onClick={handleRegenerate}
          className="text-xs font-sans font-semibold text-stone-850 hover:text-[#1C1916] flex items-center gap-1.5 bg-[#BDAB9C]/10 px-3 py-2 rounded-xl border border-[#BDAB9C]/20 cursor-pointer transition-colors"
        >
          <RefreshIcon className="w-3.5 h-3.5" />
          <span>Reescrever Caminho</span>
        </button>

        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="text-xs font-sans font-semibold text-stone-850 hover:text-[#1C1916] flex items-center gap-1.5 bg-[#BDAB9C]/10 px-3 py-2 rounded-xl border border-[#BDAB9C]/20 cursor-pointer transition-colors"
          >
            {copied ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-700 font-bold"><path d="M20 6 9 17l-5-5"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            )}
            <span>{copied ? "Guardado!" : "Guardar"}</span>
          </button>
          
          <button 
            onClick={handleExport}
            disabled={exporting}
            className="text-xs font-sans font-semibold bg-[#1C1916] text-[#FAF8F3] hover:bg-stone-800 flex items-center gap-1.5 px-4 py-2 rounded-xl shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            <ExportIcon className="w-3.5 h-3.5" />
            <span>{exporting ? "Invocando..." : "Revelar Cartão"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
