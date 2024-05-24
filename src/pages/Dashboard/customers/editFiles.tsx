import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@material-tailwind/react";
import { SectionTitle } from "../../../components/sectionTitle";

export const EditFiles = () => {
  return (
    <form className="mt-12">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:clipboard"} color="black" />
          <SectionTitle size="sm" text="Anexos do cliente" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <p className="font-body font-normal text-body16 text-GRAY_400">
            Esse cliente não possui nenhum anexo
          </p>
        </div>
        <Button className="bg-GOLD_MAIN w-full md:w-auto mt-8">
          Adicionar novo anexo
        </Button>
      </div>
    </form>
  );
};
