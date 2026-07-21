import React from "react";
import { MarginaliaLogo } from "../../../components/branding/MarginaliaLogo";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  headerText: string;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  headerText
}) => {
  return (
    <div id="onboarding_container" className="min-h-screen paper-grain flex items-center justify-center p-4 md:p-8 selection:bg-[#BDAB9C]/30 selection:text-[#1C1916] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[24px] border-[#FAF8F3] z-10" />
      
      <div className="w-full max-w-xl bg-[#FAF8F3] border border-[#BDAB9C] rounded-2xl journal-shadow relative overflow-hidden p-6 md:p-10 animate-page-turn">
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-[#1C1916]/10 via-transparent to-transparent" />
        
        <div className="text-center mb-8 relative flex flex-col items-center">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#BDAB9C] uppercase block mb-3">
            {headerText}
          </span>
          <MarginaliaLogo variant="vertical-lockup" size={28} />
          <div className="w-16 h-[1px] bg-[#BDAB9C] mx-auto mt-4" />
        </div>

        {children}
      </div>
    </div>
  );
};
