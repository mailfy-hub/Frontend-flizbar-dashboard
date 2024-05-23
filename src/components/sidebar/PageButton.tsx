import { Icon, IconifyIcon } from "@iconify/react/dist/iconify.js";
import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface PageButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: string | IconifyIcon;
  pageName: string;
  isActive?: boolean;
  link: string;
}

export const PageButton = ({
  pageName,
  icon,
  link,
  isActive = false,
  ...props
}: PageButtonProps) => {
  return (
    <Link
      {...props}
      to={link}
      className={`hover:bg-GRAY_800 transition-all w-full flex items-center gap-4 h-12 px-6 ${
        isActive ? "text-GOLD_WHITE bg-GRAY_800" : "text-GRAY_500"
      } font-display font-medium text-body16`}
    >
      <Icon color={isActive ? "#C89305" : "#616161"} icon={icon}></Icon>
      {pageName}
    </Link>
  );
};
