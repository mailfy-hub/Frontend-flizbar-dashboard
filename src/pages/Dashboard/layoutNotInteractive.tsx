import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ActiveRouteProps, Header } from "../../components/header";
import {} from "../../components/lineChart";
import { SidebarLayout } from "../../components/sidebar";
import { routesMapped } from "../../utils/route-config";
import { Loading } from "../Utils/loading";

export const LayoutNotInteractive = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const [_, setActiveRoute] = useState<ActiveRouteProps | null>(
    {} as ActiveRouteProps
  );

  const getPageInfo = (route: string) => {
    const foundRoute = routesMapped
      .filter((r) => route.startsWith(r.path))
      .sort((a, b) => b.path.length - a.path.length)[0];

    if (foundRoute) {
      setActiveRoute({
        name: foundRoute.name,
        icon: foundRoute.icon ? foundRoute.icon : "heroicons:circle-stack",
        path: foundRoute.path,
      });
    } else {
      setActiveRoute(null);
    }
  };

  useEffect(() => {
    getPageInfo(location.pathname);
  }, [location]);

  useEffect(() => {
    const time = 1250;
    const mockTimeout = setTimeout(() => {
      setIsLoading(false);
    }, time);
    return () => {
      clearTimeout(mockTimeout);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full h-full bg-GRAY_100 flex relative">
        <SidebarLayout isBlocked />
        <div className="w-full overflow-auto">
          <Header isBlocked />
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{
              type: "ease",
              duration: 0.45,
            }}
            className="px-4 py-12 md:p-12 w-full h-auto"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </>
  );
};
