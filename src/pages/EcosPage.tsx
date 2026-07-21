import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sparkles, RefreshCw, Plus } from "lucide-react";
import { useMarginalia } from "../context/MarginaliaContext";
import { INITIAL_ECOS, AESTHETIC_THEMES } from "../data";
import { Eco } from "../types";
import { EchoIcon, MarginIcon } from "../components/icons/MarginaliaIcons";

export const EcosPage: React.FC = () => {
  const { ecoId } = useParams();
  const navigate = useNavigate();
  const { 
    margens, 
    ecoAIPrompts, 
    setEcoAIPrompts, 
    loadingEcoPrompt, 
    setLoadingEcoPrompt 
  } = useMarginalia();

  const selectedEco = INITIAL_ECOS.find(e => e.id === ecoId);

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

  useEffect(() => {
    if (selectedEco && !ecoAIPrompts[selectedEco.id]) {
      handleGenerateEcoPrompt(selectedEco);
    }
  }, [ecoId]);

  if (!selectedEco) {
    // Ecos Directory list
    return (
      <div className="space-y-6 animate-page-turn">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-[#BDAB9C] uppercase">Territórios de Inspiração</span>
          <h3 className="font-display font-semibold text-xl text-[#1C1916]">Territórios Emocionais</h3>
          <p className="text-xs text-[#3D3D3D] opacity-80 leading-relaxed">
            Ecos são territórios de reflexão temática. Encontre inspirações da curadoria e registre suas próprias margens sob as grandes atmosferas da alma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_ECOS.map((eco) => (
            <div
              key={eco.id}
              onClick={() => navigate(`/ecos/${eco.id}`)}
              className="bg-[#FAF8F3] border border-[#BDAB9C]/40 hover:border-[#1C1916] rounded-2xl overflow-hidden journal-shadow cursor-pointer transition-all flex flex-col group"
            >
              {/* Cover Image */}
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

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1916]">{eco.name}</h4>
                  <p className="text-xs text-[#3D3D3D] leading-relaxed opacity-80 mt-1">
                    {eco.description}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] font-sans text-[#BDAB9C] pt-2 border-t border-[#BDAB9C]/10">
                  <span>Território Editorial</span>
                  <span>Explorar Atmosfera →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Inside a Selected Eco View
  return (
    <div className="space-y-6 animate-page-turn">
      {/* Back button */}
      <button
        onClick={() => navigate("/ecos")}
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
      <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 rounded-xl p-5 journal-shadow relative overflow-hidden">
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
          className="mt-3 text-[10px] font-mono text-[#BDAB9C] hover:text-[#1C1916] flex items-center gap-1.5 cursor-pointer"
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
            navigate("/margens/nova", {
              state: {
                ecoId: selectedEco.id
              }
            });
          }}
          className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] py-1.5 px-3 rounded-lg text-xs font-sans font-medium cursor-pointer"
        >
          Anotar neste Eco
        </button>
      </div>

      {/* Margens Filtered inside this Eco */}
      <div className="space-y-4">
        <h4 className="font-display font-semibold text-sm text-[#1C1916] tracking-wider uppercase border-b border-[#BDAB9C]/20 pb-2">
          Margens Registradas e Inspirações
        </h4>

        {margens.filter(m => m.ecoId === selectedEco.id).length > 0 ? (
          margens.filter(m => m.ecoId === selectedEco.id).map((margem) => {
            const theme = AESTHETIC_THEMES.find(t => t.key === (margem.themeKey || "classic")) || AESTHETIC_THEMES[0];
            return (
              <div 
                key={margem.id}
                className="bg-[#FAF8F3] border border-[#BDAB9C]/30 rounded-xl p-4 journal-shadow space-y-3 animate-page-turn"
              >
                <div className="flex justify-between items-center text-[10.5px] text-[#BDAB9C] font-mono">
                  <span>
                    {margem.isEditorial ? (
                      <span className="text-[#C5895A] font-semibold">✦ Curadoria Marginalia</span>
                    ) : (
                      `Por @${margem.authorAvatar}`
                    )}
                  </span>
                  <span>{margem.bookTitle}</span>
                </div>
                <div className={`p-4 rounded-lg italic font-serif text-xs ${theme.bg} ${theme.text}`}>
                  <p className="font-semibold mb-2">"{margem.quote}"</p>
                  <p className="font-normal border-t border-[#BDAB9C]/20 pt-2 opacity-95 flex items-start gap-1.5">
                    <MarginIcon size={12} className="text-stone-400 mt-0.5" />
                    <span>{margem.thought}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center py-8 text-xs font-serif italic text-[#BDAB9C]">
            Você ainda não registrou nenhuma margem nesta atmosfera.
          </p>
        )}
      </div>

    </div>
  );
};
