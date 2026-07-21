import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Margem, Challenge } from "../types";
import { localMarginaliaRepository } from "../repositories/localMarginaliaRepository";
import { INITIAL_CHALLENGES } from "../data";
import { isFeatureEnabled } from "../config/featureFlags";

interface MarginaliaContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  margens: Margem[];
  setMargens: React.Dispatch<React.SetStateAction<Margem[]>>;
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
  showPersistenceWarning: boolean;
  setShowPersistenceWarning: (val: boolean) => void;
  showResetModal: boolean;
  setShowResetModal: (val: boolean) => void;
  sharingMargem: Margem | null;
  setSharingMargem: (val: Margem | null) => void;
  postMargemMomentData: Margem | null;
  setPostMargemMomentData: (val: Margem | null) => void;
  triggerChallengeComplete: (id: string) => void;
  executeResetApp: (onResetDone?: () => void) => void;
}

const MarginaliaContext = createContext<MarginaliaContextType | undefined>(undefined);

export const MarginaliaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    return localMarginaliaRepository.getProfile();
  });

  const [margens, setMargens] = useState<Margem[]>(() => {
    return localMarginaliaRepository.getMargens([]);
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    return isFeatureEnabled("weeklyRituals") ? localMarginaliaRepository.getChallenges(INITIAL_CHALLENGES) : [];
  });

  const [showPersistenceWarning, setShowPersistenceWarning] = useState(() => {
    return !localMarginaliaRepository.getWarningDismissed();
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [sharingMargem, setSharingMargem] = useState<Margem | null>(null);
  const [postMargemMomentData, setPostMargemMomentData] = useState<Margem | null>(null);

  useEffect(() => {
    localMarginaliaRepository.saveProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    localMarginaliaRepository.saveMargens(margens);
  }, [margens]);

  useEffect(() => {
    if (isFeatureEnabled("weeklyRituals")) {
      localMarginaliaRepository.saveChallenges(challenges);
    }
  }, [challenges]);

  const triggerChallengeComplete = (id: string) => {
    if (!isFeatureEnabled("weeklyRituals")) return;
    setChallenges(prev => 
      prev.map(c => {
        if (c.id === id && !c.completed) {
          return { ...c, completed: true };
        }
        return c;
      })
    );
  };

  const executeResetApp = (onResetDone?: () => void) => {
    localMarginaliaRepository.clearAll();
    setUserProfile(null);
    setMargens([]);
    setChallenges([]);
    setSharingMargem(null);
    setPostMargemMomentData(null);
    setShowPersistenceWarning(true);
    if (onResetDone) {
      onResetDone();
    }
  };

  return (
    <MarginaliaContext.Provider
      value={{
        userProfile,
        setUserProfile,
        margens,
        setMargens,
        challenges,
        setChallenges,
        showPersistenceWarning,
        setShowPersistenceWarning: (val: boolean) => {
          if (!val) {
            localMarginaliaRepository.setWarningDismissed();
          }
          setShowPersistenceWarning(val);
        },
        showResetModal,
        setShowResetModal,
        sharingMargem,
        setSharingMargem,
        postMargemMomentData,
        setPostMargemMomentData,
        triggerChallengeComplete,
        executeResetApp
      }}
    >
      {children}
    </MarginaliaContext.Provider>
  );
};

export const useMarginalia = () => {
  const context = useContext(MarginaliaContext);
  if (context === undefined) {
    throw new Error("useMarginalia must be used within a MarginaliaProvider");
  }
  return context;
};
