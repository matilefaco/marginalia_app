import { useState } from "react";
import { UserProfile, OriginBook } from "../../../types";
import { OnboardingForm, OnboardingGenerationState } from "../types";
import { normalizeGeneratedProfile } from "../services/normalizeGeneratedProfile";
import { createFallbackLiteraryProfile } from "../services/createFallbackLiteraryProfile";

export const useLiteraryProfileGeneration = () => {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [onboardingGenerationState, setOnboardingGenerationState] = useState<OnboardingGenerationState>("idle");
  const [generatedProfile, setGeneratedProfile] = useState<UserProfile | null>(null);

  const generateProfile = async (
    form: OnboardingForm,
    originBooks: OriginBook[]
  ) => {
    setOnboardingGenerationState("generating");
    setLoadingProfile(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn("[AuraFlow] Requisição excedeu 15 segundos! Abortando...");
      controller.abort();
    }, 15000);

    try {
      const res = await fetch("/api/ai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          genres: form.genres,
          books: form.favoriteBooks,
          authors: form.favoriteAuthors,
          habits: form.habits,
          spoilerTolerance: form.spoilerTolerance,
          originBooks: originBooks
        })
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Erro na resposta HTTP da API: ${res.status}`);
      }

      const data = await res.json();
      if (!data.profile) {
        throw new Error("A API não retornou um perfil literário válido em 'profile'.");
      }

      const normalizedProfile = normalizeGeneratedProfile(data.profile, form, originBooks);
      setGeneratedProfile(normalizedProfile);
      setOnboardingGenerationState("ready");
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("[AuraFlow] request failed, using fallback", err);
      const fallbackProfile = createFallbackLiteraryProfile(form, originBooks);
      setGeneratedProfile(fallbackProfile);
      setOnboardingGenerationState("error");
    } finally {
      setLoadingProfile(false);
    }
  };

  return {
    loadingProfile,
    onboardingGenerationState,
    generatedProfile,
    generateProfile,
    setGeneratedProfile
  };
};
