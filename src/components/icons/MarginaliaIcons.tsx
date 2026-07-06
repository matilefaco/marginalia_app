import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  className?: string;
}

// Helper to bundle common SVG attributes
const getSvgProps = (props: IconProps, defaultSize = 20) => {
  const { size = defaultSize, strokeWidth = 1.2, className = "", ...rest } = props;
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `transition-transform duration-200 ${className}`,
    ...rest,
  };
};

/**
 * MARGEM (Margin / Reflection)
 * Concept: An open bracket embracing horizontal prose lines with an elegant annotation spot.
 */
export const MarginIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Page vertical margin */}
    <line x1="5" y1="4" x2="5" y2="20" />
    {/* Custom bracket */}
    <path d="M9 6h-2v12h2" />
    {/* Stylized prose lines */}
    <line x1="12" y1="8" x2="19" y2="8" strokeDasharray="1 3" />
    <line x1="12" y1="12" x2="18" y2="12" />
    <line x1="12" y1="16" x2="16" y2="16" strokeDasharray="1 3" />
    {/* Ink drop/spot of reflection */}
    <path d="M18 15.5l1 1-1 1-1-1z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * AURA LITERÁRIA (Literary Aura)
 * Concept: A central candle/insight flame inside nested, fine concentric circles.
 */
export const AuraIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Outer orbit */}
    <circle cx="12" cy="12" r="9" strokeDasharray="2 3" opacity="0.6" />
    {/* Inner circle */}
    <circle cx="12" cy="12" r="6" opacity="0.8" />
    {/* Contemplative inner flame/spark */}
    <path
      d="M12 9.5c-1 1-1.5 2-1.5 2.8a1.5 1.5 0 0 0 3 0c0-.8-.5-1.8-1.5-2.8z"
      fill="currentColor"
    />
    {/* Spark of alignment */}
    <line x1="12" y1="2" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="22" />
  </svg>
);

/**
 * MAPA DA ALMA (Soul Map / Constellation)
 * Concept: Fine stellar nodes connected by thin dotted emotional links.
 */
export const SoulMapIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Star connection paths */}
    <path d="M6 16L12 5M12 5L18 13M18 13L11 19M11 19L6 16M12 5L11 19" strokeDasharray="2 2" opacity="0.7" />
    {/* Stellar nodes */}
    <circle cx="6" cy="16" r="2.5" fill="currentColor" />
    <circle cx="12" cy="5" r="3" fill="currentColor" />
    <circle cx="18" cy="13" r="2.5" fill="currentColor" />
    <circle cx="11" cy="19" r="2" fill="currentColor" />
    {/* Little ambient spark */}
    <path d="M15 9.5l.5.5.5-.5-.5-.5z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * ECOS (Echoes / Emotional Resonance)
 * Concept: An open point sending out organic concentric waves.
 */
export const EchoIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Source spot (diamond) */}
    <path d="M5 12l1.5-1.5L8 12l-1.5 1.5z" fill="currentColor" />
    {/* Concentric waves */}
    <path d="M11 8a5.5 5.5 0 0 1 0 8" />
    <path d="M15 5a10 10 0 0 1 0 14" opacity="0.7" />
    <path d="M19 2a15 15 0 0 1 0 20" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

/**
 * SINTONIA (Sintonia / Convergence)
 * Concept: Intertwining Venn circles with a vertical convergence needle.
 */
export const SintoniaIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="9.5" cy="12" r="5" opacity="0.8" />
    <circle cx="14.5" cy="12" r="5" opacity="0.8" />
    {/* Point of convergence */}
    <line x1="12" y1="9" x2="12" y2="15" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * LIVROS DE ORIGEM (Origin Books)
 * Concept: Clean spine lineup with an elegant hanging book ribbon.
 */
