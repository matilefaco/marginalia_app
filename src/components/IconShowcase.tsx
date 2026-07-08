import React, { useState } from "react";
import {
  MarginIcon,
  AuraIcon,
  SoulMapIcon,
  EchoIcon,
  SintoniaIcon,
  OriginBooksIcon,
  CompanionIcon,
  WrappedIcon,
  ShareIcon,
  StoryIcon,
  CompatibilityIcon,
  IdentityIcon,
  DnaIcon,
  LinesDiaryIcon,
  RituaisIcon,
  DescobertasIcon,
  MuseuIcon,
  CoincidenceIcon,
  DefineYouIcon,
  FutureLetterIcon,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
  SaveIcon,
  ExportIcon,
  CreateMarginIcon,
  FeedIcon,
  AnnotationIcon,
  HeartIcon,
  CloseIcon,
  RefreshIcon,
  EcoAmorImpossivelIcon,
  EcoSolidaoBonitaIcon,
  EcoNostalgiaIcon,
  EcoCrisesExistenciaisIcon,
  EcoEsperancaAtentaIcon,
  EcoMelancoliaEleganteIcon,
  EcoDesejoOcultoIcon,
  TrophyIcon,
  FlameIcon,
  BookOpenIcon
} from "./icons/MarginaliaIcons";

interface ShowcaseItem {
  name: string;
  componentName: string;
  icon: React.ComponentType<any>;
  concept: string;
  usage: string;
  category: "núcleo" | "identidade" | "interação" | "sistema";
}

