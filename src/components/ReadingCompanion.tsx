import React, { useState, useRef, useEffect } from "react";
import { Margem, UserProfile } from "../types";
import { IdentityIcon, RefreshIcon, AuraIcon } from "./icons/MarginaliaIcons";
import { MarginaliaMark } from "./branding/MarginaliaMark";

interface ReadingCompanionProps {
  userProfile: UserProfile;
  margens: Margem[];
  chatMessages: { role: "user" | "companion"; content: string; timestamp: Date }[];
  onSendMessage: (content: string) => Promise<void>;
  companionLoading: boolean;
  activeContextMargem: Margem | null;
  onClearContext: () => void;
}

export default function ReadingCompanion({
  userProfile,
  margens,
  chatMessages,
  onSendMessage,
  companionLoading,
  activeContextMargem,
  onClearContext
}: ReadingCompanionProps) {
  const [inputText, setInputText] = useState("");
  const [mappingPsyche, setMappingPsyche] = useState(false);
  const [psycheLetter, setPsycheLetter] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, companionLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || companionLoading) return;
    onSendMessage(inputText);
    setInputText("");
  };

  // Quick prompt suggestions
  const suggestions = [
    { label: "Sugira leituras existencialistas", text: "Gostaria de sugestões de livros para debater o absurdo e as crises existenciais." },
    { label: "Me ajude a refinar minha Margem", text: "Estou lendo e quero escrever uma anotação poética e profunda à margem. Pode me guiar?" },
    { label: "Sugira obras de melancolia elegante", text: "Quais autores traduzem com mais beleza e delicadeza a solidão e a nostalgia?" }
  ];

  // Deep Emotional Pattern Analysis (Fase 9 - Companheira de Leitura)
  const handleMapPsyche = async () => {
    setMappingPsyche(true);
    setPsycheLetter(null);

    // Call server to generate reflection or craft a bespoke philosophical analysis of the reader's psyche
    try {
      const userMarginsCount = margens.filter(m => m.authorAvatar === userProfile.avatarSeed).length;
      const response = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Faça uma análise profunda da minha psiquê e padrões emocionais de leitor. 
Meu arquétipo literário atual é "${userProfile.title}". 
Eu já escrevi ${userMarginsCount} anotações nas margens. 
Meus rituais de leitura: "${userProfile.bio}". 
Escreva uma carta extremamente poética, profunda e carinhosa de 4 parágrafos pequenos sob a perspectiva de uma bibliotecária do século XIX. Identifique meus temas existenciais recorrentes e faça um convite à contemplação lenta.`
          }]
        })
      });
      const data = await response.json();
      if (data.reply) {
        setPsycheLetter(data.reply);
      }
    } catch (err) {
      console.error(err);
      setPsycheLetter(`Querida alma leitora,

Ao observar a tinta que você derrama nas frestas dos livros, vejo um habitante devoto das sombras férteis. Seu espírito repousa na doce melancolia e na busca silenciosa por verdades que recusam a claridade estridente do meio-dia.

Seu arquétipo, "${userProfile.title}", revela alguém que não lê para simplesmente escapar, mas para dialogar com o indizível. Cada dobra de página e cada anotação é um sinal de reverência aos silêncios sagrados.

Continue escrevendo nas margens. É lá, no limiar da página impressa, que sua própria alma de leitor encontra sua real morada.

Com profunda consideração,
Sua Companheira de Leitura.`);
    } finally {
      setMappingPsyche(false);
    }
  };

  return (
    <div className="space-y-6 animate-page-turn">
      
      {/* Intro Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase">Sintonização de Emoções</span>
        <h3 className="font-display font-semibold text-xl text-[#1C1916]">Sua Companheira Literária</h3>
        <p className="text-xs text-[#3D3D3D] opacity-80 leading-relaxed">
          Ela não é um robô utilitário. Ela é uma inteligência contemplativa que habita a biblioteca antiga com você. Peça conselhos, debata metáforas ou analise seus sentimentos profundos.
        </p>
      </div>

      {/* Deep Psyche mapping tool (Fase 9) */}
      <div className="bg-gradient-to-tr from-[#FAF8F3] to-[#F3EFE9] border border-[#BDAB9C] rounded-2xl p-5 journal-shadow space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] flex items-center gap-1.5">
              <IdentityIcon size={16} className="text-[#C5895A]" />
              Mapear Meus Padrões Emocionais
            </h4>
            <p className="text-[10.5px] text-[#3D3D3D] opacity-85">
              A IA analisará suas anotações para desvendar as correntes invisíveis da sua mente leitora.
            </p>
          </div>
          
          <button
            onClick={handleMapPsyche}
            disabled={mappingPsyche}
            className="px-4 py-1.5 bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] font-sans text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            {mappingPsyche ? (
              <>
                <MarginaliaMark size={12} dotColor="#C5895A" color="#FAF8F3" strokeWidth={3} className="animate-spin-slow" />
                <span>Mapeando...</span>
              </>
            ) : (
              <>
                <AuraIcon size={14} />
                <span>Mapear</span>
              </>
            )}
          </button>
        </div>

        {/* Psyche Letter Container */}
        {psycheLetter && (
          <div className="bg-[#FAF8F3] border border-[#C5895A]/50 p-5 rounded-xl journal-shadow relative overflow-hidden animate-page-turn">
            <button 
              onClick={() => setPsycheLetter(null)}
              className="absolute top-2 right-2 text-xs text-[#BDAB9C] hover:text-[#1C1916]"
            >
              ✕
            </button>
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5895A]/30" />
            <h5 className="font-serif font-bold text-[11px] text-[#BDAB9C] uppercase tracking-wider mb-3">Sua Alma Revelada Pela Companheira</h5>
            <div className="font-serif text-xs md:text-sm leading-relaxed text-[#3D3D3D] italic space-y-3 whitespace-pre-wrap">
              {psycheLetter}
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Board */}
      <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl overflow-hidden journal-shadow flex flex-col h-[520px]">
        
        {/* Chat bar header info */}
        <div className="px-5 py-3.5 border-b border-[#BDAB9C]/25 bg-[#FAF8F3] flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#BDAB9C]/40 bg-[#FAF8F3] flex items-center justify-center">
              <AuraIcon size={16} className="text-[#C5895A]" />
            </div>
            <div>
              <p className="text-xs font-sans font-bold text-[#1C1916]">Companheira de Leitura</p>
              <p className="text-[9px] font-sans text-green-700 font-medium">🍃 Bibliotecária Atenta (Ativa)</p>
            </div>
          </div>

          {activeContextMargem && (
            <div className="hidden md:flex flex-col text-right text-[9px] max-w-xs">
              <span className="text-[#BDAB9C] font-mono uppercase tracking-widest">Foco de Leitura</span>
              <span className="text-[#1C1916] font-bold italic truncate">"{activeContextMargem.quote}"</span>
            </div>
          )}
        </div>

        {/* Message feed stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF8F3] relative">
          
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-repeat bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400')]" style={{ mixBlendMode: "overlay" }} />

          {chatMessages.map((msg, i) => (
            <div 
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-page-turn`}
            >
              <div className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm font-serif italic leading-relaxed relative ${
                msg.role === "user" 
                  ? "bg-[#1C1916] text-[#FAF8F3] rounded-tr-xs shadow-xs" 
                  : "bg-[#BDAB9C]/10 text-[#3D3D3D] rounded-tl-xs border border-[#BDAB9C]/25"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="text-[8px] font-mono opacity-40 block mt-1.5 text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {companionLoading && (
            <div className="flex justify-start">
              <div className="bg-[#BDAB9C]/10 border border-[#BDAB9C]/30 rounded-2xl px-4 py-3 rounded-tl-xs flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#1C1916]/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-[#1C1916]/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-[#1C1916]/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* SUGGESTION RAIL */}
        <div className="px-4 py-2 bg-[#FAF8F3] border-t border-[#BDAB9C]/15 flex gap-2 overflow-x-auto select-none no-scrollbar">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(sug.text)}
              className="text-[10px] font-sans bg-[#1C1916]/5 hover:bg-[#1C1916]/10 text-[#3D3D3D] px-3 py-1.5 rounded-lg border border-[#BDAB9C]/20 whitespace-nowrap cursor-pointer transition-colors"
            >
              {sug.label}
            </button>
          ))}
        </div>

        {/* Active context badge */}
        {activeContextMargem && (
          <div className="bg-[#BDAB9C]/5 border-t border-[#BDAB9C]/20 px-5 py-2 flex justify-between items-center text-[10px]">
            <p className="text-[#3D3D3D] font-serif truncate italic">
              Referenciando: <span className="font-semibold">"{activeContextMargem.quote}"</span> de {activeContextMargem.author}
            </p>
            <button 
              onClick={onClearContext}
              className="text-red-700 hover:bg-red-50 text-[10px] px-1 rounded"
              title="Remover contexto ativo"
            >
              ✕
            </button>
          </div>
        )}

        {/* Input box form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[#BDAB9C]/20 bg-[#FAF8F3] flex gap-2">
          <input
            type="text"
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Peça sugestões, debata um absurdo ou analise um subtexto literário..."
            className="flex-1 bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded-xl px-4 py-3 text-xs md:text-sm font-serif text-[#1C1916] placeholder-[#BDAB9C]/70 focus:outline-none focus:border-[#1C1916]"
          />
          <button
            type="submit"
            disabled={companionLoading || !inputText.trim()}
            className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] p-3 rounded-xl disabled:opacity-40 transition-all cursor-pointer shadow-xs"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>

      </div>

    </div>
  );
}
