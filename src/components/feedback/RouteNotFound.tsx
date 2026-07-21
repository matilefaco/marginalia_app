import React from "react";
import { Compass, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RouteNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen paper-grain flex items-center justify-center p-4 selection:bg-[#BDAB9C]/30 selection:text-[#1C1916]">
      <div className="w-full max-w-sm bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl p-8 journal-shadow text-center space-y-6">
        <div className="p-4 bg-[#BDAB9C]/10 border border-[#BDAB9C]/30 rounded-full text-[#BDAB9C] w-fit mx-auto">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h2 className="font-serif italic text-2xl font-bold text-[#1C1916]">Trilha Invisível</h2>
          <p className="text-xs font-sans text-[#3D3D3D] leading-relaxed">
            Você caminhou para além das dobras conhecidas do diário. Esta página não pôde ser encontrada.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#1C1916] hover:bg-stone-800 text-[#FAF8F3] py-2.5 rounded-lg font-sans text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retornar ao Porto Seguro</span>
        </button>
      </div>
    </div>
  );
};

export default RouteNotFound;
