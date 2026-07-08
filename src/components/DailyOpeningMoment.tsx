import React, { useState, useEffect } from "react";
import { CreateMarginIcon, CloseIcon, AuraIcon } from "./icons/MarginaliaIcons";
import { getDailyDismissed, setDailyDismissed } from "../lib/storage";

interface DailyOpeningMomentProps {
  onTriggerAction: (action: "aura" | "soulmap" | "companion" | "write" | "letter") => void;
}

export const DailyOpeningMoment: React.FC<DailyOpeningMomentProps> = ({ onTriggerAction }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({
    title: "O Despertar da Alma Leitora",
    description: "Sua sensibilidade hoje está sintonizada na calmaria das entrelinhas.",
    cta: "Revelar minha Aura",
    actionType: "aura" as "aura" | "soulmap" | "companion" | "write" | "letter"
  });

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  useEffect(() => {
    const todayStr = getTodayString();
    const isDismissed = getDailyDismissed(todayStr);
    
    if (!isDismissed) {
      // Deterministic calculation of daily content
      const dayOfMonth = new Date().getDate();
      const items = [
        {
          title: "Sua Sintonia do Dia",
          description: "Hoje sua alma leitora acordou sob o signo da Melancolia Elegante. As palavras mais densas falarão mais alto.",
          cta: "Mapear minha Aura",
          actionType: "aura" as const
        },
        {
          title: "Uma Cápsula do Passado",
          description: "Um pensamento que você escreveu há algumas semanas está ansioso para te reencontrar. Deixe que ele te visite.",
          cta: "Abrir Carta do Futuro",
          actionType: "letter" as const
        },
        {
          title: "O Céu Literário Mudou",
          description: "As constelações da sua alma leitora se realinharam 7% desde sua última visita. Venha ver as novas estrelas no seu céu.",
          cta: "Explorar Mapa da Alma",
          actionType: "soulmap" as const
        },
        {
          title: "Silêncio Desejado",
          description: "Há um Eco emocional sussurrando perguntas desafiadoras no Jardim hoje. Deixe sua anotação na margem do tempo.",
          cta: "Escrever Nova Margem",
          actionType: "write" as const
        }
      ];

      const idx = dayOfMonth % items.length;
      setContent(items[idx]);
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    const todayStr = getTodayString();
    setDailyDismissed(todayStr);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="elevation-1 p-6 relative overflow-hidden flex gap-4 animate-fade-in no-export rounded-2xl">
      {/* Decorative side accent */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#C5895A]" />

      {/* Center content */}
      <div className="flex-1 space-y-2.5 pl-2.5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide text-[#BDAB9C] uppercase font-bold">
            <CreateMarginIcon className="w-3.5 h-3.5 text-[#C5895A]" />
            <span>DESPERTAR DIÁRIO</span>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
            title="Fechar por hoje"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif italic text-[16px] md:text-[17px] text-[#1C1916] leading-snug font-semibold">
            {content.title}
          </h4>
          <p className="font-sans text-[14px] text-stone-800 leading-relaxed pr-2">
            {content.description}
          </p>
        </div>

        <button
          onClick={() => {
            onTriggerAction(content.actionType);
            handleDismiss(); // auto-close on navigate/action
          }}
          className="text-xs font-sans font-bold text-[#1C1916] hover:text-[#C5895A] flex items-center gap-1 cursor-pointer underline decoration-[#C5895A] underline-offset-4"
        >
          <span>{content.cta}</span>
          <AuraIcon className="w-3 h-3 text-[#C5895A]" />
        </button>
      </div>
    </div>
  );
};
