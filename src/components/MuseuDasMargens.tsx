import React, { useState } from "react";
import { BookOpen, Star, MessageSquare, Heart, Bookmark, Share2 } from "lucide-react";
import { Margem, Comment } from "../types";

interface MuseuDasMargensProps {
  margens: Margem[];
  onOpenShareModal?: (margem: Margem) => void;
  onLikeMargem?: (id: string) => void;
  onSaveMargem?: (margem: Margem) => void;
}

type CuratedCategory = "melancolia" | "amadas" | "carta" | "noturna" | "esperanca";

export const MuseuDasMargens: React.FC<MuseuDasMargensProps> = ({
  margens,
  onOpenShareModal,
  onLikeMargem,
  onSaveMargem
}) => {
  const [activeCategory, setActiveCategory] = useState<CuratedCategory>("melancolia");

  const categories = [
    { key: "melancolia", label: "💔 Mais Melancólicas" },
    { key: "amadas", label: "❤️ Mais Amadas" },
    { key: "carta", label: "✉️ Substituiriam uma Carta" },
    { key: "noturna", label: "🌙 Mais Noturnas" },
    { key: "esperanca", label: "✨ Mais Esperançosas" }
  ];

  const getFilteredMargens = (): Margem[] => {
    let result: Margem[] = [];
    switch (activeCategory) {
      case "amadas":
        result = [...margens].sort((a, b) => b.lovesCount - a.lovesCount);
        break;
      case "melancolia":
        result = margens.filter(
          (m) =>
            m.thought.toLowerCase().includes("solidão") ||
            m.thought.toLowerCase().includes("dor") ||
            m.thought.toLowerCase().includes("melancolia") ||
            m.thought.toLowerCase().includes("triste") ||
            m.quote.toLowerCase().includes("morte") ||
            m.quote.toLowerCase().includes("vazio") ||
            m.quote.toLowerCase().includes("tempo")
        );
        break;
      case "carta":
        result = margens.filter(
          (m) =>
            m.thought.toLowerCase().includes("carta") ||
            m.thought.toLowerCase().includes("escrever") ||
            m.thought.toLowerCase().includes("falar") ||
            m.thought.toLowerCase().includes("silêncio") ||
            m.quote.toLowerCase().includes("amor") ||
            m.quote.toLowerCase().includes("carta")
        );
        break;
      case "noturna":
        result = margens.filter(
          (m) =>
            m.thought.toLowerCase().includes("noite") ||
            m.thought.toLowerCase().includes("escuro") ||
            m.thought.toLowerCase().includes("sono") ||
            m.thought.toLowerCase().includes("estrela") ||
            m.thought.toLowerCase().includes("luz") ||
            m.themeKey === "night"
        );
        break;
      case "esperanca":
        result = margens.filter(
          (m) =>
            m.thought.toLowerCase().includes("esperança") ||
            m.thought.toLowerCase().includes("belo") ||
            m.thought.toLowerCase().includes("recomeço") ||
            m.thought.toLowerCase().includes("amanhã") ||
            m.thought.toLowerCase().includes("nascer") ||
            m.quote.toLowerCase().includes("vida")
        );
        break;
      default:
        result = margens;
    }

    if (result.length === 0) {
      // Elegant fallback to avoid empty categories
      return margens.slice(0, 4);
    }
    return result;
  };

  const filtered = getFilteredMargens().slice(0, 6);

  return (
    <div className="space-y-5">
      {/* Categories Horizontal Rail */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-export">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key as CuratedCategory)}
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#1C1916] text-[#FAF8F3] shadow-xs"
                : "bg-[#BDAB9C]/10 text-stone-700 hover:bg-[#BDAB9C]/20 border border-[#BDAB9C]/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Curated Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length > 0 ? (
          filtered.map((m) => (
            <div 
              key={m.id}
              className="bg-[#FAF8F3] border border-[#BDAB9C]/50 rounded-xl p-5 hover:border-[#1C1916] transition-all journal-shadow flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono tracking-wider text-[#BDAB9C] uppercase block truncate max-w-[80%]">
                    {m.bookTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <Heart className="w-3.5 h-3.5 text-rose-600" fill="currentColor" />
                    <span className="font-mono text-[10px]">{m.lovesCount}</span>
                  </div>
                </div>

                <p className="font-serif italic text-sm text-[#1C1916] leading-relaxed border-l border-[#BDAB9C]/30 pl-2.5">
                  "{m.quote}"
                </p>

                <p className="font-sans font-light text-xs text-stone-700 leading-relaxed pl-2">
                  {m.thought}
                </p>
              </div>

              {/* Bottom curator profile & Action Toolbar */}
              <div className="pt-3 border-t border-[#BDAB9C]/20 flex justify-between items-center gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-[#BDAB9C]/20 border border-[#BDAB9C]/40 flex items-center justify-center text-[9px] font-bold text-[#1C1916] flex-shrink-0">
                    {m.authorName.charAt(0)}
                  </div>
                  <span className="text-[10px] text-stone-600 font-sans truncate">@{m.authorAvatar}</span>
                </div>

                {/* Micro Actions */}
                <div className="flex items-center gap-2">
                  {onLikeMargem && (
                    <button
                      onClick={() => onLikeMargem(m.id)}
                      className="text-stone-700 hover:text-rose-600 p-1 cursor-pointer"
                      title="Sintonizar"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onSaveMargem && (
                    <button
                      onClick={() => onSaveMargem(m)}
                      className="text-stone-700 hover:text-[#C5A880] p-1 cursor-pointer"
                      title="Salvar"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onOpenShareModal && (
                    <button
                      onClick={() => onOpenShareModal(m)}
                      className="text-stone-700 hover:text-[#1C1916] p-1 cursor-pointer"
                      title="Compartilhar Arte"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center space-y-2">
            <p className="text-xs text-stone-500 font-sans italic">
              Nenhuma margem catalogada nesta ala emocional do museu ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
