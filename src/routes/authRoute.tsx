import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";

export const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={location} />;
  }
};
