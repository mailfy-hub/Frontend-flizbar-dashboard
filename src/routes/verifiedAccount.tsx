import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";

export const VerifiedAccountCheck = () => {
  const { isAuthenticated, userData, isFullfiledAccountInfo } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    // Check if the user is an admin
    if (userData?.isAdmin!) {
      return <Outlet />;
    }

    // Check if the user has fulfilled their account information
    if (isFullfiledAccountInfo) {
      return <Outlet />;
    }

    // Redirect to the form if account information is incomplete
    return <Navigate to="/fullfill-user-form" state={{ from: location }} />;
  }
};
