import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";
import { useTranslation } from "react-i18next";

export const ContribuitionInsert = () => {
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
        <SectionTitle
          text={t("default.contributions.addContributionForm.title")}
        />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"radix-icons:dashboard"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.contributions.addContributionForm.subtitle")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="date"
                label={t(
                  "default.contributions.addContributionForm.dateOfContribution"
                )}
              />
              {userData?.isAdmin && (
                <Select
                  label={t("default.contributions.addContributionForm.client")}
                >
                  <option value=""></option>
                </Select>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label={t("default.contributions.addContributionForm.wallet")}
              >
                <option value=""></option>
              </Select>
              <Input
                type="number"
                label={t(
                  "default.contributions.addContributionForm.contributionValue"
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="number"
                label={t(
                  "default.contributions.addContributionForm.dollarValue"
                )}
                value={5.12}
              />
              <Select label="Status">
                M
                <Option>
                  {t("default.contributions.addContributionForm.pending")}
                </Option>
                M
                <Option>
                  {t("default.contributions.addContributionForm.approved")}
                </Option>
                M
                <Option>
                  {t("default.contributions.addContributionForm.concluded")}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            {t("default.contributions.addContributionForm.button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
