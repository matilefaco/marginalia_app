import { UserProfile, OriginBook } from "../../../types";
import { OnboardingForm } from "../types";

export const createFallbackLiteraryProfile = (
  form: OnboardingForm,
  booksList: OriginBook[]
): UserProfile => {
  console.log("[AuraFlow] Gerando fallback literário offline centralizado...");
  
  const genreToEcoMap: Record<string, string> = {
    "Literatura Clássica": "Clássicos Russos",
    "Poesia e Lírica": "Poesia Marginal",
    "Filosofia": "Filosofia Existencialista",
    "Realismo Mágico": "Latino-Americana Mágica",
    "Fantasia Sombria": "Fantasia Gótica",
    "Romance Histórico": "Romance de Época",
    "Ensaios Modernos": "Crítica Social",
    "Suspense Psicológico": "Thriller de Mente",
    "Ficção Científica": "Ficção Distópica"
  };

  const genreToSymbolMap: Record<string, string> = {
    "Literatura Clássica": "Tomo Antigo",
    "Poesia e Lírica": "Lira de Bronze",
    "Filosofia": "Ampulheta",
    "Realismo Mágico": "Borboleta de Papel",
    "Fantasia Sombria": "Chave Enferrujada",
    "Romance Histórico": "Pergaminho",
    "Ensaios Modernos": "Lente de Aumento",
    "Suspense Psicológico": "Espelho Convexo",
    "Ficção Científica": "Astrolábio"
  };

  const genreToColorMap: Record<string, string> = {
    "Literatura Clássica": "#8A7D72", // Sepia escuro
    "Poesia e Lírica": "#A67C8E", // Rosé antigo
    "Filosofia": "#7D8C82", // Sálvia
    "Realismo Mágico": "#BCA374", // Ouro velho
    "Fantasia Sombria": "#5C5470", // Púrpura acinzentado
    "Romance Histórico": "#9B7D62", // Terracota suave
    "Ensaios Modernos": "#6B828F", // Azul ardósia
    "Suspense Psicológico": "#5F7161", // Verde musgo sombrio
    "Ficção Científica": "#787A91" // Cinza sideral
  };

  const genresList = form.genres || [];
  const authorsList = [
    ...new Set([
      ...(booksList.map(b => b.author).filter(a => a && a !== "Autor Desconhecido")),
      ...(form.favoriteAuthors ? form.favoriteAuthors.split(",").map(a => a.trim()).filter(Boolean) : [])
    ])
  ];
  const booksListTitles = [
    ...new Set([
      ...(booksList.map(b => b.title).filter(Boolean)),
      ...(form.favoriteBooks ? form.favoriteBooks.split(",").map(b => b.trim()).filter(Boolean) : [])
    ])
  ];

  const mainGenre = genresList[0] || "";
  const mainAuthor = authorsList[0] || "";
  const mainBook = booksListTitles[0] || "";

  let title = "Perfil Literário Inicial";
  let description = "Seu rastro de leitura começou a ser desenhado. À medida que você registrar suas reflexões nas margens, sua identidade poética ganhará novos contornos.";
  let signatureQuote = "";
  let aestheticColor = "#BDAB9C";
  let aestheticSymbol = "";

  if (genresList.length > 0 || authorsList.length > 0 || booksListTitles.length > 0) {
    if (mainGenre && mainAuthor) {
      title = `Leitor de Afinidades (${mainGenre})`;
      description = `Seu perfil reflete um interesse pelas atmosferas de ${mainGenre}, movido pela influência artística de autores como ${mainAuthor}.`;
    } else if (mainGenre) {
      title = `Explorador de ${mainGenre}`;
      description = `Suas escolhas apontam para uma sensibilidade sintonizada com ${mainGenre}, revelando um olhar atento aos subtextos dessa atmosfera.`;
    } else if (mainAuthor) {
      title = `Arqueólogo Literário`;
      description = `Suas leituras orbitam ao redor de referências como ${mainAuthor}, buscando compreender as minúcias de sua escrita e style.`;
    } else if (mainBook) {
      title = `Leitor de Afinidades`;
      description = `Seu diário se inicia sob a inspiração de obras marcantes como "${mainBook}", onde cada margem é uma nova reflexão.`;
    }
  }

  if (mainAuthor && mainBook) {
    signatureQuote = `“Nas dobras das páginas de ${mainBook}, busco decifrar a escrita e os rastros de ${mainAuthor}.”`;
  } else if (mainAuthor) {
    signatureQuote = `“Reescrevendo minhas próprias impressões sob as linhas traçadas por ${mainAuthor}.”`;
  } else if (mainBook) {
    signatureQuote = `“Procurando abrigo e novos significados nos silêncios e entrelinhas de ${mainBook}.”`;
  } else if (mainGenre) {
    signatureQuote = `“Aventurando-se pelas atmosferas e sensibilidades de ${mainGenre}.”`;
  } else {
    signatureQuote = "“Assinatura Poética Provisória: Caminhando pelas margens iniciais de um novo diário de leitura.”";
  }

  if (mainGenre && genreToSymbolMap[mainGenre]) {
    aestheticSymbol = genreToSymbolMap[mainGenre];
  } else if (mainAuthor || mainBook) {
    aestheticSymbol = "Lacre de Cera";
  } else {
    aestheticSymbol = "Marcador de Páginas";
  }

  if (mainGenre && genreToColorMap[mainGenre]) {
    aestheticColor = genreToColorMap[mainGenre];
  }

  const selectedEcos = genresList.map(g => genreToEcoMap[g]).filter(Boolean);
  const recommendedEcos = selectedEcos;

  const fallbackDNA = {
    originBooks: booksList,
    shapingAuthors: authorsList.slice(0, 3),
    dominantEmotions: {} as Record<string, number>,
    identityFormula: "",
    sharePhrase: booksListTitles.length > 0
      ? `Você lê como quem busca abrigo nos rastros de "${booksListTitles[0]}".`
      : "Você lê como quem procura uma casa dentro das páginas."
  };

  let bioParts = [];
  if (genresList.length > 0) {
    bioParts.push(`Sintonizado com ${genresList.slice(0, 2).join(" e ")}`);
  }
  if (authorsList.length > 0) {
    bioParts.push(`Inspirado pela escrita de ${authorsList.slice(0, 2).join(", ")}`);
  }
  if (form.habits) {
    bioParts.push(`Lê habitualmente: ${form.habits.toLowerCase()}`);
  }
  const bio = bioParts.join(". ") || "Iniciando um novo diário de descobertas poéticas.";

  return {
    title,
    description,
    signatureQuote,
    recommendedEcos,
    aestheticColor,
    aestheticSymbol,
    name: form.name,
    username: form.username,
    avatarSeed: form.username.toLowerCase(),
    bio,
    streakDays: 0,
    booksReadCount: 0,
    savedCount: 0,
    literaryDNA: fallbackDNA,
    emotionalMap: {}
  };
};
