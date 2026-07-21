import React from "react";
import { useNavigate } from "react-router-dom";
import { useMarginalia } from "../context/MarginaliaContext";
import ReaderProfile from "../components/ReaderProfile";
import { computeEmotionalMap, computeShapingBooks } from "../utils/feedAlgorithm";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    userProfile, 
    margens, 
    setShowResetModal,
    setWrappedData,
    setGeneratingWrapped,
    setWrappedErrorMessage,
    setShowWrapped
  } = useMarginalia();

  if (!userProfile) return null;

  // Compute live profile attributes to be reactive
  const userMargins = margens.filter(m => !m.isEditorial);
  const liveEmotionalMap = computeEmotionalMap(userMargins) || userProfile.emotionalMap;
  const liveShapingBooks = computeShapingBooks(userMargins) || userProfile.shapingBooks;

  const reactiveUserProfile = {
    ...userProfile,
    emotionalMap: liveEmotionalMap,
    shapingBooks: liveShapingBooks
  };

  const handleTriggerWrapped = async () => {
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
    <div className="animate-page-turn">
      <ReaderProfile 
        userProfile={reactiveUserProfile}
        margens={margens}
        onTriggerWrapped={handleTriggerWrapped}
        onReset={() => setShowResetModal(true)}
        onOpenAddMargem={() => navigate("/margens/nova")}
      />
    </div>
  );
};
