import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMarginalia } from "../context/MarginaliaContext";
import { exportNodeAsPng } from "../lib/exportImage";

// Onboarding Feature Modular Elements
import { OnboardingLayout } from "../features/onboarding/components/OnboardingLayout";
import { IdentificationStep } from "../features/onboarding/components/IdentificationStep";
import { LiteraryAffinitiesStep } from "../features/onboarding/components/LiteraryAffinitiesStep";
import { OriginBooksStep } from "../features/onboarding/components/OriginBooksStep";
import { ReadingRitualsStep } from "../features/onboarding/components/ReadingRitualsStep";
import { ProfileGenerationStep } from "../features/onboarding/components/ProfileGenerationStep";
import { GeneratedProfileCard } from "../features/onboarding/components/GeneratedProfileCard";

import { useOnboardingForm } from "../features/onboarding/hooks/useOnboardingForm";
import { useLiteraryProfileGeneration } from "../features/onboarding/hooks/useLiteraryProfileGeneration";
import { createFallbackLiteraryProfile } from "../features/onboarding/services/createFallbackLiteraryProfile";

export const OnboardingPage: React.FC = () => {
  const { setUserProfile } = useMarginalia();
  const navigate = useNavigate();

  // Modular Hooks
  const {
    onboardingStep,
    setOnboardingStep,
    onboardingForm,
    onboardingForm: { name, username },
    originBooks,
    setOriginBooks,
    bookQuery,
    setBookQuery,
    bookSearchResults,
    setBookSearchResults,
    isSearchingBooks,
    setIsSearchingBooks,
    selectedSearchBook,
    setSelectedSearchBook,
    manualTitle,
    setManualTitle,
    manualAuthor,
    setManualAuthor,
    emotionalResidue,
    setEmotionalResidue,
    handleGenreToggle
  } = useOnboardingForm();

  const {
    loadingProfile,
    onboardingGenerationState,
    generatedProfile,
    generateProfile
  } = useLiteraryProfileGeneration();

  // Export states & refs
  const onboardingCardRef = useRef<HTMLDivElement>(null);
  const [downloadingAura, setDownloadingAura] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadAuraError, setDownloadAuraError] = useState<string | null>(null);

  const handleStartOnboardingAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username) {
      alert("Por favor, preencha seu nome e apelido literário.");
      return;
    }
    setOnboardingStep(5);
    await generateProfile(onboardingForm, originBooks);
  };

  const handleDownloadAura = async () => {
    const profile = generatedProfile || createFallbackLiteraryProfile(onboardingForm, originBooks);
    if (!profile || !onboardingCardRef.current) {
      setDownloadAuraError("Não consegui preparar o story agora. Tente novamente em alguns instantes.");
      return;
    }

    setDownloadingAura(true);
    setDownloadSuccess(false);
    setDownloadAuraError(null);

    try {
      await exportNodeAsPng(
        onboardingCardRef.current,
        `marginalia-aura-${profile.username}`
      );
      setDownloadSuccess(true);
    } catch (err: any) {
      console.error("[handleDownloadAura] Erro ao exportar imagem da Aura Literária:", err);
      setDownloadAuraError("Não consegui preparar o story agora. Tente novamente em alguns instantes.");
    } finally {
      setDownloadingAura(false);
    }
  };

  const handleConfirmProfile = () => {
    const profile = generatedProfile || createFallbackLiteraryProfile(onboardingForm, originBooks);
    if (profile) {
      setUserProfile(profile);
      navigate("/margens");
    }
  };

  // Dynamic header text based on step
  const getHeaderText = () => {
    if (onboardingStep === 5) {
      if (onboardingGenerationState === "generating" || loadingProfile) {
        return "Revelando sua Aura";
      }
      return onboardingGenerationState === "error"
        ? "Sua Interpretação Inicial"
        : "Sua Aura Revelada";
    }
    return "Iniciação ao Marginalia";
  };

  const safeProfile = generatedProfile || createFallbackLiteraryProfile(onboardingForm, originBooks);

  return (
    <OnboardingLayout headerText={getHeaderText()}>
      {onboardingStep === 1 && (
        <IdentificationStep
          form={onboardingForm}
          onFormChange={(updates) => {
            const keys = Object.keys(updates) as Array<keyof typeof updates>;
            keys.forEach((key) => {
              (onboardingForm as any)[key] = updates[key];
            });
            // trigger state rerender
            setBookQuery((q) => q);
          }}
          onNext={() => setOnboardingStep(2)}
        />
      )}

      {onboardingStep === 2 && (
        <LiteraryAffinitiesStep
          form={onboardingForm}
          onGenreToggle={handleGenreToggle}
          onPrev={() => setOnboardingStep(1)}
          onNext={() => setOnboardingStep(3)}
        />
      )}

      {onboardingStep === 3 && (
        <OriginBooksStep
          originBooks={originBooks}
          setOriginBooks={setOriginBooks}
          bookQuery={bookQuery}
          setBookQuery={setBookQuery}
          bookSearchResults={bookSearchResults}
          setBookSearchResults={setBookSearchResults}
          isSearchingBooks={isSearchingBooks}
          setIsSearchingBooks={setIsSearchingBooks}
          selectedSearchBook={selectedSearchBook}
          setSelectedSearchBook={setSelectedSearchBook}
          manualTitle={manualTitle}
          setManualTitle={setManualTitle}
          manualAuthor={manualAuthor}
          setManualAuthor={setManualAuthor}
          emotionalResidue={emotionalResidue}
          setEmotionalResidue={setEmotionalResidue}
          onPrev={() => setOnboardingStep(2)}
          onNext={() => setOnboardingStep(4)}
        />
      )}

      {onboardingStep === 4 && (
        <ReadingRitualsStep
          form={onboardingForm}
          onFormChange={(updates) => {
            const keys = Object.keys(updates) as Array<keyof typeof updates>;
            keys.forEach((key) => {
              (onboardingForm as any)[key] = updates[key];
            });
            // trigger state rerender
            setBookQuery((q) => q);
          }}
          onSubmit={handleStartOnboardingAI}
          onPrev={() => setOnboardingStep(3)}
        />
      )}

      {onboardingStep === 5 && (onboardingGenerationState === "generating" || loadingProfile) && (
        <ProfileGenerationStep />
      )}

      {onboardingStep === 5 && onboardingGenerationState !== "generating" && !loadingProfile && (
        <GeneratedProfileCard
          safeProfile={safeProfile}
          onboardingGenerationState={onboardingGenerationState}
          downloadSuccess={downloadSuccess}
          downloadAuraError={downloadAuraError}
          downloadingAura={downloadingAura}
          handleDownloadAura={handleDownloadAura}
          handleConfirmProfile={handleConfirmProfile}
          onboardingCardRef={onboardingCardRef}
        />
      )}
    </OnboardingLayout>
  );
};

export default OnboardingPage;
