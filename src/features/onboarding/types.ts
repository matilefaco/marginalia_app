import { SpoilerLevel, OriginBook } from "../../types";

export type OnboardingGenerationState = "idle" | "generating" | "ready" | "error";

export interface OnboardingForm {
  name: string;
  username: string;
  genres: string[];
  favoriteBooks: string;
  favoriteAuthors: string;
  habits: string;
  spoilerTolerance: SpoilerLevel;
}
