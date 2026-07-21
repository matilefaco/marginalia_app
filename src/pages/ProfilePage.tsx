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
    setShowResetModal
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

  const handleTriggerWrapped = () => {
    navigate("/perfil/retrospectiva");
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
