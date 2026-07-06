export interface OriginBook {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  openLibraryKey?: string;
  emotionalResidue: string;
}

export interface BookSearchResult {
  title: string;
  author: string;
  coverUrl?: string;
  openLibraryKey?: string;
}

export interface LiteraryDNA {
  originBooks: OriginBook[];
  shapingAuthors: string[];
  dominantEmotions: Record<string, number>;
  identityFormula: string;
  sharePhrase: string;
}

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
  literaryDNA?: LiteraryDNA;
}

export interface OnboardingData {
  genres: string[];
  favoriteBooks: string;
  favoriteAuthors: string;
  habits: string;
  spoilerTolerance: SpoilerLevel;
  name: string;
  username: string;
  originBooks?: OriginBook[];
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
  influential?: boolean; // Post-Margem Choice: Marked as major influence
  contributesToIdentity?: boolean; // Post-Margem Choice: Contributes to literary identity
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
  completed: boolean;
  category: string;
}

export interface SharePreset {
  key: string;
  name: string;
  bgClass: string;
  textClass: string;
  fontClass: string;
  borderClass: string;
  texture?: boolean;
  aspectRatio?: string; // "aspect-[9/16]" or "aspect-square" or "aspect-[3/4]"
}

export interface AuraData {
  emotions: Record<string, number>;
  archetype: string;
  themes: string[];
  symbol: string;
  phrase: string;
}

export interface SoulMapNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "book" | "emotion" | "margem" | "author" | "eco";
  details: string;
}

export interface CompatibilityResult {
  score: number;
  motifs: string[];
  conversationStarter: string;
}

export interface FutureLetterEntry {
  margemId: string;
  writtenDaysAgo: number;
  response?: string;
  respondedAt?: string;
}

export interface DailyMoment {
  date: string;
  title: string;
  description: string;
  emotion: string;
  ctaText: string;
  actionType: "aura" | "soulmap" | "companion" | "write" | "letter";
}

