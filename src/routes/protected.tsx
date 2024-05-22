import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";

const ProtectedRoutes = () => {
  let location = useLocation();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
