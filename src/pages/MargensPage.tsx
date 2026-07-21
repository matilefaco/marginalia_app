import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  ChevronRight, 
  X, 
  Plus, 
  Sparkles, 
  Feather, 
  Heart, 
  MessageSquare, 
  Share2, 
  EyeOff, 
  Library 
} from "lucide-react";
import { useMarginalia } from "../context/MarginaliaContext";
import { isFeatureEnabled } from "../config/featureFlags";
import { Margem, SpoilerLevel } from "../types";
import { AESTHETIC_THEMES, INITIAL_ECOS } from "../data";
import { DailyOpeningMoment } from "../components/DailyOpeningMoment";
import { EchoIcon } from "../components/icons/MarginaliaIcons";
import { orderFeedForDiscovery, pickMargemDoDia } from "../utils/feedAlgorithm";

export const MargensPage: React.FC = () => {
  const { 
    margens, 
    setMargens, 
    userProfile, 
    triggerChallengeComplete, 
    setSharingMargem, 
    setChatActiveMargem, 
    setChatMessages, 
    setUserInputMessage,
    feedMode,
    setFeedMode,
    setShowFutureLetter
  } = useMarginalia();

  const navigate = useNavigate();

  // Local interactive states for feed
  const [unlockedSpoilers, setUnlockedSpoilers] = useState<Record<string, boolean>>({});
  const [activeCommentMargemId, setActiveCommentMargemId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");

  // Select displayed margins based on feedMode
  const userMargins = margens.filter(m => !m.isEditorial);
  const displayedFeed = feedMode === "minhas-margens"
    ? [...userMargins].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : orderFeedForDiscovery(margens, userProfile || { 
        name: "Visitante", 
        username: "visitante", 
        title: "O Explorador Silencioso", 
        description: "Em busca das dobras invisíveis do diário.", 
        signatureQuote: "Pensar é o ato de tatear o invisível no escuro.", 
        recommendedEcos: [], 
        aestheticColor: "#BDAB9C", 
        aestheticSymbol: "Pena de Ganso", 
        streakDays: 0, 
        booksReadCount: 0, 
        savedCount: 0 
      });

  const margemDoDia = feedMode === "minhas-margens"
    ? (userMargins.length > 0 ? pickMargemDoDia(userMargins) : null)
    : pickMargemDoDia(margens);

  const handleToggleLove = (margemId: string) => {
    const username = userProfile?.username || "anonymous";
    setMargens(prev => 
      prev.map(m => {
        if (m.id === margemId) {
          const alreadyLoved = m.loves.includes(username);
          const loves = alreadyLoved 
            ? m.loves.filter(u => u !== username)
            : [...m.loves, username];
          return {
            ...m,
            loves,
            lovesCount: alreadyLoved ? m.lovesCount - 1 : m.lovesCount + 1
          };
        }
        return m;
      })
    );
  };

  const handleAddComment = (margemId: string) => {
    if (!newCommentText.trim()) return;

    const newComment = {
      id: "comment_" + Date.now(),
      authorName: userProfile?.name || "Outro Leitor",
      authorAvatar: userProfile?.avatarSeed || "user",
      authorTitle: userProfile?.title || "O Explorador de Mundos",
      content: newCommentText,
      date: new Date().toISOString()
    };

    setMargens(prev => 
      prev.map(m => {
        if (m.id === margemId) {
          return {
            ...m,
            comments: [...m.comments, newComment]
          };
        }
        return m;
      })
    );

    setNewCommentText("");
    triggerChallengeComplete("ch2");
  };

  return (
    <div className="space-y-6 animate-page-turn">
      
      {/* Daily Opening Moment (Rituais) */}
      <DailyOpeningMoment 
        margens={margens}
        onTriggerAction={(action) => {
          if (action === "aura" || action === "soulmap") {
            navigate("/perfil");
          } else if (action === "companion") {
            navigate("/companheira");
          } else if (action === "write") {
            navigate("/margens/nova");
          } else if (action === "letter") {
            setShowFutureLetter(true);
          }
        }}
      />

      {/* Warm intro card */}
      <div className="bg-[#BDAB9C]/10 border border-[#BDAB9C]/30 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase">Sua Conexão</span>
          <h2 className="font-serif text-lg font-semibold text-[#1C1916]">
            "O que esse livro despertou em você?"
          </h2>
          <p className="text-xs text-[#3D3D3D] opacity-80 leading-relaxed max-w-md">
            No Marginalia, o que importa não é terminar volumes, mas guardar e compartilhar as pequenas emoções vividas na costura das páginas.
          </p>
        </div>
        <button
          onClick={() => navigate("/margens/nova")}
          className="bg-[#1C1916] text-[#FAF8F3] hover:bg-[#2A2724] px-4 py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 self-start md:self-center"
        >
          <Feather className="w-3.5 h-3.5" />
          <span>Abrir a margem</span>
        </button>
      </div>

      {/* Feed Selector Toggle & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#BDAB9C]/20 pb-3 gap-3">
        <h3 className="font-display font-semibold text-lg text-[#1C1916] tracking-tight flex items-center gap-2">
          <Library className="w-4 h-4 text-[#BDAB9C]" />
          O Livro das Páginas Dobradas
        </h3>
        
        <div className="flex bg-[#FAF8F3] border border-[#BDAB9C]/40 p-0.5 rounded-lg shadow-xs self-stretch md:self-auto">
          <button
            onClick={() => setFeedMode("minhas-margens")}
            className={`flex-1 md:flex-none px-3.5 py-1 rounded-md text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              feedMode === "minhas-margens"
                ? "bg-[#1C1916] text-[#FAF8F3] shadow-xs"
                : "text-[#BDAB9C] hover:text-[#1C1916]"
            }`}
          >
            <Feather className="w-3 h-3" />
            <span>Minhas Margens</span>
          </button>
          <button
            onClick={() => setFeedMode("curadoria")}
            className={`flex-1 md:flex-none px-3.5 py-1 rounded-md text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              feedMode === "curadoria"
                ? "bg-[#1C1916] text-[#FAF8F3] shadow-xs"
                : "text-[#BDAB9C] hover:text-[#1C1916]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Curadoria</span>
          </button>
        </div>
      </div>

      {/* Margem do Dia Highlight Card */}
      {margemDoDia && (
        <div className="bg-[#FAF8F3] border-2 border-[#C5895A] rounded-2xl journal-shadow overflow-hidden relative group transition-all duration-300 hover:scale-[1.005] animate-page-turn">
          <div className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5895A]/15 text-[9.5px] font-sans font-semibold text-stone-800 border border-[#C5895A]/40">
            <Sparkles className="w-3 h-3 text-[#C5895A] animate-pulse" />
            <span>{feedMode === "minhas-margens" ? "MARGEM DO DIA" : "CURADORIA MARGINALIA"}</span>
          </div>

          <div className="p-6 md:p-8 space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-[#BDAB9C] uppercase block break-words">{margemDoDia.bookTitle}</span>
            <p className="font-serif italic text-[18px] md:text-[20px] leading-relaxed text-[#1C1916] font-semibold pr-4 break-words">
              "{margemDoDia.quote}"
            </p>
            <div className="w-10 h-[1.5px] bg-[#C5895A] my-3 opacity-80" />
            <p className="font-sans font-normal text-[15px] leading-relaxed italic text-[#3D3D3D] pl-3 border-l-2 border-[#BDAB9C]/30 break-words">
              {margemDoDia.thought}
            </p>
            
            <div className="flex flex-wrap justify-between items-center pt-3 border-t border-[#BDAB9C]/10 text-xs text-[#3D3D3D] gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-[#BDAB9C]/20 border border-[#BDAB9C]/30 flex items-center justify-center font-display text-[10px] font-bold text-[#1C1916] flex-shrink-0">
                  {margemDoDia.authorName.charAt(0)}
                </div>
                <span className="font-sans font-semibold truncate max-w-[120px] md:max-w-[180px]">@{margemDoDia.authorAvatar}</span>
              </div>
              
              <button 
                onClick={() => setSharingMargem(margemDoDia)}
                className="text-[10px] font-sans text-stone-800 hover:text-[#1C1916] flex items-center gap-1 cursor-pointer font-semibold bg-[#BDAB9C]/10 px-2.5 py-1 rounded-lg border border-[#BDAB9C]/30 flex-shrink-0"
              >
                <Share2 className="w-3 h-3" />
                <span>Compartilhar margem</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Feed Container */}
      <div className="space-y-6">
        {displayedFeed.length > 0 ? (
          displayedFeed.map((margem) => {
            const theme = AESTHETIC_THEMES.find(t => t.key === (margem.themeKey || "classic")) || AESTHETIC_THEMES[0];
            const hasSpoiler = margem.spoilerLevel !== "none";
            const spoilerUnlocked = unlockedSpoilers[margem.id];

            return (
              <article 
                key={margem.id}
                className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-2xl journal-shadow overflow-hidden flex flex-col transition-all hover:border-[#BDAB9C] group animate-page-turn"
              >
                {/* Paper Spine & Header meta */}
                <div className="px-5 py-4 border-b border-[#BDAB9C]/20 bg-[#FAF8F3] flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#BDAB9C]/20 border border-[#BDAB9C]/30 flex items-center justify-center font-display text-xs font-bold text-[#1C1916]">
                      {margem.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-sans font-semibold text-[#1C1916] flex items-center gap-1">
                        <span>{margem.authorName}</span>
                        <span className="text-[10px] font-mono text-[#BDAB9C] font-normal">@{margem.authorAvatar}</span>
                      </p>
                      <p className="text-[9px] font-sans text-[#BDAB9C] tracking-wide">{margem.authorTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {margem.ecoId && (
                      <span className="px-2 py-0.5 rounded-full bg-[#BDAB9C]/10 border border-[#BDAB9C]/20 text-[9px] font-sans text-[#3D3D3D] opacity-90 flex items-center gap-1">
                        <EchoIcon size={10} className="text-[#3D3D3D]/70" /> Eco: {INITIAL_ECOS.find(e => e.id === margem.ecoId)?.name || "Geral"}
                      </span>
                    )}
                    <span className="text-[9.5px] font-mono text-[#BDAB9C]">
                      {new Date(margem.date).toLocaleDateString("pt-BR", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Main Literary Card Rendering */}
                <div className={`p-6 md:p-8 relative ${theme.bg} ${theme.text} flex flex-col justify-between overflow-hidden min-h-[220px]`}>
                  {/* Tactile Texture Effect */}
                  <div className="absolute inset-0 tactile-overlay" />

                  {/* SPOILER UX OVERLAY */}
                  {hasSpoiler && !spoilerUnlocked && (
                    <div className="absolute inset-0 bg-[#FAF8F3]/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center">
                      <EyeOff className="w-8 h-8 text-[#BDAB9C] mb-2" />
                      <h4 className="font-display font-semibold text-xs text-[#1C1916] uppercase tracking-wider">
                        Análise protegida por Spoiler
                      </h4>
                      <p className="text-[11px] text-[#3D3D3D] max-w-xs mt-1 mb-4 italic font-serif">
                        Esta margem contém revelações sobre "{margem.bookTitle}". Classificado como: 
                        <span className="font-semibold text-red-700 block mt-0.5">
                          {margem.spoilerLevel === "light" ? "Spoiler Leve (Mundo)" : margem.spoilerLevel === "moderate" ? "Spoiler Moderado" : "Spoiler Pesado (Segredo)"}
                        </span>
                      </p>
                      <button
                        onClick={() => setUnlockedSpoilers(prev => ({ ...prev, [margem.id]: true }))}
                        className="px-4 py-1.5 bg-[#1C1916] text-[#FAF8F3] hover:bg-[#2A2724] text-xs font-sans rounded-md transition-colors cursor-pointer"
                      >
                        Revelar com Cuidado
                      </button>
                    </div>
                  )}

                  {/* Left quote border */}
                  <div className="space-y-4">
                    <p className="font-serif italic text-[17px] md:text-[19px] leading-relaxed relative font-medium opacity-95">
                      <span className="absolute -top-3 -left-3 text-3xl font-serif text-[#BDAB9C] opacity-40">“</span>
                      {margem.quote}
                    </p>

                    <div className="flex justify-start my-2.5">
                      <div className="w-10 h-[1.5px] bg-[#C5895A]" style={{ opacity: 0.7 }} />
                    </div>

                    {/* Reader margin reflection */}
                    <p className="font-sans font-normal text-[15px] leading-relaxed italic opacity-95 pl-3 border-l-2 border-[#BDAB9C]/30">
                      {margem.thought}
                    </p>
                  </div>

                  {/* Author Book credits */}
                  <div className="pt-4 border-t border-current border-opacity-10 mt-6 flex justify-between items-center text-[10px] uppercase tracking-wider font-sans opacity-80">
                    <div>
                      <span className="font-semibold block text-opacity-100">{margem.bookTitle}</span>
                      <span className="opacity-60 text-[9px]">{margem.author}</span>
                    </div>
                    <span className="italic font-serif text-[10.5px] tracking-normal normal-case">Margem de @{margem.authorAvatar}</span>
                  </div>
                </div>

                {/* Card Action footer (Loves, comments, share, AI prompt) */}
                <div className="px-5 py-3 border-t border-[#BDAB9C]/20 bg-[#FAF8F3] flex justify-between items-center text-xs text-[#3D3D3D]">
                  
                  <div className="flex items-center gap-4">
                    {/* Heart/Love Button */}
                    {isFeatureEnabled("reactions") && (
                      <button 
                        onClick={() => handleToggleLove(margem.id)}
                        className="flex items-center gap-1.5 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${userProfile && margem.loves.includes(userProfile.username || "anon") ? "fill-red-600 text-red-600 animate-pulse" : ""}`} />
                        <span className="font-medium">{margem.lovesCount} ressoou</span>
                      </button>
                    )}

                    {/* Comments Trigger */}
                    {isFeatureEnabled("comments") && (
                      <button 
                        onClick={() => setActiveCommentMargemId(activeCommentMargemId === margem.id ? null : margem.id)}
                        className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-[#BDAB9C]" />
                        <span className="font-medium">{margem.comments.length} reflexões</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Send active quote to AI chatbot instantly */}
                    <button
                      onClick={() => {
                        setChatActiveMargem(margem);
                        setChatMessages([
                          {
                            role: "user",
                            content: `Gostaria de debater o trecho de "${margem.bookTitle}" com você. O trecho é: "${margem.quote}". O que você pode expandir sobre ele?`,
                            timestamp: new Date()
                          }
                        ]);
                        setUserInputMessage(" "); // invisibly nudge to trigger companion
                        navigate("/companheira");
                      }}
                      className="text-[10px] font-sans text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1 transition-colors cursor-pointer"
                      title="Debater trecho com a Companheira IA"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Aprofundar com a Companheira</span>
                    </button>

                    {/* Share Modal Trigger */}
                    {isFeatureEnabled("shareStudio") && (
                      <button 
                        onClick={() => setSharingMargem(margem)}
                        className="text-[10px] font-sans text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Exportar para Redes Sociais"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Compartilhar</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Interactive Comments Drawer */}
                {isFeatureEnabled("comments") && activeCommentMargemId === margem.id && (
                  <div className="bg-[#1C1916]/5 px-5 py-4 border-t border-[#BDAB9C]/20 space-y-4">
                    
                    {/* Existing Comments */}
                    {margem.comments.length > 0 ? (
                      <div className="space-y-3">
                        {margem.comments.map(c => (
                          <div key={c.id} className="bg-[#FAF8F3] border border-[#BDAB9C]/20 rounded-xl p-3 shadow-xs">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center gap-1.5">
                                <p className="text-[11px] font-sans font-bold text-[#1C1916]">{c.authorName}</p>
                                <span className="text-[9px] font-sans text-[#BDAB9C]">{c.authorTitle}</span>
                              </div>
                              <span className="text-[9px] font-mono text-[#BDAB9C]">
                                {new Date(c.date).toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className="text-xs font-serif italic text-[#3D3D3D]">{c.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-[11px] text-[#BDAB9C] py-2 italic font-serif">
                        Sem comentários por aqui. Escreva sua primeira reflexão abaixo para estender o diálogo poético.
                      </p>
                    )}

                    {/* Write Comment Form */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Adicione sua interpretação poética..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(margem.id)}
                        className="flex-1 bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-lg px-3 py-2 text-xs font-serif text-[#1C1916] placeholder-[#BDAB9C]"
                      />
                      <button
                        onClick={() => handleAddComment(margem.id)}
                        className="px-4 py-2 bg-[#1C1916] text-[#FAF8F3] hover:bg-[#2A2724] text-xs font-sans rounded-lg cursor-pointer font-semibold transition-all"
                      >
                        Publicar
                      </button>
                    </div>

                  </div>
                )}

              </article>
            );
          })
        ) : (
          <div className="bg-[#FAF8F3] border border-[#BDAB9C]/30 rounded-2xl p-10 text-center journal-shadow space-y-4 animate-page-turn">
            <Feather className="w-10 h-10 text-[#BDAB9C] mx-auto opacity-60" />
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-[#1C1916]">
                Seu diário de margens está silencioso
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                Suas anotações pessoais aparecerão aqui. Clique no botão abaixo para abrir as margens e registrar sua primeira reflexão!
              </p>
            </div>
            <button
              onClick={() => navigate("/margens/nova")}
              className="inline-flex bg-[#1C1916] text-[#FAF8F3] hover:bg-[#2A2724] px-4 py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer shadow-sm items-center gap-1.5"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>Criar Primeira Margem</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
