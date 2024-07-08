import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";
import { ClientContact } from "../../../types/auth";
import { CountryType, countries } from "../../../utils/number-config";
import { updateUser } from "../../../client/users";
import { toast } from "react-toastify";

type MaritalStatus =
  | "Solteiro(a)"
  | "Casado(a)"
  | "Divorciado(a)"
  | "Viúvo(a)"
  | "União Estável"
  | "Outro";

export const InfoClient = () => {
  const { profile, userData } = useAuth();
  const [documentType, setDocumentType] = useState<"pf" | "pj">("pf");
  const handleDocumentType = (docType: string) => {
    if (docType === "pf" || docType === "pj") setDocumentType(docType);
  };

  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState<MaritalStatus>("Solteiro(a)"); // Initial state

  const [dataUser, _] = useState({
    avatar: "",
    createdAt: "",
    deletedAt: "",
    email: "",
    id: "",
    isAdmin: Boolean,
    lastAccess: "",
    name: "",
    password: "",
    phone: "",
    surname: "",
    updatedAt: "",
    username: "",
    verified: Boolean,
    type: "",
  });

  const [updateDataUserAdmin, setUpdateDataUserAdmin] = useState({});

  const handleMaritalStatusChange = (val: MaritalStatus) => {
    setSelectedMaritalStatus(val);
  };

  const [contactsList, setContactsList] = useState<ClientContact[]>(
    profile?.clientContacts ? profile.clientContacts : []
  );

  const handleNewContact = () => {
    const datenow = new Date();
    const newContact: ClientContact = {
      id: datenow.getTime().toString(),
      name: "",
      phone: "",
    };

    setContactsList((state) => [newContact, ...state]);
  };

  const handleRemoveContact = (id: string) => {
    const contactsFiltered = contactsList.filter(
      (contact) => contact.id !== id
    );
    setContactsList(contactsFiltered);
  };

  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );

  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  const handleUpdateUserAdmin = async (e: any) => {
    e.preventDefault();

    if (userData) {
      await updateUser(updateDataUserAdmin, userData.id).then(() => {
        toast("Dados atualizados!", {
          position: "bottom-right",
          type: "success",
        });
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateDataUserAdmin({
      ...updateDataUserAdmin,
      [name]: value,
    });
  };

  return (
    <div>
      {userData?.isAdmin ? (
        <form onSubmit={handleUpdateUserAdmin}>
          <div className="bg-WHITE p-8 w-full rounded-md">
            <div className="flex items-center gap-4">
              <Icon height={16} icon={"heroicons:user"} color="black" />
              <SectionTitle size="sm" text="Dados de acesso" />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  type="email"
                  name="email"
                  label="E-mail de acesso"
                  onChange={handleChange}
                  defaultValue={userData.email}
                />
                <Input
                  value={userData.name}
                  name="name"
                  type="text"
                  label="Nome"
                  onChange={handleChange}
                  defaultValue={userData.name}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="surname"
                  label="Sobrenome"
                  onChange={handleChange}
                  defaultValue={userData.surname}
                />
                <InputWithDropdown
                  name="phone"
                  selectedCountry={selectedCountry}
                  handleChangeCountry={handleSelectedCountry}
                  onChange={handleChange}
                  value={userData.phone || ""}
                />
              </div>
              <div className="w-full">
                <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar dados
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="">
          <form className="bg-WHITE p-8 w-full rounded-md">
            <div className="flex items-center gap-4">
              <Icon height={16} icon={"heroicons:user"} color="black" />
              <SectionTitle size="sm" text="Dados de acesso" />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={userData?.email}
                  type="email"
                  label="E-mail de acesso"
                />
              </div>
              <div className="w-full">
                <Button className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar dados
                </Button>
              </div>
            </div>
          </form>
          <form className="bg-WHITE p-8 w-full rounded-md mt-8">
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
                  <Input
                    value={`${userData?.name} ${userData?.surname}`}
                    type="text"
                    label="Nome"
                  />
                ) : (
                  <Input type="text" label="Razão social" />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {documentType == "pf" && (
                  <Input
                    value={"04/07/2024"}
                    type="text"
                    label="Date de nascimento"
                  />
                )}
                <Select value="Brasileiro" label="Nacionalidade">
                  <Option>Brasileiro</Option>
                  <Option>Outra</Option>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  value={
                    profile?.clientDetails?.documentType
                      ? profile?.clientDetails?.documentType
                      : ""
                  }
                  label="Tipo do documento"
                >
                  <Option>Inscrição estadual</Option>
                  <Option>Carteira de habilitação</Option>
                  <Option>Passaporte</Option>
                  <Option>International ID</Option>
                </Select>
                <Input
                  value={
                    profile?.clientDetails?.document
                      ? profile?.clientDetails?.document
                      : ""
                  }
                  type="text"
                  label="Número do documento"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {documentType == "pf" && (
                  <Select
                    value={
                      profile?.clientDetails?.gender
                        ? profile?.clientDetails?.gender
                        : ""
                    }
                    label="Gênero"
                  >
                    <Option>Masculino</Option>
                    <Option>Feminino</Option>
                    <Option>Prefiro não declarar</Option>
                  </Select>
                )}
              </div>
              <div className="w-full">
                <Button className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar dados
                </Button>
              </div>
            </div>
          </form>
          <form className="bg-WHITE p-8 w-full rounded-md mt-8">
            <div className="flex items-center gap-4">
              <Icon height={16} icon={"heroicons:map-pin"} color="black" />
              <SectionTitle size="sm" text="Endereço" />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].addressType
                      : ""
                  }
                  label="Tipo do endereço"
                >
                  <Option>Residencial</Option>
                  <Option>Comercial</Option>
                  <Option>Outro</Option>
                </Select>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].zipCode
                      : ""
                  }
                  type="text"
                  label="Cep"
                />
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].city
                      : ""
                  }
                  type="text"
                  label="Cidade"
                />
                <Select
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].state
                      : ""
                  }
                  label="Estado"
                >
                  <Option>1</Option>
                </Select>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].street
                      : ""
                  }
                  type="text"
                  label="Logradouro"
                />
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].number
                      : ""
                  }
                  type="text"
                  label="Número"
                />
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].neighborhood
                      : ""
                  }
                  type="text"
                  label="Bairro"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].complement
                      : ""
                  }
                  type="text"
                  label="Complemento"
                />
                <Input
                  value={
                    profile?.clientAddresses[0]
                      ? profile?.clientAddresses[0].reference
                      : ""
                  }
                  type="text"
                  label="Referência"
                />
              </div>
              <div className="w-full">
                <Button className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar endereço
                </Button>
              </div>
            </div>
          </form>
          <form className="bg-WHITE p-8 w-full rounded-md mt-8">
            <div className="flex items-center gap-4">
              <Icon height={16} icon={"heroicons:user-circle"} color="black" />
              <SectionTitle size="sm" text="Contato" />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid gap-6">
                {contactsList.map((contact) => {
                  return (
                    <div className="flex md:items-center flex-col md:flex-row items-end gap-6">
                      <Input value={contact.name} type="email" label="Nome" />
                      <Input
                        value={contact.phone}
                        type="email"
                        label="Número de Telefone"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveContact(contact?.id);
                        }}
                        className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                      >
                        Remover
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <Button
                  type="button"
                  onClick={handleNewContact}
                  className="bg-GRAY_100 w-full md:w-auto text-GRAY_400"
                >
                  Novo contato
                </Button>
                <Button className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar contatos
                </Button>
              </div>
            </div>
          </form>
          <form className="bg-WHITE p-8 w-full rounded-md mt-8">
            <div className="flex items-center gap-4">
              <Icon height={16} icon={"heroicons:user"} color="black" />
              <SectionTitle size="sm" text="Dados complementares" />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={
                    profile?.clientDetails?.fatherName
                      ? profile?.clientDetails?.fatherName
                      : ""
                  }
                  type="text"
                  label="Nome do pai"
                />
                <Input
                  value={
                    profile?.clientDetails?.motherName
                      ? profile?.clientDetails?.motherName
                      : ""
                  }
                  type="text"
                  label="Nome da mãe"
                />
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
                <Select
                  value={
                    profile?.clientDetails?.education
                      ? profile?.clientDetails?.education
                      : ""
                  }
                  label="Escolaridade"
                >
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
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={
                    profile?.clientDetails?.profession
                      ? profile?.clientDetails?.profession
                      : ""
                  }
                  type="text"
                  label="Qual sua profissão?"
                />
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
                  <Select
                    value={
                      profile?.profileDetails?.documentType
                        ? profile?.profileDetails?.documentType
                        : ""
                    }
                    label="Tipo do documento"
                    className="w-full"
                  >
                    <Option value="Inscrição estadual">
                      Inscrição estadual
                    </Option>
                    <Option value="Carteira de habilitação">
                      Carteira de habilitação
                    </Option>
                    <Option value="Passaporte">Passaporte</Option>
                  </Select>
                  <Input label="Número do documento" className="w-full" />
                </div>
              )}
              <div>
                <Button className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar dados
                </Button>
              </div>
            </div>
          </form>
          <form className="bg-WHITE p-8 w-full rounded-md mt-8">
            <div className="flex items-center gap-4">
              <Icon height={16} icon={"heroicons:banknotes"} color="black" />
              <SectionTitle size="sm" text="Dados bancários" />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  value={
                    profile?.clientFinance?.accountType
                      ? profile?.clientFinance?.accountType
                      : ""
                  }
                  label="Tipo da conta"
                >
                  <Option>Conta corrente</Option>
                  <Option>Conta conjunta</Option>
                  <Option>Conta poupança</Option>
                  <Option>Outra</Option>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={
                    profile?.clientFinance?.bankName
                      ? profile?.clientFinance?.bankName
                      : ""
                  }
                  type="text"
                  label="Nome do banco"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={
                    profile?.clientFinance?.accountNumber
                      ? profile?.clientFinance?.accountNumber
                      : ""
                  }
                  type="text"
                  label="Número da conta"
                />
                <Input
                  value={
                    profile?.clientFinance?.accountDigit
                      ? profile?.clientFinance?.accountDigit
                      : ""
                  }
                  type="text"
                  label="Dígito da conta"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={
                    profile?.clientFinance?.agencyNumber
                      ? profile?.clientFinance?.agencyNumber
                      : ""
                  }
                  type="text"
                  label="Número da agência"
                />
                <Input
                  value={
                    profile?.clientFinance?.agencyDigit
                      ? profile?.clientFinance?.agencyDigit
                      : ""
                  }
                  type="text"
                  label="Dígito da agência"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  value={
                    profile?.clientFinance?.pixKeyType
                      ? profile?.clientFinance?.pixKeyType
                      : ""
                  }
                  label="Tipo da chave PIX"
                >
                  <Option>Chave e-mail</Option>
                  <Option>Chave número de telefone</Option>
                  <Option>Chave CPF</Option>
                  <Option>Chave CNPJ</Option>
                  <Option>Chave aleatória</Option>
                </Select>
                <Input
                  value={
                    profile?.clientFinance?.pixKey
                      ? profile?.clientFinance?.pixKey
                      : ""
                  }
                  type="text"
                  label="Chave PIX"
                />
              </div>
              <div className="w-full">
                <Button className="bg-GOLD_MAIN w-full md:w-auto">
                  Atualizar dados bancários
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
