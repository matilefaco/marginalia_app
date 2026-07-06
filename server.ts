import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini SDK lazily
let aiInstance: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI features will fallback to offline mock generators.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. Generate literary profile from onboarding
app.post("/api/ai/onboarding", async (req, res) => {
  const { genres = [], books = "", authors = "", habits = "", spoilerTolerance = "moderate" } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Elegant fallback if no key is supplied
    const fallbackProfiles = [
      {
        title: "A Romântica Melancólica",
        description: "Você enxerga o mundo através de lentes crepusculares, onde o amor e a saudade caminham de mãos dadas. Suas leituras são portais para sentimentos esquecidos, e cada margem sua é uma lágrima transformada em poesia.",
        signatureQuote: "Há uma beleza sagrada nas coisas que não duram para sempre.",
        recommendedEcos: ["Romance Histórico", "Clássicos Russos"],
        aestheticColor: "#9C8A7D",
        aestheticSymbol: "Flor Prensada"
      },
      {
        title: "O Explorador de Mistérios",
        description: "Para você, cada página é um enigma a ser decifrado sob a luz de uma lanterna. Você caminha pelas sombras dos textos e encontra pistas onde outros vêem apenas palavras.",
        signatureQuote: "A verdade raramente habita na superfície límpida.",
        recommendedEcos: ["Fantasia Sombria", "Filosofia Existencialista"],
        aestheticColor: "#3D3D3D",
        aestheticSymbol: "Ampulheta"
      },
      {
        title: "O Filósofo Silencioso",
        description: "Sua leitura é um ritual de meditação. Você não lê apenas para se entreter, mas para desconstruir o próprio ser. Suas margens são perguntas afiadas que ecoam pelo vazio.",
        signatureQuote: "Pensar é o ato de tatear o invisível no escuro.",
        recommendedEcos: ["Filosofia Existencialista", "Clássicos Russos"],
        aestheticColor: "#BDAB9C",
        aestheticSymbol: "Lamparina"
      }
    ];
    // Return a random profile from the fallbacks
    const index = Math.floor(Math.random() * fallbackProfiles.length);
    return res.json({ profile: fallbackProfiles[index], mocked: true });
  }

  try {
    const ai = getGenAI();
    const prompt = `Analise os seguintes dados literários de um leitor e gere um "Perfil Literário" poético, íntimo, charmoso e altamente compartilhável. 

Dados do leitor:
- Gêneros favoritos: ${genres.join(", ")}
- Livros que ama: ${books}
- Autores prediletos: ${authors}
- Hábitos de leitura: ${habits}
- Tolerância a Spoilers: ${spoilerTolerance}

Crie um título arquetípico (ex: "O Filósofo Silencioso", "A Romântica Melancólica", "O Alquimista do Cotidiano", "A Tecelã de Universos") que condense a alma literária dessa pessoa.
Escreva uma descrição poética, profunda e sofisticada de 3 sentenças que soe extremamente acolhedora e inteligente (como um caderno de anotações antigo).
Gere também uma "assinatura literária" (mote ou frase curta de efeito), uma lista de 2 Ecos (comunidades) recomendados dentre: ["Romance Histórico", "Fantasia Sombria", "Desenvolvimento Pessoal", "Filosofia Existencialista", "Clássicos Russos", "Poesia e Lírica"], uma cor estética sóbria e elegante em formato hexadecimal e um símbolo poético (ex: "Lamparina", "Pena de Ganso", "Flor Prensada", "Ampulheta", "Café Fumegante", "Chave Antiga").

Retorne os dados em formato JSON estrito de acordo com o esquema solicitado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Título arquetípico do perfil literário" },
            description: { type: Type.STRING, description: "Descrição poética em 3 sentenças" },
            signatureQuote: { type: Type.STRING, description: "Frase curta ou mote de assinatura literária" },
            recommendedEcos: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de exatamente 2 nomes de ecos recomendados"
            },
            aestheticColor: { type: Type.STRING, description: "Cor hexadecimal elegante que combine com o perfil" },
            aestheticSymbol: { type: Type.STRING, description: "Símbolo poético do perfil" }
          },
          required: ["title", "description", "signatureQuote", "recommendedEcos", "aestheticColor", "aestheticSymbol"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ profile: data, mocked: false });
  } catch (err: any) {
    console.error("Error generating onboarding profile:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Chat/Interact with Reading Companion (Companheira de Leitura)
app.post("/api/ai/companion", async (req, res) => {
  const { messages = [], activeBook = null, activeMargem = null } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Mock response fallback
    const mockResponses = [
      "Que observação fascinante. As palavras que lemos funcionam como espelhos; o que enxergamos nelas diz mais sobre o que carregamos por dentro do que sobre a própria história.",
      "Isso me lembra um ensaio sobre a efemeridade das anotações à margem. Antigamente, os livros eram herdados e as anotações eram diálogos entre gerações. O que você acabou de escrever é um elo nessa corrente.",
      "Se analisarmos sob uma perspectiva literária, essa passagem transita exatamente no limite entre a realidade e o mito. O autor queria provocar exatamente essa sensação de deslocamento.",
      "Um eco interessante! Essa mesma emoção de descoberta é o que move grandes clássicos. Que tal explorar um Eco de Filosofia para expandir esse sentimento?"
    ];
    const index = Math.floor(Math.random() * mockResponses.length);
    return res.json({ reply: mockResponses[index], mocked: true });
  }

  try {
    const ai = getGenAI();

    // Prepare context
    let context = "Você é a 'Companheira de Leitura' do Marginalia, uma inteligência literária calorosa, extremamente inteligente, contemplativa e lírica. Você fala de forma elegante, poética, sutil, humana e acolhedora, como se estivesse sentada em uma biblioteca antiga, tomando um chá com o leitor. Nunca seja corporativa ou robótica.\n";
    
    if (activeBook) {
      context += `O leitor está lendo atualmente o livro: "${activeBook.title}" do autor "${activeBook.author}".\n`;
    }
    if (activeMargem) {
      context += `Eles estão refletindo sobre o trecho: "${activeMargem.quote}" e adicionaram a seguinte Margem (pensamento): "${activeMargem.thought}".\n`;
    }

    context += "Ajude-os a expandir essa reflexão, explicar referências históricas ou literárias, propor novos questionamentos poéticos ou sugerir autores semelhantes de maneira elegante.";

    // Convert messages for API
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    // If contents is empty, add a default user message greeting
    if (contents.length === 0) {
      contents.push({
        role: "user",
        parts: [{ text: "Olá! Gostaria de conversar sobre minhas leituras." }]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: context,
        temperature: 0.8
      }
    });

    res.json({ reply: response.text, mocked: false });
  } catch (err: any) {
    console.error("Error in companion AI:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Auto-generate customized reading reflections / quote continuations
app.post("/api/ai/reflection", async (req, res) => {
  const { quote, bookTitle, author } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      reflection: `Que bela passagem. Ela ressoa com uma melancolia doce, sugerindo que certas verdades só se revelam quando paramos de procurá-las ativamente. Talvez esse trecho de "${bookTitle}" reflita nossa própria busca silenciosa.`,
      mocked: true
    });
  }

  try {
    const ai = getGenAI();
    const systemInstruction = "Você é um ensaísta literário erudito e poético da revista Monocle e Kinfolk. Escreva um minúsculo ensaio contemplativo (máximo 4 linhas) que ofereça uma interpretação profundamente filosófica e sutil sobre o trecho fornecido. Mantenha um tom intimista, acolhedor e brilhante.";
    
    const prompt = `Analise o seguinte trecho do livro "${bookTitle}" de "${author}":
"${quote}"

Escreva uma breve reflexão lírica e existencial sobre o que essa frase evoca nas entrelinhas da experiência humana.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.9
      }
    });

    res.json({ reflection: response.text, mocked: false });
  } catch (err: any) {
    console.error("Error generating reflection:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Summarize or trigger discussions for Ecos (communities)
app.post("/api/ai/eco-prompt", async (req, res) => {
  const { ecoName, recentMargins = [] } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      prompt: `Para os amantes de ${ecoName}: Se o silêncio pudesse escolher um idioma, qual autor melhor o traduziria? Escreva sua margem sob essa perspectiva esta semana.`,
      mocked: true
    });
  }

  try {
    const ai = getGenAI();
    const prompt = `Você é o curador literário do Eco "${ecoName}", uma comunidade dedicada.
Abaixo estão alguns pensamentos recentes dos membros desse Eco:
${recentMargins.map((m: any) => `- "${m.thought}" (sobre o trecho "${m.quote}")`).join("\n")}

Crie um "Provocador de Pensamentos" (um prompt ou questão existencial) de duas frases altamente inspirador e poético para estimular novas anotações nas margens esta semana. O tom deve ser misterioso, convidativo e profundamente humano.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.85
      }
    });

    res.json({ prompt: response.text, mocked: false });
  } catch (err: any) {
    console.error("Error generating eco prompt:", err);
    res.status(500).json({ error: err.message });
  }
});

// 5. Generate Spotify Wrapped-style Retrospective (Fase 10)
app.post("/api/ai/wrapped", async (req, res) => {
  const { profile, margins = [] } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Highly tailored offline generator that analyzes margins to make it feel extremely authentic even without API key!
    const emotions = ["Melancolia Elegante", "Solidão Bonita", "Nostalgia", "Crises Existenciais", "Desejo e Ausência", "Esperança Atenta"];
    const randomEmotions: Record<string, number> = {};
    let remaining = 100;
    
    // Distribute percentages
    randomEmotions["Melancolia Elegante"] = 40;
    randomEmotions["Solidão Bonita"] = 30;
    randomEmotions["Crises Existenciais"] = 20;
    randomEmotions["Esperança Atenta"] = 10;

    const fallbackWrapped = {
      jornadaEmocoes: randomEmotions,
      temasPrincipais: [
        "A passagem implacável do tempo nas pequenas frestas do cotidiano",
        "A solitude como santuário para a criação poética",
        "O absurdo existencial aceito com um sorriso irônico"
      ],
      autoresMoldaram: [
        profile?.favoriteAuthors || "Clarice Lispector",
        "Gabriel García Márquez",
        "Albert Camus"
      ],
      mapaAlma: "Sua alma leitora busca abrigo nas sombras férteis do pensamento. Você não lê apenas para escapar do mundo, mas para construir pontes de silêncio e luz entre o seu íntimo e as grandes mentes que já se foram.",
      simboloPoetico: profile?.aestheticSymbol || "Lamparina de Prata",
      fraseWrapped: "O tempo passa devagar para quem escreve nas margens da eternidade."
    };

    return res.json({ wrapped: fallbackWrapped, mocked: true });
  }

  try {
    const ai = getGenAI();
    const prompt = `Analise os dados literários e as anotações do leitor para criar uma "Retrospectiva Literária Viva" (estilo Spotify Wrapped, mas extremamente focado na alma, sensibilidade e profundidade literária - sem gamificação infantil).

Perfil do Leitor:
- Nome: ${profile?.name}
- Título Arquetípico: ${profile?.title}
- Mote/Frase preferida: "${profile?.signatureQuote}"

Anotações nas Margens do Leitor (Trecho destacado & Reflexão):
${margins.map((m: any) => `- Livro: "${m.bookTitle}" (${m.author}). Trecho: "${m.quote}". Reflexão do leitor: "${m.thought}"`).join("\n")}

Crie um resultado JSON detalhado contendo:
1. "jornadaEmocoes": Um mapa de 4 sentimentos literários refinados (como "Melancolia Elegante", "Solidão Bonita", "Crises Existenciais", "Nostalgia", "Amor Impossível", "Desejo", "Esperança Atenta") com porcentagens inteiras que totalizam exatamente 100%.
2. "temasPrincipais": Uma lista de exatamente 3 frases poéticas que descrevam os temas filosóficos/emocionais mais recorrentes nas anotações do leitor.
3. "autoresMoldaram": Uma lista de exatamente 3 nomes de autores que parecem ecoar mais forte no estilo literário ou hábitos do leitor (considere os autores das margens).
4. "mapaAlma": Uma descrição poética, refinada, comovente e profunda (de 3 a 4 sentenças) do "Mapa da Alma Leitora" desse leitor, mostrando o valor de seu silêncio e suas observações.
5. "simboloPoetico": Um símbolo físico poético e raro (ex: "Lamparina de Latão", "Flor de Lótus Prensada", "Ampulheta de Areia Cinza", "Pena de Ganso Desgastada", "Chave enferrujada de ferro") que condense sua energia leitora.
6. "fraseWrapped": Um lema ou mote lírico exclusivo para o ano do leitor (ex: "Habitante dos Silêncios Entre Linhas").

Retorne EXCLUSIVAMENTE em formato JSON estrito de acordo com o esquema solicitado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jornadaEmocoes: {
              type: Type.OBJECT,
              description: "Dicionário de emoções com suas porcentagens inteiras (totalizando 100)",
              properties: {
                "Melancolia Elegante": { type: Type.INTEGER },
                "Solidão Bonita": { type: Type.INTEGER },
                "Nostalgia": { type: Type.INTEGER },
                "Crises Existenciais": { type: Type.INTEGER },
                "Amor Impossível": { type: Type.INTEGER },
                "Esperança Atenta": { type: Type.INTEGER }
              }
            },
            temasPrincipais: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 3 frases poéticas com os temas principais"
            },
            autoresMoldaram: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de 3 autores proeminentes"
            },
            mapaAlma: { type: Type.STRING, description: "Descrição de 3-4 sentenças da alma leitora" },
            simboloPoetico: { type: Type.STRING, description: "Símbolo poético condensador" },
            fraseWrapped: { type: Type.STRING, description: "Frase ou lema literário exclusivo" }
          },
          required: ["jornadaEmocoes", "temasPrincipais", "autoresMoldaram", "mapaAlma", "simboloPoetico", "fraseWrapped"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ wrapped: data, mocked: false });
  } catch (err: any) {
    console.error("Error generating wrapped:", err);
    res.status(500).json({ error: err.message });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Marginalia server booted successfully on port ${PORT}`);
  });
}

startServer();
