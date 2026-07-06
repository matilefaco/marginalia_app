import { Margem, Eco, UserProfile } from "../types";

export const ECO_EMOTION_MAP: Record<string, string> = {
  "amor-impossivel": "Amor Impossível",
  "solidao-bonita": "Solidão Bonita",
  "nostalgia": "Nostalgia do Tempo",
  "crises-existenciais": "Crises Existenciais",
  "esperanca-amanha": "Esperança Atenta",
  "melancolia-elegante": "Melancolia Elegante",
  "classicos-russos": "Melancolia Elegante",
  "filosofia-existencialista": "Crises Existenciais",
  "poesia-lirica": "Nostalgia do Tempo",
  "realismo-magico": "Esperança Atenta",
  "fantasia-sombria": "Solidão Bonita",
  "romance-historico": "Amor Impossível"
};

export function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
}

export function pickMargemDoDia(margens: Margem[]): Margem | null {
  if (!margens || margens.length === 0) return null;
  const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const rand = seededRandom(todayStr);
  const index = Math.floor(rand * margens.length);
  return margens[index];
}

export function pickEcoDaSemana(ecos: Eco[]): Eco | null {
  if (!ecos || ecos.length === 0) return null;
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
  const seed = `${now.getFullYear()}-W${weekNum}`;
  const rand = seededRandom(seed);
  const index = Math.floor(rand * ecos.length);
  return ecos[index];
}

export function scoreMargem(margem: Margem, userProfile: UserProfile, todaySeed: string): number {
  const now = new Date();
  const margemDate = new Date(margem.date);
  const ageMs = Math.max(0, now.getTime() - margemDate.getTime());
  const ageDays = ageMs / (1000 * 60 * 60 * 24);

  const recencyScore = 1 / (1 + ageDays / 3);

  const engagement = (margem.lovesCount || 0) + (margem.comments?.length || 0);
  const engagementScore = Math.log10(engagement + 1);

  // Get mapped emotion
  const emotion = margem.ecoId ? ECO_EMOTION_MAP[margem.ecoId] : undefined;
  let affinityScore = 0.5; // base fallback
  if (userProfile.emotionalMap && emotion) {
    const userValue = userProfile.emotionalMap[emotion] || 0;
    affinityScore = userValue / 100;
  }

  const surprise = seededRandom(todaySeed + "-" + margem.id) * 0.4;

  const score = recencyScore * 1.4 + engagementScore * 1.1 + affinityScore * 1.6 + surprise;
  return score;
}

export function orderFeedForDiscovery(margens: Margem[], userProfile: UserProfile): Margem[] {
  const todaySeed = new Date().toISOString().slice(0, 10);
  return [...margens].sort((a, b) => {
    const scoreA = scoreMargem(a, userProfile, todaySeed);
    const scoreB = scoreMargem(b, userProfile, todaySeed);
    return scoreB - scoreA;
  });
}

export function computeEmotionalMap(userMargens: Margem[]): Record<string, number> | null {
  if (!userMargens || userMargens.length === 0) return null;
  const counts: Record<string, number> = {};
  let mappedCount = 0;

  userMargens.forEach(m => {
    if (m.ecoId) {
      const emotion = ECO_EMOTION_MAP[m.ecoId];
      if (emotion) {
        counts[emotion] = (counts[emotion] || 0) + 1;
        mappedCount++;
      }
    }
  });

  if (mappedCount === 0) return null;

  const percentages: Record<string, number> = {};
  Object.keys(counts).forEach(key => {
    percentages[key] = Math.round((counts[key] / mappedCount) * 100);
  });

  const sortedEntries = Object.entries(percentages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const result: Record<string, number> = {};
  sortedEntries.forEach(([key, val]) => {
    result[key] = val;
  });

  return result;
}

export function computeShapingBooks(userMargens: Margem[]): string[] | null {
  if (!userMargens || userMargens.length === 0) return null;
  const counts: Record<string, number> = {};
  userMargens.forEach(m => {
    if (m.bookTitle) {
      counts[m.bookTitle] = (counts[m.bookTitle] || 0) + 1;
    }
  });

  const sortedBooks = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([book]) => book);

  return sortedBooks.length > 0 ? sortedBooks.slice(0, 3) : null;
}
