import React from "react";
import { useNavigate } from "react-router-dom";
import { useMarginalia } from "../context/MarginaliaContext";
import { isFeatureEnabled } from "../config/featureFlags";
import JardimDescobertas from "../components/JardimDescobertas";
import { MuseuDasMargens } from "../components/MuseuDasMargens";

export const DiscoveryPage: React.FC = () => {
  const { margens, setSharingMargem, setMargens, userProfile } = useMarginalia();
  const navigate = useNavigate();

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

  return (
    <div className="space-y-8 animate-page-turn">
      <JardimDescobertas 
        onSelectHighlight={(h) => {
          // Pre-fill the form by passing it as router state to NewMargemPage
          navigate("/margens/nova", {
            state: {
              quote: h.quote,
              bookTitle: h.title,
              author: h.author
            }
          });
        }}
        margens={margens}
      />

      {isFeatureEnabled("communityMuseum") && (
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
      )}
    </div>
  );
};
