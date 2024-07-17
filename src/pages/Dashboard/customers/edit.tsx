import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { EditClient } from "./editClient";
import { EditFiles } from "./editFiles";
import { EditWallets } from "./editWallets";
import { getProfileById } from "../../../client/profiles";

export const CustomerEdit = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<any>({});

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    getProfileById(id).then((data) => {
      setDataUser(data);
    });
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const [activeScreen, setActiveScreen] = useState<
    "client" | "wallets" | "files"
  >("client");

  const handleActiveScreen = (screen: "client" | "wallets" | "files") => {
    setActiveScreen(screen);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Dados do cliente" />
      </div>
      <div className="mt-12 flex items-center gap-2">
        <button
          onClick={() => {
            handleActiveScreen("client");
          }}
          className={`${
            activeScreen === "client"
              ? "bg-GOLD_MAIN text-white"
              : "bg-gray-300 text-gray-500"
          } px-4 py-2 rounded-md font-display font-semibold transition-all `}
        >
          Dados do cliente
        </button>
        <button
          onClick={() => {
            handleActiveScreen("wallets");
          }}
          className={`${
            activeScreen === "wallets"
              ? "bg-GOLD_MAIN text-white"
              : "bg-gray-300 text-gray-500"
          } px-4 py-2 rounded-md font-display font-semibold transition-all `}
        >
          Carteiras
        </button>
        <button
          onClick={() => {
            handleActiveScreen("files");
          }}
          className={`${
            activeScreen === "files"
              ? "bg-GOLD_MAIN text-white"
              : "bg-gray-300 text-gray-500"
          } px-4 py-2 rounded-md font-display font-semibold transition-all `}
        >
          Anexos
        </button>
      </div>
      <div className="mt-8">
        {activeScreen === "client" && <EditClient data={dataUser} />}
      </div>
      <div className="mt-8">
        {activeScreen === "wallets" && <EditWallets />}
      </div>
      <div className="mt-8">
        {activeScreen === "files" && <EditFiles dataUser={dataUser} />}
      </div>
    </div>
  );
};
