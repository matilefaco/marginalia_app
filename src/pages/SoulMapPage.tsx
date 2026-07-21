import React from "react";
import { useMarginalia } from "../context/MarginaliaContext";
import { SoulMap } from "../components/SoulMap";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SoulMapPage: React.FC = () => {
  const { userProfile, margens } = useMarginalia();
  const navigate = useNavigate();

  if (!userProfile) return null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
      <button
        onClick={() => navigate("/perfil")}
        className="flex items-center gap-1.5 text-xs font-sans text-[#BDAB9C] hover:text-[#1C1916] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Perfil</span>
      </button>
      <div className="animate-page-turn">
        <SoulMap userProfile={userProfile} margens={margens} onOpenAddMargem={() => navigate("/margens/nova")} />
      </div>
    </div>
  );
};

export default SoulMapPage;
