import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";

interface ProtectedRouteProps {
  isAdmin?: boolean | "all";
  children?: React.ReactNode;
}
export const ProtectedRoute = ({
  isAdmin = "all",
}: ProtectedRouteProps) => {
  const { profile, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to={"/login"} state={location} />;

  if (isAdmin == profile?.user?.isAdmin || isAdmin == "all") {
    return <Outlet />;
  } else {
    return <Navigate to={"/unathorized"} state={location} />;
  }
};
