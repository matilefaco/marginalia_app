import { UserProfile, Margem } from "../types";

/**
 * Deterministically generates deep, poetic signature phrases
 * based on the reader's profile attributes, dominant emotions, and margins.
 */
export const generateIdentityQuote = (
  userProfile: UserProfile,
  userMargins: Margem[],
  variationIndex: number = 0
): string => {
  const archetype = userProfile.dominantArchetype || userProfile.title || "Leitor Contemplativo";
  
  // List of deep, highly aesthetic literary reflections
  const templates: Record<string, string[]> = {
    melancolia: [
      "Você lê para encontrar nomes para aquilo que já doeu ou ainda vibra em silêncio.",
      "Sua alma vive na fresta doce entre a saudade e o peso sagrado de cada página.",
      "Você coleciona frases como quem guarda pequenos fósforos contra o escuro do tempo.",
      "Para você, os livros não são caminhos de fuga, mas espelhos de frestas esquecidas."
    ],
    filosofia: [
      "Você lê para desatar os nós das grandes perguntas que a maioria prefere ignorar.",
      "Seu silêncio não é ausência; é o peso de mil páginas suspensas na memória.",
      "Suas margens são perguntas afiadas que tateiam o invisível no breu do cotidiano.",
      "Você caminha pelas linhas como um cartógrafo que mapeia o próprio absurdo com calma."
    ],
    romance: [
      "Você lê como quem procura abrigo em cada palavra, costurando silêncios com ternura.",
      "Cada dobra de página sua é o testemunho silencioso de um coração que escuta o eterno.",
      "Sua biblioteca é um diário secreto escrito com a tinta alheia e os seus sentimentos.",
      "Sua sensibilidade orbita a doçura e a gravidade de afetos que resistem ao esquecimento."
    ],
    default: [
      "Você lê para lembrar que suas perguntas mais profundas já foram sussurradas antes.",
      "A tinta dos seus livros é o mapa das suas pequenas revoluções e silêncios íntimos.",
      "Seus pensamentos habitam as pequenas margens onde a pressa do mundo não consegue entrar.",
      "Você habita as entrelinhas com a paciência de quem sabe que a beleza exige mistério."
    ]
  };

  // Select key based on profile character
  let key = "default";
  const lowerTitle = archetype.toLowerCase();
  const lowerDesc = userProfile.description.toLowerCase();
  
  if (lowerTitle.includes("melancól") || lowerDesc.includes("saudade") || lowerDesc.includes("melancol")) {
    key = "melancolia";
  } else if (lowerTitle.includes("filósof") || lowerTitle.includes("mistéri") || lowerDesc.includes("perguntas") || lowerDesc.includes("pensar")) {
    key = "filosofia";
  } else if (lowerTitle.includes("romântic") || lowerTitle.includes("tecelã") || lowerDesc.includes("amor") || lowerDesc.includes("sentimento")) {
    key = "romance";
  }

  const list = templates[key] || templates.default;
  const index = Math.abs(variationIndex + archetype.length + userMargins.length) % list.length;
  
  return list[index];
};
