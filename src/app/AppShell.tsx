import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  Plus, 
  Flame, 
  Compass, 
  Check, 
  Feather, 
  Sparkles, 
  Library, 
  ChevronRight,
  Info
} from "lucide-react";
import { useMarginalia } from "../context/MarginaliaContext";
import { isFeatureEnabled } from "../config/featureFlags";
import { routes } from "./routeConfig";
import { MarginaliaLogo } from "../components/branding/MarginaliaLogo";
import { 
  RefreshIcon, 
  FeedIcon, 
  DescobertasIcon, 
  CompanionIcon, 
  ProfileIcon 
} from "../components/icons/MarginaliaIcons";
import { pickEcoDaSemana } from "../utils/feedAlgorithm";
import { INITIAL_ECOS } from "../data";

export const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    userProfile, 
    challenges, 
    showPersistenceWarning, 
    setShowPersistenceWarning, 
    setShowResetModal,
    setChatActiveMargem,
    setChatMessages,
    setUserInputMessage
  } = useMarginalia();

  if (!userProfile) return null;

  const ecoDaSemana = pickEcoDaSemana(INITIAL_ECOS);

  // Helper to map route paths to their specific custom icons
  const getRouteIcon = (path: string) => {
    switch (path) {
      case "/margens": return <FeedIcon size={16} />;
      case "/descobertas": return <DescobertasIcon size={16} />;
      case "/ecos": return <Library className="w-4 h-4" />;
      case "/companion": return <CompanionIcon size={16} />;
      case "/perfil": return <ProfileIcon size={16} />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen paper-grain flex flex-col selection:bg-[#BDAB9C]/30 selection:text-[#1C1916]">
      
      {/* Persistence Warning Banner */}
      {showPersistenceWarning && (
        <div className="bg-[#1C1916] text-[#FAF8F3] px-4 py-3 md:py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs border-b border-[#BDAB9C]/30 z-40 relative animate-fade-in font-sans">
          <div className="flex items-center gap-2 max-w-3xl">
            <span className="p-1 rounded bg-[#C5895A]/20 text-[#C5895A] font-bold text-[9px] tracking-wider uppercase font-mono shrink-0">Aviso</span>
            <p className="font-serif italic leading-relaxed text-stone-200">
              Neste estágio piloto, suas anotações são salvas exclusivamente em seu dispositivo (armazenamento local). Sincronização em nuvem e contas permanentes chegam na <strong className="text-[#C5895A] font-sans not-italic font-bold">Fase 1 (Sincronização em Nuvem)</strong>.
            </p>
          </div>
          <button 
            onClick={() => setShowPersistenceWarning(false)}
            className="text-stone-400 hover:text-white px-3 py-1 border border-stone-700 hover:border-stone-500 rounded text-[10px] font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer text-center whitespace-nowrap shrink-0"
          >
            Compreendi
          </button>
        </div>
      )}

      {/* HEADER BAR (Clean Apple/Notion look) */}
      <header className="sticky top-0 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#BDAB9C]/30 z-30 px-4 py-3 md:py-4">
        <div className="w-full max-w-5xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/margens")}>
            <MarginaliaLogo variant="lockup" tagline={true} />
          </div>

          {/* Top navigation stats & user menu */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Quick reading streak count */}
            {isFeatureEnabled("streaks") && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BDAB9C]/10 text-[#3D3D3D] border border-[#BDAB9C]/30" title="Dias seguidos lendo e anotando">
                <Flame className="w-4 h-4 text-[#C5895A] animate-pulse fill-[#C5895A]/10" />
                <span className="text-xs font-sans font-semibold">{userProfile.streakDays}d Streak</span>
              </div>
            )}

            {/* Quick new margin button */}
            {isFeatureEnabled("createMargin") && (
              <button
                onClick={() => navigate("/margens/nova")}
                className="bg-[#1C1916] hover:bg-[#2A2724] text-[#FAF8F3] p-1.5 md:px-4 md:py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-sans font-medium cursor-pointer journal-shadow"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Nova Margem</span>
              </button>
            )}

            {/* Reset App Trigger */}
            <button
              onClick={() => setShowResetModal(true)}
              aria-label="Reiniciar experiência"
              title="Reiniciar experiência"
              className="p-1.5 rounded hover:bg-[#BDAB9C]/20 text-[#3D3D3D]/60 hover:text-red-700 transition-colors cursor-pointer"
            >
              <RefreshIcon size={16} />
            </button>

          </div>
        </div>
      </header>

      {/* CORE LAYOUT GRID */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24 md:pb-12">
        
        {/* LEFT COLUMN: Main subroute views */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
          <Outlet />
        </div>

        {/* RIGHT COLUMN: Sidebar (Challenges, Book of Month, community trends) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PROFILE ARCHETYPE MINI CARD */}
          <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1916]/5 border border-[#BDAB9C]/40 flex items-center justify-center font-display text-sm font-bold text-[#1C1916]">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#BDAB9C] uppercase block tracking-wider">Perfil Ativo</span>
                <p className="text-xs font-sans font-semibold text-[#1C1916]">{userProfile.name}</p>
                <p className="text-[10px] font-serif italic text-[#3D3D3D]">{userProfile.title}</p>
              </div>
            </div>

            <div className="border-t border-[#BDAB9C]/20 pt-3">
              <p className="text-[10px] font-sans text-[#3D3D3D] leading-relaxed opacity-85">
                "As anotações nas margens revelam o leitor mais do que o livro jamais revelará."
              </p>
            </div>
          </div>

          {/* WEEKLY RITUALS (De-gamified literary flow) */}
          {isFeatureEnabled("weeklyRituals") && (
            <div className="bg-[#FAF8F3] border border-[#BDAB9C] rounded-xl p-5 journal-shadow space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#1C1916] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#BDAB9C]" />
                  Rituais da Semana
                </h4>
                <span className="text-[10px] font-sans text-[#BDAB9C]">
                  {challenges.filter(c => c.completed).length} / {challenges.length}
                </span>
              </div>

              <div className="space-y-3">
                {challenges.map((c) => (
                  <div 
                    key={c.id}
                    className={`p-3 rounded-lg border flex items-start gap-2.5 transition-all ${
                      c.completed 
                        ? "bg-green-50/50 border-green-200" 
                        : "bg-[#FAF8F3] border-[#BDAB9C]/30 hover:border-[#BDAB9C]"
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        c.completed 
                          ? "bg-green-600 border-green-600 text-[#FAF8F3]" 
                          : "border-[#BDAB9C]"
                      }`}
                    >
                      {c.completed && <Check className="w-2.5 h-2.5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-sans font-medium leading-none ${c.completed ? "line-through text-[#BDAB9C]" : "text-[#1C1916]"}`}>
                        {c.title}
                      </p>
                      <p className="text-[10px] text-[#3D3D3D] opacity-70 mt-1 leading-snug">
                        {c.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ECO DA SEMANA (Curated recommendation card) */}
          {ecoDaSemana && (
            <div 
              onClick={() => navigate(`/ecos/${ecoDaSemana.id}`)}
              className="bg-[#FAF8F3] border border-[#C5895A]/60 rounded-xl p-5 journal-shadow space-y-4 cursor-pointer hover:border-[#1C1916] transition-all"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#C5895A] uppercase block font-semibold">
                  Atmosfera da Semana
                </span>
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#1C1916]">
                  Eco da Semana
                </h4>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-16 h-20 bg-[#1C1916] text-[#FAF8F3] rounded relative shadow-md flex flex-col justify-between p-2 text-center border border-[#BDAB9C]/30 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 tactile-overlay opacity-30" />
                  <span className="text-[8px] font-mono tracking-widest text-[#BDAB9C]/70 uppercase block">ECO</span>
                  <span className="z-10 text-[8.5px] leading-tight font-serif italic text-[#FAF8F3]/90 font-semibold truncate">
                    {ecoDaSemana.name.split(" ")[0]}
                  </span>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-xs font-sans font-bold text-[#1C1916] truncate">{ecoDaSemana.name}</p>
                  <p className="text-[9px] font-mono text-[#BDAB9C] uppercase">{ecoDaSemana.category}</p>
                  <p className="text-[10.5px] text-[#3D3D3D] leading-relaxed italic font-serif line-clamp-3">
                    {ecoDaSemana.description}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* FIXED FOOTER NAV (Optimized for iOS/Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#FAF8F3]/95 backdrop-blur-md border-t border-[#BDAB9C]/30 z-30 py-2.5 px-4 md:py-3 shadow-lg">
        <div className="w-full max-w-lg mx-auto flex justify-between items-center">
          {routes.map((route) => {
            const isActive = location.pathname.startsWith(route.path);
            return (
              <NavLink
                key={route.path}
                to={route.path}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? "text-[#C5895A]" 
                    : "text-[#BDAB9C] hover:text-[#1C1916]"
                }`}
              >
                {getRouteIcon(route.path)}
                <span className="text-[10px] font-sans font-semibold tracking-tight">
                  {route.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

    </div>
  );
};
