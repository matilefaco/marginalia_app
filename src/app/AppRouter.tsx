import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { ProfileRequiredRoute } from "../guards/ProfileRequiredRoute";
import { GuestOnlyRoute } from "../guards/GuestOnlyRoute";
import { MargensPage } from "../pages/MargensPage";
import { DiscoveryPage } from "../pages/DiscoveryPage";
import { EcosPage } from "../pages/EcosPage";
import { CompanionPage } from "../pages/CompanionPage";
import { ProfilePage } from "../pages/ProfilePage";
import { NewMargemPage } from "../pages/NewMargemPage";
import { OnboardingPage } from "../pages/OnboardingPage";
import { IconShowcasePage } from "../pages/IconShowcasePage";
import { useMarginalia } from "../context/MarginaliaContext";

const RootRedirect: React.FC = () => {
  const { userProfile } = useMarginalia();
  return <Navigate to={userProfile ? "/margens" : "/onboarding"} replace />;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Guest only onboarding journey */}
        <Route 
          path="/onboarding" 
          element={
            <GuestOnlyRoute>
              <OnboardingPage />
            </GuestOnlyRoute>
          } 
        />

        {/* Protected routes wrapped inside our AppShell */}
        <Route 
          element={
            <ProfileRequiredRoute>
              <AppShell />
            </ProfileRequiredRoute>
          }
        >
          <Route path="/margens" element={<MargensPage />} />
          <Route path="/margens/nova" element={<NewMargemPage />} />
          <Route path="/descobertas" element={<DiscoveryPage />} />
          <Route path="/ecos" element={<EcosPage />} />
          <Route path="/ecos/:ecoId" element={<EcosPage />} />
          <Route path="/companion" element={<CompanionPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/simbolos" element={<IconShowcasePage />} />
        </Route>

        {/* Fallback routes and redirects */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RootRedirect />} />

      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
