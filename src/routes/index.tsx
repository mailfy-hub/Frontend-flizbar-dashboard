import { Route, Routes as RoutesRRD } from "react-router-dom";
import { RecoveryAccount } from "../pages/Auth/RecoveryAccount";
import { Login } from "../pages/Auth/login";
import { SignUp } from "../pages/Auth/signUp";
import { Layout } from "../pages/Dashboard/layout";
import { Unathorized } from "../pages/Utils/unathorized";
import { routesMapped } from "../utils/route-config";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthRoute } from "./authRoute";
import { IsAuthenticatedBlock } from "./isAuthenticatedBlock";

export const Routes = () => {
  return (
    <RoutesRRD>
      <Route element={<AuthRoute />}>
        <Route path="unathorized" element={<Unathorized />} />

        {routesMapped.map((route) => {
          if (!!route.isOutletRoute) return;
          if (
            route.roleAccess.includes("all") ||
            (route.roleAccess.includes("user") && !route.isOutletRoute)
          )
            return (
              <Route key={route.path} path={route.path}>
                <Route index element={route.element} />
                {route.subRoutes.map((sub) => {
                  return (
                    <Route
                      key={`${route.path}/${sub.path}`}
                      element={sub.element}
                      path={sub.path}
                    />
                  );
                })}
              </Route>
            );
        })}

        <Route element={<ProtectedRoute />}>
          {routesMapped.map((route) => {
            if (!!route.isOutletRoute) return;
            if (route.roleAccess.includes("admin") && !route.isOutletRoute)
              return (
                <Route key={route.path} path={route.path}>
                  <Route index element={route.element} />
                  {route.subRoutes.map((sub) => {
                    return (
                      <Route
                        key={`${route.path}/${sub.path}`}
                        element={sub.element}
                        path={sub.path}
                      />
                    );
                  })}
                </Route>
              );
          })}
        </Route>

        <Route path="/" element={<Layout />}>
          {routesMapped.map((route) => {
            if (
              route.roleAccess.includes("all") ||
              (route.roleAccess.includes("user") && route.isOutletRoute)
            )
              return (
                <Route key={route.path} path={route.path}>
                  <Route index element={route.element} />
                  {route.subRoutes.map((sub) => {
                    return (
                      <Route
                        key={`${route.path}/${sub.path}`}
                        element={sub.element}
                        path={sub.path}
                      />
                    );
                  })}
                </Route>
              );
          })}
          <Route element={<ProtectedRoute availableToRole="admin" />}>
            {routesMapped.map((route) => {
              if (route.roleAccess.includes("admin") && route.isOutletRoute)
                return (
                  <Route key={route.path} path={route.path}>
                    <Route index element={route.element} />
                    {route.subRoutes.map((sub) => {
                      return (
                        <Route
                          key={`${route.path}/${sub.path}`}
                          element={sub.element}
                          path={sub.path}
                        />
                      );
                    })}
                  </Route>
                );
            })}
          </Route>
        </Route>
      </Route>
      <Route element={<IsAuthenticatedBlock />}>
        <Route path="login">
          <Route index element={<Login />} />
          <Route path="admin" element={<Login />} />
        </Route>
        <Route path="register" element={<SignUp />} />
        <Route path="recovery" element={<RecoveryAccount />} />
      </Route>
    </RoutesRRD>
  );
};
