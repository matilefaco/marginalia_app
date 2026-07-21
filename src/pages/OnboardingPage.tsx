import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  ChevronRight, 
  X, 
  Plus, 
  Sparkles, 
  Sparkle, 
  Flame, 
  Hourglass, 
  Feather, 
  Download, 
  Check 
} from "lucide-react";
import { useMarginalia } from "../context/MarginaliaContext";
import { UserProfile, OriginBook, BookSearchResult, SpoilerLevel } from "../types";
import { searchBooks } from "../lib/booksApi";
import { exportNodeAsPng } from "../lib/exportImage";
import { MarginaliaLogo } from "../components/branding/MarginaliaLogo";
import { MarginaliaMark } from "../components/branding/MarginaliaMark";
import { EchoIcon, RefreshIcon } from "../components/icons/MarginaliaIcons";

export type OnboardingGenerationState = "idle" | "generating" | "ready" | "error";

export const OnboardingPage: React.FC = () => {
  const { setUserProfile } = useMarginalia();
  const navigate = useNavigate();

  // Onboarding step (1-5)
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Form states
  const [onboardingForm, setOnboardingForm] = useState({
    name: "",
    username: "",
    genres: [] as string[],
    favoriteBooks: "",
    favoriteAuthors: "",
    habits: "Todas as noites antes de dormir",
    spoilerTolerance: "moderate" as SpoilerLevel
  });

  // Search and Origin books states
  const [originBooks, setOriginBooks] = useState<OriginBook[]>([]);
  const [bookQuery, setBookQuery] = useState("");
  const [bookSearchResults, setBookSearchResults] = useState<BookSearchResult[]>([]);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [selectedSearchBook, setSelectedSearchBook] = useState<BookSearchResult | null>(null);
  const [manualTitle, setManualTitle] = useState("");
  const [manualAuthor, setManualAuthor] = useState("");
  const [emotionalResidue, setEmotionalResidue] = useState("");

  // AI Generation states
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [onboardingGenerationState, setOnboardingGenerationState] = useState<OnboardingGenerationState>("idle");
  const [generatedProfile, setGeneratedProfile] = useState<UserProfile | null>(null);

  // Export states
  const onboardingCardRef = useRef<HTMLDivElement>(null);
  const [downloadingAura, setDownloadingAura] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadAuraError, setDownloadAuraError] = useState<string | null>(null);

  const handleGenreToggle = (genre: string) => {
    setOnboardingForm(prev => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  const createFallbackLiteraryProfile = (form: typeof onboardingForm, booksList: OriginBook[]): UserProfile => {
    console.log("[AuraFlow] Gerando fallback literário offline centralizado...");
    
    const genreToEcoMap: Record<string, string> = {
      "Literatura Clássica": "Clássicos Russos",
      "Poesia e Lírica": "Poesia Marginal",
      "Filosofia": "Filosofia Existencialista",
      "Realismo Mágico": "Latino-Americana Mágica",
      "Fantasia Sombria": "Fantasia Gótica",
      "Romance Histórico": "Romance de Época",
      "Ensaios Modernos": "Crítica Social",
      "Suspense Psicológico": "Thriller de Mente",
      "Ficção Científica": "Ficção Distópica"
    };

    const genreToSymbolMap: Record<string, string> = {
      "Literatura Clássica": "Tomo Antigo",
      "Poesia e Lírica": "Lira de Bronze",
      "Filosofia": "Ampulheta",
      "Realismo Mágico": "Borboleta de Papel",
      "Fantasia Sombria": "Chave Enferrujada",
      "Romance Histórico": "Pergaminho",
      "Ensaios Modernos": "Lente de Aumento",
      "Suspense Psicológico": "Espelho Convexo",
      "Ficção Científica": "Astrolábio"
    };

    const genreToColorMap: Record<string, string> = {
      "Literatura Clássica": "#8A7D72", // Sepia escuro
      "Poesia e Lírica": "#A67C8E", // Rosé antigo
      "Filosofia": "#7D8C82", // Sálvia
      "Realismo Mágico": "#BCA374", // Ouro velho
      "Fantasia Sombria": "#5C5470", // Púrpura acinzentado
      "Romance Histórico": "#9B7D62", // Terracota suave
      "Ensaios Modernos": "#6B828F", // Azul ardósia
      "Suspense Psicológico": "#5F7161", // Verde musgo sombrio
      "Ficção Científica": "#787A91" // Cinza sideral
    };

    const genresList = form.genres || [];
    const authorsList = [
      ...new Set([
        ...(booksList.map(b => b.author).filter(a => a && a !== "Autor Desconhecido")),
        ...(form.favoriteAuthors ? form.favoriteAuthors.split(",").map(a => a.trim()).filter(Boolean) : [])
      ])
    ];
    const booksListTitles = [
      ...new Set([
        ...(booksList.map(b => b.title).filter(Boolean)),
        ...(form.favoriteBooks ? form.favoriteBooks.split(",").map(b => b.trim()).filter(Boolean) : [])
      ])
    ];

    const mainGenre = genresList[0] || "";
    const mainAuthor = authorsList[0] || "";
    const mainBook = booksListTitles[0] || "";

    let title = "Perfil Literário Inicial";
    let description = "Seu rastro de leitura começou a ser desenhado. À medida que você registrar suas reflexões nas margens, sua identidade poética ganhará novos contornos.";
    let signatureQuote = "";
    let aestheticColor = "#BDAB9C";
    let aestheticSymbol = "";

    if (genresList.length > 0 || authorsList.length > 0 || booksListTitles.length > 0) {
      if (mainGenre && mainAuthor) {
        title = `Leitor de Afinidades (${mainGenre})`;
        description = `Seu perfil reflete um interesse pelas atmosferas de ${mainGenre}, movido pela influência artística de autores como ${mainAuthor}.`;
      } else if (mainGenre) {
        title = `Explorador de ${mainGenre}`;
        description = `Suas escolhas apontam para uma sensibilidade sintonizada com ${mainGenre}, revelando um olhar atento aos subtextos dessa atmosfera.`;
      } else if (mainAuthor) {
        title = `Arqueólogo Literário`;
        description = `Suas leituras orbitam ao redor de referências como ${mainAuthor}, buscando compreender as minúcias de sua escrita e style.`;
      } else if (mainBook) {
        title = `Leitor de Afinidades`;
        description = `Seu diário se inicia sob a inspiração de obras marcantes como "${mainBook}", onde cada margem é uma nova reflexão.`;
      }
    }

    if (mainAuthor && mainBook) {
      signatureQuote = `“Nas dobras das páginas de ${mainBook}, busco decifrar a escrita e os rastros de ${mainAuthor}.”`;
    } else if (mainAuthor) {
      signatureQuote = `“Reescrevendo minhas próprias impressões sob as linhas traçadas por ${mainAuthor}.”`;
    } else if (mainBook) {
      signatureQuote = `“Procurando abrigo e novos significados nos silêncios e entrelinhas de ${mainBook}.”`;
    } else if (mainGenre) {
      signatureQuote = `“Aventurando-se pelas atmosferas e sensibilidades de ${mainGenre}.”`;
    } else {
      signatureQuote = "“Assinatura Poética Provisória: Caminhando pelas margens iniciais de um novo diário de leitura.”";
    }

    if (mainGenre && genreToSymbolMap[mainGenre]) {
      aestheticSymbol = genreToSymbolMap[mainGenre];
    } else if (mainAuthor || mainBook) {
      aestheticSymbol = "Lacre de Cera";
    } else {
      aestheticSymbol = "Marcador de Páginas";
    }

    if (mainGenre && genreToColorMap[mainGenre]) {
      aestheticColor = genreToColorMap[mainGenre];
    }

    const selectedEcos = genresList.map(g => genreToEcoMap[g]).filter(Boolean);
    const recommendedEcos = selectedEcos;

    const fallbackDNA = {
      originBooks: booksList,
      shapingAuthors: authorsList.slice(0, 3),
      dominantEmotions: {} as Record<string, number>,
      identityFormula: "",
      sharePhrase: booksListTitles.length > 0
        ? `Você lê como quem busca abrigo nos rastros de "${booksListTitles[0]}".`
        : "Você lê como quem procura uma casa dentro das páginas."
    };

    let bioParts = [];
    if (genresList.length > 0) {
      bioParts.push(`Sintonizado com ${genresList.slice(0, 2).join(" e ")}`);
    }
    if (authorsList.length > 0) {
      bioParts.push(`Inspirado pela escrita de ${authorsList.slice(0, 2).join(", ")}`);
    }
    if (form.habits) {
      bioParts.push(`Lê habitualmente: ${form.habits.toLowerCase()}`);
    }
    const bio = bioParts.join(". ") || "Iniciando um novo diário de descobertas poéticas.";

    return {
      title,
      description,
      signatureQuote,
      recommendedEcos,
      aestheticColor,
      aestheticSymbol,
      name: form.name,
      username: form.username,
      avatarSeed: form.username.toLowerCase(),
      bio,
      streakDays: 0,
      booksReadCount: 0,
      savedCount: 0,
      literaryDNA: fallbackDNA,
      emotionalMap: {}
    };
  };

  const normalizeGeneratedProfile = (raw: any, form: typeof onboardingForm, booksList: OriginBook[]): UserProfile => {
    console.log("[AuraFlow] Normalizando dados retornados da API...", raw);
    const fallback = createFallbackLiteraryProfile(form, booksList);
    
    const rawDNA = raw?.literaryDNA || {};
    
    const cleanDNA = {
      originBooks: booksList,
      shapingAuthors: Array.isArray(rawDNA.shapingAuthors) && rawDNA.shapingAuthors.length > 0
        ? rawDNA.shapingAuthors
        : fallback.literaryDNA.shapingAuthors,
      dominantEmotions: rawDNA.dominantEmotions && typeof rawDNA.dominantEmotions === "object"
        ? rawDNA.dominantEmotions
        : fallback.literaryDNA.dominantEmotions,
      identityFormula: typeof rawDNA.identityFormula === "string" && rawDNA.identityFormula.trim() !== ""
        ? rawDNA.identityFormula
        : fallback.literaryDNA.identityFormula,
      sharePhrase: typeof rawDNA.sharePhrase === "string" && rawDNA.sharePhrase.trim() !== ""
        ? rawDNA.sharePhrase
        : fallback.literaryDNA.sharePhrase
    };

    return {
      title: typeof raw?.title === "string" && raw.title.trim() !== "" ? raw.title : fallback.title,
      description: typeof raw?.description === "string" && raw.description.trim() !== "" ? raw.description : fallback.description,
      signatureQuote: typeof raw?.signatureQuote === "string" && raw.signatureQuote.trim() !== "" ? raw.signatureQuote : fallback.signatureQuote,
      recommendedEcos: Array.isArray(raw?.recommendedEcos) && raw.recommendedEcos.length > 0
        ? raw.recommendedEcos
        : fallback.recommendedEcos,
      aestheticColor: typeof raw?.aestheticColor === "string" && raw.aestheticColor.startsWith("#") ? raw.aestheticColor : fallback.aestheticColor,
      aestheticSymbol: typeof raw?.aestheticSymbol === "string" && raw.aestheticSymbol.trim() !== "" ? raw.aestheticSymbol : fallback.aestheticSymbol,
      name: form.name,
      username: form.username,
      avatarSeed: form.username.toLowerCase(),
      bio: typeof raw?.bio === "string" && raw.bio.trim() !== "" ? raw.bio.trim() : fallback.bio,
      streakDays: 0,
      booksReadCount: 0,
      savedCount: 0,
      literaryDNA: cleanDNA
    };
  };

  const handleStartOnboardingAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingForm.name || !onboardingForm.username) {
      alert("Por favor, preencha seu nome e apelido literário.");
      return;
    }
    
    setOnboardingGenerationState("generating");
    setLoadingProfile(true);
    setOnboardingStep(5);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn("[AuraFlow] Requisição excedeu 15 segundos! Abortando...");
      controller.abort();
    }, 15000);

    try {
      const res = await fetch("/api/ai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          genres: onboardingForm.genres,
          books: onboardingForm.favoriteBooks,
          authors: onboardingForm.favoriteAuthors,
          habits: onboardingForm.habits,
          spoilerTolerance: onboardingForm.spoilerTolerance,
          originBooks: originBooks
        })
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Erro na resposta HTTP da API: ${res.status}`);
      }

      const data = await res.json();
      if (!data.profile) {
        throw new Error("A API não retornou um perfil literário válido em 'profile'.");
      }

      const normalizedProfile = normalizeGeneratedProfile(data.profile, onboardingForm, originBooks);
      setGeneratedProfile(normalizedProfile);
      setOnboardingGenerationState("ready");
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("[AuraFlow] request failed, using fallback", err);
      const fallbackProfile = createFallbackLiteraryProfile(onboardingForm, originBooks);
      setGeneratedProfile(fallbackProfile);
      setOnboardingGenerationState("error");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleDownloadAura = async () => {
    if (!generatedProfile || !onboardingCardRef.current) {
      setDownloadAuraError("Não consegui preparar o story agora. Tente novamente em alguns instantes.");
      return;
    }

    setDownloadingAura(true);
    setDownloadSuccess(false);
    setDownloadAuraError(null);

    try {
      await exportNodeAsPng(
        onboardingCardRef.current,
        `marginalia-aura-${generatedProfile.username}`
      );
      setDownloadSuccess(true);
    } catch (err: any) {
      console.error("[handleDownloadAura] Erro ao exportar imagem da Aura Literária:", err);
      setDownloadAuraError("Não consegui preparar o story agora. Tente novamente em alguns instantes.");
    } finally {
      setDownloadingAura(false);
    }
  };

  const handleConfirmProfile = () => {
    if (generatedProfile) {
      setUserProfile(generatedProfile);
      navigate("/margens");
    }
  };

  return (
    <div id="onboarding_container" className="min-h-screen paper-grain flex items-center justify-center p-4 md:p-8 selection:bg-[#BDAB9C]/30 selection:text-[#1C1916] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[24px] border-[#FAF8F3] z-10" />
      
      <div className="w-full max-w-xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl journal-shadow relative overflow-hidden p-6 md:p-10 animate-page-turn">
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-[#1C1916]/10 via-transparent to-transparent" />
        
        <div className="text-center mb-8 relative flex flex-col items-center">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#BDAB9C] uppercase block mb-3">
            {onboardingStep === 5
              ? (onboardingGenerationState === "generating"
                  ? "Revelando sua Aura"
                  : onboardingGenerationState === "error"
                    ? "Sua Interpretação Inicial"
                    : "Sua Aura Revelada")
              : "Iniciação ao Marginalia"}
          </span>
          <MarginaliaLogo variant="vertical-lockup" size={28} />
          <div className="w-16 h-[1px] bg-[#BDAB9C] mx-auto mt-4" />
        </div>

        {/* STEP 1: Identification */}
        {onboardingStep === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <p className="font-serif italic text-base text-[#1C1916] leading-relaxed max-w-md mx-auto">
                "Não é sobre o que você leu. É sobre o que ficou em você."
              </p>
              <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-widest leading-relaxed">
                Descubra a forma da sua alma leitora e encontre sintonias invisíveis.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-2">
                  Como deseja ser chamado nesta jornada?
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
              <span>Avançar para Afinidades Literárias</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Genres */}
        {onboardingStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Sua Afinidade das Palavras</h3>
              <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider leading-relaxed">
                Selecione as atmosferas e obsessões literárias que fazem sua mente se perder por horas.
              </p>
            </div>

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
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
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
                className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={() => setOnboardingStep(3)}
                disabled={onboardingForm.genres.length === 0}
                className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <span>Livros de Origem</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Origin Books */}
        {onboardingStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Quais livros ficaram morando em você?</h3>
              <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider leading-relaxed">
                Não escolha os melhores. Escolha os que deixaram vestígios. (Até 5 livros)
              </p>
            </div>

            {originBooks.length > 0 && (
              <div className="space-y-2 p-3 bg-[#1C1916]/5 rounded-xl border border-[#BDAB9C]/20">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#BDAB9C]">Seus Livros de Origem ({originBooks.length}/5)</p>
                <div className="space-y-2">
                  {originBooks.map((book) => (
                    <div key={book.id} className="flex gap-3 bg-[#FAF8F3] p-2.5 rounded-lg border border-[#BDAB9C]/30 items-start justify-between relative">
                      <div className="flex gap-2 items-start">
                        {book.coverUrl ? (
                          <img src={book.coverUrl} referrerPolicy="no-referrer" className="w-9 h-12 object-cover rounded shadow-sm" alt={book.title} />
                        ) : (
                          <div className="w-9 h-12 bg-[#1C1916]/10 rounded flex items-center justify-center text-[#BDAB9C]">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        )}
                        <div className="space-y-0.5">
                          <h4 className="font-serif font-bold text-xs text-[#1C1916]">{book.title}</h4>
                          <p className="text-[10px] font-sans text-[#3D3D3D]/85">por {book.author}</p>
                          <p className="font-serif italic text-[11px] text-[#3D3D3D]/70 mt-1">"{book.emotionalResidue}"</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOriginBooks(prev => prev.filter(b => b.id !== book.id))}
                        className="text-[#BDAB9C] hover:text-[#1C1916] p-1 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {originBooks.length < 5 && (
              <div className="space-y-4 p-4 rounded-xl border border-dashed border-[#BDAB9C]/60 bg-[#FAF8F3]">
                <p className="text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider">Adicionar Livro de Origem</p>
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
                    Busca opcional via Open Library
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Busque por título ou autor..."
                      value={bookQuery}
                      onChange={(e) => setBookQuery(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setIsSearchingBooks(true);
                          const res = await searchBooks(bookQuery);
                          setBookSearchResults(res);
                          setIsSearchingBooks(false);
                        }
                      }}
                      className="flex-1 bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded px-3 py-1.5 text-xs text-[#1C1916] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        setIsSearchingBooks(true);
                        const res = await searchBooks(bookQuery);
                        setBookSearchResults(res);
                        setIsSearchingBooks(false);
                      }}
                      className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] px-3 py-1.5 rounded text-xs font-sans font-medium transition-colors cursor-pointer"
                    >
                      {isSearchingBooks ? "Buscando..." : "Buscar"}
                    </button>
                  </div>
                </div>

                {bookSearchResults.length > 0 && (
                  <div className="bg-white border border-[#BDAB9C]/30 rounded-lg p-2 max-h-48 overflow-y-auto space-y-1">
                    <p className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider mb-1 px-1">Resultados encontrados:</p>
                    {bookSearchResults.map((res, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedSearchBook(res);
                          setManualTitle(res.title);
                          setManualAuthor(res.author);
                          setBookSearchResults([]);
                          setBookQuery("");
                        }}
                        className="w-full text-left p-1.5 hover:bg-[#1C1916]/5 rounded flex items-center gap-2 transition-all cursor-pointer"
                      >
                        {res.coverUrl ? (
                          <img src={res.coverUrl} referrerPolicy="no-referrer" className="w-6 h-8 object-cover rounded shadow-xs" alt="" />
                        ) : (
                          <div className="w-6 h-8 bg-[#1C1916]/10 rounded flex items-center justify-center text-[#BDAB9C]">
                            <BookOpen className="w-3 h-3" />
                          </div>
                        )}
                        <div className="leading-tight">
                          <p className="text-xs font-serif font-bold text-[#1C1916]">{res.title}</p>
                          <p className="text-[10px] font-sans text-[#3D3D3D]/75">{res.author}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-3 pt-2 border-t border-[#BDAB9C]/20">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">Título do Livro</label>
                      <input
                        type="text"
                        placeholder="Digite ou selecione..."
                        value={manualTitle}
                        onChange={(e) => {
                          setManualTitle(e.target.value);
                          if (selectedSearchBook && selectedSearchBook.title !== e.target.value) {
                            setSelectedSearchBook(null);
                          }
                        }}
                        className="w-full bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded p-2 text-xs font-serif text-[#1C1916] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">Autor</label>
                      <input
                        type="text"
                        placeholder="Nome do autor..."
                        value={manualAuthor}
                        onChange={(e) => {
                          setManualAuthor(e.target.value);
                          if (selectedSearchBook && selectedSearchBook.author !== e.target.value) {
                            setSelectedSearchBook(null);
                          }
                        }}
                        className="w-full bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded p-2 text-xs font-serif text-[#1C1916] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                      O que ficou em você depois desse livro?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Uma memória sutil, uma angústia doce, um modo diferente de amar..."
                      value={emotionalResidue}
                      onChange={(e) => setEmotionalResidue(e.target.value)}
                      className="w-full bg-white border border-[#BDAB9C]/50 focus:border-[#1C1916] rounded p-2 text-xs font-serif text-[#1C1916] placeholder-[#BDAB9C]/80 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      let title = "";
                      let author = "";
                      let coverUrl = undefined;
                      let openLibraryKey = undefined;

                      if (selectedSearchBook) {
                        title = selectedSearchBook.title;
                        author = selectedSearchBook.author;
                        coverUrl = selectedSearchBook.coverUrl;
                        openLibraryKey = selectedSearchBook.openLibraryKey;
                      } else {
                        if (!manualTitle.trim()) {
                          alert("Por favor, informe o título do livro.");
                          return;
                        }
                        title = manualTitle.trim();
                        author = manualAuthor.trim() || "Autor Desconhecido";
                      }

                      if (!emotionalResidue.trim()) {
                        alert("Por favor, nos conte o que ficou em você depois desse livro.");
                        return;
                      }

                      const newBook: OriginBook = {
                        id: "origin_" + Date.now(),
                        title,
                        author,
                        coverUrl,
                        openLibraryKey,
                        emotionalResidue: emotionalResidue.trim()
                      };

                      setOriginBooks(prev => [...prev, newBook]);
                      setBookQuery("");
                      setBookSearchResults([]);
                      setSelectedSearchBook(null);
                      setManualTitle("");
                      setManualAuthor("");
                      setEmotionalResidue("");
                    }}
                    className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-2 rounded text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar à minha origem</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setOnboardingStep(2)}
                className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={() => setOnboardingStep(4)}
                className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{originBooks.length === 0 ? "Pular e Mapear Rituais" : "Avançar para Rituais"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Reading Habits */}
        {onboardingStep === 4 && (
          <form onSubmit={handleStartOnboardingAI} className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-display text-lg text-[#1C1916] font-semibold font-serif">Seus Rituais das Margens</h3>
              <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider leading-relaxed">
                Sua proximidade com as páginas. Deixe rastros da sua sensibilidade.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-semibold text-[#1C1916] uppercase tracking-wider mb-1">
                  Livros de cabeceira (Que moldaram sua sensibilidade)
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
                  Autores prediletos (Mentes que sussurram em seus pensamentos)
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
                  Qual atmosfera ideal para desfolhar páginas?
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
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
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
                onClick={() => setOnboardingStep(3)}
                className="flex-1 border border-[#BDAB9C] hover:bg-[#1C1916]/5 text-[#3D3D3D] py-3 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-[2] bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <span>Revelar Aura Literária</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Reveal */}
        {onboardingStep === 5 && (() => {
          const safeProfile = generatedProfile || createFallbackLiteraryProfile(onboardingForm, originBooks);
          return (
            <div className="space-y-6">
              {onboardingGenerationState === "generating" || loadingProfile ? (
                <div className="py-16 text-center space-y-6">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative flex items-center justify-center">
                      <MarginaliaMark size={44} dotColor="#C5895A" color="#1C1916" strokeWidth={3.5} className="animate-spin-slow" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif italic text-base text-[#1C1916] font-semibold">
                      "Sua Aura Literária está sendo escrita..."
                    </p>
                    <p className="text-xs font-sans text-[#3D3D3D] max-w-xs mx-auto leading-relaxed">
                      Tecendo os silêncios, obsessões e deuses das suas leituras prediletas...
                    </p>
                    <p className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-widest mt-2">
                      Interpretando a tinta dos seus autores favoritos
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-page-turn">
                  <div 
                    ref={onboardingCardRef}
                    className="p-10 md:p-12 rounded-2xl text-center border relative overflow-hidden journal-shadow bg-[#1C1916] border-[#1C1916] text-[#FAF8F3] flex flex-col items-center justify-center"
                    style={{ 
                      boxShadow: `0 20px 40px -15px ${safeProfile.aestheticColor || "#BDAB9C"}35`
                    }}
                  >
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#FAF8F3]/30" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#FAF8F3]/30" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#FAF8F3]/30" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#FAF8F3]/30" />

                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
                      style={{
                        background: `radial-gradient(circle at center, ${safeProfile.aestheticColor || "#BDAB9C"} 0%, transparent 70%)`
                      }}
                    />

                    <div className="relative z-10 space-y-5 w-full">
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-[#FAF8F3]/50 uppercase">
                          M A R G I N A L I A
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase font-semibold">
                          {onboardingGenerationState === "error" ? "INTERPRETAÇÃO LOCAL" : "AURA LITERÁRIA"} • @{safeProfile.username}
                        </span>
                      </div>

                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border-2 transition-transform duration-500 hover:scale-105" 
                        style={{ 
                          borderColor: "#C5895A",
                          boxShadow: `0 0 15px #C5895A35`
                        }}
                      >
                        {safeProfile.aestheticSymbol?.toLowerCase()?.includes("flor") ? (
                          <Sparkle className="w-8 h-8" style={{ color: safeProfile.aestheticColor }} />
                        ) : safeProfile.aestheticSymbol?.toLowerCase()?.includes("lamp") || safeProfile.aestheticSymbol?.toLowerCase()?.includes("chama") ? (
                          <Flame className="w-8 h-8 animate-pulse" style={{ color: safeProfile.aestheticColor }} />
                        ) : safeProfile.aestheticSymbol?.toLowerCase()?.includes("ampulheta") ? (
                          <Hourglass className="w-8 h-8" style={{ color: safeProfile.aestheticColor }} />
                        ) : (
                          <Feather className="w-8 h-8" style={{ color: safeProfile.aestheticColor }} />
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif italic text-3xl font-semibold text-[#FAF8F3] tracking-tight">
                          {safeProfile.title}
                        </h4>
                        <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-widest">
                          Símbolo: {safeProfile.aestheticSymbol || "Pena de Ganso"}
                        </p>
                      </div>

                      <div className="py-2">
                        <p className="font-serif text-sm leading-relaxed text-[#FAF8F3]/90 max-w-sm mx-auto italic">
                          "{safeProfile.description}"
                        </p>
                      </div>

                      <div className="flex justify-center items-center gap-3">
                        <div className="w-12 h-[1px] bg-[#FAF8F3]/20" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#FAF8F3]/40">ASSINATURA</span>
                        <div className="w-12 h-[1px] bg-[#FAF8F3]/20" />
                      </div>

                      <div className="space-y-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        <p className="font-serif italic text-base text-[#FAF8F3] font-medium leading-relaxed">
                          {safeProfile.signatureQuote}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider">ECOS SINTONIZADOS</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {safeProfile.recommendedEcos?.map((eco) => (
                            <span 
                              key={eco}
                              className="px-3 py-1 rounded-full text-[10px] font-sans font-medium bg-[#FAF8F3]/10 border border-[#FAF8F3]/20 text-[#FAF8F3] flex items-center gap-1"
                            >
                              <EchoIcon size={10} className="text-[#FAF8F3]/70" /> {eco}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 text-[10px] font-mono tracking-widest text-[#FAF8F3]/50 uppercase flex items-center justify-center gap-1.5">
                        <span className="text-[#C5895A]">★</span> marginalia.app • o que fica em você
                      </div>
                    </div>
                  </div>

                  {onboardingGenerationState === "error" && (
                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-xs font-sans text-amber-900 leading-relaxed">
                      A análise mais aprofundada da inteligência artificial não pôde ser concluída no momento. Apresentamos uma <strong>interpretação inicial criada localmente</strong> com base nos dados que você forneceu.
                    </div>
                  )}

                  {downloadSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-xs font-sans text-emerald-700 animate-pulse">
                      {onboardingGenerationState === "error" ? "Perfil exportado!" : "Aura Literária exportada!"} Poste nos stories do Instagram com <strong>#Marginalia</strong> para encontrar seus pares.
                    </div>
                  )}

                  {downloadAuraError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-xs font-sans text-red-700">
                      Ocorreu um erro: {downloadAuraError}
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        onClick={handleDownloadAura}
                        disabled={downloadingAura}
                        className="w-full border-2 border-[#1C1916] hover:bg-[#1C1916]/5 text-[#1C1916] py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Download className="w-4 h-4" />
                        <span>{downloadingAura ? "Preparando imagem para download…" : onboardingGenerationState === "error" ? "Compartilhar Perfil como Story" : "Compartilhar como Story"}</span>
                      </button>

                      <button
                        onClick={handleConfirmProfile}
                        className="w-full bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                      >
                        <span>{onboardingGenerationState === "error" ? "Salvar Perfil & Entrar" : "Salvar Aura & Entrar"}</span>
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-center text-[10px] font-mono text-[#BDAB9C] uppercase tracking-wider">
                      Esse arquétipo ditará o estilo das suas análises e reverberará nos seus Ecos
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

      </div>
    </div>
  );
};
