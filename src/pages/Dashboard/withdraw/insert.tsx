import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";
import { useTranslation } from "react-i18next";

export const WithdrawInsert = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { t } = useTranslation();

  const handleNavigateBack = () => {
    navigate(-1);
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
        <SectionTitle text={t("default.rescues.addRescueForm.title")} />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon
              height={16}
              icon={"heroicons:arrow-uturn-down"}
              color="black"
            />
            <SectionTitle
              size="sm"
              text={t("default.rescues.addRescueForm.subtitle")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="date"
                label={t("default.rescues.addRescueForm.dateOfRescue")}
              />
              {userData?.isAdmin && (
                <Select label={t("default.rescues.client")}>
                  <option value=""></option>
                </Select>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Select label={t("default.rescues.addRescueForm.wallet")}>
                <option value=""></option>
              </Select>
              <Input
                type="number"
                label={t("default.rescues.addRescueForm.ransomValue")}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            {t("default.rescues.button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
