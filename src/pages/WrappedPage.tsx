import React, { useState } from "react";
import { useMarginalia } from "../context/MarginaliaContext";
import WrappedView from "../components/WrappedView";
import { isFeatureEnabled } from "../config/featureFlags";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MarginaliaMark } from "../components/branding/MarginaliaMark";

export const WrappedPage: React.FC = () => {
  const { 
    userProfile, 
    margens
  } = useMarginalia();

  const [wrappedData, setWrappedData] = useState<any>(null);
  const [generatingWrapped, setGeneratingWrapped] = useState(false);
  const [wrappedErrorMessage, setWrappedErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  if (!isFeatureEnabled("wrapped")) {
    return (
      <div className="container mx-auto max-w-md px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-8 h-8 text-[#BDAB9C] mx-auto" />
        <h3 className="font-serif italic text-lg text-[#1C1916]">Retrospectiva Indisponível</h3>
        <p className="text-xs font-sans text-[#3D3D3D]">
          Esta funcionalidade está desativada temporariamente nas configurações do sistema.
        </p>
        <button
          onClick={() => navigate("/perfil")}
          className="mt-4 px-4 py-2 bg-[#1C1916] text-[#FAF8F3] text-xs font-sans font-semibold rounded-lg"
        >
          Voltar ao Perfil
        </button>
      </div>
    );
  }

  if (!userProfile) return null;

  const handleTriggerWrapped = async () => {
    const personalMargins = margens.filter(m => m && !m.isEditorial);

    if (personalMargins.length < 3) {
      setWrappedErrorMessage("Sua retrospectiva ainda está sendo escrita. Para sintonizar sua Retrospectiva Viva, registre pelo menos 3 margens autorais no seu diário íntimo.");
      return;
    }

    setGeneratingWrapped(true);
    setWrappedErrorMessage(null);
    try {
      const res = await fetch("/api/ai/wrapped", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: userProfile,
          margins: personalMargins
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.wrapped) {
        setWrappedData(data.wrapped);
      } else {
        throw new Error("No wrapped data received from API");
      }
    } catch (err) {
      console.error("Error generating wrapped:", err);
      setWrappedErrorMessage("Falha ao sintonizar sua retrospectiva via IA. Deseja tentar novamente?");
    } finally {
      setGeneratingWrapped(false);
    }
  };

  const handleShare = () => {
    setShowShareSuccess(true);
    setTimeout(() => setShowShareSuccess(false), 3000);
  };

  if (wrappedData) {
    return (
      <div className="relative min-h-screen">
        <WrappedView 
          wrappedData={wrappedData}
          onClose={() => navigate("/perfil")}
          onShare={handleShare}
        />
        {showShareSuccess && (
          <div className="fixed top-4 right-4 z-[60] bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-xs font-sans font-bold animate-pulse">
            Sua Retrospectiva foi copiada para a área de transferência!
          </div>
        )}
      </div>
    );
  }

  const personalMargins = margens.filter(m => m && !m.isEditorial);

  return (
    <div className="container mx-auto max-w-xl px-4 py-16 space-y-6 text-center">
      <button
        onClick={() => navigate("/perfil")}
        className="flex items-center gap-1.5 text-xs font-sans text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Perfil</span>
      </button>

      <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-8 journal-shadow space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <MarginaliaMark size={32} dotColor="#C5895A" color="#1C1916" strokeWidth={3} className={generatingWrapped ? "animate-spin-slow" : ""} />
          <h2 className="font-serif italic text-2xl font-bold text-[#1C1916]">Sua Retrospectiva Viva</h2>
          <p className="text-xs font-mono text-[#BDAB9C] uppercase tracking-wider">MARGENS • OBSESSÕES • SINTONIAS</p>
        </div>

        {generatingWrapped ? (
          <div className="space-y-3 py-6">
            <p className="font-serif italic text-sm text-[#1C1916]">Sintonizando seus rastros poéticos através da inteligência artificial...</p>
            <div className="w-12 h-1 bg-[#C5895A] mx-auto animate-pulse rounded-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="font-serif text-sm text-[#3D3D3D] leading-relaxed">
              Descubra os deuses literários e as obsessões poéticas que guiaram suas anotações até aqui. Criaremos uma experiência visual única baseada nas suas margens escritas.
            </p>

            {wrappedErrorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-700 leading-relaxed">
                {wrappedErrorMessage}
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleTriggerWrapped}
                className="bg-[#1C1916] hover:bg-stone-800 text-[#FAF8F3] font-sans font-semibold text-xs py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#C5895A]" />
                <span>Sintonizar Retrospectiva</span>
              </button>
            </div>

            <p className="text-[10px] font-mono text-[#BDAB9C] uppercase tracking-wider mt-2">
              Progresso do Diário: {personalMargins.length} de 3 margens necessárias
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrappedPage;
