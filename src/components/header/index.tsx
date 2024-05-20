import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
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
import { useLocation } from "react-router-dom";
import { RoutesMapped } from "../../utils/route-config";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
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
  },
];

export interface ActiveRouteProps {
  name: string;
  icon: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<ActiveRouteProps | null>(
    {} as ActiveRouteProps
  );

  const getPageInfo = (route: string) => {
    const foundRoute = RoutesMapped.filter((r) =>
      route.startsWith(r.route)
    ).sort((a, b) => b.route.length - a.route.length)[0];

    if (foundRoute) {
      setActiveRoute({ name: foundRoute.name, icon: foundRoute.icon });
    } else {
      setActiveRoute(null);
    }
  };

  useEffect(() => {
    getPageInfo(location.pathname);
  }, [location]);

  return (
    <header className="bg-GRAY_100 h-[72px] w-full px-12 flex items-center justify-between">
      <AnimatePresence>
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
      </AnimatePresence>
      <div>
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
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
            {profileMenuItems.map(({ label, icon }, _) => {
              return (
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded"
                >
                  {React.createElement(icon, {
                    className: "h-4 w-4",
                    strokeWidth: 2,
                  })}
                  <Typography as="span" variant="small" className="font-normal">
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};
