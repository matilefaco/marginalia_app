import { UserProfile, Margem, Challenge } from "../types";
import { isFeatureEnabled } from "../config/featureFlags";

const STORAGE_SCHEMA_VERSION = "marginalia_v2";

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

export const readStoredSchemaVersion = (): string | null => {
  try {
    return localStorage.getItem("marginalia_schema_version");
  } catch (error) {
    console.error("Failed to read schema version:", error);
    return null;
  }
};

const LEGACY_MOCK_DOMINANT_EMOTIONS = {
  "Desejo Impossível": 25,
  "Melancolia Elegante": 35,
  "Nostalgia Atenta": 15,
  "Solidão Bonita": 25
};

const LEGACY_MOCK_EMOTIONAL_MAP = {
  "Desejo Impossível": 25,
  "Melancolia Elegante": 35,
  "Nostalgia Atenta": 15,
  "Solidão Bonita": 25
};

export const exactlyMatchesRecord = (
  actual: Record<string, number> | undefined | null,
  expected: Record<string, number>
): boolean => {
  if (!actual) return false;
  const actualKeys = Object.keys(actual).sort();
  const expectedKeys = Object.keys(expected).sort();

  return (
    actualKeys.length === expectedKeys.length &&
    actualKeys.every(
      (key, index) =>
        key === expectedKeys[index] &&
        actual[key] === expected[key]
    )
  );
};

export const migrateProfile = (
  profile: UserProfile,
  fromVersion: string | null
): { profile: UserProfile; modified: boolean } => {
  let modified = false;

  // Normalizar fields enquanto desativados
  if (profile.streakDays !== 0 || profile.booksReadCount !== 0 || profile.savedCount !== 0) {
    profile.streakDays = 0;
    profile.booksReadCount = 0;
    profile.savedCount = 0;
    modified = true;
  }

  // Estamos migrando de uma versão anterior
  if (profile.literaryDNA) {
    const emotions = profile.literaryDNA.dominantEmotions || {};
    
    // Identificar se os dados de DNA correspondem exatamente aos antigos mocks estáticos
    const isMockEmotions = exactlyMatchesRecord(emotions, LEGACY_MOCK_DOMINANT_EMOTIONS);
    
    if (isMockEmotions) {
      // Limpar apenas se for detectado o padrão exato do mock legado
      profile.literaryDNA.dominantEmotions = {};
      profile.literaryDNA.identityFormula = "";
      modified = true;
    }
  }

  // Recommended ecosystems cleanup (only remove "Clássicos Universais" if it is exactly the fallback with no classic references)
  if (Array.isArray(profile.recommendedEcos)) {
    const hasClassicosUniversais = profile.recommendedEcos.includes("Clássicos Universais");
    const hasNoBooks = !profile.literaryDNA?.originBooks || profile.literaryDNA.originBooks.length === 0;
    const hasNoClassicsInBio = !profile.bio || !profile.bio.toLowerCase().includes("clássicos");

    if (hasClassicosUniversais && hasNoBooks && hasNoClassicsInBio) {
      profile.recommendedEcos = profile.recommendedEcos.filter(eco => eco !== "Clássicos Universais");
      modified = true;
    }
  }

  // Ensure persistent mock emotionalMap is cleared
  if (profile.emotionalMap && Object.keys(profile.emotionalMap).length > 0) {
    const isMockMap = exactlyMatchesRecord(profile.emotionalMap, LEGACY_MOCK_EMOTIONAL_MAP);
    if (isMockMap) {
      profile.emotionalMap = {};
      modified = true;
    }
  }

  return { profile, modified };
};

export const getStoredProfile = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem("marginalia_profile");
    if (!saved) {
      // Se não houver perfil salvo, inicializa diretamente a versão mais recente
      localStorage.setItem("marginalia_schema_version", STORAGE_SCHEMA_VERSION);
      localStorage.setItem("marginalia_profile_migration_v2_completed", "true");
      return null;
    }
    const profile = safeParse<UserProfile>(saved, null as any);
    if (!profile) return null;

    const isMigrationCompleted = localStorage.getItem("marginalia_profile_migration_v2_completed") === "true";

    if (!isMigrationCompleted) {
      const fromVersion = readStoredSchemaVersion();
      const { profile: migratedProfile, modified } = migrateProfile(profile, fromVersion);

      if (modified) {
        localStorage.setItem("marginalia_profile", JSON.stringify(migratedProfile));
      }

      localStorage.setItem("marginalia_profile_migration_v2_completed", "true");
      localStorage.setItem("marginalia_schema_version", STORAGE_SCHEMA_VERSION);

      return migratedProfile;
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
      localStorage.setItem("marginalia_schema_version", STORAGE_SCHEMA_VERSION);
      localStorage.setItem("marginalia_profile_migration_v2_completed", "true");
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
    const onlyUserMargins = margens.filter(
      margem => margem && !margem.isEditorial
    );
    localStorage.setItem(
      "marginalia_margens",
      JSON.stringify(onlyUserMargins)
    );
  } catch (error) {
    console.error("Failed to save margens to storage:", error);
  }
};

export const getStoredChallenges = (fallback: Challenge[]): Challenge[] => {
  try {
    if (!isFeatureEnabled("weeklyRituals")) {
      localStorage.removeItem("marginalia_challenges");
      return [];
    }
    const saved = localStorage.getItem("marginalia_challenges");
    return saved ? safeParse<Challenge[]>(saved, fallback) : fallback;
  } catch (error) {
    console.error("Failed to load challenges from storage, using default fallback:", error);
    return fallback;
  }
};

export const setStoredChallenges = (challenges: Challenge[]): void => {
  try {
    if (!isFeatureEnabled("weeklyRituals")) {
      localStorage.removeItem("marginalia_challenges");
      return;
    }
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
    localStorage.setItem("marginalia_profile_migration_v2_completed", "true");
  } catch (error) {
    console.error("Failed to clear Marginalia storage:", error);
  }
};
