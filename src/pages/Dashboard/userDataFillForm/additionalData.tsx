import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

type MaritalStatus =
  | "Solteiro(a)"
  | "Casado(a)"
  | "Divorciado(a)"
  | "Viúvo(a)"
  | "União Estável"
  | "Outro";

export const AdditionalData = ({ handleConfirmationClick }: FormStepType) => {
  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState<MaritalStatus>("Solteiro(a)"); // Initial state

  const handleMaritalStatusChange = (val: MaritalStatus) => {
    setSelectedMaritalStatus(val);
  };
  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados complementares" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Nome do pai" />
            <Input type="text" label="Nome da mãe" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Select
              value={selectedMaritalStatus}
              onChange={(val) =>
                val && handleMaritalStatusChange(val as MaritalStatus)
              }
              label="Estado civil"
            >
              <Option value="Solteiro(a)">Solteiro(a)</Option>
              <Option value="Casado(a)">Casado(a)</Option>
              <Option value="Divorciado(a)">Divorciado(a)</Option>
              <Option value="Viúvo(a)">Viúvo(a)</Option>
              <Option value="União Estável">União Estável</Option>
              <Option value="Outro">Outro</Option>
            </Select>
            <Select label="Escolaridade">
              <Option>Ensino Médio incompleto</Option>
              <Option>Ensino médio completo</Option>
              <Option>Nível Técnico</Option>
              <Option>Superior Incompleto</Option>
              <Option>Superior Completo</Option>
              <Option>Pós graduação</Option>
              <Option>Mestrado</Option>
              <Option>Doutorado</Option>
              <Option>Outro</Option>
            </Select>
            <Select label="É pessoa politicamente exposta?">
              <Option>Sim</Option>
              <Option>Não</Option>
            </Select>{" "}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Qual sua profissão?" />
            <Select label="Declara imposto ao governo dos EUA?">
              <Option>Sim</Option>
              <Option>Não</Option>
            </Select>
          </div>
          {selectedMaritalStatus == "União Estável" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Nome do cônjuge" />
            </div>
          )}
          {selectedMaritalStatus == "União Estável" && (
            <div className="grid md:grid-cols-2 gap-6">
              <Select label="Tipo do documento" className="w-full">
                <Option value="Inscrição estadual">Inscrição estadual</Option>
                <Option value="Carteira de habilitação">
                  Carteira de habilitação
                </Option>
                <Option value="Passaporte">Passaporte</Option>
              </Select>
              <Input label="Número do documento" className="w-full" />
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={() => {
            handleConfirmationClick(4);
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
