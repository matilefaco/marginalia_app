import React from "react";
import { Link } from "react-router-dom";
import IconShowcase from "../components/IconShowcase";
import { FeedIcon } from "../components/icons/MarginaliaIcons";

export const IconShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F3] relative animate-page-turn">
      <Link
        to="/margens"
        className="fixed bottom-6 right-6 bg-[#1C1916] text-[#FAF8F3] hover:bg-[#2A2724] px-5 py-3 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all journal-shadow z-50 cursor-pointer flex items-center gap-2 border border-[#BDAB9C]/20 hover:scale-105 active:scale-95"
      >
        <FeedIcon size={16} /> Voltar ao Marginalia
      </Link>
      <div className="p-4 md:p-8">
        <IconShowcase />
      </div>
    </div>
  );
};
export default IconShowcasePage;
