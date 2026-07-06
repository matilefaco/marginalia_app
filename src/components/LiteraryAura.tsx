import React, { useRef, useState } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { Sparkles, Download, Copy, Check, Star, Moon, Compass, Library } from "lucide-react";
import { UserProfile, Margem, AuraData } from "../types";
import { generateIdentityQuote } from "../utils/identityText";

interface LiteraryAuraProps {
  userProfile: UserProfile;
  margens: Margem[];
}

export const LiteraryAura: React.FC<LiteraryAuraProps> = ({ userProfile, margens }) => {
  const auraRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter margins written by user
  const userMargins = margens.filter(
    (m) => m.authorAvatar === userProfile.avatarSeed || m.authorName === userProfile.name
  );

  // Compute or fallback aura attributes
  const computeAuraData = (): AuraData => {
    // Default emotions fallback
    const defaultEmotions: Record<string, number> = {
      "Solidão Bonita": 38,
      "Nostalgia do Tempo": 27,
      "Crises Existenciais": 21,
      "Esperança Atenta": 14,
    };

    // Calculate real proportions based on margins
    const computed: Record<string, number> = {};
    if (userMargins.length > 0) {
      userMargins.forEach((m) => {
        // Find if any book highlights or emotion keywords match
        const text = (m.thought + " " + m.quote).toLowerCase();
        let matched = false;
        if (text.includes("solidão") || text.includes("só") || text.includes("solitude")) {
          computed["Solidão Bonita"] = (computed["Solidão Bonita"] || 0) + 1;
          matched = true;
        }
        if (text.includes("nostalgia") || text.includes("passado") || text.includes("tempo") || text.includes("antigo")) {
          computed["Nostalgia do Tempo"] = (computed["Nostalgia do Tempo"] || 0) + 1;
          matched = true;
        }
        if (text.includes("exist") || text.includes("vazio") || text.includes("sentido") || text.includes("por que")) {
          computed["Crises Existenciais"] = (computed["Crises Existenciais"] || 0) + 1;
          matched = true;
        }
        if (text.includes("esperança") || text.includes("luz") || text.includes("beleza") || text.includes("recomeço")) {
          computed["Esperança Atenta"] = (computed["Esperança Atenta"] || 0) + 1;
          matched = true;
        }
        if (!matched) {
          computed["Silêncio Elegante"] = (computed["Silêncio Elegante"] || 0) + 1;
        }
      });

      // Normalize to 100%
      const total = Object.values(computed).reduce((a, b) => a + b, 0);
      const normalized: Record<string, number> = {};
      let runningTotal = 0;
      const keys = Object.keys(computed);
      
      keys.forEach((key, idx) => {
        if (idx === keys.length - 1) {
          normalized[key] = 100 - runningTotal;
        } else {
          const val = Math.round((computed[key] / total) * 100);
          normalized[key] = val;
          runningTotal += val;
        }
      });
      return {
        emotions: normalized,
        archetype: userProfile.dominantArchetype || userProfile.title || "Leitor Contemplativo",
        themes: userProfile.favoriteAtmospheres || ["Claridade nas frestas", "Biblioteca Silenciosa"],
        symbol: userProfile.aestheticSymbol || "Lamparina de Prata",
        phrase: generateIdentityQuote(userProfile, margens, 0),
      };
    }

    // Default return
    return {
      emotions: defaultEmotions,
      archetype: userProfile.dominantArchetype || userProfile.title || "Buscador de Silêncios",
      themes: userProfile.favoriteAtmospheres || ["Páginas envelhecidas", "Chuva de fim de tarde"],
      symbol: userProfile.aestheticSymbol || "Lamparina de Prata",
      phrase: generateIdentityQuote(userProfile, margens, 0),
    };
  };

  const aura = computeAuraData();

  const handleExport = async () => {
    if (!auraRef.current || exporting) return;
    setExporting(true);

    try {
      await exportNodeAsPng(
        auraRef.current,
        `marginalia-aura-${userProfile.username || "usuario"}`
      );
    } catch (err) {
      console.error("Erro ao exportar Aura:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleCopyPhrase = () => {
    navigator.clipboard.writeText(`"${aura.phrase}" — Minha Aura no Marginalia`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Aura Card - Styled vertically like an artistic poster */}
      <div 
        ref={auraRef}
        className="bg-[#1C1916] text-[#FAF8F3] border border-[#BDAB9C]/20 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col justify-between p-8 md:p-12 aspect-[9/16] max-w-sm mx-auto"
      >
        {/* Celestial aesthetic gradients and overlays */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient opacity-10" />
        
        {/* Soft, beautiful color blob in background reflecting aestheticColor */}
        <div 
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-20 transition-all duration-1000"
          style={{ backgroundColor: userProfile.aestheticColor || "#C5A880" }}
        />
        <div 
          className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full blur-3xl opacity-15 transition-all duration-1000"
          style={{ backgroundColor: userProfile.aestheticColor || "#9C8A7D" }}
        />

        {/* Vintage corner guidelines */}
        <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-[#BDAB9C]/40">AURA</div>
        <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-[#BDAB9C]/40">Nº {userMargins.length}</div>
        <div className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-[#BDAB9C]/40">SINTONIA</div>
        <div className="absolute bottom-4 right-4 text-[9px] font-mono tracking-widest text-[#BDAB9C]/40">M R G N L</div>

        {/* Top Header */}
        <div className="z-10 text-center space-y-2 mt-4">
          <span className="text-[9px] font-mono tracking-widest text-[#C5A880] uppercase font-semibold">
            MAPA DE SINTONIZAÇÃO INTERIOR
          </span>
          <h2 className="font-serif italic text-2xl md:text-3xl font-medium text-amber-100/90 tracking-wide">
            Sua Aura Literária
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto" />
        </div>

        {/* Core Aura Orb Visual */}
        <div className="z-10 flex flex-col items-center my-6 relative py-4">
          <div 
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border border-dashed border-[#C5A880]/40 flex items-center justify-center relative animate-spin-slow"
          >
            <div className="absolute inset-2 rounded-full border border-[#C5A880]/20" />
            <div 
              className="absolute inset-4 rounded-full filter blur-xl opacity-80 mix-blend-screen transition-all duration-1000 animate-pulse"
              style={{ backgroundColor: userProfile.aestheticColor || "#C5A880" }}
            />
            {/* Center Symbol */}
            <div className="z-20 text-[#FAF8F3]/90 transform -rotate-180">
              {aura.symbol === "Lamparina" || aura.symbol === "Lamparina de Prata" ? <Moon className="w-8 h-8 text-amber-100" /> : 
               aura.symbol === "Ampulheta" ? <Compass className="w-8 h-8 text-amber-100" /> :
               <Library className="w-8 h-8 text-amber-100" />}
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#BDAB9C] tracking-widest uppercase mt-4 block">
            {aura.archetype}
          </span>
        </div>

        {/* Emotions Proportions List */}
        <div className="z-10 space-y-3.5 px-3">
          {Object.entries(aura.emotions).map(([emotion, val]) => (
            <div key={emotion} className="space-y-1">
              <div className="flex justify-between items-end text-xs">
                <span className="font-sans font-medium text-[#FAF8F3]/85 flex items-center gap-1.5">
                  <Star className="w-2.5 h-2.5 text-[#C5A880]/70" />
                  {emotion}
                </span>
                <span className="font-mono text-[10px] text-[#BDAB9C]">{val}%</span>
              </div>
              <div className="w-full h-[1px] bg-[#FAF8F3]/10 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#C5A880]" 
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Signature Quote & Branding Footer */}
        <div className="z-10 space-y-4 text-center mt-6 mb-4 px-2">
          <p className="font-serif italic text-xs md:text-sm leading-relaxed text-[#DCD5CD]">
            "{aura.phrase}"
          </p>
          
          <div className="space-y-1 pt-3 border-t border-[#BDAB9C]/15">
            <p className="font-sans text-xs font-semibold tracking-wide text-[#FAF8F3]/95">
              @{userProfile.username || "leitor_marginalia"}
            </p>
            <p className="text-[7.5px] font-mono tracking-widest text-[#BDAB9C] uppercase">
              ORGANIZANDO EMOÇÕES · MARGINALIA.APP
            </p>
          </div>
        </div>
      </div>

      {/* Control Buttons (no-export) */}
      <div className="no-export flex flex-wrap justify-center gap-3">
        <button 
          onClick={handleCopyPhrase}
          className="text-xs font-sans font-semibold text-stone-800 hover:text-[#1C1916] flex items-center gap-1.5 bg-[#FAF8F3] hover:bg-stone-50 px-4 py-2 rounded-xl border border-[#BDAB9C]/30 shadow-xs cursor-pointer transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Frase Copiada!" : "Copiar Frase Signature"}</span>
        </button>

        <button 
          onClick={handleExport}
          disabled={exporting}
          className="text-xs font-sans font-semibold bg-[#1C1916] text-[#FAF8F3] hover:bg-stone-800 flex items-center gap-1.5 px-4.5 py-2 rounded-xl shadow-md cursor-pointer disabled:opacity-50 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{exporting ? "Gerando Aura..." : "Exportar para Stories (PNG)"}</span>
        </button>
      </div>
    </div>
  );
};
