import React from "react";
import { isFeatureEnabled, FeatureFlag } from "../config/featureFlags";
import { RouteNotFound } from "./feedback/RouteNotFound";

interface FeatureRouteProps {
  flag: FeatureFlag;
  children: React.ReactElement;
}

export const FeatureRoute: React.FC<FeatureRouteProps> = ({ flag, children }) => {
  if (!isFeatureEnabled(flag)) {
    return <RouteNotFound />;
  }
  return children;
};

export default FeatureRoute;
