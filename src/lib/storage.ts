import { UserProfile, Margem, Challenge } from "../types";

const STORAGE_SCHEMA_VERSION = "marginalia_v1";

/**
 * Safe JSON parser with error handling and fallback
 */
export function safeParse<T>(jsonStr: string | null, fallback: T): T {
  if (!jsonStr) return fallback;
  try {
    return JSON.parse(jsonStr) as T;
  } catch (error) {
    console.error("Failed to parse storage item. Returning fallback:", error);
    return fallback;
  }
}

/**
 * Initialize storage schema versioning
 */
const initSchemaVersion = (): void => {
  try {
    const currentVersion = localStorage.getItem("marginalia_schema_version");
    if (currentVersion !== STORAGE_SCHEMA_VERSION) {
      // In a real migration we could convert older schemas.
      // For now, we set the version. If we ever need to invalidate old/broken schemas, we can handle it here.
      localStorage.setItem("marginalia_schema_version", STORAGE_SCHEMA_VERSION);
    }
  } catch (error) {
    console.error("Failed to initialize storage schema version:", error);
  }
};

initSchemaVersion();

export const getStoredProfile = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem("marginalia_profile");
    if (!saved) return null;
    const profile = safeParse<UserProfile>(saved, null as any);
    if (!profile) return null;

    // Defensive migration to clean up pre-existing profiles with simulated/fallback data
    let modified = false;

    if (profile.literaryDNA) {
      // Clear old hardcoded dominant emotions/identity formulas
      const emotions = profile.literaryDNA.dominantEmotions || {};
      if (emotions["Melancolia Elegante"] === 35 && emotions["Desejo Impossível"] === 25) {
        profile.literaryDNA.dominantEmotions = {};
        profile.literaryDNA.identityFormula = "";
        modified = true;
      }

      // Clear default authors if they are the simulated fallbacks and weren't in originBooks
      if (Array.isArray(profile.literaryDNA.shapingAuthors)) {
        const hasClarice = profile.literaryDNA.shapingAuthors.includes("Clarice Lispector");
        const hasGabo = profile.literaryDNA.shapingAuthors.includes("Gabriel García Márquez");
        if (hasClarice || hasGabo) {
          const originBookAuthors = (profile.literaryDNA.originBooks || []).map(b => b.author).filter(a => a && a !== "Autor Desconhecido");
          const beforeLen = profile.literaryDNA.shapingAuthors.length;
          profile.literaryDNA.shapingAuthors = profile.literaryDNA.shapingAuthors.filter(author => {
            const isDefault = author === "Clarice Lispector" || author === "Gabriel García Márquez";
            if (!isDefault) return true;
            return originBookAuthors.includes(author);
          });
          if (profile.literaryDNA.shapingAuthors.length !== beforeLen) {
            modified = true;
          }
        }
      }
    }

    // Recommended ecosystems cleanup (revert default fallback to mapped/universais)
    if (Array.isArray(profile.recommendedEcos)) {
      const isOldFallback = profile.recommendedEcos.length === 2 && 
                            profile.recommendedEcos.includes("Filosofia Existencialista") && 
                            profile.recommendedEcos.includes("Clássicos Russos");
      
      if (isOldFallback) {
        const genreToEcoMap: Record<string, string> = {
          "Literatura Clássica": "Clássicos Russos",
          "Poesia e Lírica": "Poesia Marginal",
          "Filosofia": "Filosofia Existencialista",
          "Realismo Mágico": "Latino-Americana Mágica",
          "Fantasia Sombria": "Fantasia Gótica",
          "Romance Histórico": "Romance de Época",
          "Ensaios Modernos": "Crítica Social",
          "Suspense Psicológico": "Thriller de Mente",
          "Ficção Científica": "Ficção Distópica"
        };
        const matchedEcos: string[] = [];
        Object.entries(genreToEcoMap).forEach(([genre, eco]) => {
          if (profile.bio && profile.bio.toLowerCase().includes(genre.toLowerCase())) {
            matchedEcos.push(eco);
          }
        });
        profile.recommendedEcos = matchedEcos.length > 0 ? matchedEcos : ["Clássicos Universais"];
        modified = true;
      }
    }

    // Ensure persistent mock emotionalMap is cleared
    if (profile.emotionalMap && Object.keys(profile.emotionalMap).length > 0) {
      if (profile.emotionalMap["Melancolia Elegante"] === 35 || profile.emotionalMap["Solidão Bonita"] === 25) {
        profile.emotionalMap = {};
        modified = true;
      }
    }

    if (modified) {
      localStorage.setItem("marginalia_profile", JSON.stringify(profile));
    }

    return profile;
  } catch (error) {
    console.error("Failed to load profile from storage:", error);
    return null;
  }
};

export const setStoredProfile = (profile: UserProfile | null): void => {
  try {
    if (profile === null) {
      localStorage.removeItem("marginalia_profile");
    } else {
      localStorage.setItem("marginalia_profile", JSON.stringify(profile));
    }
  } catch (error) {
    console.error("Failed to save profile to storage:", error);
  }
};

export const getStoredMargens = (fallback: Margem[]): Margem[] => {
  try {
    const saved = localStorage.getItem("marginalia_margens");
    if (!saved) return fallback;
    const parsed = safeParse<Margem[]>(saved, fallback);
    const onlyUser = parsed.filter(m => !m.isEditorial);
    if (parsed.length !== onlyUser.length) {
      localStorage.setItem("marginalia_margens", JSON.stringify(onlyUser));
    }
    return onlyUser;
  } catch (error) {
    console.error("Failed to load margens from storage, using default fallback:", error);
    return fallback;
  }
};

export const setStoredMargens = (margens: Margem[]): void => {
  try {
    localStorage.setItem("marginalia_margens", JSON.stringify(margens));
  } catch (error) {
    console.error("Failed to save margens to storage:", error);
  }
};

export const getStoredChallenges = (fallback: Challenge[]): Challenge[] => {
  try {
    const saved = localStorage.getItem("marginalia_challenges");
    return saved ? safeParse<Challenge[]>(saved, fallback) : fallback;
  } catch (error) {
    console.error("Failed to load challenges from storage, using default fallback:", error);
    return fallback;
  }
};

export const setStoredChallenges = (challenges: Challenge[]): void => {
  try {
    localStorage.setItem("marginalia_challenges", JSON.stringify(challenges));
  } catch (error) {
    console.error("Failed to save challenges to storage:", error);
  }
};

export const getDailyDismissed = (dateStr: string): boolean => {
  try {
    return localStorage.getItem(`marginalia_daily_opening_dismissed_${dateStr}`) === "true";
  } catch (error) {
    return false;
  }
};

export const setDailyDismissed = (dateStr: string): void => {
  try {
    localStorage.setItem(`marginalia_daily_opening_dismissed_${dateStr}`, "true");
  } catch (error) {
    console.error("Failed to dismiss daily opening:", error);
  }
};

export const getPersistenceWarningDismissed = (): boolean => {
  try {
    return localStorage.getItem("marginalia_persistence_warning_dismissed") === "true";
  } catch (error) {
    return false;
  }
};

export const setPersistenceWarningDismissed = (): void => {
  try {
    localStorage.setItem("marginalia_persistence_warning_dismissed", "true");
  } catch (error) {
    console.error("Failed to dismiss persistence warning:", error);
  }
};

export const clearAllStorage = (): void => {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("marginalia_")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    // Re-initialize version after clear
    localStorage.setItem("marginalia_schema_version", STORAGE_SCHEMA_VERSION);
  } catch (error) {
    console.error("Failed to clear Marginalia storage:", error);
  }
};
