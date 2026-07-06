import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Share2, Compass, Check, BookOpen, Feather } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1916]/85 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-6 md:p-8 journal-shadow relative overflow-hidden my-8"
      >
        {/* Subtle decorative elements for editorial/paper look */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1C1916]" />
        <div className="absolute right-4 top-4 text-[9px] font-mono tracking-widest uppercase opacity-25">
          Marginalia Record
        </div>

        {/* HEADER */}
        <div className="space-y-2 text-center pb-6 border-b border-[#BDAB9C]/30">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-mono uppercase tracking-widest text-[#BDAB9C]"
          >
            Anotação Consagrada
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-xl md:text-2xl text-[#1C1916] font-semibold font-serif tracking-tight"
          >
            Essa frase agora tem uma segunda vida.
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
            className="text-xs font-serif italic text-[#3D3D3D]/80 max-w-md mx-auto leading-relaxed"
          >
            “Algumas palavras terminam na página.<br />Outras continuam vivendo dentro de quem as encontrou.”
          </motion.p>
        </div>

        {/* EXIBIÇÃO DO TRECHO SALVO (JOURNAL PREVIEW) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="my-6 p-5 rounded-xl border border-[#BDAB9C]/40 bg-[#FAF8F3] relative journal-shadow overflow-hidden"
        >
          {/* Paper lines background effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-red-400/20 ml-6 pointer-events-none" />
          <div className="pl-4 space-y-3.5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#BDAB9C] tracking-wider block uppercase">Trecho destacado</span>
              <p className="font-serif italic text-xs md:text-sm text-[#1C1916] leading-relaxed border-l-2 border-[#1C1916]/10 pl-3">
                “{margem.quote}”
              </p>
            </div>
            
            <div className="flex gap-2 items-center text-[10px] font-sans text-[#3D3D3D]/70 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-[#BDAB9C]" />
              <span>{margem.bookTitle}</span>
              <span className="opacity-40">•</span>
              <span className="italic">por {margem.author}</span>
            </div>

            <div className="pt-2.5 border-t border-[#BDAB9C]/25 space-y-1">
              <span className="text-[10px] font-mono text-[#BDAB9C] tracking-wider block uppercase">Sua Margem</span>
              <p className="font-serif text-xs text-[#3D3D3D] leading-relaxed italic">
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
          className="p-4 bg-[#BDAB9C]/10 border border-[#BDAB9C]/30 rounded-xl space-y-1 text-center relative"
        >
          <div className="absolute top-2 right-3 text-[#C5A880] animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="text-[9px] font-mono uppercase tracking-widest text-[#BDAB9C] font-semibold">
            Talvez isso diga algo sobre você
          </p>
          <p className="text-xs font-serif italic text-[#1C1916] px-2 leading-relaxed">
            “{insight}”
          </p>
        </motion.div>

        {/* ACTIONS SECTION */}
        <div className="mt-6 pt-5 border-t border-[#BDAB9C]/30 space-y-3">
          
          {/* ACTION 1: Story (Dominant) */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onShareStory}
            className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 px-4 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 journal-shadow cursor-pointer border border-[#1C1916]"
          >
            <Share2 className="w-4 h-4 text-[#BDAB9C]" />
            <span>Transformar em Story</span>
          </motion.button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* ACTION 2: DNA Literário */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleDNAAction}
              className={`py-3 px-3 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                addedToDNA 
                  ? "bg-[#FAF8F3] border-[#BDAB9C] text-[#BDAB9C] cursor-default" 
                  : "bg-[#FAF8F3] border-[#BDAB9C]/60 hover:border-[#1C1916] text-[#3D3D3D] hover:bg-[#1C1916]/5"
              }`}
            >
              {addedToDNA ? (
                <>
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Incorporado ao DNA</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#BDAB9C]" />
                  <span>Adicionar ao DNA Literário</span>
                </>
              )}
            </motion.button>

            {/* ACTION 3: Encontrar Ecos */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onFindEcos}
              className="py-3 px-3 rounded-xl bg-[#FAF8F3] border border-[#BDAB9C]/60 hover:border-[#1C1916] text-[#3D3D3D] hover:bg-[#1C1916]/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#BDAB9C]" />
              <span>Encontrar Ecos Parecidos</span>
            </motion.button>
          </div>

          {/* Close/continue button */}
          <div className="flex justify-center pt-3">
            <button
              onClick={onClose}
              className="text-xs font-sans font-medium text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer"
            >
              Concluir e voltar ao Diário
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
