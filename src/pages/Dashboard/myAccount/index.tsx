import { useState } from "react";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";
import { InfoClient } from "./infoClient";
import { InfoFiles } from "./infoFiles";
import { InfoWallets } from "./infoWallets";

export const MyAccount = () => {
  const [activeScreen, setActiveScreen] = useState<
    "client" | "wallets" | "files"
  >("client");

  const { userData } = useAuth();

  const handleActiveScreen = (screen: "client" | "wallets" | "files") => {
    setActiveScreen(screen);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionTitle text="Seus dados da conta" />
      </div>
      <div className="mt-12 flex items-center gap-2">
        {!userData?.isAdmin && (
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
        )}
        {!userData?.isAdmin && (
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
        )}

        {!userData?.isAdmin && (
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
        )}
      </div>
      <div className="mt-8">{activeScreen === "client" && <InfoClient />}</div>
      <div className="mt-8">
        {activeScreen === "wallets" && <InfoWallets />}
      </div>
      <div className="mt-8">{activeScreen === "files" && <InfoFiles />}</div>
    </div>
  );
};
