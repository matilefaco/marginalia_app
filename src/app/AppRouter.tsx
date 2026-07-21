import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { ProfileRequiredRoute } from "../guards/ProfileRequiredRoute";
import { GuestOnlyRoute } from "../guards/GuestOnlyRoute";

import { MargensPage } from "../pages/MargensPage";
import { EcosPage } from "../pages/EcosPage";
import { ProfilePage } from "../pages/ProfilePage";

import { useMarginalia } from "../context/MarginaliaContext";
import { PageLoading } from "../components/feedback/PageLoading";
import { RouteErrorBoundary } from "../components/feedback/RouteErrorBoundary";
import { RouteNotFound } from "../components/feedback/RouteNotFound";
import { FeatureRoute } from "../components/FeatureRoute";
import { isFeatureEnabled } from "../config/featureFlags";

// Lazy-loaded pages to optimize initial bundle size
const OnboardingPage = lazy(() => 
  import("../pages/OnboardingPage").then(m => ({ default: m.OnboardingPage }))
);
const NewMargemPage = lazy(() => 
  import("../pages/NewMargemPage").then(m => ({ default: m.NewMargemPage }))
);
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

// Conditionally lazy import only in DEV mode for tree-shaking in production
const IconShowcasePage = import.meta.env.DEV
  ? lazy(() => import("../pages/IconShowcasePage").then(m => ({ default: m.IconShowcasePage })))
  : null;

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
            <RouteErrorBoundary>
              <GuestOnlyRoute>
                <Suspense fallback={<PageLoading />}>
                  <OnboardingPage />
                </Suspense>
              </GuestOnlyRoute>
            </RouteErrorBoundary>
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
          {/* Protected core/central routes wrapped individually in ErrorBoundaries */}
          <Route 
            path="/margens" 
            element={
              <RouteErrorBoundary>
                <MargensPage />
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/margens/nova" 
            element={
              <RouteErrorBoundary>
                <FeatureRoute flag="createMargin">
                  <Suspense fallback={<PageLoading />}>
                    <NewMargemPage />
                  </Suspense>
                </FeatureRoute>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/ecos" 
            element={
              <RouteErrorBoundary>
                <EcosPage />
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/ecos/:ecoId" 
            element={
              <RouteErrorBoundary>
                <EcosPage />
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <RouteErrorBoundary>
                <ProfilePage />
              </RouteErrorBoundary>
            } 
          />

          {/* Lazily loaded pages, each isolated with a Suspense fallback and ErrorBoundary */}
          <Route 
            path="/descobrir" 
            element={
              <RouteErrorBoundary>
                <FeatureRoute flag="editorialDiscovery">
                  <Suspense fallback={<PageLoading />}>
                    <DiscoveryPage />
                  </Suspense>
                </FeatureRoute>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/companheira" 
            element={
              <RouteErrorBoundary>
                <FeatureRoute flag="companion">
                  <Suspense fallback={<PageLoading />}>
                    <CompanionPage />
                  </Suspense>
                </FeatureRoute>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil/aura" 
            element={
              <RouteErrorBoundary>
                <FeatureRoute flag="aura">
                  <Suspense fallback={<PageLoading />}>
                    <LiteraryAuraPage />
                  </Suspense>
                </FeatureRoute>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil/mapa-da-alma" 
            element={
              <RouteErrorBoundary>
                <FeatureRoute flag="soulMap">
                  <Suspense fallback={<PageLoading />}>
                    <SoulMapPage />
                  </Suspense>
                </FeatureRoute>
              </RouteErrorBoundary>
            } 
          />
          <Route 
            path="/perfil/retrospectiva" 
            element={
              <RouteErrorBoundary>
                <FeatureRoute flag="wrapped">
                  <Suspense fallback={<PageLoading />}>
                    <WrappedPage />
                  </Suspense>
                </FeatureRoute>
              </RouteErrorBoundary>
            } 
          />

          {/* Icon System Showcase only registered in Development with the feature flag active */}
          {import.meta.env.DEV && isFeatureEnabled("internalIconShowcase") && IconShowcasePage && (
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
          )}
        </Route>

        {/* Canonical Redirects */}
        <Route path="/descobertas" element={<Navigate to="/descobrir" replace />} />
        <Route path="/companion" element={<Navigate to="/companheira" replace />} />
        
        {/* Dynamic Simbolos redirect only in DEV with showcase enabled */}
        {import.meta.env.DEV && isFeatureEnabled("internalIconShowcase") && (
          <Route path="/simbolos" element={<Navigate to="/__internal/icon-system" replace />} />
        )}

        {/* Fallback routes and redirects */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<RouteNotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
