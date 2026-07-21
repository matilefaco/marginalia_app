import { UserProfile, OriginBook } from "../../../types";
import { OnboardingForm } from "../types";
import { createFallbackLiteraryProfile } from "./createFallbackLiteraryProfile";

export const normalizeGeneratedProfile = (
  raw: any,
  form: OnboardingForm,
  booksList: OriginBook[]
): UserProfile => {
  console.log("[AuraFlow] Normalizando dados retornados da API...", raw);
  const fallback = createFallbackLiteraryProfile(form, booksList);
  
  const rawDNA = raw?.literaryDNA || {};
  
  const cleanDNA = {
    originBooks: booksList,
    shapingAuthors: Array.isArray(rawDNA.shapingAuthors) && rawDNA.shapingAuthors.length > 0
      ? rawDNA.shapingAuthors
      : fallback.literaryDNA!.shapingAuthors,
    dominantEmotions: rawDNA.dominantEmotions && typeof rawDNA.dominantEmotions === "object"
      ? rawDNA.dominantEmotions
      : fallback.literaryDNA!.dominantEmotions,
    identityFormula: typeof rawDNA.identityFormula === "string" && rawDNA.identityFormula.trim() !== ""
      ? rawDNA.identityFormula
      : fallback.literaryDNA!.identityFormula,
    sharePhrase: typeof rawDNA.sharePhrase === "string" && rawDNA.sharePhrase.trim() !== ""
      ? rawDNA.sharePhrase
      : fallback.literaryDNA!.sharePhrase
  };

  return {
    title: typeof raw?.title === "string" && raw.title.trim() !== "" ? raw.title : fallback.title,
    description: typeof raw?.description === "string" && raw.description.trim() !== "" ? raw.description : fallback.description,
    signatureQuote: typeof raw?.signatureQuote === "string" && raw.signatureQuote.trim() !== "" ? raw.signatureQuote : fallback.signatureQuote,
    recommendedEcos: Array.isArray(raw?.recommendedEcos) && raw.recommendedEcos.length > 0
      ? raw.recommendedEcos
      : fallback.recommendedEcos,
    aestheticColor: typeof raw?.aestheticColor === "string" && raw.aestheticColor.startsWith("#") ? raw.aestheticColor : fallback.aestheticColor,
    aestheticSymbol: typeof raw?.aestheticSymbol === "string" && raw.aestheticSymbol.trim() !== "" ? raw.aestheticSymbol : fallback.aestheticSymbol,
    name: form.name,
    username: form.username,
    avatarSeed: form.username.toLowerCase(),
    bio: typeof raw?.bio === "string" && raw.bio.trim() !== "" ? raw.bio.trim() : fallback.bio,
    streakDays: 0,
    booksReadCount: 0,
    savedCount: 0,
    literaryDNA: cleanDNA
  };
};
