import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../../client/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const WalletInsert = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const validationSchema = Yup.object().shape({
    walletName: Yup.string().required(`${t("default.error.nameRequired")}`),
    type: Yup.string().required(`${t("default.error.typeRequired")}`),
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    walletName: "",
    type: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  console.log(formik);

  const handleSubmit = async (data: FormValues) => {
    try {
      await api.post("wallets", data);
      toast.success("Created successfully!");
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      formik.setSubmitting(false);
    }
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
            "default.myAccount.admin.wallets.addWalletForm.titleSecondary"
          )}
        />
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:wallet"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.myAccount.admin.wallets.addWalletForm.title")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                id="walletName"
                name="walletName"
                type="text"
                label={t("default.myAccount.admin.wallets.addWalletForm.name")}
                value={formik.values.walletName}
                onChange={formik.handleChange}
                error={
                  formik.touched.walletName && Boolean(formik.errors.walletName)
                }
              />
              <Select
                id="type"
                name="type"
                label={t(
                  "default.myAccount.admin.wallets.addWalletForm.fundType"
                )}
                value={formik.values.type}
                onChange={(selectedValue) =>
                  formik.setFieldValue("type", selectedValue)
                }
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <Option value="conventional">
                  {t("default.myAccount.admin.found.convencionalType")}
                </Option>
                <Option value="emergency">
                  {t("default.myAccount.admin.found.emergencyType")}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <div
          className={`w-full flex ${
            formik.isValid ? "justify-end" : "justify-between"
          } mt-8`}
        >
          {!formik.isValid && (
            <Typography variant="small" className="text-red-500">
              {t("default.error.allFieldsRequired")}
            </Typography>
          )}
          <Button
            className="bg-GOLD_MAIN w-full md:w-auto"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t("default.myAccount.admin.wallets.button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
