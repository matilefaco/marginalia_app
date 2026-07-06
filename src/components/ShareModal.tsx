import React, { useState, useRef } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
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
  const [selectedStyle, setSelectedStyle] = useState("story_etereo");
  const [aspect, setAspect] = useState<"square" | "story">("square");
  const [alignment, setAlignment] = useState<"left" | "center">("center");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [hasNoise, setHasNoise] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 7 Margem Viva World-Class Aesthetic Presets (Share Studio)
  const artStyles: ArtStyle[] = [
    {
      key: "story_etereo",
      name: "✨ Story Etéreo",
      bgClass: "bg-gradient-to-tr from-[#FFFDF9] via-[#FAF6EE] to-[#F1ECE1] text-[#2C2720]",
      quoteClass: "text-[#1C1814] font-serif italic tracking-wide",
      fontClass: "font-serif",
      borderClass: "border-[#E0D8CB]",
      badgeText: "Estética Celestial",
      extraClass: "bg-[radial-gradient(#C5A880_0.7px,transparent_0.7px)] [background-size:24px_24px]",
      decor: <div className="absolute right-6 bottom-14 text-[9px] font-mono tracking-widest uppercase opacity-35">Ethereal Symphony</div>
    },
    {
      key: "wallpaper_noturno",
      name: "🌌 Wallpaper Noturno",
      bgClass: "bg-gradient-to-b from-[#121110] via-[#1A1816] to-[#0A0909] text-[#EBE6DF]",
      quoteClass: "text-[#FAF8F5] font-serif italic",
      fontClass: "font-serif",
      borderClass: "border-[#4A3E31]",
      badgeText: "Céu Estrelado",
      extraClass: "bg-[radial-gradient(#FAF8F5_0.5px,transparent_0.5px)] [background-size:20px_20px]",
      decor: <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest uppercase opacity-40">Midnight Muse</div>
    },
    {
      key: "carta_dobrada",
      name: "✉️ Carta Dobrada",
      bgClass: "bg-[#F4EFE6] text-[#3A2D25]",
      quoteClass: "text-[#2D1B13] font-serif italic",
      fontClass: "font-serif",
      borderClass: "border-[#C1B5A3]",
      badgeText: "Mensagem Secreta",
      extraClass: "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:100%_20px]",
      decor: <div className="absolute bottom-12 right-6 w-8 h-8 rounded-full bg-red-800/10 border border-red-800/30 flex items-center justify-center text-[10px] text-red-800 transform rotate-12 shadow-xs">封</div>
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
      decor: <div className="absolute top-4 right-4 text-[9px] font-mono bg-red-800 text-white px-1 py-0.5 rounded uppercase tracking-wider opacity-80 rotate-3">MECÂNICO</div>
    },
    {
      key: "poster_editorial",
      name: "📰 Pôster Editorial",
      bgClass: "bg-[#1C1916] text-[#FAF8F3]",
      quoteClass: "text-white font-sans font-extrabold tracking-tight leading-snug",
      fontClass: "font-sans",
      borderClass: "border-[#C5A880] border-[4px]",
      badgeText: "Brutalismo Suíço",
      extraClass: "tracking-tight uppercase",
      decor: <div className="absolute bottom-16 left-6 text-[10px] font-mono text-[#C5A880] uppercase tracking-widest">MARGINALIA EXTRA</div>
    },
    {
      key: "diario",
      name: "📖 Página de Diário",
      bgClass: "bg-[#FCF6EC] text-[#5D4037]",
      quoteClass: "text-[#3E2723] font-serif italic",
      fontClass: "font-serif",
      borderClass: "border-[#EFE5D3]",
      badgeText: "Notas Íntimas",
      extraClass: "bg-[linear-gradient(90deg,rgba(189,171,156,0.15)_1px,transparent_1px)] [background-size:20px_100%]",
      decor: <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-400/35" />
    },
    {
      key: "bio_quote",
      name: "✒️ Bio Quote",
      bgClass: "bg-[#090909] text-[#FAF8F3]",
      quoteClass: "text-white font-sans tracking-tight leading-relaxed",
      fontClass: "font-sans",
      borderClass: "border-neutral-800 border-[2px]",
      badgeText: "Assinatura Minimal",
      extraClass: "text-center",
      decor: <div className="absolute top-3 left-4 text-[8px] font-mono uppercase tracking-widest text-neutral-500">BIO SIGNATURE</div>
    }
  ];

  const currentStyle = artStyles.find((s) => s.key === selectedStyle) || artStyles[0];

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      `📖 "${margem.quote}"\n\n— Minha Margem: "${margem.thought}"\n(${margem.bookTitle}, por ${margem.author} | Criado no Marginalia.app)`
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const safeTitle = margem.bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
      await exportNodeAsPng(
        cardRef.current,
        `marginalia-${safeTitle || "margem"}-${aspect}`
      );
    } catch (err) {
      console.error("Falha ao exportar o cartão:", err);
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-[15px] md:text-[16px] leading-relaxed";
      case "lg": return "text-[20px] md:text-[22px] leading-relaxed";
      default: return "text-[17px] md:text-[18px] leading-relaxed";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1916]/90 backdrop-blur-md animate-page-turn">
      <div className="w-full max-w-4xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl overflow-hidden journal-shadow flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]">
        
        {/* Share Card Canvas Preview */}
        <div className="flex-1 bg-[#1C1916]/10 p-4 md:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#BDAB9C]/30 overflow-y-auto">
          
          <div 
            id="share-card-container"
            ref={cardRef}
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
            <div className="flex justify-between items-center opacity-70 font-mono text-[10px] tracking-wider uppercase">
              <span>MARGINALIA</span>
              <span>{currentStyle.badgeText}</span>
            </div>

            {/* Content Core Block */}
            <div className={`my-auto flex flex-col space-y-5 ${alignment === "center" ? "text-center" : "text-left"}`}>
              
              {/* Highlight Quote */}
              <div className="relative px-2">
                {selectedStyle !== "bio_quote" && (
                  <span className="absolute -top-4 left-0 text-4xl opacity-30 font-serif">“</span>
                )}
                <p className={`${getFontSizeClass()} font-serif italic leading-relaxed ${currentStyle.quoteClass}`}>
                  {margem.quote}
                </p>
                {selectedStyle !== "bio_quote" && (
                  <span className="absolute -bottom-6 right-0 text-4xl opacity-30 font-serif">”</span>
                )}
              </div>

              {/* Classic Book Divider */}
              <div className="flex justify-center py-1.5">
                <div className="w-16 h-[1.5px] bg-[#C8854A]" style={{ opacity: 0.75 }} />
              </div>

              {/* Author's Personal Reflection */}
              <div className="font-sans">
                <p className="text-[15px] md:text-[16px] leading-relaxed italic opacity-95 pl-3.5 border-l-2 border-[#C8854A] font-normal">
                  “{margem.thought}”
                </p>
              </div>

              {/* Source Attribution Metadata */}
              <div className="pt-2">
                <p className="font-sans font-bold text-[14px] tracking-wide text-current">
                  {margem.bookTitle}
                </p>
                <p className="font-sans text-[11px] opacity-75 tracking-wider mt-0.5">
                  {margem.author}
                </p>
              </div>
            </div>

            {/* Aesthetic Bottom Footer */}
            <div className="flex justify-between items-center pt-3.5 border-t border-current border-opacity-15 font-mono text-[9px] opacity-60">
              <span className="font-sans">Reflexão de @{margem.authorAvatar || "leitor"}</span>
              <span className="tracking-wider uppercase font-sans font-medium flex items-center gap-1">
                <span className="text-[#C8854A]">★</span> marginalia.app • o que fica em você
              </span>
            </div>

          </div>

        </div>

        {/* Customization Control Hub */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between overflow-y-auto bg-[#FAF8F3]">
          <div>
            <div className="flex justify-between items-center mb-5">
              <div>
                <span className="text-[9px] font-sans text-[#BDAB9C] font-semibold tracking-widest uppercase block">Oficina Poética</span>
                <h3 className="font-display font-semibold text-lg text-[#1C1916] tracking-tight">Estúdio de Arte</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-[#BDAB9C]/20 text-[#3D3D3D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preset Art styles selection */}
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
              onClick={handleDownloadCard}
              disabled={downloading}
              className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-xl font-sans text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#FAF8F3] border-t-transparent rounded-full animate-spin" />
                  <span>Prensando Papel de Fibra...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Gravar e Baixar Cartão</span>
                </>
              )}
            </button>

            {downloadError && (
              <p className="text-[10px] text-red-600 text-center font-serif italic mt-1 animate-pulse">
                Não conseguimos gravar o cartão agora. Tente novamente.
              </p>
            )}
            
            <button
              onClick={handleCopyLink}
              className="w-full bg-[#FAF8F3] hover:bg-[#1C1916]/5 text-[#1C1916] border border-[#1C1916] py-3 rounded-xl font-sans text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-[#C5A880] font-bold">Inscrição copiada!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Estender Citação às Margens</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
