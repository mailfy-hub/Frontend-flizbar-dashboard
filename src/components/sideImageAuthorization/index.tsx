import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Logo } from "../logo";

export const SideImageAuthorization = () => {
  return (
    <>
      <div className="hidden md:flex p-12 flex-col justify-between h-screen w-full max-w-[560px] bg-auth-side-image ">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1">
            <ChevronLeftIcon className="size-4 text-WHITE" />
            <a
              href="https://flizbar.com/"
              className="text-white font-normal text-sm14 font-body"
            >
              Voltar ao site
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-display text-head32 text-white font-normal">
            Faça seu login e visualize <br /> seus rendimentos.
          </h3>
        </div>
      </div>
    </>
  );
};
