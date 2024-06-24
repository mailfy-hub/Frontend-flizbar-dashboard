import { routeMapped, routesMapped } from "./route-config";

export const generateRoutesByRole = (
  userIsAdmin: boolean,
): routeMapped[] => {
  const routes = routesMapped.filter((route) => {
    if (userIsAdmin == route.isAdmin || route.isAdmin == "all") {
      return route;
    }
  });

  return routes;
};
