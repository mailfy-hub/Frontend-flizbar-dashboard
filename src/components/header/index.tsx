import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hook/auth";
import { routesMapped } from "../../utils/route-config";
import { Logo } from "../logo";
import { PageButton } from "../sidebar/PageButton";

const profileMenuItems = [
  {
    label: "Meu perfil",
    icon: UserCircleIcon,
    link: "/my-account",
  },
  /*   {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  }, */
];

export interface ActiveRouteProps {
  name: string;
  icon: string;
  path: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();
  const { userData, logout } = useAuth();
  const [activeRoute, setActiveRoute] = useState<ActiveRouteProps | null>(
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

  const [isMobMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenu = () => {
    setIsMobileMenuOpen((state) => !state);
  };

  const handleLogout = () => {
    logout();
  };
  const handleChangePage = () => {
    handleMobileMenu();
  };

  return (
    <div className="h-[72px] w-full">
      <header className="md:bg-GRAY_100 bg-BLACK h-[72px] w-full p-4 md:px-12 flex items-center justify-between fixed md:static top-0 z-40">
        <AnimatePresence>
          <div className="hidden md:block">
            {activeRoute ? (
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                transition={{
                  type: "ease",
                  duration: 0.45,
                  delay: 0,
                }}
                className="flex items-center gap-2"
              >
                <Icon color={"#0C0B0A"} icon={activeRoute.icon} />
                <p className="font-body font-medium text-body16 text-black">
                  {activeRoute.name}
                </p>
              </motion.div>
            ) : (
              <div></div>
            )}
          </div>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{
              type: "ease",
              duration: 0.45,
              delay: 0,
            }}
            className="flex items-center gap-2 md:hidden"
          >
            <Logo />
          </motion.div>
        </AnimatePresence>
        <div className="hidden md:block">
          <Menu
            open={isMenuOpen}
            handler={setIsMenuOpen}
            placement="bottom-end"
          >
            <MenuHandler>
              <Button
                variant="text"
                color="gray"
                className="flex items-center gap-4 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    src="https://avatars.githubusercontent.com/u/92546209?v=4"
                  />
                  <div>
                    <p className="font-display font-semibold text-body14 text-BLACK no-underline capitalize text-left">
                      Marlon Lencina
                    </p>
                    <span className="font-body font-normal text-sm12 text-GRAY_400  no-underline lowercase text-left">
                      marlon@mailfy.com
                    </span>
                  </div>
                </div>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1">
              {profileMenuItems.map(({ label, icon, link }, _) => {
                return (
                  <MenuItem key={label} onClick={closeMenu}>
                    <Link className="flex items-center gap-2 rounded" to={link}>
                      {React.createElement(icon, {
                        className: "h-4 w-4",
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                      >
                        {label}
                      </Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </div>
        <div className="block md:hidden">
          <button
            onClick={handleMobileMenu}
            className="grid place-content-center"
          >
            {isMobMenuOpen ? (
              <Icon
                height={18}
                color="#ffffff"
                icon={"heroicons:x-mark-16-solid"}
              />
            ) : (
              <Icon height={18} color="#ffffff" icon={"heroicons:bars-3"} />
            )}
          </button>
          {isMobMenuOpen && (
            <nav className="bg-BLACK flex flex-col w-full h-screen fixed top-[72px] left-0 z-[9999999] overflow-x-scroll pb-12">
              <div>
                <div>
                  {routesMapped.map(
                    ({ icon, name, path, roleAccess, addToSidebar }) => {
                      if (userData && addToSidebar) {
                        if (
                          roleAccess.includes(userData?.role) ||
                          roleAccess.includes("all")
                        ) {
                          return (
                            <PageButton
                              onClick={handleChangePage}
                              key={path}
                              pageName={name}
                              icon={icon ? icon : "heroicons:circle-stack"}
                              isActive={path === activeRoute?.path}
                              link={path}
                            />
                          );
                        }
                      }
                    }
                  )}
                </div>
                <Link
                  onClick={handleChangePage}
                  to={"/my-account"}
                  className="mx-4 bg-GRAY_800 p-6 rounded-lg flex items-center gap-2 mt-4"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    src="https://avatars.githubusercontent.com/u/92546209?v=4"
                  />
                  <div>
                    <p className="font-display font-semibold text-body14 text-WHITE no-underline capitalize text-left">
                      Marlon Lencina
                    </p>
                    <span className="font-body font-normal text-sm12 text-WHITE  no-underline lowercase text-left">
                      marlon@mailfy.com
                    </span>
                  </div>
                </Link>
              </div>

              <button
                onClick={handleLogout}
                className="hover:opacity-65 transition-all flex items-center gap-4 px-6 h-[72px] bg-GRAY_800 text-GRAY_500 font-display font-medium text-body16 z-10 mt-6 w-full"
              >
                <Icon
                  color="#616161"
                  icon={"heroicons:arrow-left-end-on-rectangle"}
                ></Icon>
                Logout
              </button>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};