export const OriginBooksIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <rect x="5" y="7" width="3" height="12" rx="0.5" />
    <rect x="9.5" y="4" width="3" height="15" rx="0.5" />
    <rect x="14" y="8" width="3" height="11" rx="0.5" />
    {/* Hanging ribbon */}
    <path d="M11 19v3l1.5-1.5 1.5 1.5v-3" fill="currentColor" opacity="0.9" />
  </svg>
);

/**
 * COMPANHEIRA DE LEITURA (Reading Companion)
 * Concept: An editorial eye enclosing a 4-pointed spark of wisdom.
 */
export const CompanionIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Editorial eye shape */}
    <path d="M2.5 12s4-6.5 9.5-6.5 9.5 6.5 9.5 6.5-4 6.5-9.5 6.5S2.5 12 2.5 12z" />
    {/* Iris circle */}
    <circle cx="12" cy="12" r="3.5" />
    {/* Wisdom Spark */}
    <path d="M12 10.5l.3 1.2.9.3-.9.3-.3 1.2-.3-1.2-.9-.3.9-.3z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * WRAPPED (Retrospective Cycle)
 * Concept: An elegant clock-like or timeline cycle enclosing an insight star.
 */
export const WrappedIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Time cycle arrow */}
    <path d="M12 4a8 8 0 1 1-5.65 2.34" />
    <polyline points="6.34 6.34 8 8 5 8" />
    {/* Retrospective diamond star in the center */}
    <path d="M12 9l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="currentColor" />
  </svg>
);

/**
 * COMPARTILHAR (Share Reflection)
 * Concept: A margin bracket with a thought wave lifting off.
 */
export const ShareIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Left bracket */}
    <path d="M8 5H4v14h4" />
    {/* Lift off curve and arrow */}
    <path d="M11 13c1.5-3 4-5 9-5" />
    <polyline points="16 4 20 8 16 12" />
  </svg>
);

/**
 * STORY (Vertical Fragment)
 * Concept: A portrait canvas layout highlighting an elegant left margin.
 */
export const StoryIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" strokeDasharray="1 2" />
    {/* A tiny insight star in the story view */}
    <path d="M14 8.5l.4 1 .1 1 .5.1-1 .4-.4 1-.1-1-.5-.1 1-.4z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * COMPATIBILIDADE (Compatibility)
 * Concept: Intersecting light beams linking two quiet stars.
 */
export const CompatibilityIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Left star */}
    <path d="M7 12l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" fill="currentColor" stroke="none" />
    {/* Right star */}
    <path d="M17 12l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" fill="currentColor" stroke="none" />
    {/* Intersecting path of alignment */}
    <path d="M7 12c3-4 7-4 10 0s-7 4-10 0z" strokeDasharray="1 2" />
  </svg>
);

/**
 * IDENTIDADE (Identity / Monogram Seal)
 * Concept: Elegant circular seal containing a flowing cursive 'm'.
 */
export const IdentityIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="12" cy="12" r="9" />
    {/* Calligraphic hand wave representing signature/marginal writing */}
    <path d="M8 14c0.5-2 1-5 2.5-5s2 4 2.5 5 1-4.5 2-4.5 1 2 1.5 3" />
  </svg>
);

/**
 * DNA LITERÁRIO (Literary DNA)
 * Concept: A vertical spine with alternating insight connections.
 */
export const DnaIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="12" y1="3" x2="12" y2="21" />
    {/* Alternating nodes */}
    <path d="M8 6h4M12 10h4M8 14h4M12 18h4" />
    <circle cx="8" cy="6" r="2" fill="currentColor" />
    <circle cx="16" cy="10" r="2" fill="currentColor" />
    <circle cx="8" cy="14" r="2" fill="currentColor" />
    <circle cx="16" cy="18" r="2" fill="currentColor" />
  </svg>
);

/**
 * DIÁRIO DE LINHAS (Lines Diary)
 * Concept: Horizontal journal rows with a highlighted quote mark.
 */
