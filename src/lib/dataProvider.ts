import { 
  getStoredProfile, 
  setStoredProfile, 
  getStoredMargens, 
  setStoredMargens, 
  getStoredChallenges, 
  setStoredChallenges 
} from "./storage";
import { UserProfile, Margem, Challenge } from "../types";

/**
 * Marginalia Unified Data Provider
 * Current implementation uses safe localStorage via storage.ts.
 * 
 * DESIGNED FOR EASY BACKEND MIGRATION:
 * Simply replace the internal implementation of these functions with standard fetch/axios calls
 * to your persistent API server (e.g., PostgreSQL + Express).
 */

export const getProfile = async (): Promise<UserProfile | null> => {
  // Future backend: const res = await fetch("/api/profile"); return res.json();
  return getStoredProfile();
};

export const saveProfile = async (profile: UserProfile): Promise<void> => {
  // Future backend: await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
  setStoredProfile(profile);
};

export const getMargens = async (fallback: Margem[] = []): Promise<Margem[] | null> => {
  // Future backend: const res = await fetch("/api/margens"); return res.json();
  return getStoredMargens(fallback);
};

export const saveMargens = async (margens: Margem[]): Promise<void> => {
  // Future backend: await fetch("/api/margens", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(margens) });
  setStoredMargens(margens);
};

export const getChallenges = async (fallback: Challenge[] = []): Promise<Challenge[] | null> => {
  // Future backend: const res = await fetch("/api/challenges"); return res.json();
  return getStoredChallenges(fallback);
};

export const saveChallenges = async (challenges: Challenge[]): Promise<void> => {
  // Future backend: await fetch("/api/challenges", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(challenges) });
  setStoredChallenges(challenges);
};
