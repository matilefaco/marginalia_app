import React, { useState } from "react";
import { UserProfile, Margem } from "../types";
import { Sliders, Flame, Heart, BookOpen, Clock, Calendar, Sparkles, Trophy, Plus, HelpCircle } from "lucide-react";

interface ReaderProfileProps {
  userProfile: UserProfile;
  margens: Margem[];
  onTriggerWrapped: () => void;
  onReset: () => void;
}

export default function ReaderProfile({ userProfile, margens, onTriggerWrapped, onReset }: ReaderProfileProps) {
  const [activeSubTab, setActiveSubTab] = useState<"identidade" | "historico" | "recompensas">("identidade");

  // Filter margins created by user
  const userMargins = margens.filter(m => m.authorAvatar === userProfile.avatarSeed || m.authorName === userProfile.name);

  // Dynamic emotional map based on user's active margins if exists, otherwise preset
  const emotionalMap = userProfile.emotionalMap || {
    "Melancolia Elegante": 45,
    "Solidão Bonita": 25,
    "Crises Existenciais": 20,
    "Esperança Atenta": 10
  };

  const shapingBooks = userProfile.shapingBooks || [
    "Cem Anos de Solidão",
    "O Mito de Sísifo",
    "Livro do Desassossego"
  ];

  const atmospheres = userProfile.favoriteAtmospheres || [
    "Chuva batendo de leve na vidraça",
    "Café com aroma fresco de canela de tarde",
    "O silêncio sagrado de uma biblioteca antiga"
  ];

  const timeline = userProfile.literaryTimeline || [
    { date: "2026-06", event: "Dobrou a primeira página física de Dostoiévski no escuro.", book: "Crime e Castigo" },
    { date: "2026-06-20", event: "Encontrou consolo existencial no absurdo sorridente de Camus.", book: "O Mito de Sísifo" },
    { date: "2026-07-02", event: "Criou sua primeira Margem na eternidade do Realismo Mágico.", book: "Cem Anos de Solidão" }
  ];

  // Literary Honors (Phase 7 - Recompensas Não Infantis)
  const honors = [
    {
      title: "🕯️ Guardião da Melancolia",
      description: "Concedido a leitores cujas anotações capturam a doçura sutil do recolhimento poético.",
      requirement: "Registrar 3 margens com sentimentos melancólicos",
      unlocked: userMargins.length >= 1
    },
    {
      title: "✍️ Colecionador de Silêncios",
      description: "Concedido para mentes que buscam registrar o invisível entre as linhas de livros eternos.",
      requirement: "Escrever pelo menos 5 margens no diário",
      unlocked: userMargins.length >= 3
    },
    {
      title: "🧭 Cartógrafo das Emoções",
      description: "Para quem cruza diferentes sentimentos sem medo de se perder no labirinto da alma.",
      requirement: "Explorar mais de 3 categorias emocionais de Ecos",
      unlocked: true
    },
    {
      title: "🌌 Observador de Estrelas",
      description: "Leitores que convidam a Companheira IA para debater mistérios poéticos na escuridão.",
      requirement: "Completar uma conversa profunda sobre subtextos",
      unlocked: true
    }
  ];

  return (
    <div className="space-y-6 animate-page-turn">
      
      {/* Identity Banner header */}
      <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl overflow-hidden journal-shadow">
        <div className="h-28 bg-[#BDAB9C]/15 relative overflow-hidden">
          <div className="absolute inset-0 tactile-overlay" />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] text-[10px] font-sans font-semibold text-[#1C1916] border border-[#BDAB9C]">
            🔥 {userProfile.streakDays} Dias Seguidos
          </div>
        </div>

        <div className="px-6 pb-6 relative">
          <div className="w-20 h-20 rounded-full border-4 border-[#FAF8F3] bg-[#FAF8F3] journal-shadow flex items-center justify-center -mt-10 mx-auto md:mx-0 overflow-hidden">
            <div className="w-full h-full bg-[#1C1916] text-[#FAF8F3] font-serif font-semibold text-2xl flex items-center justify-center">
              {userProfile.name?.charAt(0) || "L"}
            </div>
          </div>

          <div className="mt-4 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1C1916]">{userProfile.name}</h3>
                <p className="text-xs font-mono text-[#BDAB9C]">@{userProfile.username}</p>
              </div>

              {/* Archetype badge */}
              <div className="flex flex-col md:flex-row gap-2 self-center md:self-end">
                <span className="px-3 py-1 bg-[#1C1916]/10 text-[#1C1916] rounded-full text-xs font-sans font-medium border border-[#BDAB9C]/40">
                  🎭 {userProfile.title}
                </span>
                
                {/* Wrapped Button - Phase 10 */}
                <button
                  onClick={onTriggerWrapped}
                  className="px-3.5 py-1 bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-full text-xs font-sans font-bold shadow-xs hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sua Retrospectiva</span>
                </button>
              </div>
            </div>

            <p className="font-serif italic text-xs leading-relaxed text-[#3D3D3D] max-w-xl">
              "{userProfile.bio || "Habitante de mundos dobrados nas margens."}"
            </p>

            <div className="pt-2 flex justify-center md:justify-start gap-5 text-xs font-sans text-[#3D3D3D]">
              <div><span className="font-bold text-[#1C1916]">{userMargins.length}</span> Margens escritas</div>
              <div><span className="font-bold text-[#1C1916]">{shapingBooks.length}</span> Livros de Alma</div>
              <div><span className="font-bold text-[#1C1916]">@{userProfile.aestheticSymbol || "Símbolo"}</span> Sinal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile sub-navigation (Notion-like) */}
      <div className="flex border-b border-[#BDAB9C]/30 gap-6 text-xs font-sans font-medium">
        <button
          onClick={() => setActiveSubTab("identidade")}
          className={`pb-2 border-b-2 transition-all ${
            activeSubTab === "identidade" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
          }`}
        >
          Minha Alma Leitora
        </button>
        <button
          onClick={() => setActiveSubTab("historico")}
          className={`pb-2 border-b-2 transition-all ${
            activeSubTab === "historico" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
          }`}
        >
          Diário de Linhas
        </button>
        <button
          onClick={() => setActiveSubTab("recompensas")}
          className={`pb-2 border-b-2 transition-all ${
            activeSubTab === "recompensas" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
          }`}
        >
          Títulos Honorários
        </button>
      </div>

      {/* TAB SUB-CONTENT 1: ALMA LEITORA */}
      {activeSubTab === "identidade" && (
        <div className="space-y-6 animate-page-turn">
          
          {/* Aesthetic Quote block */}
          <div className="p-5 bg-gradient-to-tr from-[#FAF8F3] to-[#F5ECE1] border border-[#BDAB9C] rounded-xl relative overflow-hidden journal-shadow">
            <div className="absolute top-2 right-3 font-mono text-[9px] text-[#BDAB9C]">
              SÍMBOLO: {userProfile.aestheticSymbol || "Pena de Ganso"}
            </div>
            <h4 className="font-sans font-bold text-[10px] text-[#BDAB9C] uppercase tracking-wider mb-2">Assinatura Literária</h4>
            <p className="font-serif italic text-sm text-[#1C1916] leading-relaxed font-semibold">
              "{userProfile.signatureQuote || "Pensar é o ato de tatear o invisível no escuro."}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Emotional Map (Fase 3 - Mapa Emocional) */}
            <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-5 journal-shadow space-y-4">
              <div>
                <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">Mapa Emocional</h4>
                <p className="text-[10px] text-[#BDAB9C]">Padrões sentimentais destilados de suas reflexões</p>
              </div>

              <div className="space-y-3.5">
                {Object.entries(emotionalMap).map(([emotion, val]) => (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between text-xs font-serif italic text-[#3D3D3D]">
                      <span>{emotion}</span>
                      <span className="font-sans font-semibold text-[11px]">{val}%</span>
                    </div>
                    {/* Retro Elegant progress bar */}
                    <div className="w-full h-1.5 bg-[#BDAB9C]/10 rounded-full overflow-hidden border border-[#BDAB9C]/20">
                      <div 
                        className="h-full bg-[#1C1916] rounded-full transition-all duration-1000"
                        style={{ width: `${val}%`, backgroundColor: userProfile.aestheticColor || "#BDAB9C" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atmospheres & Shaping Books (Fase 3) */}
            <div className="space-y-4">
              
              {/* Atmosferas Favoritas */}
              <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-5 journal-shadow space-y-3">
                <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">Atmosferas Prediletas</h4>
                <ul className="space-y-2">
                  {atmospheres.map((atm, idx) => (
                    <li key={idx} className="text-xs font-serif italic text-[#3D3D3D] flex items-center gap-2">
                      <span className="text-[10px] opacity-40">☕</span>
                      <span>{atm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Livros que moldaram a alma */}
              <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-5 journal-shadow space-y-3">
                <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">Livros que Moldaram a Alma</h4>
                <ul className="space-y-2">
                  {shapingBooks.map((bk, idx) => (
                    <li key={idx} className="text-xs font-serif font-semibold text-[#1C1916] flex items-center gap-2">
                      <span className="text-[10px] opacity-40">📖</span>
                      <span>{bk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Literary Timeline (Fase 3) */}
          <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-5 journal-shadow space-y-4">
            <div>
              <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">Evolução Literária</h4>
              <p className="text-[10px] text-[#BDAB9C]">Linha do tempo poética das suas descobertas</p>
            </div>

            <div className="border-l border-[#BDAB9C]/30 ml-2 pl-4 space-y-5 relative">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Circle dot marker */}
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#FAF8F3] border-2 border-[#1C1916] group-hover:bg-[#1C1916] transition-colors" />
                  
                  <span className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider block">{item.date}</span>
                  <p className="text-xs font-serif italic text-[#3D3D3D] leading-relaxed mt-0.5">{item.event}</p>
                  {item.book && (
                    <span className="text-[10px] font-sans font-bold text-[#1C1916] opacity-75 mt-0.5 block">👉 Sob influência de: "{item.book}"</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB SUB-CONTENT 2: DIÁRIO DE LINHAS (User's created margins) */}
      {activeSubTab === "historico" && (
        <div className="space-y-4 animate-page-turn">
          {userMargins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userMargins.map((margem) => (
                <div key={margem.id} className="bg-[#FAF8F3] border border-[#BDAB9C]/30 rounded-xl p-4 journal-shadow space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono text-[#BDAB9C] uppercase">
                      <span>{margem.bookTitle}</span>
                      <span>{new Date(margem.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <p className="font-serif italic text-xs text-[#1C1916] font-semibold">"{margem.quote}"</p>
                    <p className="text-xs font-serif italic text-[#3D3D3D] leading-relaxed pl-3 border-l border-[#BDAB9C]/30 opacity-95">
                      {margem.thought}
                    </p>
                  </div>
                  <div className="text-[9px] font-mono text-[#BDAB9C] text-right">
                    Visual: {margem.themeKey === "classic" ? "Pergaminho" : margem.themeKey === "night" ? "Meia-Noite" : "Folha"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border border-dashed border-[#BDAB9C]/40 rounded-xl bg-[#FAF8F3]">
              <BookOpen className="w-8 h-8 text-[#BDAB9C] mx-auto mb-2 opacity-50" />
              <p className="text-xs font-serif italic text-[#BDAB9C]">
                Nenhuma dobra de página por aqui. Suas anotações à margem aparecerão neste diário íntimo.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB SUB-CONTENT 3: TÍTULOS HONORÁRIOS (Phase 7 - Recompensas) */}
      {activeSubTab === "recompensas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-page-turn">
          {honors.map((h, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border journal-shadow flex flex-col justify-between space-y-3 transition-all ${
                h.unlocked 
                  ? "bg-gradient-to-tr from-[#FAF8F3] to-[#FDF9F4] border-[#C5A880]/60" 
                  : "bg-gray-50/50 border-gray-200 opacity-60"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-bold text-xs text-[#1C1916]">{h.title}</h4>
                  {h.unlocked ? (
                    <span className="text-[8.5px] font-mono font-bold bg-[#C5A880]/15 text-amber-800 px-2 py-0.5 rounded uppercase tracking-wider">
                      CONCEDIDO
                    </span>
                  ) : (
                    <span className="text-[8.5px] font-mono bg-gray-200 text-gray-500 px-2 py-0.5 rounded uppercase tracking-wider">
                      BLOQUEADO
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#3D3D3D] leading-relaxed opacity-85 font-serif italic">
                  {h.description}
                </p>
              </div>

              <div className="text-[9px] font-mono text-[#BDAB9C] border-t border-[#BDAB9C]/10 pt-2 flex justify-between">
                <span>Requisito:</span>
                <span>{h.requirement}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
