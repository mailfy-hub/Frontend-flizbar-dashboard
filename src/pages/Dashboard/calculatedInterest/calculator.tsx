import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { SectionTitle } from "../../../components/sectionTitle";

export const Calculator = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionTitle text="Sua calculadora" />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:circle-stack"} color="black" />
            <SectionTitle size="sm" text="Calculadora de juros" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="number" label="Valor inicial" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="number" label="Valor mensal" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="number" label="Quantidade de anos" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            Realizar cálculo de juros
          </Button>
        </div>
      </form>
    </div>
  );
};
