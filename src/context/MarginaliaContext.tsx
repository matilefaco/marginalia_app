import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Margem, Challenge, SpoilerLevel } from "../types";
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
  unlockedSpoilers: Record<string, boolean>;
  setUnlockedSpoilers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  ecoAIPrompts: Record<string, string>;
  setEcoAIPrompts: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  activeCommentMargemId: string | null;
  setActiveCommentMargemId: (val: string | null) => void;
  newCommentText: string;
  setNewCommentText: (val: string) => void;
  chatMessages: { role: "user" | "companion"; content: string; timestamp: Date }[];
  setChatMessages: React.Dispatch<React.SetStateAction<{ role: "user" | "companion"; content: string; timestamp: Date }[]>>;
  chatActiveMargem: Margem | null;
  setChatActiveMargem: (val: Margem | null) => void;
  sharingMargem: Margem | null;
  setSharingMargem: (val: Margem | null) => void;
  postMargemMomentData: Margem | null;
  setPostMargemMomentData: (val: Margem | null) => void;
  triggerChallengeComplete: (id: string) => void;
  executeResetApp: (onResetDone?: () => void) => void;
  
  feedMode: "minhas-margens" | "curadoria";
  setFeedMode: (val: "minhas-margens" | "curadoria") => void;
  companionLoading: boolean;
  setCompanionLoading: (val: boolean) => void;
  userInputMessage: string;
  setUserInputMessage: (val: string) => void;
  loadingEcoPrompt: boolean;
  setLoadingEcoPrompt: (val: boolean) => void;
  showFutureLetter: boolean;
  setShowFutureLetter: (val: boolean) => void;
  
  wrappedData: any;
  setWrappedData: React.Dispatch<React.SetStateAction<any>>;
  generatingWrapped: boolean;
  setGeneratingWrapped: (val: boolean) => void;
  wrappedErrorMessage: string | null;
  setWrappedErrorMessage: (val: string | null) => void;
  showWrapped: boolean;
  setShowWrapped: (val: boolean) => void;
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
  const [unlockedSpoilers, setUnlockedSpoilers] = useState<Record<string, boolean>>({});
  const [ecoAIPrompts, setEcoAIPrompts] = useState<Record<string, string>>({});
  const [activeCommentMargemId, setActiveCommentMargemId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "companion"; content: string; timestamp: Date }[]>(() => {
    return [
      {
        role: "companion",
        content: "Olá, alma leitora. Sou sua Companheira de Leitura. Que segredos de papel você trouxe para desvendar comigo hoje? Podemos falar sobre seus autores favoritos, debater o subtexto de um livro ou refinar uma anotação que você queira registrar nas margens.",
        timestamp: new Date()
      }
    ];
  });
  const [chatActiveMargem, setChatActiveMargem] = useState<Margem | null>(null);
  const [sharingMargem, setSharingMargem] = useState<Margem | null>(null);
  const [postMargemMomentData, setPostMargemMomentData] = useState<Margem | null>(null);

  // Additional reactive states
  const [feedMode, setFeedMode] = useState<"minhas-margens" | "curadoria">("minhas-margens");
  const [companionLoading, setCompanionLoading] = useState(false);
  const [userInputMessage, setUserInputMessage] = useState("");
  const [loadingEcoPrompt, setLoadingEcoPrompt] = useState(false);
  const [showFutureLetter, setShowFutureLetter] = useState(false);

  // Wrapped states
  const [wrappedData, setWrappedData] = useState<any>(null);
  const [generatingWrapped, setGeneratingWrapped] = useState(false);
  const [wrappedErrorMessage, setWrappedErrorMessage] = useState<string | null>(null);
  const [showWrapped, setShowWrapped] = useState(false);

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
    setNewCommentText("");
    setActiveCommentMargemId(null);
    setChatActiveMargem(null);
    setSharingMargem(null);
    setPostMargemMomentData(null);
    setEcoAIPrompts({});
    setUnlockedSpoilers({});
    setShowPersistenceWarning(true);
    setChatMessages([
      {
        role: "companion",
        content: "Olá, alma leitora. Sou sua Companheira de Leitura. Que segredos de papel você trouxe para desvendar comigo hoje? Podemos falar sobre seus autores favoritos, debater o subtexto de um livro ou refinar uma anotação que você queira registrar nas margens.",
        timestamp: new Date()
      }
    ]);
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
        unlockedSpoilers,
        setUnlockedSpoilers,
        ecoAIPrompts,
        setEcoAIPrompts,
        activeCommentMargemId,
        setActiveCommentMargemId,
        newCommentText,
        setNewCommentText,
        chatMessages,
        setChatMessages,
        chatActiveMargem,
        setChatActiveMargem,
        sharingMargem,
        setSharingMargem,
        postMargemMomentData,
        setPostMargemMomentData,
        triggerChallengeComplete,
        executeResetApp,
        
        feedMode,
        setFeedMode,
        companionLoading,
        setCompanionLoading,
        userInputMessage,
        setUserInputMessage,
        loadingEcoPrompt,
        setLoadingEcoPrompt,
        showFutureLetter,
        setShowFutureLetter,
        
        wrappedData,
        setWrappedData,
        generatingWrapped,
        setGeneratingWrapped,
        wrappedErrorMessage,
        setWrappedErrorMessage,
        showWrapped,
        setShowWrapped
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