export default function IconShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const items: ShowcaseItem[] = [
    {
      name: "Margem",
      componentName: "MarginIcon",
      icon: MarginIcon,
      concept: "Uma linha vertical de margem acompanhada por um colchete e traços tipográficos, selados por um pingo de tinta.",
      usage: "Anotações marginais, citações de livros, o ato puro de marcar uma reflexão na folha.",
      category: "núcleo"
    },
    {
      name: "Aura Literária",
      componentName: "AuraIcon",
      icon: AuraIcon,
      concept: "Uma semente de chama contemplativa contida dentro de duas órbitas celestes concêntricas, sugerindo iluminação interior.",
      usage: "Perfil de alma do leitor, tom de escrita, sintonização das emoções que brotam das leituras.",
      category: "identidade"
    },
    {
      name: "Mapa da Alma",
      componentName: "SoulMapIcon",
      icon: SoulMapIcon,
      concept: "Uma constelação sutil de nós e conexões lineares finas. Geometria das emoções que formam uma rede invisível.",
      usage: "Mapeamento emocional de leituras, afinidade profunda, o desenho da jornada interior.",
      category: "identidade"
    },
    {
      name: "Ecos",
      componentName: "EchoIcon",
      icon: EchoIcon,
      concept: "Um ponto de origem diamantado que emite ondas concêntricas de ressonância poética. Sem megafones ou ruído.",
      usage: "Espaço de discussões, tópicos ressoados por outros leitores, o rastro de reflexões compartilhadas.",
      category: "núcleo"
    },
    {
      name: "Sintonia",
      componentName: "SintoniaIcon",
      icon: SintoniaIcon,
      concept: "Círculos concêntricos e secantes que se entrelaçam com elegância matemática em um ponto focal de encontro.",
      usage: "Afinidade entre leitores, conexão silenciosa através das mesmas frases e sentimentos.",
      category: "identidade"
    },
    {
      name: "Livros de Origem",
      componentName: "OriginBooksIcon",
      icon: OriginBooksIcon,
      concept: "Três lombadas verticais minimalistas com uma fita de marcação pendente, unindo o físico e o metafísico.",
      usage: "Obras que formaram o leitor, rituais de biblioteca pessoal, estante essencial.",
      category: "núcleo"
    },
    {
      name: "Companheira de Leitura",
      componentName: "CompanionIcon",
      icon: CompanionIcon,
      concept: "Um olho editorial alongado guardando uma centelha de sabedoria em quatro pontas. Presença intelectual pura.",
      usage: "Assistente de leitura Marginalia, inteligência analítica que caminha ao lado do leitor.",
      category: "sistema"
    },
    {
      name: "Wrapped",
      componentName: "WrappedIcon",
      icon: WrappedIcon,
      concept: "Um ciclo temporal cronográfico guiado por uma seta que se dobra sobre si mesma, coroado por uma estrela central.",
      usage: "Retrospectivas sazonais, arco de transformação do leitor, relatórios anuais.",
      category: "sistema"
    },
    {
      name: "Compartilhar",
      componentName: "ShareIcon",
      icon: ShareIcon,
      concept: "Um colchete de abertura esquerdo que liberta uma linha de pensamento em ascensão para o infinito superior.",
      usage: "Exportação de cards, envio de pensamentos para redes sociais, o espalhar do verbo.",
      category: "interação"
    },
    {
      name: "Story",
      componentName: "StoryIcon",
      icon: StoryIcon,
      concept: "Uma moldura vertical de proporção áurea com um sutil rastro de margem pontilhado e uma estrela guia.",
      usage: "Geração de imagens em formato de história vertical, compartilhamento imersivo.",
      category: "interação"
    },
    {
      name: "Compatibilidade",
      componentName: "CompatibilityIcon",
      icon: CompatibilityIcon,
      concept: "Duas estrelas guias paralelas unidas por órbitas elípticas de afinidade geométrica.",
      usage: "Match literário, ressonância mútua de almas leitoras.",
      category: "identidade"
    },
    {
      name: "Identidade",
      componentName: "IdentityIcon",
      icon: IdentityIcon,
      concept: "Selo circular que abriga uma caligrafia manual em onda, remetendo à assinatura de quem escreve nas margens.",
      usage: "Nome de usuário, assinatura poética, o tom pessoal único do leitor.",
      category: "identidade"
    },
    {
      name: "DNA Literário",
      componentName: "DnaIcon",
      icon: DnaIcon,
      concept: "Um eixo central vertical conectando alternadamente nós de conhecimento. A estrutura de filamentos literários.",
      usage: "Resultados do onboarding, fundamentos psicológicos da leitura.",
      category: "identidade"
    },
    {
      name: "Diário de Linhas",
      componentName: "LinesDiaryIcon",
      icon: LinesDiaryIcon,
      concept: "Linhas horizontais de escrita acompanhadas de uma fita de marcação cheia na margem.",
      usage: "Feed pessoal, histórico de anotações diárias, caderno de rascunhos de leitura.",
      category: "núcleo"
    },
    {
      name: "Rituais",
      componentName: "RituaisIcon",
      icon: RituaisIcon,
      concept: "Uma lua crescente misteriosa abraçando o fogo de uma vela solitária, símbolo da vigília noturna de leitura.",
      usage: "Hábitos de leitura, momentos favoritos do dia, pequenos gestos contemplativos.",
      category: "núcleo"
    },
    {
      name: "Descobertas",
      componentName: "DescobertasIcon",
      icon: DescobertasIcon,
      concept: "Uma lente de leitura alongada abrigando um brilho interior de revelação.",
      usage: "Sugestões de livros, descobertas aleatórias no jardim de margens, busca poética.",
      category: "interação"
    },
    {
      name: "Museu das Margens",
      componentName: "MuseuIcon",
      icon: MuseuIcon,
      concept: "Uma abóbada clássica de galeria de arte com uma chave de estrela suspensa no centro.",
      usage: "Sessão de margens populares, curadoria de reflexões eternizadas.",
      category: "núcleo"
    },
    {
      name: "Coincidência Literária",
      componentName: "CoincidenceIcon",
      icon: CoincidenceIcon,
      concept: "Duas trajetórias curvas que colidem em sutil harmonia no centro, iluminadas por uma centelha.",
      usage: "Encontros fortuitos na mesma linha de um livro entre pessoas que nunca se viram.",
      category: "interação"
    },
    {
      name: "Frase que Define Você",
      componentName: "DefineYouIcon",
      icon: DefineYouIcon,
      concept: "Aspas duplas elegantes aninhadas acima de uma linha tracejada horizontal de prosa.",
      usage: "A citação principal de perfil, a assinatura literária do leitor.",
      category: "identidade"
    },
    {
      name: "Carta do Futuro",
      componentName: "FutureLetterIcon",
      icon: FutureLetterIcon,
      concept: "Envelope de correspondência selado no centro exato por uma estrela-guia de insights.",
      usage: "Enviar pensamentos para o seu 'eu' do futuro, cápsula do tempo literária.",
      category: "núcleo"
    },
    {
      name: "Perfil",
      componentName: "ProfileIcon",
      icon: ProfileIcon,
      concept: "Silhueta clássica contemplativa coroada no canto superior por um traço de pena rítmico.",
      usage: "Seção de perfil, painel do leitor.",
      category: "sistema"
    },
    {
      name: "Busca",
      componentName: "SearchIcon",
      icon: SearchIcon,
      concept: "Circunferência de lente pura com cabo oblíquo de traço fino.",
      usage: "Buscador de obras, autores e expressões emocionais.",
      category: "sistema"
    },
    {
      name: "Configurações",
      componentName: "SettingsIcon",
      icon: SettingsIcon,
      concept: "Três trilhos verticais minimalistas com controladores de sintonia diamantados.",
      usage: "Ajuste de preferências, conta, calibração da inteligência e privacidade.",
      category: "sistema"
    },
    {
      name: "Salvar",
      componentName: "SaveIcon",
      icon: SaveIcon,
      concept: "Um marcador de livro em fita clássica, selado por um ponto interno de retenção na memória.",
      usage: "Eternizar margem na biblioteca pessoal, guardar como favorito.",
      category: "interação"
    },
    {
      name: "Exportar",
      componentName: "ExportIcon",
      icon: ExportIcon,
      concept: "Uma folha de papel com uma flecha linear fina direcionando para o topo, indicando a materialização da escrita.",
      usage: "Salvar margem localmente como imagem de alta resolução.",
      category: "interação"
    },
    {
      name: "Criar Margem",
      componentName: "CreateMarginIcon",
      icon: CreateMarginIcon,
      concept: "Uma pena de escrita oblíqua minimalista tocando a linha inferior.",
      usage: "Criar nova anotação, escrever uma nova margem.",
      category: "interação"
    },
    {
      name: "Feed / Acervo",
      componentName: "FeedIcon",
      icon: FeedIcon,
      concept: "Dois cartões geométricos puros ligeiramente sobrepostos, sugerindo o acúmulo infinito de folhas escritas.",
      usage: "Mural central de margens, linha do tempo comunitária.",
      category: "sistema"
    },
    {
      name: "Coração Emocional",
      componentName: "HeartIcon",
      icon: HeartIcon,
      concept: "Uma semente ou folha estilizada desenhada como um coração orgânico de traço único.",
      usage: "Ecos recebidos, demonstração de que a margem tocou o coração de outro leitor.",
      category: "interação"
    },
    {
      name: "Eco: Amor Impossível",
      componentName: "EcoAmorImpossivelIcon",
      icon: EcoAmorImpossivelIcon,
      concept: "Duas trajetórias curvas paralelas que se aproximam infinitamente sem nunca se cruzarem.",
      usage: "Coleção de dores românticas, conexões incompletas e distâncias insuperáveis.",
      category: "identidade"
    },
    {
      name: "Eco: Solidão Bonita",
      componentName: "EcoSolidaoBonitaIcon",
      icon: EcoSolidaoBonitaIcon,
      concept: "Um farol ou eixo vertical solitário resguardado por uma órbita pontilhada concêntrica.",
      usage: "Coleção de solitude contemplativa, momentos de recolhimento poético.",
      category: "identidade"
    },
    {
      name: "Eco: Nostalgia do Tempo",
      componentName: "EcoNostalgiaIcon",
      icon: EcoNostalgiaIcon,
      concept: "Círculos e órbitas que se sobrepõem como ondulações na água, sugerindo dobras no tempo.",
      usage: "Coleção de memórias afetivas, saudades de épocas distantes.",
      category: "identidade"
    },
    {
      name: "Eco: Crises Existenciais",
      componentName: "EcoCrisesExistenciaisIcon",
      icon: EcoCrisesExistenciaisIcon,
      concept: "Linhas perpendiculares que interceptam um plano com nós de cruzamento fragmentados.",
      usage: "Coleção de indagações existenciais e abismos filosóficos.",
      category: "identidade"
    },
    {
      name: "Eco: Esperança Atenta",
      componentName: "EcoEsperancaAtentaIcon",
      icon: EcoEsperancaAtentaIcon,
      concept: "Uma linha de horizonte minimalista superada por um feixe vertical em ascensão e expansão.",
      usage: "Coleção de resiliência e recomeços silenciosos.",
      category: "identidade"
    },
    {
      name: "Eco: Melancolia Elegante",
      componentName: "EcoMelancoliaEleganteIcon",
      icon: EcoMelancoliaEleganteIcon,
      concept: "Um pêndulo sutil suspenso acima de uma linha d'água, culminando em uma gota de diamante.",
      usage: "Coleção de tristeza bela, estética do cinza poético.",
      category: "identidade"
    },
    {
      name: "Eco: Desejo Oculto",
      componentName: "EcoDesejoOcultoIcon",
      icon: EcoDesejoOcultoIcon,
      concept: "Uma cápsula pontilhada abrigando oscilações senoidais delicadas, simbolizando sentimentos reprimidos.",
      usage: "Coleção de paixões veladas e virtudes trêmulas.",
      category: "identidade"
    },
    {
      name: "Honra Contemplativa",
      componentName: "TrophyIcon",
      icon: TrophyIcon,
      concept: "Níveis geométricos crescentes culminando em uma centelha suspensa de reconhecimento.",
      usage: "Títulos honorários concedidos no perfil.",
      category: "sistema"
    },
    {
      name: "Chama Literária",
      componentName: "FlameIcon",
      icon: FlameIcon,
      concept: "Traço oval concêntrico minimalista contendo uma chama de foco pura sobre uma linha de base.",
      usage: "Contagem de dias seguidos de leitura e reflexão ativa (streak).",
      category: "sistema"
    },
    {
      name: "Leitura Ativa",
      componentName: "BookOpenIcon",
      icon: BookOpenIcon,
      concept: "Duas folhas planas geométricas unidas em simetria estrita por uma fina fenda central.",
      usage: "Símbolo para livros de origem e atmosfera literária.",
      category: "núcleo"
    }
  ];

  const handleCopyCode = (componentName: string) => {
    const code = `<${componentName} size={24} />`;
    navigator.clipboard.writeText(code);
    setCopiedText(componentName);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C1916] font-sans px-6 py-12 md:px-12 max-w-6xl mx-auto pb-32">
      {/* Header */}
      <header className="border-b border-[#BDAB9C]/40 pb-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#C5895A]">Sistema Proprietário de Símbolos</span>
            <h1 className="font-serif text-4xl mt-2 tracking-tight">A Linguagem Visual do Marginalia</h1>
            <p className="text-sm text-[#BDAB9C] max-w-2xl mt-3 font-serif italic">
              "Para capturar os silêncios íntimos e as pequenas revoluções das margens, abandonamos os emojis digitais e ícones genéricos. Criamos uma semiótica própria — traços finos, geometrias sagradas e sinais que parecem desenhados à mão na quietude do livro."
            </p>
          </div>
          <div className="text-right font-mono text-[10px] text-[#BDAB9C]">
            <span>v1.0.0 — COMPILADO LOCAL</span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Buscar por símbolo ou conceito..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/60 border border-[#BDAB9C]/40 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-[#1C1916] transition-colors"
          />
        </div>
      </header>

      {/* Philosophy Callout */}
      <section className="bg-white/40 border border-[#BDAB9C]/20 rounded-xl p-6 mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="p-3 bg-[#1C1916] text-[#FAF8F3] rounded-lg">
          <AuraIcon size={32} strokeWidth={1} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold">Por que descartar o clichê?</h3>
          <p className="text-xs text-[#3D3D3D] mt-1 leading-relaxed max-w-3xl">
            Símbolos genéricos (como corações pixelados ❤️ ou livrinhos de desenho animado 📚) poluem a imersão contemplativa da leitura. Nossos novos ícones compartilham o mesmo grid de 24x24px, traço uniforme de 1.2px a 1.5px e repousam sobre silêncios lineares que convidam o olhar à desaceleração. Cada símbolo é uma anotação silenciosa na margem do Marginalia.
          </p>
        </div>
      </section>

      {/* Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.componentName}
              className="bg-white border border-[#BDAB9C]/20 hover:border-[#BDAB9C]/50 hover:shadow-sm rounded-xl p-5 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-mono uppercase bg-[#1C1916]/5 text-[#1C1916] px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#BDAB9C]">{item.componentName}</span>
                </div>

                {/* Big Visual Symbol */}
                <div className="my-6 flex justify-center py-6 bg-[#FAF8F3]/50 rounded-lg border border-[#BDAB9C]/10 text-[#1C1916]">
                  <div className="hover:scale-110 transition-transform duration-300">
                    <Icon size={40} strokeWidth={1.2} />
                  </div>
                </div>

                {/* Name */}
                <h4 className="font-serif text-lg font-bold">{item.name}</h4>
                <p className="text-xs text-[#1C1916] font-medium mt-1.5 leading-relaxed">{item.concept}</p>
                <p className="text-[11px] text-[#BDAB9C] mt-2 font-serif italic">{item.usage}</p>
              </div>

              {/* Action Code Copy */}
              <div className="mt-6 pt-4 border-t border-[#BDAB9C]/10 flex justify-between items-center">
                <code className="text-[10px] font-mono text-[#C5895A] bg-[#C5895A]/5 px-2 py-1 rounded">
                  {`<${item.componentName} />`}
                </code>
                <button
                  onClick={() => handleCopyCode(item.componentName)}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1C1916] hover:text-[#C5895A] cursor-pointer"
                >
                  {copiedText === item.componentName ? "Copiado!" : "Copiar Tag"}
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Back to Home Button Float */}
      <footer className="mt-16 text-center border-t border-[#BDAB9C]/20 pt-8">
        <p className="text-xs text-[#BDAB9C]">
          Sistemas e Símbolos de Identidade Visual Marginalia — Orgulhosamente Codificados Sem Dependências de Terceiros.
        </p>
      </footer>
    </div>
  );
}
