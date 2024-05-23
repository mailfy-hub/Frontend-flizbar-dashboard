import { Logo } from "../logo";

export const HeaderMobile = () => {
  return (
    <div className="bg-GRAY_800 w-full h-[72px] flex items-center px-4 md:hidden">
      <Logo />
    </div>
  );
};
