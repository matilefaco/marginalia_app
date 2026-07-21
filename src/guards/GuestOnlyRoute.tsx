import React from "react";
import { Navigate } from "react-router-dom";
import { useMarginalia } from "../context/MarginaliaContext";

interface GuestOnlyRouteProps {
  children: React.ReactNode;
}

export const GuestOnlyRoute: React.FC<GuestOnlyRouteProps> = ({ children }) => {
  const { userProfile } = useMarginalia();

  if (userProfile) {
    return <Navigate to="/margens" replace />;
  }

  return <>{children}</>;
};
