import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../../../client/users";
import { InputWithDropdown } from "../../../../components/inputWithDropdown";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useAuth } from "../../../../hook/auth";
import { CountryType, countries } from "../../../../utils/number-config";
import { AddressData } from "./address";
import { BankData } from "./bankData";
import { Beneficiary } from "./beneficiary";
import { Contact } from "./contact";
import { GenerateData } from "./generateData";

export const InfoClient = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("generate-data");

  const [updateDataUserAdmin, setUpdateDataUserAdmin] = useState({});

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
            {" "}
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
                  defaultValue={userData.phone}
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
        <div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab("generate-data");
              }}
              className={`py-4 border-b-[1px] font-display text-button16 ${
                activeTab == "generate-data"
                  ? "border-GOLD_MAIN font-semibold text-BLACK "
                  : "border-transparent font-medium text-GRAY_400"
              }`}
            >
              Dados gerais
            </button>
            <button
              onClick={() => {
                setActiveTab("address");
              }}
              className={`py-4 border-b-[1px] font-display text-button16 ${
                activeTab == "address"
                  ? "border-GOLD_MAIN font-semibold text-BLACK "
                  : "border-transparent font-medium text-GRAY_400"
              }`}
            >
              Endereço
            </button>
            <button
              onClick={() => {
                setActiveTab("bank-data");
              }}
              className={`py-4 border-b-[1px] font-display text-button16 ${
                activeTab == "bank-data"
                  ? "border-GOLD_MAIN font-semibold text-BLACK "
                  : "border-transparent font-medium text-GRAY_400"
              }`}
            >
              Dados bancários
            </button>
            <button
              onClick={() => {
                setActiveTab("baneficiary");
              }}
              className={`py-4 border-b-[1px] font-display text-button16 ${
                activeTab == "baneficiary"
                  ? "border-GOLD_MAIN font-semibold text-BLACK "
                  : "border-transparent font-medium text-GRAY_400"
              }`}
            >
              Beneficiário
            </button>
            <button
              onClick={() => {
                setActiveTab("contact");
              }}
              className={`py-4 border-b-[1px] font-display text-button16 ${
                activeTab == "contact"
                  ? "border-GOLD_MAIN font-semibold text-BLACK "
                  : "border-transparent font-medium text-GRAY_400"
              }`}
            >
              Contatos
            </button>
          </div>
          <div className="">
            {activeTab == "generate-data" && <GenerateData />}
            {activeTab == "address" && <AddressData />}
            {activeTab == "bank-data" && <BankData />}
            {activeTab == "contact" && <Contact />}
            {activeTab == "baneficiary" && <Beneficiary />}
          </div>
        </div>
      )}
    </div>
  );
};
