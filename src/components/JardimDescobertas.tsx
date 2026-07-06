import React, { useState } from "react";
import { BookHighlight, Margem } from "../types";
import { PRESET_HIGHLIGHTS } from "../data";
import { Compass, Sparkles, RefreshCw, Heart, Eye, ArrowRight, MessageSquare, Feather } from "lucide-react";

interface JardimDescobertasProps {
  onSelectHighlight: (h: BookHighlight) => void;
  margens: Margem[];
}

export default function JardimDescobertas({ onSelectHighlight, margens }: JardimDescobertasProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [serendipityQuote, setSerendipityQuote] = useState<BookHighlight | null>(() => {
    return PRESET_HIGHLIGHTS[Math.floor(Math.random() * PRESET_HIGHLIGHTS.length)];
  });

  // Emotional curated categories
  const emotionalCategories = [
    { label: "🌙 Solidão Bonita", emotionKey: "Solidão", desc: "A doçura do silêncio e o retiro contemplativo." },
    { label: "🧠 Crises Existenciais", emotionKey: "Existencial", desc: "Perguntas deitadas sobre o mistério do ser." },
    { label: "☕ Nostalgia do Tempo", emotionKey: "Nostalgia", desc: "Lembranças doces de épocas não vividas." },
    { label: "❤️ Amor Impossível", emotionKey: "Amor", desc: "Tragédias românticas desenhadas nas páginas." },
    { label: "😳 Desejo Oculto", emotionKey: "Desejo", desc: "A virtude enfraquecida e o sussurro da paixão." },
    { label: "🕯️ Melancolia", emotionKey: "Melancolia", desc: "A fina beleza de uma tristeza elegante." }
  ];

  // Serendipity trigger
  const handleTriggerSerendipity = () => {
    const list = PRESET_HIGHLIGHTS.filter(h => h.id !== serendipityQuote?.id);
    const chosen = list[Math.floor(Math.random() * list.length)] || PRESET_HIGHLIGHTS[0];
    setSerendipityQuote(chosen);
  };

  // Filter highlights
  const displayedHighlights = PRESET_HIGHLIGHTS.filter((h) => {
    const matchesEmotion = selectedEmotion ? h.emotion.toLowerCase() === selectedEmotion.toLowerCase() : true;
    const matchesSearch = searchTerm 
      ? h.quote.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.author.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesEmotion && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-page-turn">
      
      {/* Intro header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase">Fase 5 — Jardim das Descobertas</span>
        <h3 className="font-display font-semibold text-xl text-[#1C1916] tracking-tight">O Jardim das Descobertas</h3>
        <p className="text-xs text-[#3D3D3D] opacity-80 leading-relaxed">
          Navegue pelas entrelinhas do sentimento humano. Descubra citações que acolheram outros leitores sob atmosferas de pura contemplação.
        </p>
      </div>

      {/* Semantic search bar: "Como você se sente hoje?" */}
      <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-4 md:p-5 journal-shadow space-y-3">
        <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider">
          Como você se sente hoje? (Busca Emocional)
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ex: 'frases sobre solidão', 'términos', 'propósito da vida'"
            className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/50 rounded-xl px-4 py-2.5 text-xs font-serif text-[#1C1916] placeholder-[#BDAB9C] focus:outline-none focus:border-[#1C1916]"
          />
          <Sparkles className="absolute right-3.5 top-3 w-4 h-4 text-[#BDAB9C]" />
        </div>
        
        {/* Quick thematic paths */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[10px] font-sans text-[#BDAB9C] self-center">Trilhas Rápidas:</span>
          {[
            { label: "Superar términos", value: "Cem Anos" },
            { label: "Vencer angústias", value: "Camus" },
            { label: "Solidão pacífica", value: "Metamorfose" }
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => setSearchTerm(t.value)}
              className="text-[10px] font-sans bg-[#1C1916]/5 hover:bg-[#1C1916]/10 text-[#3D3D3D] px-2.5 py-1 rounded-full border border-[#BDAB9C]/30"
            >
              🌱 {t.label}
            </button>
          ))}
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="text-[10px] font-sans text-red-700 hover:underline"
            >
              Limpar Filtro
            </button>
          )}
        </div>
      </div>

      {/* Emotion Categories Filter (Fase 5 - coleções emocionais) */}
      <div className="space-y-2">
        <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
          Filtrar por Coleção Emocional
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {emotionalCategories.map((cat) => {
            const isSelected = selectedEmotion === cat.emotionKey;
            return (
              <button
                key={cat.emotionKey}
                onClick={() => setSelectedEmotion(isSelected ? null : cat.emotionKey)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected 
                    ? "bg-[#1C1916] border-[#1C1916] text-[#FAF8F3] shadow-sm" 
                    : "bg-[#FAF8F3] border-[#BDAB9C]/40 hover:border-[#BDAB9C]"
                }`}
              >
                <span className="text-xs font-semibold font-serif block">{cat.label}</span>
                <span className={`text-[9px] font-sans block mt-1 leading-snug ${isSelected ? "text-[#FAF8F3]/70" : "text-[#BDAB9C]"}`}>
                  {cat.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Coincidência Literária (Serendipity card - Phase 5) */}
      {serendipityQuote && (
        <div className="bg-[#FAF8F3] border-2 border-dashed border-[#C5A880] rounded-xl p-5 journal-shadow relative overflow-hidden">
          <div className="absolute top-2 right-3 font-mono text-[8.5px] text-amber-800 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Coincidência Literária</span>
          </div>

          <div className="space-y-3 pt-2">
            <p className="font-serif italic text-xs leading-relaxed text-[#1C1916] max-w-md">
              "{serendipityQuote.quote}"
            </p>
            
            <div className="flex justify-between items-center border-t border-[#BDAB9C]/20 pt-3">
              <div>
                <p className="text-[11px] font-sans font-bold text-[#1C1916]">{serendipityQuote.title}</p>
                <p className="text-[9px] font-sans text-[#BDAB9C]">{serendipityQuote.author}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleTriggerSerendipity}
                  className="p-1.5 rounded bg-[#1C1916]/5 hover:bg-[#1C1916]/10 text-[#3D3D3D]"
                  title="Girar outra coincidência"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectHighlight(serendipityQuote)}
                  className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-1 px-3 rounded-lg text-[10px] font-sans font-semibold flex items-center gap-1.5"
                >
                  <Feather className="w-3 h-3" />
                  <span>Anotar nela</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results grid */}
      <div className="space-y-3">
        <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#1C1916] border-b border-[#BDAB9C]/20 pb-1.5">
          Linhas que Reverberam ({displayedHighlights.length})
        </h4>

        {displayedHighlights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedHighlights.map((h) => (
              <div 
                key={h.id}
                className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-5 journal-shadow flex flex-col justify-between hover:border-[#1C1916] transition-all cursor-pointer group"
                onClick={() => onSelectHighlight(h)}
              >
                <p className="font-serif italic text-xs leading-relaxed text-[#1C1916] mb-4">
                  "{h.quote}"
                </p>

                <div className="flex justify-between items-center border-t border-[#BDAB9C]/10 pt-3">
                  <div>
                    <p className="text-[11px] font-sans font-bold text-[#1C1916]">{h.title}</p>
                    <p className="text-[9px] font-sans text-[#BDAB9C]">{h.author}</p>
                  </div>
                  <span className="text-[9px] font-mono bg-[#BDAB9C]/10 text-stone-700 px-2 py-0.5 rounded-full uppercase">
                    {h.emotion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-xs font-serif italic text-[#BDAB9C]">
            Nenhum trecho de alma coincide com esses filtros. Experimente buscar outra atmosfera.
          </p>
        )}
      </div>

    </div>
  );
}
