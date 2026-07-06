import React, { useRef, useState } from "react";
import { exportNodeAsPng } from "../lib/exportImage";
import { SoulMapIcon, AuraIcon, MarginIcon, ExportIcon } from "./icons/MarginaliaIcons";
import { UserProfile, Margem, SoulMapNode } from "../types";

interface SoulMapProps {
  userProfile: UserProfile;
  margens: Margem[];
  onOpenAddMargem?: () => void;
}

export const SoulMap: React.FC<SoulMapProps> = ({ userProfile, margens, onOpenAddMargem }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SoulMapNode | null>(null);
  const [exporting, setExporting] = useState(false);

  const safeUserProfile = userProfile || {} as UserProfile;
  const safeMargins = Array.isArray(margens) ? margens : [];

  const userMargins = safeMargins.filter(
    (m) => m && (m.authorAvatar === safeUserProfile.avatarSeed || m.authorName === safeUserProfile.name)
  );

  // Generate constellation nodes based on user's real margins or beautiful defaults
  const generateNodes = (): SoulMapNode[] => {
    const nodes: SoulMapNode[] = [];
    
    // Add central core node (the archetype)
    nodes.push({
      id: "core-archetype",
      x: 50,
      y: 50,
      label: safeUserProfile.dominantArchetype || safeUserProfile.title || "Leitor Contemplativo",
      type: "emotion",
      details: `O núcleo de sua alma leitora, orbitando sentimentos que transcendem as páginas.`
    });

    if (userMargins.length > 0) {
      // Create node for each margin, distributing them circular-like or random-ish but pleasing
      userMargins.slice(0, 7).forEach((m, idx) => {
        if (!m) return;
        const angle = (idx * 2 * Math.PI) / Math.min(userMargins.length, 7);
        const radius = 30 + Math.sin(idx) * 10; // offset radius
        const x = Math.round(50 + Math.cos(angle) * radius);
        const y = Math.round(50 + Math.sin(angle) * radius);
        
        nodes.push({
          id: `margin-node-${m.id}`,
          x,
          y,
          label: m.bookTitle || "Livro",
          type: "book",
          details: `"${m.quote || ""}" — Sua anotação de margem: "${m.thought || ""}"`
        });
      });

      // Add a couple of emotion orbits
      const emotions: string[] = Array.from(new Set(userMargins.map(m => m && m.spoilerLevel === "heavy" ? "Revelação" : "Sintonia")));
      emotions.slice(0, 2).forEach((emo, idx) => {
        const angle = ((idx + 0.5) * 2 * Math.PI) / 3;
        const x = Math.round(50 + Math.cos(angle) * 18);
        const y = Math.round(50 + Math.sin(angle) * 18);
        nodes.push({
          id: `emotion-node-${idx}`,
          x,
          y,
          label: emo || "Sintonia",
          type: "emotion",
          details: `Emoção sintonizada fortemente através das suas anotações.`
        });
      });
    } else {
      // Fallback seeded nodes
      const fallbackNodes: SoulMapNode[] = [
        { id: "f-1", x: 25, y: 30, label: "Cem Anos de Solidão", type: "book", details: "A melancolia do tempo infinito que molda suas escolhas." },
        { id: "f-2", x: 75, y: 35, label: "Albert Camus", type: "author", details: "O autor que ancora seus questionamentos existenciais." },
        { id: "f-3", x: 30, y: 70, label: "Solidão Bonita", type: "emotion", details: "Seu principal refúgio emocional ao segurar um livro." },
        { id: "f-4", x: 70, y: 75, label: "Clássicos Russos", type: "eco", details: "O eco comunitário onde seus pensamentos se sentem em casa." },
        { id: "f-5", x: 48, y: 22, label: "Nostalgia", type: "emotion", details: "Um perfume do passado que você persegue entre as linhas." }
      ];
      nodes.push(...fallbackNodes);
    }

    return nodes;
  };

  const nodes = generateNodes();

  const handleExport = async () => {
    if (!mapContainerRef.current || exporting) return;
    setExporting(true);

    try {
      await exportNodeAsPng(
        mapContainerRef.current,
        `marginalia-mapa-alma-${safeUserProfile.username || "usuario"}`
      );
    } catch (err) {
      console.error("Erro ao exportar Mapa da Alma:", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
      <div className="flex justify-between items-center border-b border-[#BDAB9C]/20 pb-3">
        <div className="space-y-0.5">
          <span className="text-[9px] font-mono tracking-widest text-[#BDAB9C] uppercase block font-semibold">
            GEOMETRIA POÉTICA
          </span>
          <h3 className="font-display font-semibold text-sm text-[#1C1916] flex items-center gap-1.5">
            <SoulMapIcon className="w-4 h-4 text-[#BDAB9C]" />
            Mapa da Alma Leitora
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#BDAB9C] uppercase">
          {nodes.length} Pontos de Sintonia
        </span>
      </div>

      {/* Magical Celestial Constellation Space */}
      <div 
        ref={mapContainerRef}
        className="bg-[#121110] border border-[#1E1C1A] rounded-xl relative overflow-hidden aspect-square flex flex-col justify-between p-6 select-none"
      >
        {/* Subtle star overlay */}
        <div className="absolute inset-0 tactile-overlay opacity-30 pointer-events-none" />

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {nodes.map((node, idx) => {
            if (node.id === "core-archetype") return null;
            return (
              <line
                key={`line-${node.id}`}
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="#C5A880"
                strokeWidth="1"
                strokeDasharray="2,3"
              />
            );
          })}
        </svg>

        {/* Watermark header */}
        <div className="text-center z-10 space-y-0.5 pointer-events-none">
          <h4 className="font-serif italic text-amber-100/90 text-sm md:text-base tracking-wide">
            Mapa da Alma Leitora
          </h4>
          <span className="text-[8px] font-mono tracking-wider text-[#BDAB9C]/60 uppercase block">
            @{safeUserProfile.username || "leitor_marginalia"}
          </span>
        </div>

        {/* Interactive nodes */}
        <div className="absolute inset-0">
          {nodes.map((node) => {
            const isCore = node.id === "core-archetype";
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-hidden cursor-pointer z-20 ${
                  selectedNode?.id === node.id ? "scale-110" : "hover:scale-105"
                }`}
              >
                {/* Visual node marker */}
                <div 
                  className={`rounded-full flex items-center justify-center transition-all ${
                    isCore 
                      ? "w-5 h-5 bg-[#C5A880] text-[#121110] border border-amber-200 shadow-[0_0_12px_rgba(197,168,128,0.5)] animate-pulse" 
                      : "w-3 h-3 bg-[#1C1916] border-2 border-[#C5A880] group-hover:bg-[#C5A880]"
                  }`}
                >
                  {isCore && <AuraIcon className="w-3 h-3" />}
                </div>

                {/* Micro Label */}
                <span className="text-[8px] font-mono tracking-tight text-[#BDAB9C] bg-[#121110]/95 px-1 py-0.5 rounded border border-[#BDAB9C]/10 mt-1 whitespace-nowrap shadow-xs max-w-[80px] truncate">
                  {node.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail Panel overlay */}
        <div className="z-30 mt-auto bg-[#1C1916]/95 border border-[#BDAB9C]/20 p-3 rounded-lg flex flex-col gap-1 text-left min-h-[70px] no-export shadow-lg">
          {selectedNode ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-wider flex items-center gap-1">
                  <MarginIcon className="w-2.5 h-2.5" />
                  {selectedNode.type}
                </span>
                <button 
                  onClick={() => setSelectedNode(null)} 
                  className="text-[9px] font-mono text-[#BDAB9C] hover:text-[#FAF8F3]"
                >
                  Limpar
                </button>
              </div>
              <p className="text-xs font-serif italic text-amber-50 leading-relaxed line-clamp-3">
                {selectedNode.details}
              </p>
            </>
          ) : userMargins.length === 0 ? (
            <div className="my-auto text-center py-1.5 space-y-1">
              <p className="text-[10px] font-sans text-amber-100/90 italic font-semibold">
                Seu Mapa da Alma ainda está nascendo.
              </p>
              <p className="text-[9px] font-sans text-[#BDAB9C]">
                Escreva algumas margens para que suas constelações comecem a aparecer.
              </p>
              {onOpenAddMargem && (
                <button
                  onClick={onOpenAddMargem}
                  className="mt-1 text-[8.5px] font-sans bg-[#C5A880] text-[#121110] hover:bg-[#b0936b] px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-colors mx-auto block"
                >
                  Abrir a margem
                </button>
              )}
            </div>
          ) : (
            <div className="my-auto text-center py-2">
              <p className="text-[10px] font-sans text-[#BDAB9C] italic">
                Toque em qualquer estrela da constelação para ler seus fragmentos emocionais.
              </p>
            </div>
          )}
        </div>

        {/* Branding Footer */}
        <div className="text-center z-10 pt-1 pointer-events-none">
          <span className="text-[7px] font-mono tracking-widest text-[#BDAB9C]/40 uppercase block">
            CONEXÕES LITERÁRIAS DETECTADAS · MARGINALIA
          </span>
        </div>
      </div>

      {/* Export Action Controls - NO EXPORT */}
      <div className="no-export flex justify-end gap-2 pt-1">
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="text-[10px] font-sans font-semibold bg-[#1C1916] text-[#FAF8F3] hover:bg-stone-800 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer disabled:opacity-50 transition-all"
        >
          <ExportIcon className="w-3.5 h-3.5" />
          <span>{exporting ? "Compilando..." : "Exportar Mapa (PNG)"}</span>
        </button>
      </div>
    </div>
  );
};
