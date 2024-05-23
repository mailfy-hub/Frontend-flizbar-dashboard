import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";

export const QuotesInsert = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Preencha o formulário de inclusão" />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:chart-bar"} color="black" />
            <SectionTitle size="sm" text="Cotação" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="date" label="Data da cotação" />
            </div>
          </div>
          <div className="mt-6">
            <SectionTitle size="sm" text="Insira os dados das cotações" />
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Input type="number" label="Dólar ($)" />
              <Input type="number" label="Euro (€)" />
              <Input type="number" label="Yene (¥)" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            Adicionar Cotação
          </Button>
        </div>
      </form>
    </div>
  );
};