export const LinesDiaryIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="11" x2="20" y2="11" strokeDasharray="2 2" />
    <line x1="4" y1="16" x2="14" y2="16" />
    {/* Bookmark highlight */}
    <path d="M17 14h3v5l-1.5-1-1.5 1z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * RITUAIS (Rituais / Habits)
 * Concept: A delicate crescent moon with a central contemplative flame.
 */
export const RituaisIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Subtle Moon shape */}
    <path d="M12 3a9 9 0 0 0 9 9 9 9 0 1 1-9-9z" />
    {/* Ritual candle spark */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="12" y1="8" x2="12" y2="9.5" />
  </svg>
);

/**
 * DESCOBERTAS (Discoveries / Exploration)
 * Concept: An elegant monoline lens with an internal star.
 */
export const DescobertasIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="10" cy="10" r="6" />
    <line x1="14.5" y1="14.5" x2="20" y2="20" />
    {/* Starburst inside */}
    <path d="M10 8l.2.8.8.2-.8.2-.2.8-.2-.8-.8-.2.8-.2z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * MUSEU DAS MARGENS (Museum of Margins)
 * Concept: Editorial gallery arch enclosing a suspended star.
 */
export const MuseuIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Vaulted Arch */}
    <path d="M6 20V10a6 6 0 0 1 12 0v10" />
    <line x1="4" y1="20" x2="20" y2="20" />
    {/* Suspended key */}
    <line x1="12" y1="5" x2="12" y2="9" />
    <circle cx="12" cy="11" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * COINCIDÊNCIA LITERÁRIA (Literary Coincidence)
 * Concept: Converging rays crossing with a central spark of synchronicity.
 */
export const CoincidenceIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M5 4c3 4 5 10 7 16" />
    <path d="M19 4c-3 4-5 10-7 16" />
    {/* Sparks */}
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

/**
 * FRASE QUE DEFINE VOCÊ (Profile Quote)
 * Concept: Elegant nested editorial quote marks.
 */
export const DefineYouIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M8 8H5v3a2 2 0 0 0 2 2h1" />
    <path d="M15 8h-3v3a2 2 0 0 0 2 2h1" />
    <path d="M5 16h14" opacity="0.6" strokeDasharray="1 2" />
  </svg>
);

/**
 * CARTA DO FUTURO (Letter to the Future)
 * Concept: An envelope sealed with an insight star.
 */
export const FutureLetterIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <rect x="4" y="6" width="16" height="12" rx="1" />
    <path d="M4 8l8 5 8-5" />
    {/* Seal star */}
    <path d="M12 11l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * PERFIL (Contemplative Profile)
 * Concept: Head profile silhouette paired with a single feather line.
 */
export const ProfileIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 20a7 7 0 0 1 14 0" />
    {/* Monoline feather touch */}
    <line x1="18" y1="5" x2="20" y2="3" />
  </svg>
);

/**
 * BUSCA (Search)
 * Concept: Elegant fine search loop.
 */
export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="10" cy="10" r="6" />
    <line x1="14.5" y1="14.5" x2="20" y2="20" />
  </svg>
);

/**
 * CONFIGURAÇÕES (Settings)
 * Concept: Three vertical sliding parameters with custom diamond handles.
 */
export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="6" y1="4" x2="6" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="18" y1="4" x2="18" y2="20" />
    {/* Diamond Slider 1 */}
    <path d="M6 7l1.5 1.5L6 10 4.5 8.5z" fill="currentColor" />
    {/* Diamond Slider 2 */}
    <path d="M12 14l1.5 1.5-1.5 1.5-1.5-1.5z" fill="currentColor" />
    {/* Diamond Slider 3 */}
    <path d="M18 10l1.5 1.5-1.5 1.5-1.5-1.5z" fill="currentColor" />
  </svg>
);

/**
 * SALVAR / GUARDAR (Save Bookmark)
 * Concept: A delicate monoline ribbon card.
 */
