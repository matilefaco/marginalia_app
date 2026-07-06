import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Compass, 
  Feather, 
  Sparkles, 
  Ghost, 
  Hourglass, 
  Plus, 
  Heart, 
  MessageSquare, 
  Share2, 
  User, 
  Send, 
  ChevronRight, 
  EyeOff, 
  Check, 
  Flame, 
  BookMarked, 
  Library, 
  MessageCircle, 
  X, 
  RefreshCw, 
  Sliders, 
  Calendar, 
  TrendingUp,
  Sparkle,
  HelpCircle,
  Eye,
  LogOut,
  AlertCircle,
  Clock
} from "lucide-react";
import { UserProfile, Margem, Eco, BookHighlight, Challenge, SpoilerLevel } from "./types";
import { INITIAL_ECOS, INITIAL_MARGENS, PRESET_HIGHLIGHTS, INITIAL_CHALLENGES, AESTHETIC_THEMES } from "./data";
import ShareModal from "./components/ShareModal";
import ReaderProfile from "./components/ReaderProfile";
import WrappedView from "./components/WrappedView";
import JardimDescobertas from "./components/JardimDescobertas";
import ReadingCompanion from "./components/ReadingCompanion";
import { DailyOpeningMoment } from "./components/DailyOpeningMoment";
import { FutureLetter } from "./components/FutureLetter";
import { LiteraryCoincidence } from "./components/LiteraryCoincidence";
import { MuseuDasMargens } from "./components/MuseuDasMargens";
import { 
  getStoredProfile, 
  setStoredProfile, 
  getStoredMargens, 
  setStoredMargens, 
  getStoredChallenges, 
  setStoredChallenges, 
  clearAllStorage 
} from "./lib/storage";
import {
  orderFeedForDiscovery,
  pickMargemDoDia,
  pickEcoDaSemana,
  computeEmotionalMap,
  computeShapingBooks
} from "./utils/feedAlgorithm";

