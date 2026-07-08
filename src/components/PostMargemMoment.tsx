import React, { useState } from "react";
import { motion } from "motion/react";
import { LinesDiaryIcon, AuraIcon, ShareIcon, DescobertasIcon } from "./icons/MarginaliaIcons";
import { Margem } from "../types";

interface PostMargemMomentProps {
  margem: Margem;
  onShareStory: () => void;
  onAddToDNA: () => void;
  onFindEcos: () => void;
  onClose: () => void;
}

export default function PostMargemMoment({
  margem,
  onShareStory,
  onAddToDNA,
  onFindEcos,
  onClose
}: PostMargemMomentProps) {
  const [addedToDNA, setAddedToDNA] = useState(false);

  // Poetic Identity insight generator based on keywords or random fallback
  const getPoeticInsight = (m: Margem): string => {
    const text = (m.quote + " " + m.thought).toLowerCase();
    
    if (text.includes("tempo") || text.includes("ano") || text.includes("vida") || text.includes("morte")) {
      return "Você encontra lar nas frestas do tempo e na transitoriedade do indizível.";
    }
    if (text.includes("silêncio") || text.includes("calma") || text.includes("paz") || text.includes("só")) {
      return "Para você, ler é uma forma atenta de escutar o próprio silêncio.";
    }
    if (text.includes("triste") || text.includes("dor") || text.includes("choro") || text.includes("solidão") || text.includes("saudade")) {
      return "Você parece encontrar abrigo em histórias que não oferecem soluções fáceis.";
    }
    if (text.includes("beleza") || text.includes("amor") || text.includes("poesia") || text.includes("arte") || text.includes("luz")) {
      return "A beleza costuma chamar sua atenção antes da resposta pragmática.";
    }
    if (text.includes("por que") || text.includes("dúvida") || text.includes("pensar") || text.includes("filosofia") || text.includes("saber")) {
      return "Você parece colecionar perguntas mais do que certezas ou conclusões.";
    }
    
    // Fallback options
    const fallbacks = [
      "Você é atraído por sentimentos que reverberam na alma muito após o fim do capítulo.",
      "Sua leitura é um ritual de desvendar segredos ocultos sob a superfície do cotidiano.",
      "O desassossego das entrelinhas encontra um eco acolhedor nas margens do seu pensamento.",
      "Você lê como quem busca cartografar os relevos mais sutis da própria sensibilidade."
    ];
    
    // Determinisitc fallback based on length to keep it consistent for the same margin
    const index = (m.quote.length + m.thought.length) % fallbacks.length;
    return fallbacks[index];
  };

  const insight = getPoeticInsight(margem);

  const handleDNAAction = () => {
    if (!addedToDNA) {
      onAddToDNA();
      setAddedToDNA(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1916]/90 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl elevation-2 p-6 md:p-8 relative overflow-hidden my-8 rounded-2xl"
      >
        {/* Subtle decorative elements for editorial/paper look */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1C1916]" />
        <div className="absolute right-6 top-5 text-[10px] font-mono tracking-wide uppercase opacity-35">
          Marginalia Record
        </div>

        {/* HEADER */}
        <div className="space-y-2 text-center pb-6 border-b border-[#BDAB9C]/35">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] font-mono uppercase tracking-wide text-[#BDAB9C]"
          >
            MARGINÁLIA ESCRITA
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-2xl md:text-3xl text-[#1C1916] font-medium tracking-tight leading-tight"
          >
            Sua voz gravada na eternidade do papel.
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4 }}
            className="text-[13px] font-serif italic text-[#3D3D3D]/90 max-w-md mx-auto leading-relaxed"
          >
            “Há palavras que morrem na página física. <br className="hidden sm:block" />Outras criam raízes permanentes no coração de quem as colhe.”
          </motion.p>
        </div>

        {/* EXIBIÇÃO DO TRECHO SALVO (JOURNAL PREVIEW) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="my-6 p-5.5 rounded-2xl elevation-1 relative overflow-hidden bg-[#FAF8F3]"
        >
          {/* Paper lines background effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-400/20 ml-6 pointer-events-none" />
          <div className="pl-4 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-[#BDAB9C] tracking-wide block uppercase">Trecho destacado</span>
              <p className="font-serif italic text-[15px] md:text-[16px] text-[#1C1916] leading-relaxed border-l-2 border-[#1C1916]/15 pl-3.5">
                “{margem.quote}”
              </p>
            </div>
            
            <div className="flex gap-2 items-center text-xs font-sans text-stone-800 font-medium">
              <LinesDiaryIcon size={14} className="text-[#BDAB9C]" />
              <span className="font-semibold">{margem.bookTitle}</span>
              <span className="opacity-40">•</span>
              <span className="italic">por {margem.author}</span>
            </div>

            <div className="pt-3 border-t border-[#BDAB9C]/25 space-y-1.5">
              <span className="text-[10px] font-mono text-[#BDAB9C] tracking-wide block uppercase">Sua Margem</span>
              <p className="font-serif text-[14px] md:text-[15px] text-stone-850 leading-relaxed italic">
                {margem.thought}
              </p>
            </div>
          </div>
        </motion.div>

        {/* MICROMOMENTO DE IDENTIDADE */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-[#BDAB9C]/10 border border-[#BDAB9C]/25 rounded-xl space-y-1.5 text-center relative"
        >
          <div className="absolute top-2 right-3 text-[#C5895A] animate-pulse">
            <AuraIcon size={14} />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wide text-[#BDAB9C] font-bold">
            Reflexo de Alma Leitora
          </p>
          <p className="text-sm font-serif italic text-[#1C1916] px-2 leading-relaxed">
            “{insight}”
          </p>
        </motion.div>

        {/* ACTIONS SECTION */}
        <div className="mt-6 pt-5 border-t border-[#BDAB9C]/35 space-y-3">
          
          {/* ACTION 1: Story (Dominant) */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onShareStory}
            className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 px-4 rounded-xl font-sans text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 journal-shadow cursor-pointer border border-[#1C1916]"
          >
            <ShareIcon size={16} className="text-[#BDAB9C]" />
            <span>Modelar para Partilha</span>
          </motion.button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* ACTION 2: DNA Literário */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleDNAAction}
              className={`py-3 px-3 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                addedToDNA 
                  ? "bg-[#FAF8F3] border-[#BDAB9C] text-[#BDAB9C] cursor-default" 
                  : "bg-[#FAF8F3] border-[#BDAB9C]/60 hover:border-[#1C1916] text-stone-850 hover:bg-[#1C1916]/5"
              }`}
            >
              {addedToDNA ? (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#C5895A]"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Incorporado ao DNA</span>
                </>
              ) : (
                <>
                  <AuraIcon size={16} className="text-[#BDAB9C]" />
                  <span>Entrelaçar ao DNA Literário</span>
                </>
              )}
            </motion.button>

            {/* ACTION 3: Encontrar Ecos */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onFindEcos}
              className="py-3 px-3 rounded-xl bg-[#FAF8F3] border border-[#BDAB9C]/60 hover:border-[#1C1916] text-stone-850 hover:bg-[#1C1916]/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <DescobertasIcon size={16} className="text-[#BDAB9C]" />
              <span>Escutar Ecos do Jardim</span>
            </motion.button>
          </div>

          {/* Close/continue button */}
          <div className="flex justify-center pt-3">
            <button
              onClick={onClose}
              className="text-xs font-sans font-semibold text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer"
            >
              Concluir e recolher ao silêncio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