export const SaveIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M17 4H7v16l5-3.5 5 3.5z" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
  </svg>
);

/**
 * EXPORTAR (Export Studio)
 * Concept: A canvas with a reflection line pointing up and right.
 */
export const ExportIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M5 9V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
    <line x1="12" y1="19" x2="12" y2="9" />
    <polyline points="9 12 12 9 15 12" />
  </svg>
);

/**
 * CRIAR MARGEM (Create Margin / Write)
 * Concept: Minimalist nib writing on a subtle margin coordinate.
 */
export const CreateMarginIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="4" y1="20" x2="20" y2="20" />
    {/* Pen nib */}
    <path d="M14.5 4.5l3 3-10 10H4.5v-3l10-10z" />
    <line x1="11.5" y1="7.5" x2="14.5" y2="10.5" />
  </svg>
);

/**
 * HOME / FEED (Central Archive / Library)
 * Concept: An open scroll or layout representing the main archive list.
 */
export const FeedIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* Two balanced cards slightly overlapping */}
    <rect x="4" y="5" width="11" height="11" rx="1" />
    <rect x="9" y="9" width="11" height="11" rx="1" />
  </svg>
);

/**
 * CHAT / NOTAS (General Annotation Bubble)
 * Concept: Sophisticated editorial annotation indicator.
 */
export const AnnotationIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 3z" />
  </svg>
);

/**
 * LOVE / CORAÇÃO EMOCIONAL (Emotional Connection)
 * Concept: Two delicate nesting tear-shapes representing shared vibration.
 */
export const HeartIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    {/* A stylized geometric leaf/heart outline */}
    <path d="M12 21c-4.5-4-8-7.5-8-11.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5c0 4-3.5 7.5-8 11.5z" />
  </svg>
);

/**
 * CLOSE (Fechar)
 * Concept: Thin geometric X.
 */
export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * REFRESH (Sintonizar de Novo)
 * Concept: Two thin interlocking cyclic arcs.
 */
export const RefreshIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
  </svg>
);

/**
 * ECO: AMOR IMPOSSÍVEL (Unattainable Resonance)
 * Concept: Two parallel curved lines that represent close but disconnected trajectories.
 */
export const EcoAmorImpossivelIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M5 12a7 7 0 0 1 12-5.3" />
    <path d="M19 12a7 7 0 0 1-12 5.3" strokeDasharray="2 2" opacity="0.8" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * ECO: SOLIDÃO BONITA (Contemplative Solitude)
 * Concept: A solitary clean vertical line/beacon inside a vast concentric orbit.
 */
export const EcoSolidaoBonitaIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="12" cy="12" r="8" opacity="0.4" strokeDasharray="2 3" />
    <line x1="12" y1="5" x2="12" y2="19" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * ECO: NOSTALGIA DO TEMPO (Temporal Fold / Ripple of Memory)
 * Concept: Overlapping expanding and contracting wave arches.
 */
export const EcoNostalgiaIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M12 21a9 9 0 0 1-9-9c0-4.5 3-8 9-8s9 3.5 9 8" />
    <path d="M12 17a5 5 0 0 1-5-5c0-2.5 2-5 5-5s5 2.5 5 5" opacity="0.7" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * ECO: CRISES EXISTENCIAIS (Perpendicular Axis / Fragmented Center)
 * Concept: Perpendicular axes intersecting off-center with a fragmented coordinate box.
 */
export const EcoCrisesExistenciaisIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="3 3" opacity="0.4" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <rect x="11" y="11" width="2" height="2" fill="currentColor" stroke="none" />
    <path d="M15 15l3 3M18 15l-3 3" opacity="0.8" />
  </svg>
);

/**
 * ECO: ESPERANÇA ATENTA (Horizon Beacon / Emergent Light)
 * Concept: A horizon line with an upright beacon ray emerging upward.
 */
export const EcoEsperancaAtentaIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="4" y1="18" x2="20" y2="18" />
    <line x1="6" y1="15" x2="18" y2="15" opacity="0.5" strokeDasharray="1 2" />
    <path d="M12 18V5" />
    <path d="M9 8l3-3 3 3" />
    <circle cx="12" cy="11" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * ECO: MELANCOLIA ELEGANTE (Suspended Pendulum / Margem Drop)
 * Concept: Off-center vertical thread hanging a solid diamond droplet.
 */
export const EcoMelancoliaEleganteIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M12 4v11" />
    <path d="M6 8c3.5 2.5 8.5 2.5 12 0" opacity="0.7" />
    <path d="M12 15l-1.5 1.5L12 18l1.5-1.5z" fill="currentColor" />
    <circle cx="12" cy="6" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * ECO: DESEJO OCULTO (Concealed Vibration)
 * Concept: Interlinking soft waves inside a dotted capsule.
 */
export const EcoDesejoOcultoIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <rect x="5" y="3" width="14" height="18" rx="7" strokeDasharray="2 3" opacity="0.6" />
    <path d="M8 12c1.5-2.5 4.5-2.5 6 0s4.5 2.5 6 0" />
    <circle cx="11" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * TROPHY / HONORARY TITLES (Honor / Consecration)
 * Concept: Nested elegant steps leading up to an honorary crown spark.
 */
export const TrophyIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M6 19h12" />
    <path d="M8 19v-4h8v4" />
    <path d="M10 15v-5h4v5" />
    <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <path d="M12 4V5" />
  </svg>
);

/**
 * ARROW RIGHT (Próximo / Avançar)
 * Concept: Minimalist monoline arrow.
 */
export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/**
 * PLUS (Adicionar / Novo)
 * Concept: Thin geometric plus sign.
 */
export const PlusIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/**
 * FLAME (Streak Days / Persistência Poética)
 * Concept: Monoline vertical flame on a horizon line.
 */
export const FlameIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <line x1="6" y1="19" x2="18" y2="19" opacity="0.7" />
    <path d="M12 5c-2.5 3-4 5-4 7.5a4 4 0 0 0 8 0C16 10 14.5 8 12 5z" />
    <circle cx="12" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * BOOK OPEN (Leitura Ativa)
 * Concept: An elegant monoline open book split in the center.
 */
export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M2 3h10v16H2z" />
    <path d="M12 3h10v16H12z" />
    <line x1="12" y1="3" x2="12" y2="19" />
  </svg>
);

/**
 * LOG OUT (Sair)
 * Concept: Monoline door layout with exit arrow.
 */
export const LogOutIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/**
 * HELP (Ajuda / Dúvida)
 * Concept: Contemplative question mark within elegant fine circles.
 */
export const HelpIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/**
 * ALERT (Alerta / Atenção)
 * Concept: Exclamation coordinate inside a thin triangle.
 */
export const AlertIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/**
 * CLOCK (Tempo de Leitura)
 * Concept: Thin circular interface with elegant dial hands.
 */
export const ClockIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/**
 * SPARK (Sparkle / Insight Singelo)
 * Concept: Delicate four-pointed sparkle.
 */
export const SparkleIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M12 3v18M3 12h18M12 3l9 9-9 9-9-9z" opacity="0.3" strokeDasharray="1 1" />
    <path d="M12 8l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * SPARKLES (Insight Coletivo)
 * Concept: Three delicate four-pointed sparkles in orbit.
 */
export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg {...getSvgProps(props)}>
    <path d="M10 3l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" fill="currentColor" stroke="none" />
    <path d="M18 13l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="currentColor" stroke="none" opacity="0.8" />
    <path d="M5 14l.4 1 .1 1 .5.1-1 .4-.4 1-.1-1-.5-.1 1-.4z" fill="currentColor" stroke="none" opacity="0.6" />
  </svg>
);