export default function App() {
  // Onboarding & Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    return getStoredProfile();
  });

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingForm, setOnboardingForm] = useState({
    name: "",
    username: "",
    genres: [] as string[],
    favoriteBooks: "",
    favoriteAuthors: "",
    habits: "Todas as noites antes de dormir",
    spoilerTolerance: "moderate" as SpoilerLevel
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<UserProfile | null>(null);

  // Core App State
  const [activeTab, setActiveTab] = useState<"diario" | "descoberta" | "ecos" | "companheira" | "perfil">("diario");
  const [feedMode, setFeedMode] = useState<"descoberta" | "recentes">("descoberta");
  const [margens, setMargens] = useState<Margem[]>(() => {
    return getStoredMargens(INITIAL_MARGENS);
  });
  const [ecos] = useState<Eco[]>(INITIAL_ECOS);
  const [selectedEco, setSelectedEco] = useState<Eco | null>(null);
  
  // Custom Margem Editor
  const [showAddMargem, setShowAddMargem] = useState(false);
  const [showFutureLetter, setShowFutureLetter] = useState(false);
  const [newMargem, setNewMargem] = useState({
    quote: "",
    thought: "",
    bookTitle: "",
    author: "",
    spoilerLevel: "none" as SpoilerLevel,
    themeKey: "classic",
    ecoId: ""
  });
  const [generatingReflection, setGeneratingReflection] = useState(false);

  // Interactive Challenges
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    return getStoredChallenges(INITIAL_CHALLENGES);
  });

  // Companheira (AI Assistant) Chat state
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "companion"; content: string; timestamp: Date }[]>(() => {
    return [
      {
        role: "companion",
        content: "Olá, alma leitora. Sou sua Companheira de Leitura. Que segredos de papel você trouxe para desvendar comigo hoje? Podemos falar sobre seus autores favoritos, debater o subtexto de um livro ou refinar uma anotação que você queira registrar nas margens.",
        timestamp: new Date()
      }
    ];
  });
  const [userInputMessage, setUserInputMessage] = useState("");
  const [companionLoading, setCompanionLoading] = useState(false);
  const [chatActiveMargem, setChatActiveMargem] = useState<Margem | null>(null);

  // Sharing Modal
  const [sharingMargem, setSharingMargem] = useState<Margem | null>(null);

  // --- Retrospective States ---
  const [showWrapped, setShowWrapped] = useState(false);
  const [wrappedData, setWrappedData] = useState<any>(null);
  const [generatingWrapped, setGeneratingWrapped] = useState(false);

  const handleTriggerWrapped = async () => {
    if (!userProfile) return;
    setGeneratingWrapped(true);
    try {
      const res = await fetch("/api/ai/wrapped", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: userProfile,
          margins: margens.filter(m => m.authorAvatar === userProfile.avatarSeed)
        })
      });
      const data = await res.json();
      if (data.wrapped) {
        setWrappedData(data.wrapped);
        setShowWrapped(true);
      }
    } catch (err) {
      console.error("Error generating wrapped:", err);
      // Premium offline fallback to ensure immediate feedback
      setWrappedData({
        jornadaEmocoes: {
          "Melancolia Elegante": 45,
          "Solidão Bonita": 25,
          "Crises Existenciais": 20,
          "Esperança Atenta": 10
        },
        temasPrincipais: [
          "A transitoriedade do tempo nas pequenas frestas do cotidiano",
          "O abraço doce da melancolia",
          "O desassossego como santuário para a criação poética"
        ],
        autoresMoldaram: [
          userProfile.favoriteAuthors || "Clarice Lispector",
          "Albert Camus",
          "Gabriel García Márquez"
        ],
        mapaAlma: "Sua mente busca abrigo no silêncio meditativo. Seus rituais apontam para encontros devotos na penumbra das páginas, onde o desassossego se transmuta em paz.",
        simboloPoetico: userProfile.aestheticSymbol || "Lamparina de Prata",
        fraseWrapped: "Habitante dos silêncios entre linhas"
      });
      setShowWrapped(true);
    } finally {
      setGeneratingWrapped(false);
    }
  };

  // Spoiler visibility triggers (spoilers hidden by default)
  const [unlockedSpoilers, setUnlockedSpoilers] = useState<Record<string, boolean>>({});

  // Active Eco curation AI prompts
  const [ecoAIPrompts, setEcoAIPrompts] = useState<Record<string, string>>({});
  const [loadingEcoPrompt, setLoadingEcoPrompt] = useState(false);

  // Active commentary state
  const [activeCommentMargemId, setActiveCommentMargemId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");

  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStoredProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    setStoredMargens(margens);
  }, [margens]);

  useEffect(() => {
    setStoredChallenges(challenges);
  }, [challenges]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Onboarding Handlers
  const handleGenreToggle = (genre: string) => {
    setOnboardingForm(prev => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  const handleStartOnboardingAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingForm.name || !onboardingForm.username) {
      alert("Por favor, preencha seu nome e apelido literário.");
      return;
    }
    setLoadingProfile(true);
    setOnboardingStep(4); // Advance to preview generation step

    try {
      const res = await fetch("/api/ai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          genres: onboardingForm.genres,
          books: onboardingForm.favoriteBooks,
          authors: onboardingForm.favoriteAuthors,
          habits: onboardingForm.habits,
          spoilerTolerance: onboardingForm.spoilerTolerance
        })
      });
      const data = await res.json();
      if (data.profile) {
        const fullProfile: UserProfile = {
          ...data.profile,
          name: onboardingForm.name,
          username: onboardingForm.username,
          avatarSeed: onboardingForm.username.toLowerCase(),
          bio: `Leitor devoto de ${onboardingForm.genres.slice(0, 2).join(" e ") || "clássicos"}. Escrevendo margens sob a influência de ${onboardingForm.favoriteAuthors || "grandes mentes"}.`,
          streakDays: 3,
          booksReadCount: 4,
          savedCount: 12
        };
        setGeneratedProfile(fullProfile);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setGeneratedProfile({
        title: "O Filósofo Silencioso",
        description: "Você enxerga nas entrelinhas uma conversa silenciosa sobre a existência humana. Seus hábitos apontam para reflexões meditativas, colecionando pensamentos profundos como quem recolhe conchas raras na maré baixa.",
        signatureQuote: "Pensar é o ato de tatear o invisível no escuro.",
        recommendedEcos: ["Filosofia Existencialista", "Clássicos Russos"],
        aestheticColor: "#BDAB9C",
        aestheticSymbol: "Lamparina",
        name: onboardingForm.name,
        username: onboardingForm.username,
        avatarSeed: onboardingForm.username.toLowerCase(),
        bio: "Explorador literário das margens do pensamento.",
        streakDays: 3,
        booksReadCount: 4,
        savedCount: 12
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleConfirmProfile = () => {
    if (generatedProfile) {
      setUserProfile(generatedProfile);
      setActiveTab("diario");
    }
  };

  // Complete a reading challenge and gain feedback
  const triggerChallengeComplete = (id: string) => {
    setChallenges(prev => 
      prev.map(c => {
        if (c.id === id && !c.completed) {
          return { ...c, completed: true };
        }
        return c;
      })
    );
  };

  // Create Margem Handler
  const handleCreateMargem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMargem.quote || !newMargem.thought || !newMargem.bookTitle) {
      alert("Por favor, preencha o trecho destacado, sua margem e o nome do livro.");
      return;
    }

    const created: Margem = {
      id: "m_user_" + Date.now(),
      quote: newMargem.quote,
      thought: newMargem.thought,
      bookTitle: newMargem.bookTitle,
      author: newMargem.author || "Autor Desconhecido",
      spoilerLevel: newMargem.spoilerLevel,
      date: new Date().toISOString(),
      authorName: userProfile?.name || "Leitor Anônimo",
      authorAvatar: userProfile?.avatarSeed || "user",
      authorTitle: userProfile?.title || "Leitor Iniciante",
      lovesCount: 0,
      loves: [],
      comments: [],
      themeKey: newMargem.themeKey,
      ecoId: newMargem.ecoId || undefined
    };

    setMargens(prev => [created, ...prev]);
    setShowAddMargem(false);
    // Reset form
    setNewMargem({
      quote: "",
      thought: "",
      bookTitle: "",
      author: "",
      spoilerLevel: "none",
      themeKey: "classic",
      ecoId: ""
    });

    // Complete Challenge
    triggerChallengeComplete("ch1");
    if (userProfile) {
      setUserProfile(prev => prev ? { ...prev, streakDays: prev.streakDays + 1 } : null);
    }
  };

  // Generate reflection using Companion AI
  const handleGenerateAIEcoReflection = async () => {
    if (!newMargem.quote || !newMargem.bookTitle) {
      alert("Por favor, insira o Trecho e o Nome do Livro primeiro para inspirar a IA.");
      return;
    }
    setGeneratingReflection(true);
    try {
      const res = await fetch("/api/ai/reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: newMargem.quote,
          bookTitle: newMargem.bookTitle,
          author: newMargem.author || "Autor"
        })
      });
      const data = await res.json();
      if (data.reflection) {
        setNewMargem(prev => ({ ...prev, thought: data.reflection }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingReflection(false);
    }
  };

  // Toggle Love (Apoio)
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

  // Add Comment
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

  // Send Companion chat message
  const handleSendCompanionMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInputMessage.trim()) return;

    const userMsg = {
      role: "user" as const,
      content: userInputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setUserInputMessage("");
    setCompanionLoading(true);

    triggerChallengeComplete("ch4");

    try {
      // Send chat history and current context
      const formattedHistory = chatMessages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: formattedHistory,
          activeBook: chatActiveMargem ? { title: chatActiveMargem.bookTitle, author: chatActiveMargem.author } : null,
          activeMargem: chatActiveMargem ? { quote: chatActiveMargem.quote, thought: chatActiveMargem.thought } : null
        })
      });

      const data = await res.json();
      if (data.reply) {
        setChatMessages(prev => [...prev, {
          role: "companion",
          content: data.reply,
          timestamp: new Date()
        }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        role: "companion",
        content: "Desculpe, minhas páginas pareceram se misturar no escuro da biblioteca. Poderia sussurrar seu pensamento novamente?",
        timestamp: new Date()
      }]);
    } finally {
      setCompanionLoading(false);
    }
  };

  // Fetch AI Curation Prompt for specific Eco
  const handleGenerateEcoPrompt = async (eco: Eco) => {
    setLoadingEcoPrompt(true);
    const recent = margens.filter(m => m.ecoId === eco.id).slice(0, 3);
    try {
      const res = await fetch("/api/ai/eco-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ecoName: eco.name,
          recentMargins: recent
        })
      });
      const data = await res.json();
      if (data.prompt) {
        setEcoAIPrompts(prev => ({ ...prev, [eco.id]: data.prompt }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEcoPrompt(false);
    }
  };

  // Reset Onboarding / Log Out
  const handleResetApp = () => {
    if (confirm("Deseja redefinir seu perfil literário e recomeçar o diário?")) {
      clearAllStorage();
      setUserProfile(null);
      setOnboardingStep(1);
      setMargens(INITIAL_MARGENS);
      setChallenges(INITIAL_CHALLENGES);
    }
  };

  // If there's NO user profile in localStorage, show the immersive paper-vintage onboarding questionnaire
  if (!userProfile) {
    return (
      <div className="min-h-screen paper-grain flex items-center justify-center p-4 md:p-8 selection:bg-[#BDAB9C]/30 selection:text-[#1C1916]">
        {/* Subtle vintage vignette framing */}
        <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[24px] border-[#FAF8F3] z-10" />
        
        <div className="w-full max-w-xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl journal-shadow relative overflow-hidden p-6 md:p-10 animate-page-turn">
          {/* Aesthetic cover binding line */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-[#1C1916]/10 via-transparent to-transparent" />
          
          {/* Onboarding Header */}
          <div className="text-center mb-8 relative">
            <span className="text-[11px] font-sans font-semibold tracking-widest text-[#BDAB9C] uppercase block mb-1">
              Bem-vindo ao Marginalia
            </span>
            <h1 className="font-display text-3xl font-semibold text-[#1C1916] tracking-tight">
              Marginalia
            </h1>
            <div className="w-16 h-[1px] bg-[#BDAB9C] mx-auto mt-3" />
          </div>

          {/* STEP 1: Identification */}
          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="font-serif italic text-sm text-[#3D3D3D]">
                  "Os livros mudam à medida que nós mudamos. Cada anotação na margem é um autorretrato do leitor que fomos ontem."
                </p>
                <p className="text-xs font-sans text-[#BDAB9C]">— Um diário literário vivo</p>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
                    Como deseja ser chamado no diário?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Clarice Albuquerque"
                    value={onboardingForm.name}
                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 px-1 text-[#1C1916] font-serif placeholder-[#BDAB9C] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
                    Apelido Literário (@username)
                  </label>
                  <div className="relative">
                    <span className="absolute left-1 top-2 text-[#BDAB9C] font-mono">@</span>
                    <input
                      type="text"
                      required
                      placeholder="clarice_l"
                      value={onboardingForm.username}
                      onChange={(e) => setOnboardingForm(prev => ({ ...prev, username: e.target.value.replace(/\s+/g, "").toLowerCase() }))}
                      className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 pl-6 pr-1 text-[#1C1916] font-mono placeholder-[#BDAB9C] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOnboardingStep(2)}
                disabled={!onboardingForm.name || !onboardingForm.username}
                className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Avançar para a Alma Literária</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Literary Soul / Genres */}
          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display text-lg text-[#1C1916] font-semibold">Sua Afinidade das Palavras</h3>
                <p className="text-xs font-sans text-[#3D3D3D] opacity-80">Quais gêneros e atmosferas literárias fazem sua mente se perder por horas?</p>
              </div>

              {/* Genre Chips */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  "Literatura Clássica", "Poesia e Lírica", "Filosofia", 
                  "Realismo Mágico", "Fantasia Sombria", "Romance Histórico",
                  "Ensaios Modernos", "Suspense Psicológico", "Ficção Científica"
                ].map((g) => {
                  const isSelected = onboardingForm.genres.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGenreToggle(g)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected 
                          ? "bg-[#1C1916] border-[#1C1916] text-[#FAF8F3]" 
                          : "border-[#BDAB9C]/40 text-[#3D3D3D] hover:bg-[#BDAB9C]/10"
                      }`}
                    >
                      <span className="text-xs font-sans block">{g}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setOnboardingStep(1)}
                  className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setOnboardingStep(3)}
                  disabled={onboardingForm.genres.length === 0}
                  className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  <span>Mapear Hábitos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Reading habits & books */}
          {onboardingStep === 3 && (
            <form onSubmit={handleStartOnboardingAI} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Seus Rituais das Margens</h3>
                <p className="text-xs font-sans text-[#3D3D3D] opacity-80">Como se dá sua intimidade com os livros no dia a dia?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-1">
                    Livros de cabeceira (Amados)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Cem Anos de Solidão, O Mito de Sísifo"
                    value={onboardingForm.favoriteBooks}
                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, favoriteBooks: e.target.value }))}
                    className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 px-1 text-[#1C1916] font-serif placeholder-[#BDAB9C]/70 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-1">
                    Autores que moldaram sua mente
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Gabriel García Márquez, Camus, Clarice Lispector"
                    value={onboardingForm.favoriteAuthors}
                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, favoriteAuthors: e.target.value }))}
                    className="w-full bg-[#1C1916]/5 border-b border-[#BDAB9C]/50 focus:border-[#1C1916] py-2 px-1 text-[#1C1916] font-serif placeholder-[#BDAB9C]/70 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
                    Quando você costuma ler?
                  </label>
                  <select
                    value={onboardingForm.habits}
                    onChange={(e) => setOnboardingForm(prev => ({ ...prev, habits: e.target.value }))}
                    className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/60 rounded-lg p-2 text-xs font-sans text-[#1C1916] focus:outline-none focus:ring-1 focus:ring-[#BDAB9C]"
                  >
                    <option>Todas as noites antes de dormir</option>
                    <option>Nos cafés tranquilos aos fins de semana</option>
                    <option>Sempre que tenho um minuto livre no ônibus ou fila</option>
                    <option>Em longas horas meditativas de silêncio e chuva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
                    Tolerância com Spoilers (Premium UX)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "none", label: "Não permito nada", desc: "Sempre borrado" },
                      { key: "moderate", label: "Aceito leves", desc: "Aviso elegante" },
                    ].map((tol) => (
                      <button
                        type="button"
                        key={tol.key}
                        onClick={() => setOnboardingForm(prev => ({ ...prev, spoilerTolerance: tol.key as SpoilerLevel }))}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          onboardingForm.spoilerTolerance === tol.key 
                            ? "bg-[#1C1916]/10 border-[#1C1916] font-semibold" 
                            : "border-[#BDAB9C]/30 opacity-70"
                        }`}
                      >
                        <p className="text-xs font-sans text-[#1C1916]">{tol.label}</p>
                        <p className="text-[10px] font-sans opacity-60">{tol.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOnboardingStep(2)}
                  className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Revelar Arquétipo Literário</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: AI Profile Result / Generation screen */}
          {onboardingStep === 4 && (
            <div className="space-y-6">
              {loadingProfile ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-10 h-10 border-2 border-[#1C1916] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-serif italic text-sm text-[#3D3D3D]">
                    Analisando a tinta dos seus autores e a geometria dos seus sentimentos...
                  </p>
                  <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-wider">
                    Sua Companheira de Leitura interpretando os rastros da sua biblioteca
                  </p>
                </div>
              ) : (
                <div className="space-y-6 animate-page-turn">
                  {/* Generated Badge Graphic */}
                  <div 
                    className="p-6 md:p-8 rounded-xl text-center border relative overflow-hidden journal-shadow"
                    style={{ backgroundColor: generatedProfile?.aestheticColor + "15" || "#FAF8F3", borderColor: generatedProfile?.aestheticColor || "#BDAB9C" }}
                  >
                    <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] opacity-60">
                      <Sparkle className="w-3 h-3 text-[#BDAB9C]" />
                      <span>CONEXÃO LITERÁRIA</span>
                    </div>

                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border" style={{ borderColor: generatedProfile?.aestheticColor, color: generatedProfile?.aestheticColor }}>
                      <Feather className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase">
                      Perfil Literário de @{generatedProfile?.username}
                    </span>
                    
                    <h4 className="font-display text-2xl font-semibold text-[#1C1916] mt-1 mb-3">
                      {generatedProfile?.title}
                    </h4>

                    <p className="font-serif text-sm leading-relaxed text-[#3D3D3D] max-w-sm mx-auto mb-4 italic">
                      "{generatedProfile?.description}"
                    </p>

                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-[1px]" style={{ backgroundColor: generatedProfile?.aestheticColor }} />
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] font-mono text-[#BDAB9C] uppercase tracking-wider">Assinatura Literária</p>
                      <p className="font-serif italic text-sm text-[#1C1916] font-semibold">
                        {generatedProfile?.signatureQuote}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {generatedProfile?.recommendedEcos.map((eco) => (
                        <span 
                          key={eco}
                          className="px-2.5 py-1 rounded-full bg-[#FAF8F3] border border-[#BDAB9C]/40 text-[11px] font-sans text-[#3D3D3D] shadow-xs"
                        >
                          🍃 Eco: {eco}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-center text-xs font-sans text-[#3D3D3D] opacity-80 max-w-sm mx-auto">
                    Esse arquétipo ditará o estilo das suas análises e as comunidades em que suas margens reverberarão com mais força.
                  </p>

                  <button
                    onClick={handleConfirmProfile}
                    className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Entrar na Comunidade das Margens</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    );
  }

  // --- DYNAMIC ALGORITHMIC COMPUTATIONS (Para Você, Margem do Dia & Eco da Semana) ---
  const margemDoDia = pickMargemDoDia(margens);
  const ecoDaSemana = pickEcoDaSemana(ecos);

  // Compute live profile attributes to be reactive
  const userMargins = margens.filter(m => m.authorAvatar === userProfile.avatarSeed || m.authorName === userProfile.name);
  const liveEmotionalMap = computeEmotionalMap(userMargins) || userProfile.emotionalMap;
  const liveShapingBooks = computeShapingBooks(userMargins) || userProfile.shapingBooks;
  
  // Combine userProfile with live calculated fields to feed to ReaderProfile
  const reactiveUserProfile = {
    ...userProfile,
    emotionalMap: liveEmotionalMap,
    shapingBooks: liveShapingBooks
  };

  const displayedFeed = feedMode === "descoberta"
    ? orderFeedForDiscovery(margens.filter(m => m.id !== margemDoDia?.id), userProfile)
    : [...margens]
        .filter(m => m.id !== margemDoDia?.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // --- MAIN APP RENDER ---
  return (
    <div className="min-h-screen paper-grain flex flex-col selection:bg-[#BDAB9C]/30 selection:text-[#1C1916]">
      
      {/* HEADER BAR (Clean Apple/Notion look) */}
      <header className="sticky top-0 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#BDAB9C]/30 z-30 px-4 py-3 md:py-4">
        <div className="w-full max-w-5xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab("diario"); setSelectedEco(null); }}>
            <div className="w-8 h-8 rounded bg-[#1C1916] text-[#FAF8F3] flex items-center justify-center font-serif text-lg font-semibold journal-shadow">
              M
            </div>
            <div>
              <span className="font-display font-bold text-base md:text-lg text-[#1C1916] tracking-tight">
                Marginalia
              </span>
              <span className="text-[9px] font-sans tracking-widest text-[#BDAB9C] uppercase block -mt-1">
                organizando emoções
              </span>
            </div>
          </div>

          {/* Top navigation stats & user menu */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Quick reading streak count */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BDAB9C]/10 text-[#3D3D3D] border border-[#BDAB9C]/30" title="Dias seguidos lendo e anotando">
              <Flame className="w-4 h-4 text-orange-600 animate-pulse fill-orange-100" />
              <span className="text-xs font-sans font-semibold">{userProfile.streakDays}d Streak</span>
            </div>

            {/* Quick new margin button */}
            <button
              onClick={() => {
                setNewMargem(prev => ({ ...prev, ecoId: selectedEco ? selectedEco.id : "" }));
                setShowAddMargem(true);
              }}
              className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] p-1.5 md:px-4 md:py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-sans font-medium cursor-pointer journal-shadow"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Nova Margem</span>
            </button>

            {/* Logout/Reset */}
            <button
              onClick={handleResetApp}
              title="Redefinir aplicativo"
              className="p-1.5 rounded hover:bg-[#BDAB9C]/20 text-[#3D3D3D]/60 hover:text-red-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* NEW MARGEM DIALOG / COMPOSER */}
      {showAddMargem && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#1C1916]/60 backdrop-blur-xs animate-page-turn">
          <div className="w-full max-w-xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-6 journal-shadow relative overflow-hidden">
            
            <button
              onClick={() => setShowAddMargem(false)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-[#BDAB9C]/10 text-[#3D3D3D]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl text-[#1C1916] font-semibold mb-4 flex items-center gap-2">
              <Feather className="w-5 h-5 text-[#BDAB9C]" />
              Anotar na Margem
            </h3>

            <form onSubmit={handleCreateMargem} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                    Livro
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nome do livro"
                    value={newMargem.bookTitle}
                    onChange={(e) => setNewMargem(prev => ({ ...prev, bookTitle: e.target.value }))}
                    className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded p-2 text-xs font-serif text-[#1C1916]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nome do autor"
                    value={newMargem.author}
                    onChange={(e) => setNewMargem(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded p-2 text-xs font-serif text-[#1C1916]"
                  />
                </div>
              </div>

              {/* Eco community selection */}
              <div>
                <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                  Publicar em um Eco (Comunidade)
                </label>
                <select
                  value={newMargem.ecoId}
                  onChange={(e) => setNewMargem(prev => ({ ...prev, ecoId: e.target.value }))}
                  className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded p-2 text-xs font-sans text-[#1C1916]"
                >
                  <option value="">Nenhum - Publicar no feed geral</option>
                  {ecos.map(e => (
                    <option key={e.id} value={e.id}>🍃 Eco: {e.name}</option>
                  ))}
                </select>
              </div>

              {/* Quote from Book */}
              <div>
                <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                  Trecho Destacado do Livro (Citação)
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Insira as palavras exatas do autor..."
                  value={newMargem.quote}
                  onChange={(e) => setNewMargem(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded p-2 text-xs font-serif text-[#1C1916]"
                />
              </div>

              {/* Reader Margem (thought) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
                    Sua Margem (Reflexão, Emoção ou Descoberta)
                  </label>
                  
                  {/* AI reflection trigger */}
                  <button
                    type="button"
                    onClick={handleGenerateAIEcoReflection}
                    disabled={generatingReflection || !newMargem.quote || !newMargem.bookTitle}
                    className="text-[10px] font-sans text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1 disabled:opacity-50 transition-colors"
                    title="Gere uma reflexão poética automática inspirada neste trecho com a Companheira de Leitura"
                  >
                    {generatingReflection ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Sussurrando com a IA...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-[#BDAB9C]" />
                        <span>Inspirar-se com IA</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="O que esse livro despertou em você? O que essa frase sugere nas entrelinhas da sua própria vida?"
                  value={newMargem.thought}
                  onChange={(e) => setNewMargem(prev => ({ ...prev, thought: e.target.value }))}
                  className="w-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 rounded p-2 text-xs font-serif text-[#1C1916]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Spoil level selection */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                    Isso contém Spoilers?
                  </label>
                  <select
                    value={newMargem.spoilerLevel}
                    onChange={(e) => setNewMargem(prev => ({ ...prev, spoilerLevel: e.target.value as SpoilerLevel }))}
                    className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded p-2 text-xs font-sans text-[#1C1916]"
                  >
                    <option value="none">Livre de Spoilers</option>
                    <option value="light">Spoiler Leve (Atmosfera)</option>
                    <option value="moderate">Spoiler Moderado (Reviravolta)</option>
                    <option value="heavy">Spoiler Pesado (Finais e Segredos)</option>
                  </select>
                </div>

                {/* Aesthetic design palette */}
                <div>
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                    Visual do Cartão
                  </label>
                  <select
                    value={newMargem.themeKey}
                    onChange={(e) => setNewMargem(prev => ({ ...prev, themeKey: e.target.value }))}
                    className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded p-2 text-xs font-sans text-[#1C1916]"
                  >
                    {AESTHETIC_THEMES.map(t => (
                      <option key={t.key} value={t.key}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2.5 rounded-lg font-sans text-xs font-semibold tracking-wide uppercase transition-colors mt-2 cursor-pointer"
              >
                Publicar Margem
              </button>

            </form>
          </div>
        </div>
      )}

      {/* CORE LAYOUT GRID */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24 md:pb-12">
        
        {/* LEFT COLUMN: Main functional views */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active View: FEED/DIÁRIO */}
          {activeTab === "diario" && !selectedEco && (
            <div className="space-y-6 animate-page-turn">
              
              <DailyOpeningMoment 
                onTriggerAction={(action) => {
                  if (action === "aura" || action === "soulmap") {
                    setActiveTab("perfil");
                  } else if (action === "companion") {
                    setActiveTab("companheira");
                  } else if (action === "write") {
                    setShowAddMargem(true);
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
                  onClick={() => setShowAddMargem(true)}
                  className="bg-[#1C1916] text-[#FAF8F3] hover:bg-[#2A2724] px-4 py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 self-start md:self-center"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Registrar sentimento</span>
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
                    onClick={() => setFeedMode("descoberta")}
                    className={`flex-1 md:flex-none px-3.5 py-1 rounded-md text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      feedMode === "descoberta"
                        ? "bg-[#1C1916] text-[#FAF8F3] shadow-xs"
                        : "text-[#BDAB9C] hover:text-[#1C1916]"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Para Você</span>
                  </button>
                  <button
                    onClick={() => setFeedMode("recentes")}
                    className={`flex-1 md:flex-none px-3.5 py-1 rounded-md text-xs font-sans font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      feedMode === "recentes"
                        ? "bg-[#1C1916] text-[#FAF8F3] shadow-xs"
                        : "text-[#BDAB9C] hover:text-[#1C1916]"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>Recentes</span>
                  </button>
                </div>
              </div>

              {/* Margem do Dia Highlight Card */}
              {margemDoDia && (
                <div className="bg-[#FAF8F3] border-2 border-[#C5A880] rounded-2xl journal-shadow overflow-hidden relative group transition-all duration-300 hover:scale-[1.005] animate-page-turn">
                  <div className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[9.5px] font-sans font-semibold text-stone-800 border border-[#C5A880]/40">
                    <Sparkles className="w-3 h-3 text-amber-700 animate-pulse" />
                    <span>MARGEM DO DIA</span>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <span className="text-[10px] font-mono tracking-wider text-[#BDAB9C] uppercase block break-words">{margemDoDia.bookTitle}</span>
                    <p className="font-serif italic text-base md:text-lg leading-relaxed text-[#1C1916] font-semibold pr-4 break-words">
                      "{margemDoDia.quote}"
                    </p>
                    <div className="w-10 h-[1.5px] bg-[#BDAB9C]/50 my-2" />
                    <p className="font-sans font-light text-xs md:text-sm leading-relaxed italic text-[#3D3D3D] pl-3 border-l-2 border-[#BDAB9C]/30 break-words">
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
                        <span>Exportar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Feed Container */}
              <div className="space-y-6">
                {displayedFeed.map((margem) => {
                  const theme = AESTHETIC_THEMES.find(t => t.key === (margem.themeKey || "classic")) || AESTHETIC_THEMES[0];
                  const hasSpoiler = margem.spoilerLevel !== "none";
                  const spoilerUnlocked = unlockedSpoilers[margem.id];

                  return (
                    <article 
                      key={margem.id}
                      className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-2xl journal-shadow overflow-hidden flex flex-col transition-all hover:border-[#BDAB9C] group"
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
                            <span className="px-2 py-0.5 rounded-full bg-[#BDAB9C]/10 border border-[#BDAB9C]/20 text-[9px] font-sans text-[#3D3D3D] opacity-90">
                              🍃 {ecos.find(e => e.id === margem.ecoId)?.name || "Eco"}
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
                          <p className="font-serif italic text-base md:text-lg leading-relaxed relative font-medium opacity-95">
                            <span className="absolute -top-3 -left-3 text-3xl font-serif text-[#BDAB9C] opacity-40">“</span>
                            {margem.quote}
                          </p>

                          <div className="flex justify-start my-2 opacity-25">
                            <div className="w-10 h-[1.5px] bg-current" />
                          </div>

                          {/* Reader margin reflection */}
                          <p className="font-sans font-light text-xs md:text-sm leading-relaxed italic opacity-90 pl-3 border-l-2 border-[#BDAB9C]/30">
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
                          <button 
                            onClick={() => handleToggleLove(margem.id)}
                            className="flex items-center gap-1.5 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Heart className={`w-4 h-4 ${margem.loves.includes(userProfile.username || "anon") ? "fill-red-600 text-red-600 animate-pulse" : ""}`} />
                            <span className="font-medium">{margem.lovesCount} apoios</span>
                          </button>

                          {/* Comments Trigger */}
                          <button 
                            onClick={() => setActiveCommentMargemId(activeCommentMargemId === margem.id ? null : margem.id)}
                            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 text-[#BDAB9C]" />
                            <span className="font-medium">{margem.comments.length} reflexões</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Send active quote to AI chatbot instantly */}
                          <button
                            onClick={() => {
                              setChatActiveMargem(margem);
                              setActiveTab("companheira");
                              setChatMessages(prev => [
                                ...prev,
                                {
                                  role: "user",
                                  content: `Gostaria de debater o trecho de "${margem.bookTitle}" com você. O trecho é: "${margem.quote}". O que você pode expandir sobre ele?`,
                                  timestamp: new Date()
                                }
                              ]);
                              // Trigger api call right away
                              setTimeout(() => {
                                setUserInputMessage(" "); // invisible nudge to trigger response
                                const btn = document.getElementById("send-chat-trigger");
                                btn?.click();
                              }, 100);
                            }}
                            className="text-[10px] font-sans text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Debater trecho com a Companheira IA"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Debater com IA</span>
                          </button>

                          {/* Share Modal Trigger */}
                          <button 
                            onClick={() => setSharingMargem(margem)}
                            className="text-[10px] font-sans text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Exportar para Redes Sociais"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Exportar</span>
                          </button>
                        </div>

                      </div>

                      {/* Interactive Comments Drawer */}
                      {activeCommentMargemId === margem.id && (
                        <div className="bg-[#1C1916]/5 px-5 py-4 border-t border-[#BDAB9C]/20 space-y-4 animate-page-turn">
                          
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
                })}
              </div>

            </div>
          )}

          {/* Active View: DISCOVERY/DESCOBERTA (Pinterest & Emoções) */}
          {activeTab === "descoberta" && (
            <div className="space-y-8 animate-page-turn">
              <JardimDescobertas 
                onSelectHighlight={(h) => {
                  setNewMargem({
                    quote: h.quote,
                    thought: "",
                    bookTitle: h.title,
                    author: h.author,
                    spoilerLevel: "none",
                    themeKey: "classic",
                    ecoId: ""
                  });
                  setShowAddMargem(true);
                }}
                margens={margens}
              />

              <div className="border-t border-[#BDAB9C]/20 pt-8 space-y-4">
                <div>
                  <h3 className="font-display font-semibold text-lg text-[#1C1916] tracking-tight flex items-center gap-2">
                    <span>🏛️ O Museu das Margens</span>
                  </h3>
                  <p className="text-xs text-stone-600 font-sans">
                    Navegue pelas reflexões mais sintonizadas, melancólicas e profundas curadas pelos próprios leitores.
                  </p>
                </div>

                <MuseuDasMargens 
                  margens={margens}
                  onOpenShareModal={(m) => setSharingMargem(m)}
                  onLikeMargem={(id) => handleToggleLove(id)}
                  onSaveMargem={(m) => {
                    alert(`"${m.bookTitle}" salvo na sua biblioteca de inspirações.`);
                  }}
                />
              </div>
            </div>
          )}

          {/* Active View: ECOS / ECO DETAILS */}
          {activeTab === "ecos" && (
            <div className="space-y-6 animate-page-turn">
              
              {!selectedEco ? (
                // Ecos Directory list
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase">Seus Clubes Literários</span>
                    <h3 className="font-display font-semibold text-xl text-[#1C1916]">Ecos Literários</h3>
                    <p className="text-xs text-[#3D3D3D] opacity-80 leading-relaxed">
                      Ecos são espaços de silêncio compartilhado. Publique suas margens dentro de núcleos temáticos focados em grandes atmosferas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ecos.map((eco) => (
                      <div
                        key={eco.id}
                        onClick={() => { setSelectedEco(eco); handleGenerateEcoPrompt(eco); }}
                        className="bg-[#FAF8F3] border border-[#BDAB9C]/40 hover:border-[#1C1916] rounded-2xl overflow-hidden journal-shadow cursor-pointer transition-all flex flex-col group"
                      >
                        {/* Imagem de Capa */}
                        <div className="h-32 w-full relative">
                          <img 
                            src={eco.imageBg} 
                            alt={eco.name} 
                            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-4">
                            <span className="text-[10px] font-mono text-[#FAF8F3] bg-[#1C1916]/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {eco.category}
                            </span>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-serif font-bold text-base text-[#1C1916]">{eco.name}</h4>
                            <p className="text-xs text-[#3D3D3D] leading-relaxed opacity-80 mt-1">
                              {eco.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center text-[10px] font-sans text-[#BDAB9C] pt-2 border-t border-[#BDAB9C]/10">
                            <span>{eco.memberCount} Leitores</span>
                            <span>{eco.marginsCount} Margens gravadas</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Inside a Selected Eco View
                <div className="space-y-6">
                  
                  {/* Back button */}
                  <button
                    onClick={() => setSelectedEco(null)}
                    className="text-xs font-sans text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1 cursor-pointer"
                  >
                    ← Voltar aos Ecos
                  </button>

                  {/* Eco Big Header */}
                  <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 journal-shadow bg-[#1C1916] text-[#FAF8F3]">
                    <img 
                      src={selectedEco.imageBg} 
                      alt={selectedEco.name} 
                      className="absolute inset-0 w-full h-full object-cover opacity-20" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1C1916] via-[#1C1916]/85 to-transparent" />
                    
                    <div className="relative z-10 max-w-lg space-y-3">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#BDAB9C] border border-[#BDAB9C]/40 px-2 py-0.5 rounded-full">
                        {selectedEco.category}
                      </span>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{selectedEco.name}</h3>
                      <p className="font-serif italic text-xs leading-relaxed opacity-90">
                        "{selectedEco.description}"
                      </p>
                    </div>
                  </div>

                  {/* Curated AI Question/Vibe of the Week */}
                  <div className="bg-[#FAF8F3] border border-orange-200/50 rounded-xl p-5 journal-shadow relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#BDAB9C] to-transparent" />
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase block">
                        Provocador de Pensamento Semanal (IA Curation)
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-[#BDAB9C]" />
                    </div>

                    <p className="font-serif italic text-sm text-[#1C1916] leading-relaxed">
                      {ecoAIPrompts[selectedEco.id] || "Buscando as correntes intelectuais deste Eco..."}
                    </p>

                    <button
                      onClick={() => handleGenerateEcoPrompt(selectedEco)}
                      disabled={loadingEcoPrompt}
                      className="mt-3 text-[10px] font-mono text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1.5"
                    >
                      {loadingEcoPrompt ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Atualizando Provocador...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3 h-3" />
                          <span>Pedir nova provocação literária</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Add Margin in this Eco Quick trigger */}
                  <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-4 flex justify-between items-center">
                    <span className="text-xs font-serif text-[#3D3D3D] italic">Acaba de ter uma revelação lendo neste tema?</span>
                    <button
                      onClick={() => {
                        setNewMargem(prev => ({ ...prev, ecoId: selectedEco.id }));
                        setShowAddMargem(true);
                      }}
                      className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-1.5 px-3 rounded-lg text-xs font-sans font-medium cursor-pointer"
                    >
                      Anotar neste Eco
                    </button>
                  </div>

                  {/* Margens Filtered inside this Eco */}
                  <div className="space-y-4">
                    <h4 className="font-display font-semibold text-sm text-[#1C1916] tracking-wider uppercase border-b border-[#BDAB9C]/20 pb-2">
                      Margens Compartilhadas por Leitores
                    </h4>

                    {margens.filter(m => m.ecoId === selectedEco.id).length > 0 ? (
                      margens.filter(m => m.ecoId === selectedEco.id).map((margem) => {
                        const theme = AESTHETIC_THEMES.find(t => t.key === (margem.themeKey || "classic")) || AESTHETIC_THEMES[0];
                        return (
                          <div 
                            key={margem.id}
                            className="bg-[#FAF8F3] border border-[#BDAB9C]/30 rounded-xl p-4 journal-shadow space-y-3"
                          >
                            <div className="flex justify-between items-center text-[10.5px] text-[#BDAB9C] font-mono">
                              <span>Por @{margem.authorAvatar}</span>
                              <span>{margem.bookTitle}</span>
                            </div>
                            <div className={`p-4 rounded-lg italic font-serif text-xs ${theme.bg} ${theme.text}`}>
                              <p className="font-semibold mb-2">"{margem.quote}"</p>
                              <p className="font-normal border-t border-[#BDAB9C]/20 pt-2 opacity-95">👉 {margem.thought}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center py-8 text-xs font-serif italic text-[#BDAB9C]">
                        O silêncio ainda ecoa por aqui. Seja a primeira alma a registrar uma margem neste Eco!
                      </p>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* Active View: COMPANHEIRA (AI Reading Assistant Chat) */}
          {activeTab === "companheira" && (
            <ReadingCompanion 
              userProfile={userProfile}
              margens={margens}
              chatMessages={chatMessages}
              onSendMessage={async (text) => {
                const userMsg = {
                  role: "user" as const,
                  content: text,
                  timestamp: new Date()
                };
                setChatMessages(prev => [...prev, userMsg]);
                setCompanionLoading(true);
                triggerChallengeComplete("ch4");

                try {
                  const formattedHistory = chatMessages.concat(userMsg).map(m => ({
                    role: m.role,
                    content: m.content
                  }));

                  const res = await fetch("/api/ai/companion", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      messages: formattedHistory,
                      activeBook: chatActiveMargem ? { title: chatActiveMargem.bookTitle, author: chatActiveMargem.author } : null,
                      activeMargem: chatActiveMargem ? { quote: chatActiveMargem.quote, thought: chatActiveMargem.thought } : null
                    })
                  });

                  const data = await res.json();
                  if (data.reply) {
                    setChatMessages(prev => [...prev, {
                      role: "companion",
                      content: data.reply,
                      timestamp: new Date()
                    }]);
                  }
                } catch (err) {
                  console.error(err);
                  setChatMessages(prev => [...prev, {
                    role: "companion",
                    content: "Desculpe, minhas páginas pareceram se misturar no escuro da biblioteca. Poderia sussurrar seu pensamento novamente?",
                    timestamp: new Date()
                  }]);
                } finally {
                  setCompanionLoading(false);
                }
              }}
              companionLoading={companionLoading}
              activeContextMargem={chatActiveMargem}
              onClearContext={() => setChatActiveMargem(null)}
            />
          )}

          {/* Active View: PERFIL */}
          {activeTab === "perfil" && (
            <ReaderProfile 
              userProfile={reactiveUserProfile}
              margens={margens}
              onTriggerWrapped={handleTriggerWrapped}
              onReset={handleResetApp}
            />
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar (Challenges, Book of Month, community trends) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PROFILE ARCHETYPE MINI CARD */}
          <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 flex items-center justify-center font-display text-sm font-bold text-[#1C1916]">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#BDAB9C] uppercase block tracking-wider">Perfil Ativo</span>
                <p className="text-xs font-sans font-semibold text-[#1C1916]">{userProfile.name}</p>
                <p className="text-[10px] font-serif italic text-[#3D3D3D]">{userProfile.title}</p>
              </div>
            </div>

            <div className="border-t border-[#BDAB9C]/20 pt-3">
              <p className="text-[10px] font-sans text-[#3D3D3D] leading-relaxed opacity-85">
                "As anotações nas margens revelam o leitor mais do que o livro jamais revelará."
              </p>
            </div>

          </div>

          {/* READING STREAK & WEEKLY RITUALS (De-gamified literary flow) */}
          <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
            
            <div className="flex justify-between items-center">
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#1C1916] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#BDAB9C]" />
                Rituais da Semana
              </h4>
              <span className="text-[10px] font-sans text-[#BDAB9C]">
                {challenges.filter(c => c.completed).length} / {challenges.length}
              </span>
            </div>

            <div className="space-y-3">
              {challenges.map((c) => (
                <div 
                  key={c.id}
                  className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all ${
                    c.completed 
                      ? "bg-green-50/50 border-green-200" 
                      : "bg-[#FAF8F3] border-[#BDAB9C]/30 hover:border-[#BDAB9C]"
                  }`}
                >
                  <button
                    onClick={() => triggerChallengeComplete(c.id)}
                    disabled={c.completed}
                    className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                      c.completed 
                        ? "bg-green-600 border-green-600 text-[#FAF8F3]" 
                        : "border-[#BDAB9C] hover:border-[#1C1916]"
                    }`}
                  >
                    {c.completed && <Check className="w-2.5 h-2.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-sans font-medium leading-none ${c.completed ? "line-through text-[#BDAB9C]" : "text-[#1C1916]"}`}>
                      {c.title}
                    </p>
                    <p className="text-[10px] text-[#3D3D3D] opacity-70 mt-1 leading-snug">
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ECO DA SEMANA (Curated collection trigger) */}
          {ecoDaSemana && (
            <div className="bg-[#FAF8F3] border border-[#C5A880]/60 rounded-xl p-5 journal-shadow space-y-4 cursor-pointer hover:border-[#1C1916] transition-all" onClick={() => { setSelectedEco(ecoDaSemana); setActiveTab("ecos"); }}>
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block font-semibold">
                  Sintonização Coletiva
                </span>
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#1C1916]">
                  Eco da Semana
                </h4>
              </div>

              <div className="flex items-start gap-3">
                {/* Vintage Minimalist eco cover */}
                <div className="w-16 h-20 bg-[#1C1916] text-[#FAF8F3] rounded relative shadow-md flex flex-col justify-between p-2 text-center border border-[#BDAB9C]/30 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 tactile-overlay opacity-30" />
                  <span className="text-[8px] font-mono tracking-widest text-[#BDAB9C]/70 uppercase block">ECO</span>
                  <span className="z-10 text-[8.5px] leading-tight font-serif italic text-amber-100 font-semibold truncate">
                    {ecoDaSemana.name.split(" ")[0]}
                  </span>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-xs font-sans font-bold text-[#1C1916] truncate">{ecoDaSemana.name}</p>
                  <p className="text-[9px] font-mono text-[#BDAB9C] uppercase">{ecoDaSemana.category}</p>
                  <p className="text-[10.5px] text-[#3D3D3D] leading-relaxed italic font-serif line-clamp-3">
                    "{ecoDaSemana.description}"
                  </p>
                </div>
              </div>

            </div>
          )}

          <LiteraryCoincidence 
            onExploreEco={(name) => {
              const found = ecos.find(e => e.name.toLowerCase() === name.toLowerCase() || e.category.toLowerCase() === name.toLowerCase() || e.name.toLowerCase().includes(name.toLowerCase()));
              if (found) {
                setSelectedEco(found);
                setActiveTab("ecos");
              } else {
                setActiveTab("ecos");
              }
            }}
          />

          {/* PLATFORM PHILOSOPHY BOX */}
          <div className="p-5 bg-[#BDAB9C]/10 border border-[#BDAB9C]/30 rounded-xl space-y-2">
            <h5 className="text-[10px] font-sans font-semibold text-[#1C1916] uppercase tracking-wider">
              A Diferença do Marginalia
            </h5>
            <p className="text-[11px] text-[#3D3D3D] leading-relaxed italic font-serif">
              "Outras plataformas organizam estantes. Nós organizamos sentimentos. Deixe uma frase guiar a conversa."
            </p>
          </div>

        </div>

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#FAF8F3]/95 backdrop-blur-md border-t border-[#BDAB9C]/30 z-30 py-2.5 px-4 md:hidden flex justify-around items-center journal-shadow">
        
        <button
          onClick={() => { setActiveTab("diario"); setSelectedEco(null); }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "diario" ? "text-[#1C1916]" : "text-[#BDAB9C] hover:text-[#1C1916]"
          }`}
        >
          <Library className="w-5 h-5" />
          <span className="text-[9px] font-sans font-medium">Diário</span>
        </button>

        <button
          onClick={() => { setActiveTab("descoberta"); setSelectedEco(null); }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "descoberta" ? "text-[#1C1916]" : "text-[#BDAB9C] hover:text-[#1C1916]"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] font-sans font-medium">Descobrir</span>
        </button>

        <button
          onClick={() => { setActiveTab("ecos"); setSelectedEco(null); }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "ecos" ? "text-[#1C1916]" : "text-[#BDAB9C] hover:text-[#1C1916]"
          }`}
        >
          <Feather className="w-5 h-5" />
          <span className="text-[9px] font-sans font-medium">Ecos</span>
        </button>

        <button
          onClick={() => { setActiveTab("companheira"); setSelectedEco(null); }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "companheira" ? "text-[#1C1916]" : "text-[#BDAB9C] hover:text-[#1C1916]"
          }`}
        >
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <span className="text-[9px] font-sans font-medium">Companheira</span>
        </button>

        <button
          onClick={() => { setActiveTab("perfil"); setSelectedEco(null); }}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "perfil" ? "text-[#1C1916]" : "text-[#BDAB9C] hover:text-[#1C1916]"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] font-sans font-medium">Perfil</span>
        </button>

      </nav>

      {/* DESKTOP SIDE BAR QUICK NAVIGATION RAILS */}
      <div className="hidden md:flex fixed top-1/3 left-4 flex-col gap-4 bg-[#FAF8F3]/80 backdrop-blur-md p-2 rounded-xl border border-[#BDAB9C]/30 journal-shadow z-20">
        {[
          { tab: "diario" as const, label: "Diário", icon: Library },
          { tab: "descoberta" as const, label: "Descoberta", icon: Compass },
          { tab: "ecos" as const, label: "Ecos Literários", icon: Feather },
          { tab: "companheira" as const, label: "Companheira IA", icon: Sparkles },
          { tab: "perfil" as const, label: "Meu Perfil", icon: User },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => { setActiveTab(item.tab); setSelectedEco(null); }}
              className={`p-2.5 rounded-lg transition-all flex items-center justify-center gap-2 group cursor-pointer relative ${
                activeTab === item.tab 
                  ? "bg-[#1C1916] text-[#FAF8F3] shadow-md" 
                  : "text-[#BDAB9C] hover:text-[#1C1916] hover:bg-[#BDAB9C]/10"
              }`}
              title={item.label}
            >
              <IconComponent className="w-5 h-5" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-[#1C1916] text-[#FAF8F3] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none journal-shadow">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* SHARING MODAL BACKDROP CONTAINER */}
      {sharingMargem && (
        <ShareModal 
          margem={sharingMargem}
          onClose={() => setSharingMargem(null)}
        />
      )}

      {/* WRAPPED RETROSPECTIVE VIEW */}
      {showWrapped && wrappedData && (
        <WrappedView 
          wrappedData={wrappedData}
          onClose={() => setShowWrapped(false)}
          onShare={() => {
            navigator.clipboard.writeText(`📖 Minha Alma Literária na Marginalia: "${wrappedData.fraseWrapped}"\nSímbolo Poético: ${wrappedData.simboloPoetico}\nDescubra seu arquétipo na Marginalia.`);
            alert("Sua Alma Literária foi copiada para a área de transferência! Compartilhe com o mundo.");
          }}
        />
      )}

      {/* WRAPPED RETROSPECTIVE GENERATION LOADER */}
      {generatingWrapped && (
        <div className="fixed inset-0 bg-[#1C1916]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-8 text-center space-y-6 journal-shadow">
            <div className="w-12 h-12 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="font-display text-xl font-semibold text-[#1C1916]">Sintonizando a Retrospectiva...</h3>
            <p className="font-serif italic text-xs text-[#3D3D3D] leading-relaxed">
              "Colhendo as folhas secas que você deixou cair ao longo do ano literário, fiando o ouro dos sentimentos que ecoaram..."
            </p>
          </div>
        </div>
      )}

      {/* FUTURE LETTER POPUP MODAL */}
      {showFutureLetter && (
        <FutureLetter onClose={() => setShowFutureLetter(false)} />
      )}

    </div>
  );
}
