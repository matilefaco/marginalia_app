import React from "react";
import { Sparkle, Flame, Hourglass, Feather, Download, Check } from "lucide-react";
import { UserProfile } from "../../../types";
import { OnboardingGenerationState } from "../types";
import { EchoIcon } from "../../../components/icons/MarginaliaIcons";

interface GeneratedProfileCardProps {
  safeProfile: UserProfile;
  onboardingGenerationState: OnboardingGenerationState;
  downloadSuccess: boolean;
  downloadAuraError: string | null;
  downloadingAura: boolean;
  handleDownloadAura: () => void;
  handleConfirmProfile: () => void;
  onboardingCardRef: React.RefObject<HTMLDivElement | null>;
}

export const GeneratedProfileCard: React.FC<GeneratedProfileCardProps> = ({
  safeProfile,
  onboardingGenerationState,
  downloadSuccess,
  downloadAuraError,
  downloadingAura,
  handleDownloadAura,
  handleConfirmProfile,
  onboardingCardRef
}) => {
  return (
    <div className="space-y-6 animate-page-turn">
      <div 
        ref={onboardingCardRef}
        className="p-10 md:p-12 rounded-2xl text-center border relative overflow-hidden journal-shadow bg-[#1C1916] border-[#1C1916] text-[#FAF8F3] flex flex-col items-center justify-center"
        style={{ 
          boxShadow: `0 20px 40px -15px ${safeProfile.aestheticColor || "#BDAB9C"}35`
        }}
      >
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#FAF8F3]/30" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#FAF8F3]/30" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#FAF8F3]/30" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#FAF8F3]/30" />

        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
          style={{
            background: `radial-gradient(circle at center, ${safeProfile.aestheticColor || "#BDAB9C"} 0%, transparent 70%)`
          }}
        />

        <div className="relative z-10 space-y-5 w-full">
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#FAF8F3]/50 uppercase">
              M A R G I N A L I A
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase font-semibold">
              {onboardingGenerationState === "error" ? "INTERPRETAÇÃO LOCAL" : "AURA LITERÁRIA"} • @{safeProfile.username}
            </span>
          </div>

          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2 transition-transform duration-500 hover:scale-105" 
            style={{ 
              borderColor: "#C5895A",
              boxShadow: `0 0 15px #C5895A35`
            }}
          >
            {safeProfile.aestheticSymbol?.toLowerCase()?.includes("flor") ? (
              <Sparkle className="w-8 h-8" style={{ color: safeProfile.aestheticColor }} />
            ) : safeProfile.aestheticSymbol?.toLowerCase()?.includes("lamp") || safeProfile.aestheticSymbol?.toLowerCase()?.includes("chama") ? (
              <Flame className="w-8 h-8 animate-pulse" style={{ color: safeProfile.aestheticColor }} />
            ) : safeProfile.aestheticSymbol?.toLowerCase()?.includes("ampulheta") ? (
              <Hourglass className="w-8 h-8" style={{ color: safeProfile.aestheticColor }} />
            ) : (
              <Feather className="w-8 h-8" style={{ color: safeProfile.aestheticColor }} />
            )}
          </div>

          <div className="space-y-1">
            <h4 className="font-serif italic text-3xl font-semibold text-[#FAF8F3] tracking-tight">
              {safeProfile.title}
            </h4>
            <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-widest">
              Símbolo: {safeProfile.aestheticSymbol || "Pena de Ganso"}
            </p>
          </div>

          <div className="py-2">
            <p className="font-serif text-sm leading-relaxed text-[#FAF8F3]/90 max-w-sm mx-auto italic">
              "{safeProfile.description}"
            </p>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-[1px] bg-[#FAF8F3]/20" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#FAF8F3]/40">ASSINATURA</span>
            <div className="w-12 h-[1px] bg-[#FAF8F3]/20" />
          </div>

          <div className="space-y-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
            <p className="font-serif italic text-base text-[#FAF8F3] font-medium leading-relaxed">
              {safeProfile.signatureQuote}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider">ECOS SINTONIZADOS</p>
            <div className="flex flex-wrap justify-center gap-2">
              {safeProfile.recommendedEcos?.map((eco) => (
                <span 
                  key={eco}
                  className="px-3 py-1 rounded-full text-[10px] font-sans font-medium bg-[#FAF8F3]/10 border border-[#FAF8F3]/20 text-[#FAF8F3] flex items-center gap-1"
                >
                  <EchoIcon size={10} className="text-[#FAF8F3]/70" /> {eco}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 text-[10px] font-mono tracking-widest text-[#FAF8F3]/50 uppercase flex items-center justify-center gap-1.5">
            <span className="text-[#C5895A]">★</span> marginalia.app • o que fica em você
          </div>
        </div>
      </div>

      {onboardingGenerationState === "error" && (
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-xs font-sans text-amber-900 leading-relaxed">
          A análise mais aprofundada da inteligência artificial não pôde ser concluída no momento. Apresentamos uma <strong>interpretação inicial criada localmente</strong> com base nos dados que você forneceu.
        </div>
      )}

      {downloadSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-xs font-sans text-emerald-700 animate-pulse">
          {onboardingGenerationState === "error" ? "Perfil exportado!" : "Aura Literária exportada!"} Poste nos stories do Instagram com <strong>#Marginalia</strong> para encontrar seus pares.
        </div>
      )}

      {downloadAuraError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-xs font-sans text-red-700">
          Ocorreu um erro: {downloadAuraError}
        </div>
      )}

      <div className="space-y-2 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleDownloadAura}
            disabled={downloadingAura}
            className="w-full border-2 border-[#1C1916] hover:bg-[#1C1916]/5 text-[#1C1916] py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloadingAura ? "Preparando imagem para download…" : onboardingGenerationState === "error" ? "Compartilhar Perfil como Story" : "Compartilhar como Story"}</span>
          </button>

          <button
            onClick={handleConfirmProfile}
            className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
          >
            <span>{onboardingGenerationState === "error" ? "Salvar Perfil & Entrar" : "Salvar Aura & Entrar"}</span>
            <Check className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-center text-[10px] font-mono text-[#BDAB9C] uppercase tracking-wider">
          Esse arquétipo ditará o estilo das suas análises e reverberará nos seus Ecos
        </p>
      </div>
    </div>
  );
};
