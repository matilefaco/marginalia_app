import React, { useRef, useState } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { Copy, Download, RefreshCw, Check, Sparkles } from "lucide-react";
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

  const activeQuote = generateIdentityQuote(userProfile, margens, variation);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${activeQuote}" — @${userProfile.username || "marginalia"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);

    try {
      await exportNodeAsPng(
        cardRef.current,
        `marginalia-frase-${userProfile.username || "usuario"}`
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
    <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
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
        <div className="z-10 flex flex-col items-center gap-1">
          <span className="text-[9px] font-mono tracking-widest text-[#BDAB9C] uppercase">
            A FRASE QUE DEFINE SUA ALMA
          </span>
          <div className="w-6 h-[1px] bg-[#BDAB9C]/40" />
        </div>

        {/* Center Quote */}
        <div className="z-10 px-4 md:px-8 my-auto">
          <p className="font-serif italic text-base md:text-xl leading-relaxed text-[#1C1916] font-medium font-semibold">
            "{activeQuote}"
          </p>
        </div>

        {/* Bottom Signature */}
        <div className="z-10 flex flex-col items-center gap-1">
          <span className="font-sans text-xs font-semibold text-[#1C1916]">
            @{userProfile.username || "leitor_marginalia"}
          </span>
          <span className="text-[8px] font-mono tracking-wide text-[#BDAB9C] uppercase">
            {userProfile.dominantArchetype || userProfile.title || "Membro Contemplativo"}
          </span>
        </div>
      </div>

      {/* Control Actions - NO EXPORT */}
      <div className="no-export flex flex-wrap justify-between items-center gap-2 pt-1">
        <button 
          onClick={handleRegenerate}
          className="text-[10px] font-sans font-semibold text-stone-800 hover:text-[#1C1916] flex items-center gap-1.5 bg-[#BDAB9C]/10 px-3 py-1.5 rounded-lg border border-[#BDAB9C]/20 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Outro Caminho</span>
        </button>

        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="text-[10px] font-sans font-semibold text-stone-800 hover:text-[#1C1916] flex items-center gap-1.5 bg-[#BDAB9C]/10 px-3 py-1.5 rounded-lg border border-[#BDAB9C]/20 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copiado!" : "Copiar"}</span>
          </button>
          
          <button 
            onClick={handleExport}
            disabled={exporting}
            className="text-[10px] font-sans font-semibold bg-[#1C1916] text-[#FAF8F3] hover:bg-stone-800 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? "Criando..." : "Exportar PNG"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
