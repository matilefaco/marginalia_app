import React from "react";
import { MarginaliaMark } from "../../../components/branding/MarginaliaMark";

export const ProfileGenerationStep: React.FC = () => {
  return (
    <div className="py-16 text-center space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative flex items-center justify-center">
          <MarginaliaMark size={44} dotColor="#C5895A" color="#1C1916" strokeWidth={3.5} className="animate-spin-slow" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-serif italic text-base text-[#1C1916] font-semibold">
          "Sua Aura Literária está sendo escrita..."
        </p>
        <p className="text-xs font-sans text-[#3D3D3D] max-w-xs mx-auto leading-relaxed">
          Tecendo os silêncios, obsessões e deuses das suas leituras prediletas...
        </p>
        <p className="text-[9px] font-mono text-[#BDAB9C] uppercase tracking-widest mt-2">
          Interpretando a tinta dos seus autores favoritos
        </p>
      </div>
    </div>
  );
};
