import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { SectionTitle } from "../../../components/sectionTitle";
import { useLocation } from "react-router-dom";
import { getProfileById } from "../../../client/profiles";
// import { useAuth } from "../../../hook/auth";
import { updateUser } from "../../../client/users";
import { toast } from "react-toastify";

type contact = {
  [x: string]: string | number | readonly string[] | undefined;
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

export const EditClient = () => {
  // const { userData } = useAuth();

  const [documentType, setDocumentType] = useState<"pf" | "pj">("pf");
  const [updateEmail, setUpdateEmail] = useState<string>();
  // const [generalDataUpdated, setGeneralDataUpdated] = useState({});
  const handleDocumentType = (docType: string) => {
    if (docType === "pf" || docType === "pj") setDocumentType(docType);
  };

  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState<MaritalStatus>("Solteiro(a)");

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

  const [details, setDetails] = useState<any>();

  // const handleChangeGeneralData = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setGeneralDataUpdated({
  //     ...generalDataUpdated,
  //     [name]: value,
  //   });
  // };

  // console.log("handleDocumentType", generalDataUpdated);

  useEffect(() => {
    getProfileById(id).then((data) => {
      setDetails(data);
    });
  }, []);

  const location = useLocation();
  const { id } = location.state;

  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser({ email: updateEmail }, details.userId);
      toast.success("E-mail atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar e-mail.");
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateEmail(value);
  };

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

  function convertDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  }

  // console.log("details", details);

  return (
    <div className="">
      <form
        onSubmit={handleUpdateEmail}
        className="bg-WHITE p-8 w-full rounded-md"
      >
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados de acesso" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              defaultValue={details?.user?.email}
              type="email"
              label="E-mail de acesso"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="w-full">
            <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
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
                value={`${details?.user?.name} ${details?.user?.surname}`}
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
                value={convertDate(details?.clientDetails?.birthDate)}
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
                details?.clientDetails?.documentType
                  ? details?.clientDetails?.documentType
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
                details?.clientDetails?.document
                  ? details?.clientDetails?.document
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
                  details?.clientDetails?.gender
                    ? details?.clientDetails?.gender
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
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].addressType
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
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].zipCode
                  : ""
              }
              type="text"
              label="Cep"
            />
            <Input
              value={
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].city
                  : ""
              }
              type="text"
              label="Cidade"
            />
            <Select
              value={
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].state
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
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].street
                  : ""
              }
              type="text"
              label="Logradouro"
            />
            <Input
              value={
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].number
                  : ""
              }
              type="text"
              label="Número"
            />
            <Input
              value={
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].neighborhood
                  : ""
              }
              type="text"
              label="Bairro"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              value={
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].complement
                  : ""
              }
              type="text"
              label="Complemento"
            />
            <Input
              value={
                details?.clientAddresses[0]
                  ? details?.clientAddresses[0].reference
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
                  <Input
                    defaultValue={contact.name}
                    type="email"
                    label="Nome"
                  />
                  <Input
                    defaultValue={contact?.phone}
                    type="email"
                    label="Número de Telefone"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveContact(Number(contact?.id));
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
                details?.clientDetails?.fatherName
                  ? details?.clientDetails?.fatherName
                  : ""
              }
              type="text"
              label="Nome do pai"
            />
            <Input
              value={
                details?.clientDetails?.motherName
                  ? details?.clientDetails?.motherName
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
                details?.clientDetails?.education
                  ? details?.clientDetails?.education
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
            <Select
              value={
                details?.clientDetails?.politicalPerson !== undefined
                  ? details.clientDetails.politicalPerson
                    ? "Sim"
                    : "Não"
                  : ""
              }
              label="É pessoa politicamente exposta?"
            >
              <Option>Sim</Option>
              <Option>Não</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              value={
                details?.clientDetails?.profession
                  ? details?.clientDetails?.profession
                  : ""
              }
              type="text"
              label="Qual sua profissão?"
            />
            <Select
              value={
                details?.clientDetails?.declaresUsTaxes !== undefined
                  ? details.clientDetails.declaresUsTaxes
                    ? "Sim"
                    : "Não"
                  : ""
              }
              label="Declara imposto ao governo dos EUA?"
            >
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
                  details?.profileDetails?.documentType
                    ? details?.profileDetails?.documentType
                    : ""
                }
                label="Tipo do documento"
                className="w-full"
              >
                <Option value="Inscrição estadual">Inscrição estadual</Option>
                <Option value="Carteira de habilitação">
                  Carteira de habilitação
                </Option>
                <Option value="International ID">International ID</Option>
                <Option value="Passaporte">Passaporte</Option>
              </Select>
              <Input
                value={
                  details?.profileDetails?.document
                    ? details?.profileDetails?.document
                    : ""
                }
                label="Número do documento"
                className="w-full"
              />
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
                details?.clientFinance?.accountType
                  ? details?.clientFinance?.accountType
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
                details?.clientFinance?.bankName
                  ? details?.clientFinance?.bankName
                  : ""
              }
              type="text"
              label="Nome do banco"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              value={
                details?.clientFinance?.accountNumber
                  ? details?.clientFinance?.accountNumber
                  : ""
              }
              type="text"
              label="Número da conta"
            />
            <Input
              value={
                details?.clientFinance?.accountDigit
                  ? details?.clientFinance?.accountDigit
                  : ""
              }
              type="text"
              label="Dígito da conta"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              value={
                details?.clientFinance?.agencyNumber
                  ? details?.clientFinance?.agencyNumber
                  : ""
              }
              type="text"
              label="Número da agência"
            />
            <Input
              value={
                details?.clientFinance?.agencyDigit
                  ? details?.clientFinance?.agencyDigit
                  : ""
              }
              type="text"
              label="Dígito da agência"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              value={
                details?.clientFinance?.pixKeyType
                  ? details?.clientFinance?.pixKeyType
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
                details?.clientFinance?.pixKey
                  ? details?.clientFinance?.pixKey
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
  );
};
