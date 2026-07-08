import React, { useRef, useState } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { HeartIcon, ExportIcon } from "./icons/MarginaliaIcons";
import { MarginaliaMark } from "./branding/MarginaliaMark";
import { UserProfile, Margem } from "../types";
import { calculateCompatibility, MOCK_COMPATIBLE_READERS } from "../utils/compatibility";

interface LiteraryCompatibilityProps {
  userProfile: UserProfile;
  margens: Margem[];
}

export const LiteraryCompatibility: React.FC<LiteraryCompatibilityProps> = ({ userProfile, margens }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [exporting, setExporting] = useState(false);

  const otherUser = MOCK_COMPATIBLE_READERS[selectedIndex];
  const compatibility = calculateCompatibility(userProfile, otherUser);

  const handleExport = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);

    try {
      await exportNodeAsPng(
        cardRef.current,
        `marginalia-compatibilidade-${userProfile.username || "usuario"}-${otherUser.username}`
      );
    } catch (err) {
      console.error("Erro ao exportar Compatibilidade:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-5">
      {/* Selector of other profiles (no-export) */}
      <div className="no-export space-y-2">
        <label className="text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider block">
          Selecionar Perfil para Sintonizar
        </label>
        <div className="grid grid-cols-3 gap-2">
          {MOCK_COMPATIBLE_READERS.map((reader, idx) => (
            <button
              key={reader.username}
              onClick={() => setSelectedIndex(idx)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-sans font-semibold transition-all cursor-pointer text-center flex flex-col items-center gap-1 ${
                selectedIndex === idx
                  ? "bg-[#1C1916] text-[#FAF8F3] border-[#1C1916]"
                  : "bg-[#FAF8F3] text-stone-700 border-[#BDAB9C]/40 hover:border-[#1C1916]"
              }`}
            >
              <span className="truncate max-w-full">@{reader.username}</span>
              <span className="text-[8px] opacity-60 font-mono truncate max-w-full">{reader.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Exportable dual-sided story card */}
      <div 
        ref={cardRef}
        className="bg-[#FAF8F3] border-2 border-[#C5895A] rounded-xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between aspect-square md:aspect-[4/3] text-center"
      >
        {/* Subtle texture layout */}
        <div className="absolute inset-0 tactile-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-2 border border-[#C5895A]/20 rounded-lg pointer-events-none" />

        {/* Top Header */}
        <div className="z-10 text-center space-y-1">
          <span className="text-[9px] font-mono tracking-widest text-[#C5895A] uppercase block font-semibold">
            AFINIDADE ENTRE ALMAS LEITORAS
          </span>
          <div className="w-8 h-[1px] bg-[#C5895A]/40 mx-auto" />
        </div>

        {/* Dual Avatars and Large Score */}
        <div className="z-10 flex items-center justify-center gap-8 md:gap-12 my-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-full bg-[#1C1916] text-[#FAF8F3] flex items-center justify-center font-display text-sm font-bold border-2 border-[#C5895A]">
              {userProfile.name?.charAt(0) || "U"}
            </div>
            <span className="text-[10px] font-mono text-[#3D3D3D]">@{userProfile.username || "voce"}</span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#C5895A]/10 rounded-full filter blur-md transform scale-125" />
            <div className="relative z-10 w-20 h-20 rounded-full border-2 border-[#1C1916] flex flex-col items-center justify-center bg-[#FAF8F3]">
              <span className="text-2xl font-serif font-black text-[#1C1916] leading-none">{compatibility.score}%</span>
              <span className="text-[8px] font-mono tracking-widest text-[#C5895A] uppercase font-bold mt-1">SINTONIA</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-full bg-stone-200 text-[#1C1916] flex items-center justify-center font-display text-sm font-bold border-2 border-[#C5895A]">
              {otherUser.name.charAt(0)}
            </div>
            <span className="text-[10px] font-mono text-[#3D3D3D]">@{otherUser.username}</span>
          </div>
        </div>

        {/* Motifs / Points of Overlap */}
        <div className="z-10 space-y-2 px-2 md:px-8 max-w-lg mx-auto">
          {compatibility.motifs.map((motif, i) => (
            <div key={i} className="flex items-center gap-2 justify-center text-[11px] md:text-xs text-stone-800">
              <HeartIcon size={12} className="text-[#C5895A] fill-[#C5895A] flex-shrink-0" />
              <p className="font-sans italic leading-relaxed text-center">{motif}</p>
            </div>
          ))}
        </div>

        {/* Conversation Starter */}
        <div className="z-10 pt-3 border-t border-[#BDAB9C]/20 max-w-md mx-auto">
          <p className="text-[10px] md:text-xs font-serif leading-relaxed text-[#3D3D3D] italic bg-[#BDAB9C]/5 py-2 px-3 rounded-lg border border-[#BDAB9C]/10">
            {compatibility.conversationStarter}
          </p>
        </div>

        {/* Branding footer */}
        <div className="z-10 text-center pt-2 pointer-events-none flex justify-center items-center gap-1.5">
          <MarginaliaMark size={9} dotColor="#C5895A" color="#BDAB9C" strokeWidth={3.5} className="opacity-80" />
          <span className="text-[8px] font-mono tracking-widest text-[#BDAB9C] uppercase font-sans font-medium">
            CONEXÕES SILENCIOSAS • MARGINALIA.APP
          </span>
        </div>
      </div>

      {/* Action Controls - NO EXPORT */}
      <div className="no-export flex justify-between items-center gap-2 pt-1">
        <span className="text-[10px] text-[#BDAB9C] font-mono">
          Comparado localmente
        </span>
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="text-[10px] font-sans font-semibold bg-[#1C1916] text-[#FAF8F3] hover:bg-stone-800 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer disabled:opacity-50 transition-all"
        >
          <ExportIcon size={14} />
          <span>{exporting ? "Criando..." : "Exportar Cartão de Afinidade"}</span>
        </button>
      </div>
    </div>
  );
};
