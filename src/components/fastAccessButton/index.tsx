import { Icon, IconifyIcon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

interface FastAccessButtonProps {
  icon: string | IconifyIcon;
  pageName: string;
  link?: string;
}


export const FastAccessButton = ({
  icon,
  pageName,
  link = "/",
}: FastAccessButtonProps) => {
  return (
    <Link
      to={link}
      className="bg-GOLD_MAIN h-[124px] w-full rounded-lg p-6 flex flex-col justify-between transition-all group cursor-pointer opacity-95 "
    >
      <div className="group-hover:opacity-100 opacity-65 transition-all">
        <Icon height={16} color="#ffffff" icon={icon} />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-display font-medium text-body16 text-white">
          {pageName}
        </p>
        <Icon
          height={16}
          color="#ffffff"
          icon={"heroicons:chevron-right-16-solid"}
        />
      </div>
    </Link>
  );
};
