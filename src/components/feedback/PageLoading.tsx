import React from "react";
import { MarginaliaMark } from "../branding/MarginaliaMark";

const QUOTES = [
  "“Tudo o que se passa na alma do leitor é, de algum modo, eterno.”",
  "“A leitura é um ato de traduzir a si mesmo.”",
  "“O que fica em você é a verdadeira escrita.”",
  "“Escrever nas margens é dialogar com o infinito.”",
  "“Procurando os silêncios que vivem entre as linhas...”"
];

export const PageLoading: React.FC = () => {
  const quote = React.useMemo(() => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-6 text-center space-y-6 animate-fade-in">
      <div className="relative flex items-center justify-center">
        <MarginaliaMark size={48} dotColor="#C5895A" color="#1C1916" strokeWidth={3} className="animate-spin-slow" />
      </div>
      <div className="space-y-2 max-w-sm">
        <p className="font-serif italic text-sm text-[#1C1916]/80 leading-relaxed">
          {quote}
        </p>
        <span className="text-[9px] font-mono tracking-[0.2em] text-[#BDAB9C] uppercase block">
          Carregando páginas
        </span>
      </div>
    </div>
  );
};

export default PageLoading;
