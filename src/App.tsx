import React from "react";
import { MarginaliaProvider, useMarginalia } from "./context/MarginaliaContext";
import { AppRouter } from "./app/AppRouter";
import ShareModal from "./components/ShareModal";
import PostMargemMoment from "./components/PostMargemMoment";
import { RefreshIcon } from "./components/icons/MarginaliaIcons";
import { RouteErrorBoundary } from "./components/feedback/RouteErrorBoundary";

const GlobalOverlays: React.FC = () => {
  const {
    setMargens,
    sharingMargem,
    setSharingMargem,
    postMargemMomentData,
    setPostMargemMomentData,
    showResetModal,
    setShowResetModal,
    executeResetApp
  } = useMarginalia();

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
          }}
          onClose={() => setPostMargemMomentData(null)}
        />
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
                    // Force complete client reload back to onboarding using replace
                    window.location.replace("/onboarding");
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
    </>
  );
};

export default function App() {
  return (
    <MarginaliaProvider>
      <RouteErrorBoundary>
        <AppRouter />
        <GlobalOverlays />
      </RouteErrorBoundary>
    </MarginaliaProvider>
  );
}
