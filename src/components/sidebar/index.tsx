import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RoutesMapped } from "../../utils/route-config";
import { Logo } from "../logo";
import { PageButton } from "./PageButton";

export const SidebarLayout = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>("");

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  return (
    <div className="hidden md:block max-w-[280px] w-full h-screen">
      <div className="max-w-[280px] w-full bg-BLACK h-screen flex flex-col overflow-auto fixed left-0 top-0">
        <div className="h-[72px] w-full flex items-center px-6 ">
          <div className="h-8">
            <Logo />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <nav className="h-auto pt-5 overflow-auto">
            {RoutesMapped.map((route) => {
              return (
                <PageButton
                  key={route.route}
                  pageName={route.name}
                  icon={route.icon}
                  isActive={route.route === activeRoute}
                  link={route.route}
                />
              );
            })}
          </nav>
          <button className="hover:opacity-65 transition-all flex items-center gap-4 px-6 h-[72px] bg-GRAY_800 text-GRAY_500 font-display font-medium text-body16 w-full z-10 mt-6">
            <Icon
              color="#616161"
              icon={"heroicons:arrow-left-end-on-rectangle"}
            ></Icon>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
