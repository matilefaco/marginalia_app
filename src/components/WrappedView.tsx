import React, { useState, useRef } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { X, ChevronLeft, ChevronRight, Share2, Sparkles, Flame, RefreshCw, Download } from "lucide-react";

interface WrappedViewProps {
  wrappedData: {
    jornadaEmocoes: Record<string, number>;
    temasPrincipais: string[];
    autoresMoldaram: string[];
    mapaAlma: string;
    simboloPoetico: string;
    fraseWrapped: string;
  };
  onClose: () => void;
  onShare: () => void;
}

export default function WrappedView({ wrappedData, onClose, onShare }: WrappedViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const handleDownloadSlide = async () => {
    if (!slideRef.current) return;
    setDownloading(true);
    try {
      await exportNodeAsPng(
        slideRef.current,
        `marginalia-wrapped-slide-${currentSlide + 1}`
      );
    } catch (err) {
      console.error("Falha ao exportar slide do Wrapped:", err);
    } finally {
      setDownloading(false);
    }
  };

  const totalSlides = 5;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1916] text-[#FAF8F3] flex flex-col items-center justify-center p-4 md:p-8 animate-page-turn selection:bg-orange-800/40">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-repeat bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400')]" style={{ mixBlendMode: "overlay" }} />
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-amber-950/10 via-stone-950/45 to-[#1C1916]" />

      {/* Header bar */}
      <div className="w-full max-w-lg flex justify-between items-center relative z-10 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#FAF8F3] text-[#1C1916] flex items-center justify-center font-serif text-sm font-bold">
            M
          </div>
          <span className="font-display font-bold text-xs uppercase tracking-widest text-[#BDAB9C]">
            Retrospectiva Viva
          </span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full bg-[#FAF8F3]/10 hover:bg-[#FAF8F3]/20 transition-colors"
          title="Fechar Retrospectiva"
        >
          <X className="w-4 h-4 text-[#FAF8F3]" />
        </button>
      </div>

      {/* Progress indicators at top (Stories style) */}
      <div className="w-full max-w-lg flex gap-1 relative z-10 mb-8">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <div 
            key={idx}
            className="flex-1 h-1 rounded-full overflow-hidden bg-[#FAF8F3]/15 border border-stone-850/50"
          >
            <div 
              className={`h-full bg-gradient-to-r from-orange-500 to-amber-600 transition-all duration-350`}
              style={{ width: idx < currentSlide ? "100%" : idx === currentSlide ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      {/* SLIDE CANVAS DISPLAY AREA */}
      <div ref={slideRef} className="w-full max-w-lg aspect-[9/16] bg-[#2A2624] border border-[#BDAB9C]/45 rounded-2xl p-7 md:p-9 journal-shadow relative overflow-hidden flex flex-col justify-between z-10 animate-page-turn">
        
        {/* Subtle page lines inside card */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FAF8F3_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

        {/* SLIDE 0: Welcome / Slogan */}
        {currentSlide === 0 && (
          <div className="my-auto space-y-6 text-center animate-page-turn">
            <span className="text-[12px] font-mono tracking-wide text-amber-500 uppercase block">Retrospectiva Marginalia</span>
            
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-500/50 flex items-center justify-center mx-auto mb-2 animate-spin-slow">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>

            <h2 className="font-serif text-3xl font-medium tracking-wide text-amber-50/90 leading-tight">
              O Mapa da Sua <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Alma Leitora</span>
            </h2>
            
            <p className="font-serif italic text-[15px] md:text-[16px] leading-relaxed text-[#DCD5CD] max-w-xs mx-auto">
              “Cada anotação é um rastro de luz que deixamos no caminho dos livros. Que marcas você gravou este ano?”
            </p>

            <div className="pt-6">
              <div className="w-14 h-[1px] bg-amber-500/30 mx-auto mb-2" />
              <p className="text-[11px] font-mono text-[#BDAB9C]">MARGINALIA • ESCRITURA VIVA</p>
            </div>
          </div>
        )}

        {/* SLIDE 1: Emotional Map Breakdown */}
        {currentSlide === 1 && (
          <div className="my-auto space-y-6 animate-page-turn">
            <div className="text-center space-y-1.5">
              <span className="text-[11px] font-mono tracking-wide text-amber-500 uppercase block">Capítulo 1 de 5</span>
              <h3 className="font-serif text-2xl font-medium text-amber-100/95 tracking-wide">Cartografia de Sentimentos</h3>
              <p className="text-[12px] md:text-[13px] text-[#BDAB9C] font-sans">As atmosferas onde seu coração mais habitou</p>
            </div>

            <div className="space-y-4 pt-4">
              {Object.entries(wrappedData.jornadaEmocoes).map(([emotion, val], idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-serif italic text-[#DCD5CD]">
                    <span>{emotion}</span>
                    <span className="font-sans font-bold text-amber-500">{val}%</span>
                  </div>
                  {/* Premium vintage bar chart */}
                  <div className="w-full h-2 bg-stone-850 rounded-full overflow-hidden border border-amber-950/30">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-700"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[13px] md:text-sm font-serif italic text-[#DCD5CD]/80 pt-2">
              Seu refúgio emocional predominante é a <span className="text-amber-400 font-semibold">Melancolia</span>.
            </p>
          </div>
        )}

        {/* SLIDE 2: Core Philosophy / Themes */}
        {currentSlide === 2 && (
          <div className="my-auto space-y-6 animate-page-turn">
            <div className="text-center space-y-1.5">
              <span className="text-[11px] font-mono tracking-wide text-amber-500 uppercase block">Capítulo 2 de 5</span>
              <h3 className="font-serif text-2xl font-medium text-amber-100/95 tracking-wide">Linhas de Descoberta</h3>
              <p className="text-[12px] md:text-[13px] text-[#BDAB9C] font-sans">Os mistérios que você buscou decifrar nas margens</p>
            </div>

            <div className="space-y-4 pt-2">
              {wrappedData.temasPrincipais.map((theme, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#1C1916]/50 border border-amber-950/40 p-4 rounded-xl flex gap-3.5 items-start hover:border-amber-500/30 transition-all"
                >
                  <span className="text-sm text-amber-500 font-bold mt-0.5">0{idx + 1}.</span>
                  <p className="text-[14px] md:text-[15px] font-serif italic text-[#DCD5CD] leading-relaxed">
                    “{theme}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 3: Authors Stack */}
        {currentSlide === 3 && (
          <div className="my-auto space-y-6 animate-page-turn">
            <div className="text-center space-y-1.5">
              <span className="text-[11px] font-mono tracking-wide text-amber-500 uppercase block">Capítulo 3 de 5</span>
              <h3 className="font-serif text-2xl font-medium text-amber-100/95 tracking-wide">Mentes Companheiras</h3>
              <p className="text-[12px] md:text-[13px] text-[#BDAB9C] font-sans">Os pensadores que mais deitaram em sua cabeceira</p>
            </div>

            {/* Vintage Stack Graphic */}
            <div className="flex flex-col items-center justify-center space-y-2 py-4 relative">
              {wrappedData.autoresMoldaram.map((author, idx) => {
                const shiftY = idx * 2;
                const scale = 100 - (idx * 5);
                return (
                  <div 
                    key={idx} 
                    className="w-52 bg-stone-900 border border-amber-500/35 rounded-lg py-3 px-5 text-center font-serif text-[13px] font-semibold text-[#F3E9DC] journal-shadow transition-all hover:border-amber-400"
                    style={{ transform: `scale(${scale / 100})`, zIndex: 10 - idx }}
                  >
                    <span className="text-[9px] font-mono uppercase text-amber-500 block mb-0.5">Volume {idx + 1}</span>
                    {author}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[13px] md:text-sm font-serif italic text-[#DCD5CD]/80">
              Esses nomes ditaram o compasso das suas reflexões.
            </p>
          </div>
        )}

        {/* SLIDE 4: Slogan & Final Psyche mapping */}
        {currentSlide === 4 && (
          <div className="my-auto space-y-6 text-center animate-page-turn">
            <span className="text-[11px] font-mono tracking-wide text-amber-500 uppercase block">Capítulo 4 de 5</span>
            
            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase text-[#BDAB9C] tracking-wide">Seu Símbolo de Alma</p>
              <p className="text-3xl">🏮 {wrappedData.simboloPoetico}</p>
            </div>

            <div className="w-12 h-[1px] bg-amber-500/30 mx-auto" />

            <div className="space-y-2.5">
              <p className="text-[14px] md:text-[15px] font-serif text-[#DCD5CD] leading-relaxed max-w-sm mx-auto italic">
                “{wrappedData.mapaAlma}”
              </p>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl max-w-xs mx-auto">
              <p className="text-[9px] font-mono text-amber-500 uppercase tracking-wide mb-1 font-semibold">Mote Poético</p>
              <p className="text-xs font-serif italic font-bold text-[#FAF8F3]">
                “{wrappedData.fraseWrapped}”
              </p>
            </div>
          </div>
        )}

        {/* Card Footer Branding */}
        <div className="flex justify-between items-center pt-3 border-t border-[#FAF8F3]/10 font-mono text-[10px] text-[#BDAB9C]">
          <span>Retrospectiva Marginalia</span>
          <span>marginalia.app</span>
        </div>

      </div>

      {/* CONTROLS AREA BELOW CANVAS */}
      <div className="w-full max-w-lg mt-6 flex justify-between items-center relative z-10">
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2.5 rounded-full bg-[#FAF8F3]/10 hover:bg-[#FAF8F3]/15 border border-[#FAF8F3]/10 text-[#FAF8F3] disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-2.5 rounded-full bg-[#FAF8F3]/10 hover:bg-[#FAF8F3]/15 border border-[#FAF8F3]/10 text-[#FAF8F3] disabled:opacity-30 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {currentSlide === totalSlides - 1 ? (
          <div className="flex gap-2">
            <button
              onClick={handleDownloadSlide}
              disabled={downloading}
              className="px-4.5 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-750 text-[#FAF8F3] font-sans text-xs font-bold tracking-wide flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border border-[#BDAB9C]/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Consagrando..." : "Consagrar Retrospectiva"}</span>
            </button>
            <button
              onClick={onShare}
              className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90 text-white font-sans text-xs font-bold tracking-wide flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Guardar Escrita</span>
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-[#BDAB9C] tracking-wide">
            Página {currentSlide + 1} de {totalSlides}
          </span>
        )}
      </div>

    </div>
  );
}
