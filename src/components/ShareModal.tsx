import React, { useState } from "react";
import { X, Download, Share2, AlignLeft, AlignCenter, Sliders, Check, Eye, Minimize2, Sparkles } from "lucide-react";
import { Margem } from "../types";

interface ShareModalProps {
  margem: Margem;
  onClose: () => void;
}

interface ArtStyle {
  key: string;
  name: string;
  bgClass: string;
  textClass?: string;
  quoteClass: string;
  fontClass: string;
  borderClass: string;
  extraClass?: string;
  badgeText: string;
  decor?: React.ReactNode;
}

export default function ShareModal({ margem, onClose }: ShareModalProps) {
  const [selectedStyle, setSelectedStyle] = useState("parchment");
  const [aspect, setAspect] = useState<"square" | "story">("square");
  const [alignment, setAlignment] = useState<"left" | "center">("center");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [hasNoise, setHasNoise] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // 6 World-Class Aesthetic Presets (Fase 6 - Share Studio)
  const artStyles: ArtStyle[] = [
    {
      key: "parchment",
      name: "📜 Papel Envelhecido",
      bgClass: "bg-[#F7F1E3] text-[#3E2723]",
      quoteClass: "text-[#2D1B18] font-serif italic",
      fontClass: "font-serif",
      borderClass: "border-[#D8C49F]",
      badgeText: "Manuscrito Antigo",
      extraClass: "bg-[radial-gradient(#fcf8f0_1px,transparent_1px)] [background-size:16px_16px]",
      decor: <div className="absolute right-4 bottom-14 text-xs font-serif opacity-20 transform rotate-12">Bibliotheca</div>
    },
    {
      key: "typewriter",
      name: "⌨️ Máquina de Escrever",
      bgClass: "bg-[#F1F2F6] text-[#2F3542]",
      quoteClass: "text-[#1E272E] font-mono",
      fontClass: "font-mono",
      borderClass: "border-[#CED6E0] border-dashed",
      badgeText: "Edição Mecânica",
      extraClass: "bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:100%_24px]",
      decor: <div className="absolute top-4 right-4 text-[9px] font-mono bg-red-800 text-white px-1 py-0.5 rounded uppercase tracking-wider opacity-80 rotate-3">REPROVADO</div>
    },
    {
      key: "library",
      name: "🏛️ Biblioteca Antiga",
      bgClass: "bg-gradient-to-br from-[#1B3022] to-[#0F1E14] text-[#F3E9DC]",
      quoteClass: "text-[#F8F1E5] font-serif italic font-semibold",
      fontClass: "font-serif",
      borderClass: "border-[#C5A880] border-2",
      badgeText: "Coleção de Luxo",
      extraClass: "shadow-[inset_0_0_50px_rgba(0,0,0,0.6)]",
      decor: <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-[#C5A880]/15 pointer-events-none" />
    },
    {
      key: "notebook",
      name: "📓 Caderno de Viagem",
      bgClass: "bg-[#FCF6EC] text-[#5D4037]",
      quoteClass: "text-[#3E2723] font-serif italic",
      fontClass: "font-serif",
      borderClass: "border-[#EFE5D3]",
      badgeText: "Notas de Campo",
      extraClass: "bg-[linear-gradient(90deg,rgba(189,171,156,0.15)_1px,transparent_1px)] [background-size:20px_100%]",
      decor: <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-400/30" />
    },
    {
      key: "love_letter",
      name: "💌 Carta de Amor",
      bgClass: "bg-[#FDF6F6] text-[#6D4C41]",
      quoteClass: "text-[#4E342E] font-serif italic",
      fontClass: "font-serif",
      borderClass: "border-[#ECC4C4]",
      badgeText: "Diário do Coração",
      extraClass: "bg-[radial-gradient(#ecc4c4_0.8px,transparent_0.8px)] [background-size:12px_12px]",
      decor: <div className="absolute bottom-16 right-6 w-8 h-8 rounded-full bg-red-700/10 border border-red-700/30 flex items-center justify-center text-[10px] text-red-800 transform rotate-6">❤️</div>
    },
    {
      key: "minimalist",
      name: "📐 Edição Minimalista",
      bgClass: "bg-white text-black",
      quoteClass: "text-black font-sans font-normal tracking-tight leading-snug",
      fontClass: "font-sans",
      borderClass: "border-black border-[3px]",
      badgeText: "Design Moderno",
      extraClass: "tracking-tight",
      decor: <div className="absolute top-3 left-4 text-[9px] font-mono uppercase tracking-widest text-black/40">MARGINALIA / CH-04</div>
    }
  ];

  const currentStyle = artStyles.find((s) => s.key === selectedStyle) || artStyles[0];

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      `"${margem.quote}"\n\n— Margem: "${margem.thought}"\n(${margem.bookTitle}, por ${margem.author} | Criado no Marginalia)`
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSimulated = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Obra-prima exportada com sucesso!\n\nSeu cartão no formato "${aspect === "square" ? "Quadrado (Instagram/Feed)" : "Story/Pinterest"}" foi salvo como arte literária de altíssima definição.`);
    }, 1500);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-xs md:text-sm";
      case "lg": return "text-lg md:text-xl";
      default: return "text-sm md:text-base";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1916]/90 backdrop-blur-md animate-page-turn">
      <div className="w-full max-w-4xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl overflow-hidden journal-shadow flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]">
        
        {/* Share Card Canvas Preview */}
        <div className="flex-1 bg-[#1C1916]/10 p-4 md:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#BDAB9C]/30 overflow-y-auto">
          
          <div 
            id="share-card-container"
            className={`w-full relative rounded-xl p-8 relative journal-shadow transition-all duration-300 border ${
              currentStyle.bgClass
            } ${currentStyle.borderClass} ${currentStyle.extraClass} flex flex-col justify-between overflow-hidden ${
              aspect === "square" ? "max-w-xs md:max-w-md aspect-square" : "max-w-[310px] md:max-w-[340px] aspect-[9/16]"
            }`}
          >
            {/* Tactile Noise Paper Grain Overlay */}
            {hasNoise && <div className="absolute inset-0 pointer-events-none opacity-40 bg-repeat bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400')]" style={{ mixBlendMode: "overlay" }} />}
            
            {/* Decors */}
            {currentStyle.decor}

            {/* Top Frame Branding */}
            <div className="flex justify-between items-center opacity-60 font-mono text-[9px] tracking-widest uppercase">
              <span>MARGINALIA JOURNAL</span>
              <span>ESTILO: {currentStyle.badgeText}</span>
            </div>

            {/* Content Core Block */}
            <div className={`my-auto flex flex-col space-y-4 ${alignment === "center" ? "text-center" : "text-left"}`}>
              
              {/* Highlight Quote */}
              <div className="relative px-2">
                {selectedStyle !== "minimalist" && (
                  <span className="absolute -top-3 left-0 text-3xl opacity-20 font-serif">“</span>
                )}
                <p className={`${getFontSizeClass()} font-serif italic leading-relaxed ${currentStyle.quoteClass}`}>
                  {margem.quote}
                </p>
                {selectedStyle !== "minimalist" && (
                  <span className="absolute -bottom-5 right-0 text-3xl opacity-20 font-serif">”</span>
                )}
              </div>

              {/* Classic Book Divider */}
              <div className="flex justify-center py-1">
                <div className={`w-16 h-[1.5px] opacity-25 bg-current`} />
              </div>

              {/* Author's Personal Reflection */}
              <div className="font-serif">
                <p className="text-[12px] md:text-xs leading-relaxed italic opacity-90 pl-3 border-l-2 border-current/35">
                  "{margem.thought}"
                </p>
              </div>

              {/* Source Attribution Metadata */}
              <div className="pt-2">
                <p className="font-sans font-bold text-[11px] uppercase tracking-wider">
                  {margem.bookTitle}
                </p>
                <p className="font-sans text-[9px] opacity-65 tracking-widest">
                  {margem.author}
                </p>
              </div>
            </div>

            {/* Aesthetic Bottom Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-current border-opacity-15 font-mono text-[9px] opacity-50">
              <span>Reflexão de @{margem.authorAvatar || "leitor"}</span>
              <span className="tracking-widest uppercase font-sans font-medium">marginalia.app</span>
            </div>

          </div>

        </div>

        {/* Customization Control Hub */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between overflow-y-auto bg-[#FAF8F3]">
          <div>
            <div className="flex justify-between items-center mb-5">
              <div>
                <span className="text-[9px] font-sans text-[#BDAB9C] font-semibold tracking-widest uppercase block">Fase 6 — Share Studio</span>
                <h3 className="font-display font-semibold text-lg text-[#1C1916] tracking-tight">Estúdio de Arte</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-[#BDAB9C]/20 text-[#3D3D3D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preset Art styles selection (Fase 6) */}
            <div className="space-y-3 mb-5">
              <label className="text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider block">
                Variantes de Arte
              </label>
              <div className="grid grid-cols-2 gap-2">
                {artStyles.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSelectedStyle(s.key)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col transition-all ${
                      selectedStyle === s.key 
                        ? "border-[#1C1916] bg-[#1C1916]/5 ring-2 ring-[#1C1916]/10" 
                        : "border-[#BDAB9C]/30 hover:border-[#BDAB9C]/70"
                    }`}
                  >
                    <span className="text-[11px] font-semibold font-serif block">
                      {s.name}
                    </span>
                    <span className="text-[8.5px] font-mono opacity-50 uppercase tracking-tighter mt-1 block">
                      {s.badgeText}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio choice */}
            <div className="space-y-3 mb-5">
              <label className="text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider block">
                Tamanho & Redes Sociais
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAspect("square")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    aspect === "square" 
                      ? "bg-[#1C1916] text-[#FAF8F3] border-[#1C1916]" 
                      : "border-[#BDAB9C]/30 text-[#3D3D3D] hover:bg-[#BDAB9C]/10"
                  }`}
                >
                  <p className="text-xs font-semibold">Quadrado (1:1)</p>
                  <p className="text-[9px] opacity-60">Feed, Pins, Cards</p>
                </button>
                <button
                  onClick={() => setAspect("story")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    aspect === "story" 
                      ? "bg-[#1C1916] text-[#FAF8F3] border-[#1C1916]" 
                      : "border-[#BDAB9C]/30 text-[#3D3D3D] hover:bg-[#BDAB9C]/10"
                  }`}
                >
                  <p className="text-xs font-semibold">Vertical (9:16)</p>
                  <p className="text-[9px] opacity-60">Story, TikTok, Wallpapers</p>
                </button>
              </div>
            </div>

            {/* Alignments and Font Size */}
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
                  Alinhamento
                </label>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setAlignment("left")}
                    className={`p-1 rounded ${alignment === "left" ? "bg-[#1C1916] text-[#FAF8F3]" : "hover:bg-[#BDAB9C]/10 text-[#3D3D3D]"}`}
                    title="Alinhar à Esquerda"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setAlignment("center")}
                    className={`p-1 rounded ${alignment === "center" ? "bg-[#1C1916] text-[#FAF8F3]" : "hover:bg-[#BDAB9C]/10 text-[#3D3D3D]"}`}
                    title="Alinhar ao Centro"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between gap-1 items-center bg-[#1C1916]/5 p-1 rounded-xl">
                {(["sm", "base", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`flex-1 py-1 text-[10px] rounded-lg font-sans transition-all capitalize ${
                      fontSize === sz 
                        ? "bg-white text-[#1C1916] shadow-sm font-semibold" 
                        : "text-[#3D3D3D]/70 hover:opacity-100"
                    }`}
                  >
                    {sz === "sm" ? "Leve" : sz === "base" ? "Ajustado" : "Forte"}
                  </button>
                ))}
              </div>
            </div>

            {/* Retro Grain Toggle */}
            <div className="flex items-center justify-between mb-4 p-3 bg-[#1C1916]/5 rounded-xl">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#BDAB9C]" />
                <span className="text-xs font-sans text-[#3D3D3D] font-medium">Textura de Algodão</span>
              </div>
              <input
                type="checkbox"
                checked={hasNoise}
                onChange={(e) => setHasNoise(e.target.checked)}
                className="w-4 h-4 rounded text-[#BDAB9C] border-[#BDAB9C]/40 focus:ring-[#BDAB9C]"
              />
            </div>
          </div>

          {/* Action triggers */}
          <div className="space-y-2 mt-4 pt-4 border-t border-[#BDAB9C]/30">
            <button
              onClick={handleDownloadSimulated}
              disabled={downloading}
              className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2.5 rounded-xl font-sans text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#FAF8F3] border-t-transparent rounded-full animate-spin" />
                  <span>Prensando Papel...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Salvar na Galeria</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleCopyLink}
              className="w-full bg-[#FAF8F3] hover:bg-[#1C1916]/5 text-[#1C1916] border border-[#1C1916] py-2.5 rounded-xl font-sans text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-semibold">Copiado para colagem!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Copiar Citação + Margem</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
