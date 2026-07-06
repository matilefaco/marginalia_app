import { UserProfile, CompatibilityResult } from "../types";

/**
 * Poetically calculates the literary compatibility between two readers
 * based on emotional maps, archetypes, atmospheres, and reading tastes.
 */
export const calculateCompatibility = (
  user: UserProfile,
  other: UserProfile
): CompatibilityResult => {
  // 1. Base Score calculation from emotional overlaps
  let emotionScore = 70; // baseline
  const userMap = user.emotionalMap || { "Solidão Bonita": 35, "Nostalgia": 25, "Crises Existenciais": 25, "Esperança": 15 };
  const otherMap = other.emotionalMap || { "Solidão Bonita": 40, "Nostalgia": 20, "Crises Existenciais": 20, "Esperança": 20 };

  let diffSum = 0;
  const allKeys = Array.from(new Set([...Object.keys(userMap), ...Object.keys(otherMap)]));
  
  allKeys.forEach((key) => {
    const userVal = userMap[key] || 0;
    const otherVal = otherMap[key] || 0;
    diffSum += Math.abs(userVal - otherVal);
  });

  // Maximum diff sum is 200, normalize diff to a deduction
  const emotionPenalty = Math.min(30, diffSum / 4);
  emotionScore = Math.max(40, 95 - emotionPenalty);

  // 2. Adjust with Archetype overlaps
  const hasSameArchetype = user.title === other.title || user.dominantArchetype === other.dominantArchetype;
  const scoreMod = hasSameArchetype ? 6 : Math.round(Math.random() * 4);
  const finalScore = Math.min(99, Math.round(emotionScore + scoreMod));

  // 3. Formulate poetic reasons (motifs) based on their profiles
  const motifs: string[] = [];
  const atmospheresUser = user.favoriteAtmospheres || [];
  const atmospheresOther = other.favoriteAtmospheres || [];
  const sharedAtmosphere = atmospheresUser.find(u => atmospheresOther.includes(u));

  if (sharedAtmosphere) {
    motifs.push(`Ambos encontram beleza na atmosfera de "${sharedAtmosphere}".`);
  } else {
    motifs.push("Vocês dois orbitam a mesma gravidade de sentimentos nas entrelinhas.");
  }

  // Check dominant emotions
  const userSortedEmos = Object.entries(userMap).sort((a, b) => b[1] - a[1]);
  const otherSortedEmos = Object.entries(otherMap).sort((a, b) => b[1] - a[1]);
  if (userSortedEmos[0]?.[0] === otherSortedEmos[0]?.[0]) {
    motifs.push(`A emoção soberana de ambos é a "${userSortedEmos[0]?.[0]}".`);
  } else {
    motifs.push(`Suas almas dialogam através da melancolia e da busca de frestas poéticas.`);
  }

  motifs.push("Vocês leem para preencher os silêncios que o cotidiano ruidoso cria.");

  // 4. Create conversation starters
  const conversationStarter = `Se vocês se encontrassem em um café silencioso, provavelmente começariam debatendo sobre se "${user.shapingBooks?.[0] || "as fendas do tempo"}" nos confortam ou nos assombram.`;

  return {
    score: finalScore,
    motifs: motifs.slice(0, 3),
    conversationStarter
  };
};

/**
 * Seeded mock reader profiles to demonstrate compatibility calculations
 */
export const MOCK_COMPATIBLE_READERS: UserProfile[] = [
  {
    name: "Beatriz Nogueira",
    username: "b_nogueira",
    title: "A Romântica Melancólica",
    dominantArchetype: "A Romântica Melancólica",
    description: "Lê sob a chuva de fim de tarde, buscando cicatrizes bonitas na ficção antiga.",
    signatureQuote: "Escrever é guardar em conserva o instante que já se foi.",
    recommendedEcos: ["Romance Histórico", "Poesia e Lírica"],
    aestheticColor: "#9C8A7D",
    aestheticSymbol: "Flor Prensada",
    avatarSeed: "beatriz",
    streakDays: 42,
    booksReadCount: 19,
    savedCount: 22,
    emotionalMap: { "Solidão Bonita": 45, "Nostalgia do Tempo": 30, "Amor Impossível": 25 },
    favoriteAtmospheres: ["Chuva na vidraça", "Café com aroma de canela"],
    shapingBooks: ["Morro dos Ventos Uivantes", "Cem Anos de Solidão"]
  },
  {
    name: "Thomas Salles",
    username: "thomas_s",
    title: "O Filósofo Silencioso",
    dominantArchetype: "O Filósofo Silencioso",
    description: "Caminha por romances de ideias e clássicos existencialistas para mapear o absurdo.",
    signatureQuote: "O silêncio do leitor é a resposta mais barulhenta que o autor recebe.",
    recommendedEcos: ["Filosofia Existencialista", "Clássicos Russos"],
    aestheticColor: "#3D3D3D",
    aestheticSymbol: "Lamparina",
    avatarSeed: "thomas",
    streakDays: 61,
    booksReadCount: 24,
    savedCount: 37,
    emotionalMap: { "Crises Existenciais": 50, "Solidão Bonita": 30, "Nostalgia do Tempo": 20 },
    favoriteAtmospheres: ["Biblioteca silenciosa", "Folhas envelhecidas"],
    shapingBooks: ["O Estrangeiro", "O Mito de Sísifo"]
  },
  {
    name: "Lara Mendes",
    username: "laramendes",
    title: "A Tecelã de Universos",
    dominantArchetype: "A Tecelã de Universos",
    description: "Procura pontes invisíveis entre poemas líricos e mundos de fantasia sublime.",
    signatureQuote: "Ler é costurar a própria alma com a linha dourada do infinito.",
    recommendedEcos: ["Poesia e Lírica", "Fantasia Sombria"],
    aestheticColor: "#BDAB9C",
    aestheticSymbol: "Pena de Ganso",
    avatarSeed: "lara",
    streakDays: 14,
    booksReadCount: 8,
    savedCount: 15,
    emotionalMap: { "Esperança Atenta": 40, "Nostalgia do Tempo": 35, "Silêncio Elegante": 25 },
    favoriteAtmospheres: ["Café com aroma de canela", "Lamparinas acesas"],
    shapingBooks: ["Grande Sertão: Veredas", "Divina Comédia"]
  }
];
