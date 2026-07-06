import { Eco, Margem, BookHighlight, Challenge } from "./types";

export const AESTHETIC_THEMES = [
  {
    key: "classic",
    name: "Pergaminho Clássico",
    bg: "bg-[#FAF8F3] border-[#E8E2D5]",
    text: "text-[#3D3D3D]",
    quoteColor: "text-[#1C1916]",
    accent: "text-[#BDAB9C]",
    serif: "font-serif",
    paperClass: "bg-paper-texture",
    style: { backgroundColor: "#FAF8F3", color: "#3D3D3D", border: "1px solid #E8E2D5" }
  },
  {
    key: "night",
    name: "Tinta da Meia-Noite",
    bg: "bg-[#1E1C1A] border-[#2A2724]",
    text: "text-[#DCD5CD]",
    quoteColor: "text-[#FAF8F3]",
    accent: "text-[#A8988D]",
    serif: "font-serif",
    paperClass: "bg-ink-texture",
    style: { backgroundColor: "#1C1916", color: "#DCD5CD", border: "1px solid #2A2724" }
  },
  {
    key: "tea",
    name: "Folhas de Chá",
    bg: "bg-[#F3F6F1] border-[#E2EAE0]",
    text: "text-[#3C4A3B]",
    quoteColor: "text-[#212E20]",
    accent: "text-[#8BA187]",
    serif: "font-serif",
    paperClass: "bg-[#F3F6F1]",
    style: { backgroundColor: "#F3F6F1", color: "#3C4A3B", border: "1px solid #E2EAE0" }
  },
  {
    key: "sunset",
    name: "Pôr do Sol Poético",
    bg: "bg-[#FBF4EC] border-[#F2E3D5]",
    text: "text-[#5C4538]",
    quoteColor: "text-[#3D2517]",
    accent: "text-[#D4A373]",
    serif: "font-serif",
    paperClass: "bg-[#FBF4EC]",
    style: { backgroundColor: "#FBF4EC", color: "#5C4538", border: "1px solid #F2E3D5" }
  }
];

