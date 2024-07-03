import { Route, Routes as RoutesRRD } from "react-router-dom";
import { useAuth } from "../hook/auth";
import { RecoveryAccount } from "../pages/Auth/RecoveryAccount";
import { Login } from "../pages/Auth/login";
import { SignUp } from "../pages/Auth/signUp";
import { Layout } from "../pages/Dashboard/layout";
import { LayoutNotInteractive } from "../pages/Dashboard/layoutNotInteractive";
import { NotFound } from "../pages/Utils/404";
import { Unathorized } from "../pages/Utils/unathorized";
import { generateRoutesByRole } from "../utils/route-role-export";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthRoute } from "./authRoute";
import { IsAuthenticatedBlock } from "./isAuthenticatedBlock";

export const Routes = () => {
  const { userData } = useAuth();
  const routesUserRole = userData && generateRoutesByRole(userData.isAdmin);

  return (
    <RoutesRRD>
      <Route element={<AuthRoute />}>
        <Route path="unathorized" element={<Unathorized />} />

        {routesUserRole &&
          routesUserRole.map((route) => {
            if (!!route.isOutletRoute) return;
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

        <Route element={<LayoutNotInteractive />}>
          {routesUserRole &&
            routesUserRole.map(
              (route) =>
                route.blockSidebarInteractivity && (
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
                )
            )}
        </Route>

        <Route element={<ProtectedRoute />}>
          {routesUserRole &&
            routesUserRole.map((route) => {
              if (!!route.isOutletRoute) return;
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
          {routesUserRole &&
            routesUserRole.map((route) => {
              if (route.isOutletRoute)
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
          <Route element={<ProtectedRoute isAdmin={true} />}>
            {routesUserRole &&
              routesUserRole.map((route) => {
                if (route.isOutletRoute)
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

      <Route path="*" element={<NotFound />} />
    </RoutesRRD>
  );
};
