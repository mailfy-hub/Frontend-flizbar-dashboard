import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

export const ReadjustmentsInsert = () => {
  const navigate = useNavigate();
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
        <SectionTitle
          text={t(
            "default.myAccount.admin.readjustments.addReadjustmentForm.title"
          )}
        />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:briefcase"} color="black" />
            <SectionTitle
              size="sm"
              text={t(
                "default.myAccount.admin.readjustments.addReadjustmentForm.subtitle"
              )}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="date"
                label={t(
                  "default.myAccount.admin.readjustments.addReadjustmentForm.dateOfReadjustment"
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Select
                label={t("default.myAccount.admin.readjustments.clientName")}
              >
                <option value=""></option>
              </Select>
              <Select
                label={t("default.myAccount.admin.readjustments.fundOrigin")}
              >
                <option value=""></option>
              </Select>
              <Select
                label={t(
                  "default.myAccount.admin.readjustments.fundDestination"
                )}
              >
                <option value=""></option>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="number"
                label={t(
                  "default.myAccount.admin.readjustments.addReadjustmentForm.valueOfReadjustment"
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            {t("default.myAccount.admin.readjustments.button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