export const INITIAL_ECOS: Eco[] = [
  {
    id: "classicos-russos",
    name: "Clássicos Russos",
    description: "Para debater a melancolia existencial de Dostoiévski, a vastidão espiritual de Tolstói e a fina tragédia humana de Tchekhov.",
    category: "Literatura Clássica",
    memberCount: 1240,
    marginsCount: 342,
    icon: "BookOpen",
    imageBg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "filosofia-existencialista",
    name: "Filosofia Existencialista",
    description: "Espaço para as anotações sobre o absurdo, a angústia da escolha e o peso da liberdade. Sartre, Camus, Nietzsche e Kierkegaard.",
    category: "Filosofia",
    memberCount: 980,
    marginsCount: 289,
    icon: "Compass",
    imageBg: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "poesia-lirica",
    name: "Poesia e Lírica",
    description: "Versos que perfuram a alma. De Fernando Pessoa a Emily Dickinson. Onde cada palavra é um universo inteiro.",
    category: "Poesia",
    memberCount: 1540,
    marginsCount: 412,
    icon: "Feather",
    imageBg: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "realismo-magico",
    name: "Realismo Mágico",
    description: "A sutil fusão do ordinário com o impossível. Gabriel García Márquez, Isabel Allende, Julio Cortázar e Jorge Luis Borges.",
    category: "Ficção",
    memberCount: 860,
    marginsCount: 198,
    icon: "Sparkles",
    imageBg: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "fantasia-sombria",
    name: "Fantasia Sombria",
    description: "Mitologias misteriosas, mundos crepusculares e criaturas que habitam as frestas do tempo. Neil Gaiman, Shirley Jackson e H.P. Lovecraft.",
    category: "Ficção",
    memberCount: 1120,
    marginsCount: 220,
    icon: "Ghost",
    imageBg: "https://images.unsplash.com/photo-1519074069444-1ba4e6663104?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "romance-historico",
    name: "Romance Histórico",
    description: "Amores e revoluções tecidos nas tapeçarias do passado remoto. Onde a ficção se deita nas margens da história real.",
    category: "Literatura Clássica",
    memberCount: 750,
    marginsCount: 145,
    icon: "Hourglass",
    imageBg: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400"
  },
  // --- Ecos Emocionais (Fase 4) ---
  {
    id: "amor-impossivel",
    name: "❤️ Amor Impossível",
    description: "Para os corações que suspiram por encontros desencontrados, distâncias insuperáveis e promessas escritas na areia.",
    category: "Eco Emocional",
    memberCount: 1890,
    marginsCount: 512,
    icon: "Heart",
    imageBg: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "solidao-bonita",
    name: "🌙 Solidão Bonita",
    description: "O silêncio doce do retiro literário. A solitude que não dói, mas transborda em autorreflexão e paz crepuscular.",
    category: "Eco Emocional",
    memberCount: 2430,
    marginsCount: 689,
    icon: "Moon",
    imageBg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "nostalgia",
    name: "☕ Nostalgia do Tempo",
    description: "Lembranças de infância, cheiro de chuva na terra molhada, e a doçura melancólica de épocas que nunca vivemos.",
    category: "Eco Emocional",
    memberCount: 1670,
    marginsCount: 420,
    icon: "Coffee",
    imageBg: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "crises-existenciais",
    name: "🧠 Crises Existenciais",
    description: "Para quando o peso do mundo e o mistério do ser parecem grandes demais. Perguntas difíceis em páginas eternas.",
    category: "Eco Emocional",
    memberCount: 3120,
    marginsCount: 940,
    icon: "Brain",
    imageBg: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "esperanca-amanha",
    name: "✨ Esperança Atenta",
    description: "Trechos que iluminam a escuridão. O recomeço silencioso que floresce entre as frestas do desespero.",
    category: "Eco Emocional",
    memberCount: 1450,
    marginsCount: 310,
    icon: "Sparkles",
    imageBg: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "melancolia-elegante",
    name: "🕯️ Melancolia Elegante",
    description: "A beleza secreta da tristeza. Um recolhimento poético em tons de cinza e luz de velas.",
    category: "Eco Emocional",
    memberCount: 2210,
    marginsCount: 575,
    icon: "Flame",
    imageBg: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400"
  }
];

export const PRESET_HIGHLIGHTS: BookHighlight[] = [
  {
    id: "h1",
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    quote: "O mundo era tão recente que muitas coisas careciam de nome, e para mencioná-las era preciso apontar com o dedo.",
    emotion: "Nostalgia"
  },
  {
    id: "h2",
    title: "A Metamorfose",
    author: "Franz Kafka",
    quote: "Quando certa manhã Gregor Samsa acordou de sonhos inquietantes, encontrou-se em sua cama metamorfoseado num inseto monstruoso.",
    emotion: "Solidão"
  },
  {
    id: "h3",
    title: "O Retrato de Dorian Gray",
    author: "Oscar Wilde",
    quote: "A única maneira de nos livrarmos de uma tentação é ceder a ela. Se lhe resistirmos, as nossas almas ficam doentes de desejo.",
    emotion: "Desejo"
  },
  {
    id: "h4",
    title: "O Mito de Sísifo",
    author: "Albert Camus",
    quote: "Não há destino que não possa ser superado pelo desprezo.",
    emotion: "Existencial"
  },
  {
    id: "h5",
    title: "A Insustentável Leveza do Ser",
    author: "Milan Kundera",
    quote: "Aquele que quer eternamente 'vencer' não conhece a leveza do ser. Na terra da leveza, a gravidade se transforma em dança.",
    emotion: "Amor"
  },
  {
    id: "h6",
    title: "Livro do Desassossego",
    author: "Fernando Pessoa",
    quote: "Tenho pensamentos que, se pudesse realizá-los e dar-lhes vida, acrescentariam nova luminosidade às estrelas.",
    emotion: "Melancolia"
  }
];

