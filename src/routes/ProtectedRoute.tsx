import { Navigate, Outlet, useLocation } from "react-router-dom";
import { roleAccessType, useAuth } from "../hook/auth";

interface ProtectedRouteProps {
  availableToRole?: roleAccessType;
  children?: React.ReactNode;
}
export const ProtectedRoute = ({
  availableToRole = "all",
}: ProtectedRouteProps) => {
  const { userData, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to={"/login"} state={location} />;

  if (availableToRole == userData?.role || availableToRole == "all") {
    console.log(availableToRole, userData?.role);
    return <Outlet />;
  } else {
    return <Navigate to={"/unathorized"} state={location} />;
  }
};
