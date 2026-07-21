import { 
  getStoredProfile, 
  setStoredProfile, 
  getStoredMargens, 
  setStoredMargens, 
  getStoredChallenges, 
  setStoredChallenges, 
  clearAllStorage,
  getPersistenceWarningDismissed,
  setPersistenceWarningDismissed
} from "../lib/storage";
import { UserProfile, Margem, Challenge } from "../types";

export const localMarginaliaRepository = {
  getProfile: (): UserProfile | null => {
    return getStoredProfile();
  },

  saveProfile: (profile: UserProfile | null): void => {
    setStoredProfile(profile);
  },

  getMargens: (defaultVal: Margem[] = []): Margem[] => {
    return getStoredMargens(defaultVal);
  },

  saveMargens: (margens: Margem[]): void => {
    setStoredMargens(margens);
  },

  getChallenges: (defaultVal: Challenge[] = []): Challenge[] => {
    return getStoredChallenges(defaultVal);
  },

  saveChallenges: (challenges: Challenge[]): void => {
    setStoredChallenges(challenges);
  },

  clearAll: (): void => {
    clearAllStorage();
  },

  getWarningDismissed: (): boolean => {
    return getPersistenceWarningDismissed();
  },

  setWarningDismissed: (): void => {
    setPersistenceWarningDismissed();
  }
};
