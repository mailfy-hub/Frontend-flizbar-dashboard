import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { SectionTitle } from "../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

export const EditWallets = () => {
  const { t } = useTranslation();

  const [isActiveSelectWallet, setIsActiveSelectWallet] = useState(false);
  const handleNewWallet = () => {
    setIsActiveSelectWallet(true);
  };

  // {t("default.myAccount.client.contacts.buttonRemoveContact")}

  return (
    <form className="mt-12">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:wallet"} color="black" />
          <SectionTitle
            size="sm"
            text={t("default.myAccount.client.wallets.title")}
          />
        </div>

        {!isActiveSelectWallet ? (
          <>
            <div className="mt-8 flex flex-col gap-6 ">
              <p className="font-body font-normal text-body16 text-GRAY_400">
                {t("default.myAccount.client.wallets.text")}
              </p>
            </div>
            <div>
              <Button
                type="button"
                className="bg-GOLD_MAIN w-full md:w-auto mt-8"
              >
                {t("default.myAccount.client.contributions.button")}
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-8 flex flex-col ">
            <Select label={t("default.myAccount.client.wallets.selectAWallet")}>
              <Option>
                {t("default.myAccount.client.wallets.conventional")}
              </Option>
              <Option>
                {t("default.myAccount.client.wallets.emergencyFund")}
              </Option>
            </Select>
            <Button className="bg-GOLD_MAIN w-full md:w-auto mt-8">
              {t("default.myAccount.client.wallets.linkWallet")}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
