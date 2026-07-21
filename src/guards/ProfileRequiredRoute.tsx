import React from "react";
import { Navigate } from "react-router-dom";
import { useMarginalia } from "../context/MarginaliaContext";

interface ProfileRequiredRouteProps {
  children: React.ReactNode;
}

export const ProfileRequiredRoute: React.FC<ProfileRequiredRouteProps> = ({ children }) => {
  const { userProfile } = useMarginalia();

  if (!userProfile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
