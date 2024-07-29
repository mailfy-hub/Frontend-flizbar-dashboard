import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";

export const ContribuitionInsert = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

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
            <Icon height={16} icon={"radix-icons:dashboard"} color="black" />
            <SectionTitle size="sm" text="Aporte" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="date" label="Data do aporte" />
              {userData?.isAdmin && (
                <Select label="Cliente">
                  <option value=""></option>
                </Select>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Carteira">
                <option value=""></option>
              </Select>
              <Input type="number" label="Valor do aporte" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Valor da cotação do dolar"
                value={5.12}
              />
              <Select label="Status">
                M<Option>Pendente</Option>
                M<Option>Aprovado</Option>
                M<Option>Concluído</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            Adicionar Aporte
          </Button>
        </div>
      </form>
    </div>
  );
};

