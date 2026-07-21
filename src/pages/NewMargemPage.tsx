import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  X, 
  Plus, 
  Sparkles, 
  Feather, 
  RefreshCw, 
  ChevronRight, 
  Sliders 
} from "lucide-react";
import { useMarginalia } from "../context/MarginaliaContext";
import { isFeatureEnabled } from "../config/featureFlags";
import { Margem, SpoilerLevel } from "../types";
import QuoteCapture from "../components/QuoteCapture";
import { INITIAL_ECOS, AESTHETIC_THEMES } from "../data";
import { CreateMarginIcon, MarginIcon } from "../components/icons/MarginaliaIcons";

export const NewMargemPage: React.FC = () => {
  const { 
    userProfile, 
    setMargens, 
    setPostMargemMomentData, 
    triggerChallengeComplete 
  } = useMarginalia();
  
  const navigate = useNavigate();
  const location = useLocation();

  const stateData = location.state as { quote?: string; bookTitle?: string; author?: string } | null;

  // Phase: "choose" (if quoteCapture is enabled and we have no prefill) or "form"
  const [captureState, setCaptureState] = useState<"choose" | "form">(() => {
    if (stateData?.quote) return "form";
    return isFeatureEnabled("quoteCapture") ? "choose" : "form";
  });

  const [newMargem, setNewMargem] = useState({
    quote: stateData?.quote || "",
    thought: "",
    bookTitle: stateData?.bookTitle || "",
    author: stateData?.author || "",
    spoilerLevel: "none" as SpoilerLevel,
    themeKey: "classic",
    ecoId: ""
  });

  const [generatingReflection, setGeneratingReflection] = useState(false);

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
    setPostMargemMomentData(created);
    
    // Complete Challenge
    triggerChallengeComplete("ch1");

    // Redirect to personal journal
    navigate("/margens");
  };

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

  if (captureState === "choose") {
    return (
      <div className="w-full max-w-xl mx-auto bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-6 journal-shadow relative overflow-hidden my-4 animate-page-turn">
        <QuoteCapture
          onCaptureComplete={(quoteText) => {
            setNewMargem(prev => ({ ...prev, quote: quoteText }));
            setCaptureState("form");
          }}
          onSelectManual={() => {
            setCaptureState("form");
          }}
          onCancel={() => {
            navigate("/margens");
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-6 journal-shadow relative overflow-hidden my-4 animate-page-turn">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          {isFeatureEnabled("quoteCapture") && (
            <>
              <button
                type="button"
                onClick={() => setCaptureState("choose")}
                className="p-1 rounded hover:bg-[#1C1916]/5 text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer text-xs"
                title="Voltar para opções de captura"
              >
                ← Alterar método
              </button>
              <div className="h-4 w-[1px] bg-[#BDAB9C]/30" />
            </>
          )}
          <h3 className="font-display text-base text-[#1C1916] font-semibold flex items-center gap-1.5">
            <Feather className="w-4 h-4 text-[#BDAB9C]" />
            Anotar na Margem
          </h3>
        </div>

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

          <div>
            <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
              Organizar em um Eco (Atmosferas)
            </label>
            <select
              value={newMargem.ecoId}
              onChange={(e) => setNewMargem(prev => ({ ...prev, ecoId: e.target.value }))}
              className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded p-2 text-xs font-sans text-[#1C1916]"
            >
              <option value="">Nenhum - Manter no diário íntimo</option>
              {INITIAL_ECOS.map(e => (
                <option key={e.id} value={e.id}>Eco: {e.name}</option>
              ))}
            </select>
          </div>

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

          <div>
            <div className="flex justify-between items-start mb-1 flex-col sm:flex-row gap-2 sm:gap-0">
              <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider">
                Sua Margem (Reflexão, Emoção ou Descoberta)
              </label>
              
              <div className="flex flex-col items-end">
                <button
                  type="button"
                  onClick={handleGenerateAIEcoReflection}
                  disabled={generatingReflection || !newMargem.quote}
                  className="text-[10px] font-sans text-stone-800 hover:text-[#1C1916] flex items-center gap-1 disabled:opacity-40 transition-colors bg-[#BDAB9C]/15 hover:bg-[#BDAB9C]/25 px-2 py-0.5 rounded border border-[#BDAB9C]/30 cursor-pointer"
                  title="Gere uma reflexão poética baseada nesse trecho"
                >
                  {generatingReflection ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Lendo as entrelinhas...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-[#C5895A] animate-pulse" />
                      <span className="font-semibold">Inspirar minha margem</span>
                    </>
                  )}
                </button>
                <span className="text-[8px] font-serif italic text-[#BDAB9C] mt-0.5">
                  “Use como faísca, não como resposta final.”
                </span>
              </div>
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
            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                Isso contém Spoilers?
              </label>
              <select
                value={newMargem.spoilerLevel}
                onChange={(e) => setNewMargem(prev => ({ ...prev, spoilerLevel: e.target.value as SpoilerLevel }))}
                className="w-full bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded p-2 text-xs font-sans text-[#1C1916]"
              >
                <option value="none">Não, seguro para todos</option>
                <option value="light">Spoiler Leve</option>
                <option value="moderate">Spoiler Moderado</option>
                <option value="heavy">Spoiler Pesado</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-sans font-semibold text-[#3D3D3D] uppercase tracking-wider mb-1">
                Tema Estético do Card
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

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => navigate("/margens")}
              className="flex-1 py-2.5 border border-[#BDAB9C] text-[#3D3D3D] rounded-xl text-xs font-sans font-bold hover:bg-[#FAF8F3]/50 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-[2] py-2.5 bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] rounded-xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar no Meu Diário</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