export const INITIAL_MARGENS: Margem[] = [
  {
    id: "m1",
    quote: "O mundo era tão recente que muitas coisas careciam de nome, e para mencioná-las era preciso apontar com o dedo.",
    thought: "Escrever é justamente o ato de batizar o silêncio. Como deve ter sido bela a época em que as palavras ainda guardavam o frescor da primeira manhã do mundo.",
    bookTitle: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    spoilerLevel: "none",
    date: "2026-07-04T12:00:00Z",
    authorName: "Clarice Albuquerque",
    authorAvatar: "clarice",
    authorTitle: "A Romântica Melancólica",
    lovesCount: 38,
    loves: ["clarice", "arthur", "helena"],
    themeKey: "classic",
    ecoId: "realismo-magico",
    comments: [
      {
        id: "c1",
        authorName: "Arthur Ramos",
        authorAvatar: "arthur",
        authorTitle: "O Filósofo Silencioso",
        content: "Nossa, 'batizar o silêncio' foi uma definição arrebatadora. Sua margem é tão poética quanto o próprio trecho do Gabo.",
        date: "2026-07-04T13:45:00Z"
      }
    ]
  },
  {
    id: "m2",
    quote: "A única maneira de nos livrarmos de uma tentação é ceder a ela. Se lhe resistirmos, as nossas almas ficam doentes de desejo.",
    thought: "Resistir é apenas uma forma lenta de se envenenar. Wilde sempre nos lembra que a virtude, às vezes, é só uma covardia que não teve coragem de florescer.",
    bookTitle: "O Retrato de Dorian Gray",
    author: "Oscar Wilde",
    spoilerLevel: "light",
    date: "2026-07-03T16:30:00Z",
    authorName: "Lucas Mendes",
    authorAvatar: "lucas",
    authorTitle: "O Colecionador de Clássicos",
    lovesCount: 22,
    loves: ["lucas", "helena"],
    themeKey: "sunset",
    ecoId: "poesia-lirica",
    comments: []
  },
  {
    id: "m3",
    quote: "Não há destino que não possa ser superado pelo desprezo.",
    thought: "Sísifo sorri enquanto empurra a pedra, porque no instante em que ele aceita seu fardo, a pedra perde o poder de esmagá-lo. O desprezo ao sofrimento é a nossa maior revolução.",
    bookTitle: "O Mito de Sísifo",
    author: "Albert Camus",
    spoilerLevel: "none",
    date: "2026-07-02T19:15:00Z",
    authorName: "Helena Castro",
    authorAvatar: "helena",
    authorTitle: "O Filósofo Silencioso",
    lovesCount: 45,
    loves: ["helena", "clarice", "lucas", "arthur"],
    themeKey: "night",
    ecoId: "filosofia-existencialista",
    comments: [
      {
        id: "c2",
        authorName: "Clarice Albuquerque",
        authorAvatar: "clarice",
        authorTitle: "A Romântica Melancólica",
        content: "Exatamente. É a liberdade absoluta encontrada na total falta de esperança. Camus é libertador.",
        date: "2026-07-02T20:00:00Z"
      }
    ]
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "ch1",
    title: "Escrever na Margem",
    description: "Crie e publique sua primeira margem expressando uma emoção real.",
    xpPoints: 50,
    completed: false,
    category: "Criação"
  },
  {
    id: "ch2",
    title: "Conversa de Café",
    description: "Comente na margem de outro leitor para estender a discussão poética.",
    xpPoints: 30,
    completed: false,
    category: "Social"
  },
  {
    id: "ch3",
    title: "Visita aos Ecos",
    description: "Visite um novo Eco temático e leia pelo menos 3 anotações.",
    xpPoints: 20,
    completed: false,
    category: "Exploração"
  },
  {
    id: "ch4",
    title: "Conselho da Companheira",
    description: "Inicie um diálogo profundo com sua Companheira de Leitura sobre uma citação.",
    xpPoints: 40,
    completed: false,
    category: "Inteligência"
  }
];
