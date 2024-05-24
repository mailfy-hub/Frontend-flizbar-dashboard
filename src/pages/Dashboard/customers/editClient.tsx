import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Option, Select, Button } from "@material-tailwind/react";
import { useState } from "react";
import { SectionTitle } from "../../../components/sectionTitle";

export const EditClient = () => {
  const [documentType, setDocumentType] = useState<"pf" | "pj">("pf");
  const handleDocumentType = (docType: string) => {
    if (docType === "pf" || docType === "pj") setDocumentType(docType);
  };

  return (
    <form className="">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados de acesso" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="email" label="E-mail de acesso" />
          </div>
        </div>
      </div>
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
              <Select label="Sexo">
                <Option>Masculino</Option>
                <Option>Feminino</Option>
                <Option>Prefiro não declarar</Option>
              </Select>
            )}
          </div>
        </div>
      </div>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:map-pin"} color="black" />
          <SectionTitle size="sm" text="Endereço" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Tipo do endereço">
              <Option>1</Option>
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
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user-circle"} color="black" />
          <SectionTitle size="sm" text="Contato" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-3 gap-6">
            <Select label="Tipo do contato">
              <Option>1</Option>
            </Select>
            <Input type="email" label="Nome" />
            <Input type="email" label="Contato" />
          </div>
          <Button className="bg-GRAY_100 w-full md:w-auto text-GRAY_400">
            Novo contato
          </Button>
        </div>
      </div>
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
            <Select label="Estado civil">
              <Option>1</Option>
            </Select>
            <Select label="Escolaridade">
              <Option>1</Option>
            </Select>
            <Input type="text" label="É pessoa politicamente exposta?" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input type="text" label="Qual sua profissão?" />
            <Select label="Declara imposto ao governo dos EUA?">
              <Option>1</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:banknotes"} color="black" />
          <SectionTitle size="sm" text="Dados bancários" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Tipo da conta">
              <Option>1</Option>
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
              <Option>1</Option>
            </Select>
            <Input type="text" label="Chave PIX" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button className="bg-GOLD_MAIN w-full md:w-auto">
          Atualizar dados
        </Button>
      </div>
    </form>
  );
};
