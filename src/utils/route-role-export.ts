import { routeMapped, RoutesMapped } from "./route-config";

export const generateRoutesByRole = (
  userIsAdmin: boolean,
): routeMapped[] => {
  const routes = RoutesMapped().filter((route) => {
    if (userIsAdmin == route.isAdmin || route.isAdmin == "all") {
      return route;
    }
  });

  return routes;
};
9