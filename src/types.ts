export type SpoilerLevel = "none" | "light" | "moderate" | "heavy";

export interface UserProfile {
  title: string;
  description: string;
  signatureQuote: string;
  recommendedEcos: string[];
  aestheticColor: string;
  aestheticSymbol: string;
  avatarSeed?: string;
  username?: string;
  name?: string;
  bio?: string;
  streakDays: number;
  booksReadCount: number;
  savedCount: number;
  // Extended Identity Profile (Phase 3 & Phase 10)
  dominantArchetype?: string;
  emotionalMap?: Record<string, number>; // e.g. {"Melancolia": 45, "Nostalgia": 25, "Crises Existenciais": 20, "Esperança": 10}
  favoriteAtmospheres?: string[]; // e.g. ["Chuva na vidraça", "Café com aroma de canela", "Biblioteca silenciosa"]
  shapingBooks?: string[]; // e.g. ["Cem Anos de Solidão", "O Mito de Sísifo"]
  literaryTimeline?: { date: string; event: string; book?: string }[];
  wrappedGenerated?: boolean;
}

export interface OnboardingData {
  genres: string[];
  favoriteBooks: string;
  favoriteAuthors: string;
  habits: string;
  spoilerTolerance: SpoilerLevel;
  name: string;
  username: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  content: string;
  date: string;
}

export interface Margem {
  id: string;
  quote: string;
  thought: string;
  bookTitle: string;
  author: string;
  spoilerLevel: SpoilerLevel;
  date: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  lovesCount: number;
  loves: string[]; // List of usernames who liked it
  comments: Comment[];
  themeKey?: string; // Aesthetic theme for card generation (e.g. "classic", "night", "tea", "sunset")
  ecoId?: string; // Optional reference to an Eco
}

export interface Eco {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  marginsCount: number;
  icon: string; // Lucide icon string name
  imageBg: string; // Aesthetic photo background
}

export interface BookHighlight {
  id: string;
  title: string;
  author: string;
  quote: string;
  emotion: string; // e.g. "Melancolia", "Descoberta", "Filosofia"
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpPoints: number;
  completed: boolean;
  category: string;
}
