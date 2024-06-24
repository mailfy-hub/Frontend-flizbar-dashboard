import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { FormStepType } from ".";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { SectionTitle } from "../../../components/sectionTitle";
import { CountryType, countries } from "../../../utils/number-config";

export const GenerateData = ({ handleConfirmationClick }: FormStepType) => {
  const [documentType, setDocumentType] = useState<"pf" | "pj">("pf");
  const handleDocumentType = (docType: string) => {
    if (docType === "pf" || docType === "pj") setDocumentType(docType);
  };

  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );
  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados gerais" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              value={documentType}
              onChange={(val) => val && handleDocumentType(val)}
              label="Tipo de pessoa"
            >
              <Option value="pf">Física</Option>
              <Option value="pj">Jurídica</Option>
            </Select>
            {documentType == "pf" ? (
              <Input type="text" label="Nome" />
            ) : (
              <Input type="text" label="Razão social" />
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {documentType == "pf" && (
              <Input type="date" label="Date de nascimento" />
            )}
            <Select label="Nacionalidade">
              <Option>Brasileiro</Option>
              <Option>Outra</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Tipo do documento">
              <Option>Inscrição estadual</Option>
              <Option>Carteira de habilitação</Option>
              <Option>Passaporte</Option>
            </Select>
            <Input type="text" label="Número do documento" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {documentType == "pf" && (
              <Select label="Gênero">
                <Option>Masculino</Option>
                <Option>Feminino</Option>
                <Option>Prefiro não declarar</Option>
              </Select>
            )}
            <InputWithDropdown handleChangeCountry={handleSelectedCountry} selectedCountry={selectedCountry} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
      <Button
        onClick={() => {
          handleConfirmationClick(1);
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
