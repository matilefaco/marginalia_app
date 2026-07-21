import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { ProfileRequiredRoute } from "../guards/ProfileRequiredRoute";
import { GuestOnlyRoute } from "../guards/GuestOnlyRoute";

import { MargensPage } from "../pages/MargensPage";
import { NewMargemPage } from "../pages/NewMargemPage";
import { OnboardingPage } from "../pages/OnboardingPage";
import { EcosPage } from "../pages/EcosPage";
import { ProfilePage } from "../pages/ProfilePage";

import { useMarginalia } from "../context/MarginaliaContext";
import { PageLoading } from "../components/feedback/PageLoading";
import { RouteErrorBoundary } from "../components/feedback/RouteErrorBoundary";
import { RouteNotFound } from "../components/feedback/RouteNotFound";

// Heavy components lazily loaded to minimize initial bundle size
const DiscoveryPage = lazy(() => 
  import("../pages/DiscoveryPage").then(m => ({ default: m.DiscoveryPage }))
);
const CompanionPage = lazy(() => 
  import("../pages/CompanionPage").then(m => ({ default: m.CompanionPage }))
);
const LiteraryAuraPage = lazy(() => 
  import("../pages/LiteraryAuraPage")
);
const SoulMapPage = lazy(() => 
  import("../pages/SoulMapPage")
);
const WrappedPage = lazy(() => 
  import("../pages/WrappedPage")
);
const IconShowcasePage = lazy(() => 
  import("../pages/IconShowcasePage").then(m => ({ default: m.IconShowcasePage }))
);

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
          {/* Eagerly loaded core routes */}
          <Route path="/margens" element={<MargensPage />} />
          <Route path="/margens/nova" element={<NewMargemPage />} />
          <Route path="/ecos" element={<EcosPage />} />
          <Route path="/ecos/:ecoId" element={<EcosPage />} />
          <Route path="/perfil" element={<ProfilePage />} />

          {/* Lazily loaded pages, each isolated with a Suspense fallback and ErrorBoundary */}
          <Route 
            path="/descobrir" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                  <DiscoveryPage />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/companheira" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                  <CompanionPage />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil/aura" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                  <LiteraryAuraPage />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil/mapa-da-alma" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                  <SoulMapPage />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil/retrospectiva" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                  <WrappedPage />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/__internal/icon-system" 
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                  <IconShowcasePage />
                </Suspense>
              </RouteErrorBoundary>
            } 
          />
        </Route>

        {/* Canonical Redirects */}
        <Route path="/descobertas" element={<Navigate to="/descobrir" replace />} />
        <Route path="/companion" element={<Navigate to="/companheira" replace />} />
        <Route path="/simbolos" element={<Navigate to="/__internal/icon-system" replace />} />

        {/* Fallback routes and redirects */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RouteNotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
