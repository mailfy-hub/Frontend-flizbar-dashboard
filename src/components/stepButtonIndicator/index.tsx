import { Icon } from "@iconify/react/dist/iconify.js";
import { IconifyIcon } from "iconify-icon/dist/iconify-icon.js";

interface StepButtonIndicatorType {
  name: string;
  icon: string | IconifyIcon;
  isStepActive: boolean;
  handleStepClick: (position: number) => void;
  position: number;
  isStepFilled: boolean;
}

export const StepButtonIndicator = ({
  name,
  isStepActive,
  icon,
  handleStepClick,
  position,
  isStepFilled,
}: StepButtonIndicatorType) => {
  return (
    <button
      onClick={() => handleStepClick(position)}
      className="flex items-center gap-2"
    >
      <div
        className={`
         shrink-0 h-8 w-8 rounded-full  grid place-content-center transition-all 
        ${
          isStepActive
            ? "bg-GOLD_DARK"
            : isStepFilled
            ? "bg-EMERALD_500 cursor-not-allowed opacity-65"
            : "bg-gray-300"
        }
        `}
      >
        <Icon
          icon={icon}
          height={16}
          color={isStepActive || isStepFilled ? "#FFFFFF" : "#757575"}
        />
      </div>
      <p
        className={`text-body14  font-body text-nowrap ${
          isStepActive ? "text-BLACK font-medium" : "text-GRAY_400 font-normal"
        }`}
      >
        {name}
      </p>
    </button>
  );
};
