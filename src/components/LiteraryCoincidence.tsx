import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Star, Moon } from "lucide-react";

interface LiteraryCoincidenceProps {
  onExploreEco?: (ecoName: string) => void;
}

export const LiteraryCoincidence: React.FC<LiteraryCoincidenceProps> = ({ onExploreEco }) => {
  const [coincidence, setCoincidence] = useState({
    title: "Coincidência Literária",
    text: "Conexões invisíveis estão se desenhando nas margens do mundo.",
    ecoName: "Filosofia Existencialista",
    cta: "Explorar este Eco"
  });

  useEffect(() => {
    // Generate deterministic content based on the day of the month
    const today = new Date();
    const day = today.getDate();
    
    const options = [
      {
        title: "Coincidência Literária",
        text: "Hoje, 14 leitores orbitaram a mesma emoção que você: Solidão Bonita. Uma sensação sutil de que nunca estamos verdadeiramente sós nas entrelinhas.",
        ecoName: "Filosofia Existencialista",
        cta: "Visitar Eco de Filosofia"
      },
      {
        title: "Eco em Sintonia",
        text: "Uma margem esquecida em 'Clássicos Russos' por outro leitor foi anotada exatamente no mesmo horário em que você abriu o app ontem.",
        ecoName: "Clássicos Russos",
        cta: "Visitar Clássicos Russos"
      },
      {
        title: "Sussurro da Tarde",
        text: "Três novos leitores adicionaram reflexões sobre Clarice Lispector nas últimas 12 horas. Há uma névoa de sentimentos compartilhada no ar.",
        ecoName: "Poesia e Lírica",
        cta: "Visitar Poesia e Lírica"
      },
      {
        title: "Constelação Ativa",
        text: "Seu Eco favorito está com uma taxa de sintonia 24% mais alta neste crepúsculo. Os leitores parecem inquietos hoje.",
        ecoName: "Fantasia Sombria",
        cta: "Explorar Fantasia Sombria"
      }
    ];

    const idx = day % options.length;
    setCoincidence(options[idx]);
  }, []);

  return (
    <div className="bg-[#1C1916] text-[#FAF8F3] border border-[#BDAB9C]/20 rounded-xl p-5 relative overflow-hidden journal-shadow space-y-3.5 group">
      {/* Background celestial visual accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/5 rounded-full blur-xl group-hover:bg-[#C5A880]/10 transition-all duration-700 pointer-events-none" />

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/20 flex items-center justify-center">
          <Moon className="w-3.5 h-3.5 text-[#C5A880]" />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase font-semibold">
          {coincidence.title}
        </span>
      </div>

      <p className="font-serif italic text-xs leading-relaxed text-stone-200">
        "{coincidence.text}"
      </p>

      {onExploreEco && (
        <button
          onClick={() => onExploreEco(coincidence.ecoName)}
          className="text-[10px] font-sans font-semibold text-amber-100 hover:text-white flex items-center gap-1.5 pt-1.5 cursor-pointer transition-colors"
        >
          <span>{coincidence.cta}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};
