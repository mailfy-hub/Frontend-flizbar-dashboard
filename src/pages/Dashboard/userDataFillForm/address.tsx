import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

export const Address = ({ handleConfirmationClick }: FormStepType) => {
  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:map-pin"} color="black" />
          <SectionTitle size="sm" text="Endereço" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Tipo do endereço">
              <Option>Residencial</Option>
              <Option>Comercial</Option>
              <Option>Outro</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Input type="text" label="Cep" />
            <Input type="text" label="Cidade" />
            <Select label="Estado">
              <Option>1</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Input type="text" label="Logradouro" />
            <Input type="text" label="Número" />
            <Input type="text" label="Bairro" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Complemento" />
            <Input type="text" label="Referência" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={() => {
            handleConfirmationClick(2);
          }}
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
        >
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
