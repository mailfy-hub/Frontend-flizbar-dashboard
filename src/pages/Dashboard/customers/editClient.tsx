import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProfileById } from "../../../client/profiles";
import { Contact } from "./cardsClient/contact";
import { AddressData } from "./cardsClient/address";
import { Beneficiary } from "./cardsClient/beneficiary";
import { BankData } from "./cardsClient/dataBank";
import { GenerateData } from "./cardsClient/generateData";

export const EditClient = () => {
  const [activeTab, setActiveTab] = useState("generate-data");
  const [dataUser, setDataUser] = useState({});

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    getProfileById(id).then((data) => {
      setDataUser(data);
    });
  }, []);

  return (
    <div>
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
        </div>
        <div className="">
          {activeTab == "generate-data" && <GenerateData dataUser={dataUser} />}
          {/* {activeTab == "auth-data" && <AuthData userData={dataUser} />} */}
          {activeTab == "bank-data" && <BankData userData={dataUser} />}
          {activeTab == "contact" && <Contact userData={dataUser} />}
          {activeTab == "baneficiary" && <Beneficiary userData={dataUser} />}
          {activeTab == "address" && <AddressData userData={dataUser} />}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
