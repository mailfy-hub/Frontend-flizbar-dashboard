import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

export const BankData = ({ handleConfirmationClick }: FormStepType) => {
  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:banknotes"} color="black" />
          <SectionTitle size="sm" text="Dados bancários" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Tipo da conta">
              <Option>Conta corrente</Option>
              <Option>Conta conjunta</Option>
              <Option>Conta poupança</Option>
              <Option>Outra</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Nome do banco" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Número da conta" />
            <Input type="text" label="Dígito da conta" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Número da agência" />
            <Input type="text" label="Dígito da agência" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Tipo da chave PIX">
              <Option>Chave e-mail</Option>
              <Option>Chave número de telefone</Option>
              <Option>Chave CPF</Option>
              <Option>Chave CNPJ</Option>
              <Option>Chave aleatória</Option>
            </Select>
            <Input type="text" label="Chave PIX" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={() => {
            handleConfirmationClick(5);
          }}
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
        >
          Finalizar cadastro
        </Button>
      </div>
    </form>
  );
};
