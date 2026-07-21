import React, { useState, useRef } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { UserProfile, Margem } from "../types";
import { ExportIcon, WrappedIcon, LinesDiaryIcon, FlameIcon, ClockIcon, BookOpenIcon, TrophyIcon, IdentityIcon, MarginIcon } from "./icons/MarginaliaIcons";
import { isFeatureEnabled } from "../config/featureFlags";
import { computeEmotionalMap } from "../utils/feedAlgorithm";

import { LiteraryAura } from "./LiteraryAura";
import { SoulMap } from "./SoulMap";
import { IdentityQuoteCard } from "./IdentityQuoteCard";
import { LiteraryCompatibility } from "./LiteraryCompatibility";
import { ErrorBoundary } from "./ErrorBoundary";

interface ReaderProfileProps {
  userProfile: UserProfile;
  margens: Margem[];
  onTriggerWrapped: () => void;
  onReset: () => void;
  onOpenAddMargem?: () => void;
}

export default function ReaderProfile({ userProfile, margens, onTriggerWrapped, onReset, onOpenAddMargem }: ReaderProfileProps) {
  const [activeSubTab, setActiveSubTab] = useState<"identidade" | "aura" | "mapa" | "compatibilidade" | "historico" | "recompensas">("identidade");
  const [exportingCard, setExportingCard] = useState(false);
  const identityCardRef = useRef<HTMLDivElement>(null);

  const handleExportIdentityCard = async () => {
    if (!identityCardRef.current) return;
    setExportingCard(true);
    try {
      await exportNodeAsPng(
        identityCardRef.current,
        `marginalia-cartao-${userProfile.username || "leitor"}`
      );
    } catch (err) {
      console.error("Falha ao exportar cartão de identidade:", err);
    } finally {
      setExportingCard(false);
    }
  };

  // Filter margins created by user
  const userMargins = (margens || []).filter(m => m && !m.isEditorial);

  // Dynamic emotional map based strictly on user's active margins computed dynamically
  const emotionalMap = computeEmotionalMap(userMargins) || {};

  // Shaping books based strictly on Origin Books or real margins
  const originBookTitles = (userProfile.literaryDNA?.originBooks || []).map(b => b.title);
  const marginBookTitles = userMargins.map(m => m.bookTitle).filter(Boolean);
  const shapingBooks = Array.from(new Set([...originBookTitles, ...marginBookTitles])).filter(Boolean);

  // Atmospheres from user profile only
  const atmospheres = userProfile.favoriteAtmospheres || [];

  // Dynamic timeline constructed solely from user margins (or real events)
  const timeline = userMargins.map(m => {
    const formattedDate = m.date ? m.date.slice(0, 10) : "";
    return {
      date: formattedDate,
      event: m.thought ? (m.thought.length > 60 ? m.thought.slice(0, 60) + "..." : m.thought) : "Registrou uma nova Margem.",
      book: m.bookTitle
    };
  }).sort((a, b) => b.date.localeCompare(a.date));

  // Literary Honors (Recompensas Não Infantis)
  const honors = isFeatureEnabled("honors") ? [
    {
      title: "Guardião da Melancolia",
      description: "Concedido a leitores cujas anotações capturam a doçura sutil do recolhimento poético.",
      requirement: "Registrar 3 margens com sentimentos melancólicos",
      unlocked: userMargins.length >= 3
    },
    {
      title: "Colecionador de Silêncios",
      description: "Concedido para mentes que buscam registrar o invisível entre as linhas de livros eternos.",
      requirement: "Escrever pelo menos 5 margens no diário",
      unlocked: userMargins.length >= 5
    },
    {
      title: "Cartógrafo das Emoções",
      description: "Para quem cruza differentes sentimentos sem medo de se perder no labirinto da alma.",
      requirement: "Explorar mais de 3 categorias emocionais de Ecos",
      unlocked: userMargins.length >= 3
    },
    {
      title: "Observador de Estrelas",
      description: "Leitores que convidam a Companheira IA para debater mistérios poéticos na escuridão.",
      requirement: "Completar uma conversa profunda sobre subtextos",
      unlocked: userMargins.length >= 1
    }
  ] : [];

  return (
    <div className="space-y-6 animate-page-turn">
      
      {/* Identity Banner header */}
      <div ref={identityCardRef} className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl overflow-hidden journal-shadow">
        <div className="h-28 bg-[#BDAB9C]/15 relative overflow-hidden">
          <div className="absolute inset-0 tactile-overlay" />
          {isFeatureEnabled("streaks") && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] text-[10px] font-sans font-semibold text-[#1C1916] border border-[#BDAB9C]">
              <FlameIcon size={12} className="text-[#C5895A]" />
              <span>{userProfile.streakDays} Dias Seguidos</span>
            </div>
          )}
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
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <h3 className="font-display text-xl font-semibold text-[#1C1916]">{userProfile.name}</h3>
                  <span className="px-2 py-0.5 bg-[#1C1916]/10 text-[#1C1916] rounded-full text-[10px] font-sans font-medium border border-[#BDAB9C]/30 flex items-center gap-1">
                    <IdentityIcon size={10} className="text-[#1C1916]/70" /> {userProfile.title}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#BDAB9C]">@{userProfile.username}</p>
              </div>

              {/* Archetype badge */}
              <div className="flex flex-col md:flex-row gap-2 self-center md:self-end no-export">
                <button
                  onClick={handleExportIdentityCard}
                  disabled={exportingCard}
                  className="px-3.5 py-1 bg-stone-800 hover:bg-stone-700 text-[#FAF8F3] rounded-full text-xs font-sans font-semibold border border-[#BDAB9C]/20 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <ExportIcon className="w-3 h-3" />
                  <span>{exportingCard ? "Gerando..." : "Exportar Cartão"}</span>
                </button>
                {isFeatureEnabled("wrapped") && (
                  <button
                    onClick={onTriggerWrapped}
                    className="px-3.5 py-1 bg-[#C5895A] hover:bg-[#b0784a] text-white rounded-full text-xs font-sans font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <WrappedIcon className="w-3.5 h-3.5" />
                    <span>Sua Retrospectiva</span>
                  </button>
                )}
              </div>
            </div>

            <p className="font-serif italic text-[14px] md:text-[15px] leading-relaxed text-stone-800 max-w-xl">
              “{userProfile.bio || "Habitante de mundos dobrados nas margens."}”
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
      <div className="flex border-b border-[#BDAB9C]/30 gap-6 text-xs font-sans font-medium overflow-x-auto scrollbar-none pb-1 no-export">
        <button
          onClick={() => setActiveSubTab("identidade")}
          className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === "identidade" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
          }`}
        >
          Minha Alma Leitora
        </button>
        {isFeatureEnabled("aura") && (
          <button
            onClick={() => setActiveSubTab("aura")}
            className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === "aura" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
            }`}
          >
            Aura Poética
          </button>
        )}
        {isFeatureEnabled("soulMap") && (
          <button
            onClick={() => setActiveSubTab("mapa")}
            className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === "mapa" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
            }`}
          >
            Mapa da Alma
          </button>
        )}
        {isFeatureEnabled("realCompatibility") && (
          <button
            onClick={() => setActiveSubTab("compatibilidade")}
            className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === "compatibilidade" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
            }`}
          >
            Sintonia de Leitores
          </button>
        )}
        <button
          onClick={() => setActiveSubTab("historico")}
          className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === "historico" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
          }`}
        >
          Diário de Linhas
        </button>
        {isFeatureEnabled("honors") && (
          <button
            onClick={() => setActiveSubTab("recompensas")}
            className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeSubTab === "recompensas" ? "border-[#1C1916] text-[#1C1916] font-bold" : "border-transparent text-[#BDAB9C]"
            }`}
          >
            Títulos Honorários
          </button>
        )}
      </div>

      {/* TAB SUB-CONTENT 1: ALMA LEITORA */}
      {activeSubTab === "identidade" && (
        <div className="space-y-6 animate-page-turn">
          
          {/* Aesthetic Quote block */}
          <div className="elevation-1 p-6 relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#FAF8F3] to-[#F5ECE1]">
            <div className="absolute top-4 right-4 font-mono text-[10px] text-[#BDAB9C] tracking-wide">
              SÍMBOLO: {userProfile.aestheticSymbol || "Pena de Ganso"}
            </div>
            <h4 className="font-sans font-bold text-[11px] text-[#BDAB9C] uppercase tracking-wider mb-2.5">Assinatura Literária</h4>
            <p className="font-serif italic text-[15px] md:text-[16px] text-[#1C1916] leading-relaxed font-semibold">
              “{userProfile.signatureQuote || "Pensar é o ato de tatear o invisível no escuro."}”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Emotional Map (Fase 3 - Mapa Emocional) */}
            <div className="elevation-1 p-6 rounded-2xl space-y-4.5">
              <div>
                <h4 className="font-sans font-bold text-sm uppercase text-[#1C1916] tracking-wide">Mapa Emocional</h4>
                <p className="text-xs text-[#BDAB9C] mt-0.5">Padrões sentimentais destilados de suas reflexões</p>
              </div>

              <div className="space-y-3.5">
                {Object.keys(emotionalMap).length > 0 ? (
                  Object.entries(emotionalMap).map(([emotion, val]) => (
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
                  ))
                ) : (
                  <p className="text-xs font-serif italic text-[#BDAB9C] py-4 text-center">
                    Crie margens para começar a mapear suas emoções literárias.
                  </p>
                )}
              </div>
            </div>

            {/* Atmospheres & Shaping Books (Fase 3) */}
            <div className="space-y-4">
              
              {/* Atmosferas Favoritas */}
              <div className="elevation-1 p-5 rounded-2xl space-y-3.5">
                <h4 className="font-sans font-bold text-sm uppercase text-[#1C1916] tracking-wide">Atmosferas Prediletas</h4>
                {atmospheres.length > 0 ? (
                  <ul className="space-y-2.5">
                    {atmospheres.map((atm, idx) => (
                      <li key={idx} className="text-sm font-serif italic text-stone-850 flex items-center gap-2">
                        <ClockIcon size={12} className="opacity-50 text-stone-500" />
                        <span>{atm}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs font-serif italic text-[#BDAB9C] text-center py-2">
                    Nenhuma atmosfera catalogada.
                  </p>
                )}
              </div>

              {/* Livros de Origem / que moldaram a alma */}
              {isFeatureEnabled("originBooks") && (
                <div className="elevation-1 p-5 rounded-2xl space-y-3.5">
                  <h4 className="font-sans font-bold text-sm uppercase text-[#1C1916] tracking-wide">Livros de Origem</h4>
                  {userProfile.literaryDNA?.originBooks && userProfile.literaryDNA.originBooks.length > 0 ? (
                    <div className="space-y-3">
                      {userProfile.literaryDNA.originBooks.map((book, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start bg-[#1C1916]/5 p-2 rounded-lg border border-[#BDAB9C]/20">
                          {book.coverUrl ? (
                            <img src={book.coverUrl} referrerPolicy="no-referrer" className="w-8 h-11 object-cover rounded shadow-xs" alt="" />
                          ) : (
                            <div className="w-8 h-11 bg-[#1C1916]/10 rounded flex items-center justify-center text-[#BDAB9C]">
                              <BookOpenIcon size={12} className="opacity-45 text-[#BDAB9C]" />
                            </div>
                          )}
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <h5 className="font-serif font-bold text-[11px] text-[#1C1916] truncate">{book.title}</h5>
                            <p className="text-[9px] font-sans text-[#3D3D3D]/80 truncate">por {book.author}</p>
                            <p className="font-serif italic text-[10px] text-[#3D3D3D]/70 leading-normal line-clamp-2">"{book.emotionalResidue}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    shapingBooks.length > 0 ? (
                      <ul className="space-y-2">
                        {shapingBooks.map((bk, idx) => (
                          <li key={idx} className="text-xs font-serif font-semibold text-[#1C1916] flex items-center gap-2">
                            <BookOpenIcon size={12} className="opacity-45 text-[#BDAB9C]" />
                            <span>{bk}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs font-serif italic text-[#BDAB9C] text-center py-2">
                        Nenhum livro de alma catalogado ainda.
                      </p>
                    )
                  )}
                </div>
              )}

            </div>

          </div>

          {/* Literary Timeline (Fase 3) */}
          <div className="elevation-1 p-6 rounded-2xl space-y-5">
            <div>
              <h4 className="font-sans font-bold text-sm uppercase text-[#1C1916] tracking-wide">Evolução Literária</h4>
              <p className="text-xs text-[#BDAB9C] mt-0.5">Linha do tempo poética das suas descobertas</p>
            </div>

            {timeline.length > 0 ? (
              <div className="border-l border-[#BDAB9C]/30 ml-2 pl-4 space-y-5 relative">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle dot marker */}
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#FAF8F3] border-2 border-[#1C1916] group-hover:bg-[#1C1916] transition-colors" />
                    
                    <span className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider block">{item.date}</span>
                    <p className="text-xs font-serif italic text-[#3D3D3D] leading-relaxed mt-0.5">{item.event}</p>
                    {item.book && (
                      <span className="text-[10px] font-sans font-bold text-[#1C1916] opacity-75 mt-0.5 flex items-center gap-1">
                        <MarginIcon size={10} className="text-stone-500" /> Sob influência de: "{item.book}"
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-serif italic text-[#BDAB9C] text-center py-4">
                Sua linha do tempo começará a florescer assim que você registrar suas próprias margens.
              </p>
            )}
          </div>

        </div>
      )}

      {/* TAB SUB-CONTENT: AURA POÉTICA */}
      {activeSubTab === "aura" && (
        <div className="space-y-6 animate-page-turn">
          <LiteraryAura userProfile={userProfile} margens={margens} />
        </div>
      )}

      {/* TAB SUB-CONTENT: MAPA DA ALMA */}
      {activeSubTab === "mapa" && (
        <div className="space-y-6 animate-page-turn">
          <ErrorBoundary fallbackMessage="Seu Mapa da Alma ainda está sendo desenhado.">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <SoulMap userProfile={userProfile} margens={margens} onOpenAddMargem={onOpenAddMargem} />
              </div>
              <div className="space-y-6">
                <IdentityQuoteCard userProfile={userProfile} margens={margens} />
                <div className="elevation-1 p-5 rounded-2xl space-y-3.5">
                  <h4 className="font-sans font-bold text-sm uppercase tracking-wide text-[#1C1916]">Sinal Cósmico</h4>
                  <p className="font-serif italic text-sm leading-relaxed text-stone-800">
                    Sua alma emite vibrações na frequência da pena de ganso. Cada margem criada expande seu rastro estelar no grande arquivo da sensibilidade humana.
                  </p>
                </div>
              </div>
            </div>
          </ErrorBoundary>
        </div>
      )}

      {/* TAB SUB-CONTENT: SINTONIA DE LEITORES */}
      {isFeatureEnabled("realCompatibility") && activeSubTab === "compatibilidade" && (
        <div className="space-y-6 animate-page-turn">
          <LiteraryCompatibility userProfile={userProfile} margens={margens} />
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
              <LinesDiaryIcon className="w-8 h-8 text-[#BDAB9C] mx-auto mb-2 opacity-50" />
              <p className="text-xs font-serif italic text-[#BDAB9C]">
                Nenhuma dobra de página por aqui. Suas anotações à margem aparecerão neste diário íntimo.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB SUB-CONTENT 3: TÍTULOS HONORÁRIOS (Phase 7 - Recompensas) */}
      {activeSubTab === "recompensas" && isFeatureEnabled("honors") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-page-turn">
          {honors.map((h, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border journal-shadow flex flex-col justify-between space-y-3 transition-all ${
                h.unlocked 
                  ? "bg-gradient-to-tr from-[#FAF8F3] to-[#FDF9F4] border-[#C5895A]/60" 
                  : "bg-gray-50/50 border-gray-200 opacity-60"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-bold text-xs text-[#1C1916] flex items-center gap-1.5">
                    <TrophyIcon size={14} className={h.unlocked ? "text-[#C5895A]" : "text-stone-400"} />
                    <span>{h.title}</span>
                  </h4>
                  {h.unlocked ? (
                    <span className="text-[8.5px] font-mono font-bold bg-[#C5895A]/15 text-[#C5895A] px-2 py-0.5 rounded uppercase tracking-wider">
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
