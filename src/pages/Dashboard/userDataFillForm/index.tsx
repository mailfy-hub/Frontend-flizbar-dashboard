import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { SectionTitle } from "../../../components/sectionTitle";

type contact = {
  index: number;
  name: string;
  contact: string;
};

type MaritalStatus =
  | "Solteiro(a)"
  | "Casado(a)"
  | "Divorciado(a)"
  | "Viúvo(a)"
  | "União Estável"
  | "Outro";

export const UserDataProfile = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const [documentType, setDocumentType] = useState<"pf" | "pj">("pf");
  const handleDocumentType = (docType: string) => {
    if (docType === "pf" || docType === "pj") setDocumentType(docType);
  };

  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState<MaritalStatus>("Solteiro(a)"); // Initial state

  const handleMaritalStatusChange = (val: MaritalStatus) => {
    setSelectedMaritalStatus(val);
  };

  const [contactsList, setContactsList] = useState<contact[]>([
    {
      index: 1,
      name: "",
      contact: "",
    },
  ]);

  const handleNewContact = () => {
    const newContact = {
      index: contactsList.length + 1,
      name: "",
      contact: "",
    };

    setContactsList((state) => [newContact, ...state]);
  };
  const handleRemoveContact = (idx: number) => {
    const contactsFiltered = contactsList.filter(
      (contact) => contact.index !== idx
    );
    setContactsList(contactsFiltered);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionTitle text="Seus dados da conta" />
      </div>

      <form className="mt-12">
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
              <InputWithDropdown />
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
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user-circle"} color="black" />
            <SectionTitle size="sm" text="Contato" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid gap-6">
              {contactsList.map((contact) => {
                return (
                  <div className="flex items-center gap-6">
                    <Input type="email" label="Nome" />
                    <Input type="email" label="Número de Telefone" />
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveContact(contact.index);
                      }}
                      className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                    >
                      Remover
                    </button>
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              onClick={handleNewContact}
              className="bg-GRAY_100 w-full md:w-auto text-GRAY_400"
            >
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
            {selectedMaritalStatus === "União Estável" && (
              <div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Nome do cônjuge" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Select label="Tipo do documento" className="w-full mt-2">
                    <Option value="Inscrição estadual">
                      Inscrição estadual
                    </Option>
                    <Option value="Carteira de habilitação">
                      Carteira de habilitação
                    </Option>
                    <Option value="Passaporte">Passaporte</Option>
                  </Select>
                  <Input label="Número do documento" className="w-full mt-2" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            onClick={handleNavigate}
            className="bg-GOLD_MAIN w-full md:w-auto"
          >
            Atualizar cadastro
          </Button>
        </div>
      </form>
    </div>
  );
};
