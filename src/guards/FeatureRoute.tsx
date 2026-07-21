import React from "react";
import { Navigate } from "react-router-dom";
import { isFeatureEnabled, FeatureFlag } from "../config/featureFlags";

interface FeatureRouteProps {
  flag: FeatureFlag;
  children: React.ReactNode;
}

export const FeatureRoute: React.FC<FeatureRouteProps> = ({ flag, children }) => {
  if (!isFeatureEnabled(flag)) {
    return <Navigate to="/margens" replace />;
  }

  return <>{children}</>;
};
