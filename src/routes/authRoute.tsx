import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";
import { Loading } from "../pages/Utils/loading";

export const AuthRoute = () => {
  const { isAuthenticated, isLoadingData } = useAuth();
  const location = useLocation();

  if (isLoadingData) return <Loading />;

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={location} />;
  }
};
