import React from "react";
import { MarginaliaProvider, useMarginalia } from "./context/MarginaliaContext";
import { AppRouter } from "./app/AppRouter";
import ShareModal from "./components/ShareModal";
import PostMargemMoment from "./components/PostMargemMoment";
import WrappedView from "./components/WrappedView";
import { FutureLetter } from "./components/FutureLetter";
import { MarginaliaMark } from "./components/branding/MarginaliaMark";
import { RefreshIcon } from "./components/icons/MarginaliaIcons";

const GlobalOverlays: React.FC = () => {
  const {
    margens,
    setMargens,
    userProfile,
    sharingMargem,
    setSharingMargem,
    postMargemMomentData,
    setPostMargemMomentData,
    showWrapped,
    setShowWrapped,
    wrappedData,
    setWrappedData,
    generatingWrapped,
    setGeneratingWrapped,
    wrappedErrorMessage,
    setWrappedErrorMessage,
    showFutureLetter,
    setShowFutureLetter,
    showResetModal,
    setShowResetModal,
    executeResetApp
  } = useMarginalia();

  const handleTriggerWrapped = async () => {
    if (!userProfile) return;

    // Filter strictly personal margins
    const personalMargins = margens.filter(m => m && !m.isEditorial);

    // Require a minimum of 3 personal margins
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
        setShowWrapped(true);
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

  return (
    <>
      {/* SHARING MODAL BACKDROP CONTAINER */}
      {sharingMargem && (
        <ShareModal 
          margem={sharingMargem}
          onClose={() => setSharingMargem(null)}
        />
      )}

      {/* POST-MARGEM MOMENT MODAL */}
      {postMargemMomentData && (
        <PostMargemMoment
          margem={postMargemMomentData}
          onShareStory={() => {
            setSharingMargem(postMargemMomentData);
            setPostMargemMomentData(null);
          }}
          onAddToDNA={() => {
            setMargens(prev => 
              prev.map(m => 
                m.id === postMargemMomentData.id 
                  ? { ...m, influential: true, contributesToIdentity: true } 
                  : m
              )
            );
          }}
          onFindEcos={() => {
            setPostMargemMomentData(null);
            // Router link automatically redirects user smoothly on next action
          }}
          onClose={() => setPostMargemMomentData(null)}
        />
      )}

      {/* WRAPPED RETROSPECTIVE VIEW */}
      {showWrapped && wrappedData && (
        <WrappedView 
          wrappedData={wrappedData}
          onClose={() => setShowWrapped(false)}
          onShare={() => {
            navigator.clipboard.writeText(`Minha Alma Literária na Marginalia: "${wrappedData.fraseWrapped}"\nSímbolo Poético: ${wrappedData.simboloPoetico}\nDescubra seu arquétipo na Marginalia.`);
            alert("Sua Alma Literária foi copiada para a área de transferência! Guarde ou compartilhe este rastro literário.");
          }}
        />
      )}

      {/* WRAPPED RETROSPECTIVE GENERATION LOADER */}
      {generatingWrapped && (
        <div className="fixed inset-0 bg-[#1C1916]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="max-w-md w-full bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-8 text-center space-y-6 journal-shadow">
            <div className="flex justify-center items-center py-4">
              <MarginaliaMark size={40} dotColor="#C5895A" color="#1C1916" strokeWidth={3.5} className="animate-spin-slow" />
            </div>
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

      {/* CUSTOM RESET MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-[#1C1916]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="max-w-md w-full bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-6 md:p-8 space-y-6 journal-shadow text-center">
            <div className="mx-auto w-12 h-12 bg-amber-550/10 text-[#C5895A] rounded-full flex items-center justify-center">
              <RefreshIcon size={24} className="opacity-80" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-[#1C1916]">
                Deseja recomeçar sua jornada?
              </h3>
              <p className="font-serif italic text-xs text-[#3D3D3D] leading-relaxed">
                Ao redefinir, seu perfil literário e todas as suas margens anotadas localmente serão apagadas para que você possa iniciar um novo diário de descobertas poéticas. Esta ação é definitiva.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="w-full sm:order-2 px-4 py-2 border border-[#BDAB9C] text-[#3D3D3D] rounded-full text-xs font-sans font-bold hover:bg-[#FAF8F3]/50 transition-all cursor-pointer"
              >
                Permanecer na jornada
              </button>
              <button
                onClick={() => {
                  executeResetApp(() => {
                    setShowResetModal(false);
                    // Force complete client reload back to onboarding
                    window.location.href = "/onboarding";
                  });
                }}
                className="w-full sm:order-1 px-4 py-2 bg-[#1C1916] text-[#FAF8F3] rounded-full text-xs font-sans font-bold hover:bg-[#2A2724] transition-all cursor-pointer border border-[#BDAB9C]/20"
              >
                Desejo recomeçar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WRAPPED RETROSPECTIVE ERROR MODAL */}
      {wrappedErrorMessage && (
        <div className="fixed inset-0 bg-[#1C1916]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="max-w-md w-full bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-6 md:p-8 space-y-6 journal-shadow text-center">
            <div className="mx-auto w-12 h-12 bg-amber-550/10 text-[#C5895A] rounded-full flex items-center justify-center">
              <RefreshIcon size={24} className="opacity-80 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-[#1C1916]">
                Retrospectiva Marginalia
              </h3>
              <p className="font-serif italic text-xs text-[#3D3D3D] leading-relaxed">
                {wrappedErrorMessage}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setWrappedErrorMessage(null)}
                className="w-full px-4 py-2 border border-[#BDAB9C] text-[#3D3D3D] rounded-full text-xs font-sans font-bold hover:bg-[#FAF8F3]/50 transition-all cursor-pointer"
              >
                Compreendi
              </button>
              {wrappedErrorMessage.includes("tentar novamente") && (
                <button
                  onClick={() => {
                    setWrappedErrorMessage(null);
                    handleTriggerWrapped();
                  }}
                  className="w-full px-4 py-2 bg-[#1C1916] text-[#FAF8F3] rounded-full text-xs font-sans font-bold hover:bg-[#2A2724] transition-all cursor-pointer border border-[#BDAB9C]/20"
                >
                  Tentar novamente
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <MarginaliaProvider>
      <AppRouter />
      <GlobalOverlays />
    </MarginaliaProvider>
  );
}
