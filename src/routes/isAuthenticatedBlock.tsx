import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";

export const IsAuthenticatedBlock = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={"/"} state={location} />;
  } else {
    return <Outlet/>
  }
};
