import { useState } from "react";
import { OnboardingForm } from "../types";
import { OriginBook, BookSearchResult, SpoilerLevel } from "../../../types";

export const useOnboardingForm = () => {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingForm, setOnboardingForm] = useState<OnboardingForm>({
    name: "",
    username: "",
    genres: [],
    favoriteBooks: "",
    favoriteAuthors: "",
    habits: "Todas as noites antes de dormir",
    spoilerTolerance: "moderate"
  });

  const [originBooks, setOriginBooks] = useState<OriginBook[]>([]);
  const [bookQuery, setBookQuery] = useState("");
  const [bookSearchResults, setBookSearchResults] = useState<BookSearchResult[]>([]);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [selectedSearchBook, setSelectedSearchBook] = useState<BookSearchResult | null>(null);
  const [manualTitle, setManualTitle] = useState("");
  const [manualAuthor, setManualAuthor] = useState("");
  const [emotionalResidue, setEmotionalResidue] = useState("");

  const handleGenreToggle = (genre: string) => {
    setOnboardingForm(prev => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  return {
    onboardingStep,
    setOnboardingStep,
    onboardingForm,
    setOnboardingForm,
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
  };
};
