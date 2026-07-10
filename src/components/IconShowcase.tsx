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
import { MarginaliaLogo } from "./branding/MarginaliaLogo";
import { BrandSeal } from "./branding/BrandSeal";
import { MarginaliaMark } from "./branding/MarginaliaMark";

interface ShowcaseItem {
  name: string;
  componentName: string;
  icon: React.ComponentType<any>;
  concept: string;
  usage: string;
  category: "núcleo" | "identidade" | "interação" | "sistema";
}

export default function IconShowcase() {
  const [activeSection, setActiveSection] = useState<"splash" | "logos" | "cores" | "tipografia" | "icones" | "mockups">("logos");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [iconCategory, setIconCategory] = useState<"todos" | "núcleo" | "identidade" | "interação" | "sistema">("todos");
  
  const [splashAnimationKey, setSplashAnimationKey] = useState(0);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const colors = [
    { name: "paper", hex: "#FAF8F3", text: "text-[#1C1916]", desc: "Fundo principal, emulando papel vintage texturizado.", role: "Plano de Fundo" },
    { name: "ink", hex: "#1C1916", text: "text-[#FAF8F3]", desc: "Tinta escura de escrita, usada para legibilidade e peso.", role: "Contraste Alto" },
    { name: "night", hex: "#0E0D0C", text: "text-[#FAF8F3]", desc: "O silêncio profundo, usado para retrospecções e cabeceira.", role: "Modo Noturno" },
    { name: "text-primary", hex: "#3D3D3D", text: "text-[#FAF8F3]", desc: "Texto geral de leitura, equilibrado para cansaço ocular mínimo.", role: "Prosa Geral" },
    { name: "sand", hex: "#BDAB9C", text: "text-[#1C1916]", desc: "Eixo do papel antigo, cor de fita marcador e detalhes neutros.", role: "Borda / Divisores" },
    { name: "sand-soft", hex: "#E2DCD5", text: "text-[#1C1916]", desc: "Sombreamentos suaves, relevo tátil sutil nos botões.", role: "Sombras / Detalhes" },
    { name: "accent / glow", hex: "#C5895A", text: "text-[#1C1916]", desc: "O resíduo luminoso, ponto focal de emoção e sintonias.", role: "Destaque Poético" }
  ];

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
      concept: "Uma lua crescenta misteriosa abraçando o fogo de uma vela solitária, símbolo da vigília noturna de leitura.",
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

  const filteredItems = items.filter(
    (item) =>
      (iconCategory === "todos" || item.category === iconCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.concept.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-[#FAF8F3] text-[#1C1916] font-sans rounded-2xl border border-[#BDAB9C]/40 overflow-hidden journal-shadow animate-page-turn">
      
      {/* Brand Navigation Header */}
      <div className="bg-stone-900 text-[#FAF8F3] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-800">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-[#C5895A] uppercase font-bold">MANUAL DE IDENTIDADE VISUAL</span>
          <h2 className="text-lg font-display tracking-wide uppercase text-[#FAF8F3] m-0">SISTEMA DE MARCA MARGINALIA</h2>
        </div>
        <div className="flex flex-wrap gap-1.5 no-export">
          {[
            { id: "logos" as const, label: "Logotipos" },
            { id: "cores" as const, label: "Cores & Elevação" },
            { id: "tipografia" as const, label: "Tipografia" },
            { id: "icones" as const, label: "49 Ícones" },
            { id: "mockups" as const, label: "Aplicações" },
            { id: "splash" as const, label: "Live Splash" },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1 rounded text-[10.5px] font-sans font-semibold transition-all cursor-pointer ${
                activeSection === sec.id
                  ? "bg-[#C5895A] text-[#FAF8F3] shadow-xs"
                  : "bg-stone-800 hover:bg-stone-700 text-[#BDAB9C]"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8 min-h-[500px]">

        {/* LOGOS SECTION */}
        {activeSection === "logos" && (
          <div className="space-y-6 animate-page-turn">
            <div>
              <h3 className="font-serif text-xl font-semibold m-0 text-[#1C1916]">Régua, Tick e Ponto de Resíduo</h3>
              <p className="text-xs text-[#3D3D3D] mt-1">
                O símbolo evoluiu para um sistema completo de 5 variantes em <code>src/components/branding/</code>. É construído sobre um mark triplo que representa o espaço da margem, o ato da escrita e a retenção do sentimento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Variante 1: Mark */}
              <div className="bg-stone-900 p-6 rounded-xl flex flex-col justify-between h-44 border border-stone-800">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-[#BDAB9C] uppercase bg-stone-800 px-2 py-0.5 rounded">Variante: Mark</span>
                  <button 
                    onClick={() => handleCopy('<MarginaliaMark size={28} />', 'mark-copy')}
                    className="text-[9px] font-mono text-[#C5895A] hover:underline"
                  >
                    {copiedText === 'mark-copy' ? "Copiado!" : "Copiar Tag"}
                  </button>
                </div>
                <div className="flex justify-center">
                  <MarginaliaMark size={38} dotColor="#C5895A" color="#FAF8F3" strokeWidth={3.5} />
                </div>
                <p className="text-[10px] text-[#BDAB9C] text-center italic">Para avatares, watermarks pequenos e sintonizadores discretos.</p>
              </div>

              {/* Variante 2: Lockup Horizontal */}
              <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 p-6 rounded-xl flex flex-col justify-between h-44">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-[#1C1916] uppercase bg-[#E2DCD5] px-2 py-0.5 rounded">Variante: Lockup (Padrão)</span>
                  <button 
                    onClick={() => handleCopy('<MarginaliaLogo variant="lockup" tagline={true} />', 'lockup-copy')}
                    className="text-[9px] font-mono text-[#C5895A] hover:underline"
                  >
                    {copiedText === 'lockup-copy' ? "Copiado!" : "Copiar Tag"}
                  </button>
                </div>
                <div className="flex justify-center">
                  <MarginaliaLogo variant="lockup" tagline={true} size={24} />
                </div>
                <p className="text-[10px] text-[#3D3D3D] text-center italic">Alinhamento padrão usado no header principal e layouts horizontais.</p>
              </div>

              {/* Variante 3: Vertical Lockup */}
              <div className="bg-[#FAF8F3] border border-[#BDAB9C]/40 p-6 rounded-xl flex flex-col justify-between h-56">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-[#1C1916] uppercase bg-[#E2DCD5] px-2 py-0.5 rounded">Variante: Vertical Lockup</span>
                  <button 
                    onClick={() => handleCopy('<MarginaliaLogo variant="vertical-lockup" />', 'vert-copy')}
                    className="text-[9px] font-mono text-[#C5895A] hover:underline"
                  >
                    {copiedText === 'vert-copy' ? "Copiado!" : "Copiar Tag"}
                  </button>
                </div>
                <div className="flex justify-center py-2">
                  <MarginaliaLogo variant="vertical-lockup" size={24} />
                </div>
                <p className="text-[10px] text-[#3D3D3D] text-center italic">Utilizado nas transições de onboarding e telas vazias de destaque.</p>
              </div>

              {/* Variante 4: Brand Seal */}
              <div className="bg-stone-900 p-6 rounded-xl flex flex-col justify-between h-56 border border-stone-800">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-[#BDAB9C] uppercase bg-stone-800 px-2 py-0.5 rounded">Selo: BrandSeal</span>
                  <button 
                    onClick={() => handleCopy('<BrandSeal dark={true} size="md" />', 'seal-copy')}
                    className="text-[9px] font-mono text-[#C5895A] hover:underline"
                  >
                    {copiedText === 'seal-copy' ? "Copiado!" : "Copiar Tag"}
                  </button>
                </div>
                <div className="flex flex-col items-center gap-3 py-2">
                  <BrandSeal dark={true} size="md" />
                  <BrandSeal dark={false} size="sm" />
                </div>
                <p className="text-[10px] text-[#BDAB9C] text-center italic">Aplicado em exportações para carimbar as imagens com a chancela do app.</p>
              </div>

            </div>
          </div>
        )}

        {/* CORES SECTION */}
        {activeSection === "cores" && (
          <div className="space-y-6 animate-page-turn">
            <div>
              <h3 className="font-serif text-xl font-semibold m-0 text-[#1C1916]">A Paleta de Contemplação</h3>
              <p className="text-xs text-[#3D3D3D] mt-1">
                Cores dessaturadas e de alto contraste orgânico. Sem degrades chamativos ou luzes sintéticas. Toque em qualquer cor para copiar o valor hexadecimal.
              </p>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {colors.map((col) => (
                <div 
                  key={col.name}
                  onClick={() => handleCopy(col.hex, col.name)}
                  className="bg-white border border-[#BDAB9C]/25 rounded-xl p-3.5 flex flex-col justify-between h-32 cursor-pointer hover:border-[#C5895A] transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">{col.name}</span>
                    <span className="text-[8.5px] font-mono text-[#BDAB9C] group-hover:text-[#C5895A] transition-colors">
                      {copiedText === col.name ? "Copiado!" : "Copiar"}
                    </span>
                  </div>
                  
                  {/* Real Color visualizer inside card */}
                  <div className="w-full h-8 rounded border border-stone-200/50" style={{ backgroundColor: col.hex }} />

                  <div>
                    <span className="text-xs font-mono font-bold tracking-tight block text-[#1C1916]">{col.hex}</span>
                    <span className="text-[8.5px] font-sans text-stone-400 block mt-0.5">{col.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Elevation levels */}
            <div className="border-t border-[#BDAB9C]/25 pt-6">
              <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider mb-3">Sistema de Elevação Tátil</h4>
              <p className="text-xs text-[#3D3D3D] mb-4">
                Emulando camadas de papel físicas. As sombras do Marginalia são rítmicas e cinzentas (<code>journal-shadow</code>), aumentando de profundidade para enfatizar o que flutua.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[#BDAB9C]/20 rounded-xl p-5 bg-transparent flex flex-col justify-between h-28">
                  <span className="font-mono text-[9px] text-[#BDAB9C] uppercase">Elevation 0 / Flat</span>
                  <p className="text-[11px] font-serif italic text-stone-600">Planos de fundo, réguas e divisores.</p>
                  <code className="text-[9px] text-stone-400">border-[#BDAB9C]/20 bg-transparent</code>
                </div>
                
                <div className="elevation-1 rounded-xl p-5 bg-[#FAF8F3] flex flex-col justify-between h-28">
                  <span className="font-mono text-[9px] text-[#BDAB9C] uppercase">Elevation 1 / Card</span>
                  <p className="text-[11px] font-serif italic text-stone-600">Mural de margens, tópicos de discussão e inputs.</p>
                  <code className="text-[9px] text-[#C5895A]">journal-shadow border-[#BDAB9C]/35 bg-[#FAF8F3]</code>
                </div>

                <div className="elevation-2 rounded-xl p-5 bg-white flex flex-col justify-between h-28">
                  <span className="font-mono text-[9px] text-[#BDAB9C] uppercase">Elevation 2 / Hero</span>
                  <p className="text-[11px] font-serif italic text-stone-600">Popups, modais de exportação, cartões proeminentes.</p>
                  <code className="text-[9px] text-[#C5895A]">shadow-[0_12px_36px_-6px_rgba(189,171,156,0.3)]</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TIPOGRAFIA SECTION */}
        {activeSection === "tipografia" && (
          <div className="space-y-6 animate-page-turn">
            <div>
              <h3 className="font-serif text-xl font-semibold m-0 text-[#1C1916]">Sintaxe e Pausa Tipográfica</h3>
              <p className="text-xs text-[#3D3D3D] mt-1">
                A tipografia determina a "velocidade" da leitura. Combinamos fontes de impacto editorial imersivo com serifas clássicas de livro e monoespaçadas técnicas de anotação.
              </p>
            </div>

            <div className="space-y-5 bg-white border border-[#BDAB9C]/20 rounded-2xl p-6">
              
              {/* Display Font */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-stone-100">
                <div className="space-y-1">
                  <span className="font-mono text-[9.5px] text-[#C5895A] uppercase tracking-wider block">DISPLAY / LOGO / WORDMARK</span>
                  <p className="font-display font-bold tracking-[0.2em] text-2xl uppercase text-[#1C1916]">MARGEM ESCRITA</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-stone-500 font-bold block">Cinzel</span>
                  <span className="text-[10px] text-[#BDAB9C] block font-mono">--font-display</span>
                </div>
              </div>

              {/* Serif Font */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-stone-100">
                <div className="space-y-1">
                  <span className="font-mono text-[9.5px] text-[#C5895A] uppercase tracking-wider block">CITAÇÕES / LEITURA / TEXTO ENCORPADO</span>
                  <p className="font-serif italic text-lg leading-relaxed text-[#1C1916] max-w-lg">
                    “O silêncio após uma boa frase também é parte indissociável da leitura.”
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-stone-500 font-bold block">Lora</span>
                  <span className="text-[10px] text-[#BDAB9C] block font-mono">--font-serif</span>
                </div>
              </div>

              {/* Sans Font */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-stone-100">
                <div className="space-y-1">
                  <span className="font-mono text-[9.5px] text-[#C5895A] uppercase tracking-wider block">INTERFACE / CONTROLES / INTERAÇÃO</span>
                  <p className="font-sans font-medium text-sm text-[#1C1916]">
                    Criar nova margem, sintonizar reflexões, exportar cartão.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-stone-500 font-bold block">Inter</span>
                  <span className="text-[10px] text-[#BDAB9C] block font-mono">--font-sans</span>
                </div>
              </div>

              {/* Mono Font */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                <div className="space-y-1">
                  <span className="font-mono text-[9.5px] text-[#C5895A] uppercase tracking-wider block">METADADOS / CAPÇÕES / HORÁRIOS</span>
                  <p className="font-mono text-xs tracking-wide text-stone-600">
                    MARGINALIA.APP • CAPÍTULO 2 DE 5 • ESTADO ATUAL
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-stone-500 font-bold block">JetBrains Mono</span>
                  <span className="text-[10px] text-[#BDAB9C] block font-mono">--font-mono</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 49 CUSTOM ICONS */}
        {activeSection === "icones" && (
          <div className="space-y-6 animate-page-turn">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-semibold m-0 text-[#1C1916]">Símbolos Proprietários</h3>
                <p className="text-xs text-[#3D3D3D] mt-1">
                  Substituíram completamente o Lucide genérico. Cada um foi desenhado com um conceito próprio — nenhum ícone de terceiro sobrevive no produto hoje.
                </p>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1.5 no-export">
                {["todos", "núcleo", "identidade", "interação", "sistema"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setIconCategory(cat as any)}
                    className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-mono transition-all cursor-pointer ${
                      iconCategory === cat
                        ? "bg-[#1C1916] text-[#FAF8F3] font-bold"
                        : "bg-[#E2DCD5]/60 hover:bg-[#E2DCD5] text-stone-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick search */}
            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Buscar por símbolo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#BDAB9C]/40 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#C5895A] transition-colors font-sans"
              />
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.componentName}
                    className="bg-white border border-[#BDAB9C]/20 hover:border-[#C5895A]/40 rounded-xl p-3.5 flex flex-col justify-between items-center text-center group h-40 transition-all shadow-xs relative"
                  >
                    <span className="text-[8px] font-mono uppercase bg-stone-50 text-stone-400 px-1.5 py-0.5 rounded-full absolute top-2 left-2">
                      {item.category}
                    </span>
                    
                    <div className="my-auto text-[#1C1916] group-hover:scale-110 transition-transform duration-300 py-3">
                      <IconComponent size={30} />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-xs font-sans font-bold block text-stone-850 truncate max-w-[120px]">{item.name}</span>
                      <code className="text-[8.5px] font-mono text-[#C5895A] block bg-stone-50 px-1.5 py-0.5 rounded truncate max-w-[120px]" title={item.componentName}>
                        {`<${item.componentName} />`}
                      </code>
                    </div>

                    {/* Copy Hover Mask */}
                    <div className="absolute inset-0 bg-stone-900/90 text-[#FAF8F3] opacity-0 group-hover:opacity-100 rounded-xl flex flex-col items-center justify-center p-3 transition-opacity duration-200 pointer-events-none sm:pointer-events-auto">
                      <p className="text-[9.5px] font-sans font-semibold leading-relaxed line-clamp-3 mb-2">{item.concept}</p>
                      <button
                        onClick={() => handleCopy(`<${item.componentName} size={24} />`, item.componentName)}
                        className="px-2 py-1 bg-[#C5895A] text-[#FAF8F3] text-[9.5px] font-mono font-bold uppercase rounded tracking-wide cursor-pointer"
                      >
                        {copiedText === item.componentName ? "Copiado!" : "Copiar Tag"}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MOCKUPS / APPLICATIONS SECTION */}
        {activeSection === "mockups" && (
          <div className="space-y-8 animate-page-turn">
            <div>
              <h3 className="font-serif text-xl font-semibold m-0 text-[#1C1916]">Aplicações de Cartões</h3>
              <p className="text-xs text-[#3D3D3D] mt-1">
                Visualização de como as chancelas de marca, paletas de cores e tipografias se combinam nos três principais pontos de exportação do aplicativo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Card 1: Share Studio (Fase 1 - Cartão de Identidade) */}
              <div className="space-y-3">
                <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">01 · Cartão de Margem (Printable)</h4>
                <div className="border border-[#BDAB9C]/40 bg-[#FAF8F3] rounded-2xl p-6 shadow-md text-center max-w-sm mx-auto space-y-4">
                  <span className="font-mono text-[9px] text-[#BDAB9C] uppercase tracking-widest block">MARGEM DE ALMA</span>
                  <div className="w-8 h-[1px] bg-[#C5895A]/30 mx-auto" />
                  <p className="font-serif italic text-[14.5px] leading-relaxed text-[#1C1916] py-2">
                    “O mundo é um livro desdobrado, do qual escrevemos poucas frases a lápis, antes de apagar.”
                  </p>
                  <div className="space-y-0.5">
                    <p className="text-xs font-sans font-bold text-[#1C1916]">Clarice Lispector</p>
                    <p className="text-[9.5px] font-mono text-[#BDAB9C] uppercase">ÁGUA VIVA</p>
                  </div>
                  <div className="pt-2 flex justify-center">
                    <BrandSeal dark={false} size="sm" />
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 text-center italic">Gerado dinamicamente para feed e compartilhamentos.</p>
              </div>

              {/* Card 2: Inscrição de Alma / Presets (Fase 4 - Identidade Visual) */}
              <div className="space-y-3">
                <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">02 · Cartão de Assinatura Poética</h4>
                <div className="border border-[#BDAB9C]/40 bg-stone-900 rounded-2xl p-6 shadow-md text-center max-w-sm mx-auto space-y-4 text-[#FAF8F3]">
                  <div className="flex justify-between items-center text-[#BDAB9C] font-mono text-[8px] tracking-wider">
                    <span>CAPÍTULO 1 DE 5</span>
                    <span>SÍMBOLO: PENA</span>
                  </div>
                  <p className="font-serif italic text-[13.5px] leading-relaxed text-[#EBE6DF] py-2">
                    “Amo o silêncio que se instala entre a leitura e a primeira linha anotada à lápis.”
                  </p>
                  <div className="border-t border-stone-800 pt-3">
                    <p className="text-[11px] font-display uppercase tracking-widest font-bold text-[#FAF8F3]">ASSINATURA DE ALMA</p>
                    <p className="text-[9px] font-mono text-[#C5895A] mt-0.5">Clarice M.</p>
                  </div>
                  <div className="pt-1 flex justify-center">
                    <BrandSeal dark={true} size="sm" />
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 text-center italic">Representa o DNA e a assinatura poética obtidos no onboarding.</p>
              </div>

              {/* Card 3: Wrapped / Retrospectiva (Fase 5 - Retrospectiva) */}
              <div className="space-y-3">
                <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider">03 · Cartão Sazonal Wrapped</h4>
                <div className="bg-gradient-to-b from-[#1C1916] via-stone-950 to-[#0E0D0C] rounded-2xl p-6 shadow-lg max-w-sm mx-auto text-[#FAF8F3] space-y-5 border border-stone-850">
                  <div className="flex justify-between items-center">
                    <MarginaliaLogo variant="watermark" size={12} className="text-[#BDAB9C]" />
                    <span className="font-mono text-[8px] text-[#C5895A] uppercase font-bold bg-[#C5895A]/10 px-2 py-0.5 rounded">2026</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-wider block">Cartografia de Sentimentos</span>
                    <h5 className="font-serif text-2xl font-medium tracking-wide m-0">Melancolia Elegante</h5>
                    <p className="text-[10.5px] text-[#BDAB9C]">Onde seu coração literário mais habitou este ano.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-serif italic text-stone-300">
                      <span>Nostalgia</span>
                      <span className="text-[#C5895A] font-sans font-bold">48%</span>
                    </div>
                    <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C5895A] rounded-full" style={{ width: "48%" }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-[9px] font-mono text-[#BDAB9C] uppercase">
                    <span>MARGINALIA WRAPPED</span>
                    <span className="text-[#C5895A] font-bold">5 de 5 Capítulos</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 text-center italic">Gerado ao fim do ciclo anual do leitor nas margens.</p>
              </div>

            </div>

            {/* App Launcher icon mockup */}
            <div className="border-t border-[#BDAB9C]/25 pt-8">
              <h4 className="font-sans font-bold text-xs uppercase text-[#1C1916] tracking-wider mb-4">Ícone do Aplicativo (Launch Launcher)</h4>
              <div className="flex flex-col md:flex-row gap-6 items-center bg-white/40 border border-[#BDAB9C]/20 rounded-xl p-6">
                
                <div className="flex gap-4">
                  {/* iOS App Icon */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 bg-[#FAF8F3] border border-[#BDAB9C]/30 shadow-md rounded-[15px] flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[#C5895A]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <MarginaliaMark size={28} dotColor="#C5895A" color="#1C1916" strokeWidth={3.5} />
                    </div>
                    <span className="font-sans text-[9px] text-[#BDAB9C] uppercase">iOS / Apple</span>
                  </div>

                  {/* Android Adaptive Icon */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 bg-[#FAF8F3] border border-[#BDAB9C]/30 shadow-md rounded-full flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[#C5895A]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <MarginaliaMark size={28} dotColor="#C5895A" color="#1C1916" strokeWidth={3.5} />
                    </div>
                    <span className="font-sans text-[9px] text-[#BDAB9C] uppercase">Android Circle</span>
                  </div>

                  {/* Dark Mode Alternative Icon */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 bg-stone-900 border border-stone-850 shadow-md rounded-[15px] flex items-center justify-center relative overflow-hidden group">
                      <MarginaliaMark size={28} dotColor="#C5895A" color="#FAF8F3" strokeWidth={3.5} />
                    </div>
                    <span className="font-sans text-[9px] text-[#BDAB9C] uppercase">Night Theme</span>
                  </div>
                </div>

                <div className="space-y-1.5 md:pl-6 border-t md:border-t-0 md:border-l border-[#BDAB9C]/25 pt-4 md:pt-0">
                  <h5 className="font-serif text-sm font-bold">Simplicidade Extrema na Gaveta de Apps</h5>
                  <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                    Sem excessos coloridos ou gradientes barulhentos. No mar de ícones saturados do celular, o ícone do Marginalia chama atenção pela calmaria — fundo puro off-white <code>#FAF8F3</code>, traços geométricos e a centelha única na cor âmbar siena.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* LIVE SPLASH INTRO ANIMATION */}
        {activeSection === "splash" && (
          <div className="space-y-6 text-center py-8 animate-page-turn">
            <div>
              <h3 className="font-serif text-xl font-semibold m-0 text-[#1C1916]">Sintonizador de Entrada</h3>
              <p className="text-xs text-[#3D3D3D] mt-1 max-w-md mx-auto">
                A animação que recebe o leitor no loading inicial do onboarding. Uma linha vertical se desenha, o tick intercepta, e a faísca do insight se acende em seguida.
              </p>
            </div>

            {/* Live sandbox container for Splash animation */}
            <div className="bg-white border border-[#BDAB9C]/20 rounded-2xl p-12 max-w-md mx-auto flex flex-col items-center justify-center relative shadow-sm overflow-hidden min-h-[300px]">
              
              <div key={splashAnimationKey} className="flex flex-col items-center justify-center gap-5">
                
                {/* SVG Live animated mark */}
                <div className="breathe-brand-mark flex items-center justify-center">
                  <svg width="72" height="72" viewBox="0 0 40 40" fill="none" className="overflow-visible">
                    {/* Amber pop star */}
                    <circle 
                      cx="14" 
                      cy="9.5" 
                      r="3.4" 
                      fill="#C5895A"
                      className="origin-[14px_9.5px] scale-0"
                      style={{
                        animation: "pop .42s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                        animationDelay: "0.95s"
                      }}
                    />
                    
                    {/* Main Line stroke */}
                    <path 
                      d="M14 16.5V31.5" 
                      stroke="#1C1916" 
                      strokeWidth="3.6" 
                      strokeLinecap="round"
                      className="fill-none stroke-[3.6px]"
                      style={{
                        strokeDasharray: "16",
                        strokeDashoffset: "16",
                        animation: "draw 0.62s cubic-bezier(0.65, 0, 0.35, 1) forwards"
                      }}
                    />

                    {/* Tick Line stroke */}
                    <path 
                      d="M14 24.5H27.5" 
                      stroke="#1C1916" 
                      strokeWidth="3.6" 
                      strokeLinecap="round"
                      className="fill-none stroke-[3.6px]"
                      style={{
                        strokeDasharray: "13.5",
                        strokeDashoffset: "13.5",
                        animation: "draw 0.62s cubic-bezier(0.65, 0, 0.35, 1) forwards",
                        animationDelay: "0.5s"
                      }}
                    />
                  </svg>
                </div>

                <div 
                  className="space-y-1 mt-4 transition-all duration-500 ease-out translate-y-2 opacity-0"
                  style={{
                    animation: "fadeUp .6s ease forwards",
                    animationDelay: "1.1s"
                  }}
                >
                  <p className="font-display tracking-[0.2em] font-bold text-[#1C1916] text-lg uppercase m-0 leading-none">Marginalia</p>
                  <p className="font-serif italic text-xs text-[#3D3D3D]/75 m-0 mt-0.5">o que fica em você</p>
                </div>

              </div>

              {/* Action trigger restart */}
              <button
                onClick={() => setSplashAnimationKey(prev => prev + 1)}
                className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded bg-[#E2DCD5]/40 hover:bg-[#E2DCD5]/75 border border-[#BDAB9C]/20 text-[10px] font-mono tracking-wide text-stone-600 transition-all cursor-pointer select-none no-export"
              >
                <RefreshIcon className="w-3 h-3" />
                <span>REINICIAR</span>
              </button>

            </div>

            <p className="text-[10px] text-stone-400 italic">Disparado automaticamente ao inicializar o applet.</p>
          </div>
        )}

      </div>

      {/* Styled css keyframes injected in local React scope just for live animation */}
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pop {
          to {
            transform: scale(1);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .breathe-brand-mark {
          animation: breatheBrand 3.2s ease-in-out 1.4s infinite;
        }
        @keyframes breatheBrand {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.035); }
        }
      `}</style>

    </div>
  );
}
