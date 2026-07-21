import React, { useState, useEffect } from "react";
import { CreateMarginIcon, CloseIcon, AuraIcon } from "./icons/MarginaliaIcons";
import { getDailyDismissed, setDailyDismissed } from "../lib/storage";
import { Margem } from "../types";

interface DailyOpeningMomentProps {
  onTriggerAction: (action: "aura" | "soulmap" | "companion" | "write" | "letter") => void;
  margens?: Margem[];
}

export const DailyOpeningMoment: React.FC<DailyOpeningMomentProps> = ({ onTriggerAction, margens }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({
    title: "Uma provocação para sua leitura de hoje",
    description: "Selecione um fragmento, uma contradição ou uma fresta de luz na sua leitura atual e eternize-a em suas anotações de margem.",
    cta: "Escrever Nova Margem",
    actionType: "write" as "aura" | "soulmap" | "companion" | "write" | "letter"
  });

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  useEffect(() => {
    const todayStr = getTodayString();
    const isDismissed = getDailyDismissed(todayStr);
    
    if (!isDismissed) {
      const dayOfMonth = new Date().getDate();
      const userMargins = (margens || []).filter(m => m && !m.isEditorial);

      const items: {
        title: string;
        description: string;
        cta: string;
        actionType: "aura" | "soulmap" | "companion" | "write" | "letter";
      }[] = [
        {
          title: "Uma provocação para sua leitura de hoje",
          description: "Selecione um fragmento, uma contradição ou uma fresta de luz na sua leitura atual e eternize-a em suas anotações de margem.",
          cta: "Escrever Nova Margem",
          actionType: "write" as const
        },
        {
          title: "Que frase merece permanecer com você?",
          description: "Às vezes, um livro inteiro se justifica por uma única sentença. Qual é a frase que capturou sua atenção hoje?",
          cta: "Registrar Minha Impressão",
          actionType: "write" as const
        }
      ];

      // If there are real margins, add the dynamic revisit option
      if (userMargins.length > 0) {
        const pastMargin = userMargins[dayOfMonth % userMargins.length];
        const formattedDate = pastMargin.date ? new Date(pastMargin.date).toLocaleDateString("pt-BR") : "recentemente";
        const snippet = pastMargin.thought || pastMargin.quote || "suas anotações";
        const shortSnippet = snippet.length > 90 ? snippet.slice(0, 90) + "..." : snippet;

        items.push({
          title: "Talvez hoje seja um bom dia para revisitar uma margem.",
          description: `No dia ${formattedDate}, você sintonizou esta reflexão no livro "${pastMargin.bookTitle || "Leitura"}": "${shortSnippet}".`,
          cta: "Explorar Meu Espaço",
          actionType: "aura" as const
        });
      }

      const idx = dayOfMonth % items.length;
      setContent(items[idx]);
      setVisible(true);
    }
  }, [margens]);

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
            <span>DESPERTAR INSPIRACIONAL</span>
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
