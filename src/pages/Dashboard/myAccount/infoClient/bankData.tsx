import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useAuth } from "../../../../hook/auth";
import { useTranslation } from "react-i18next";

export const BankData = () => {
  const { profile } = useAuth();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    accountType: Yup.string().required(
      `${t("default.error.accountTypeRequired")}`
    ),
    bankName: Yup.string().required(`${t("default.error.bankNameRequired")}`),
    accountNumber: Yup.string().required(
      `${t("default.error.numberAccountRequired")}`
    ),
    accountDigit: Yup.string(),
    agencyNumber: Yup.string().required(
      `${t("default.error.agencyNumberRequired")}`
    ),
    agencyDigit: Yup.string(),
    pixKeyType: Yup.string(),
    pixKey: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      accountType: profile?.clientFinance?.accountType
        ? profile?.clientFinance?.accountType
        : "",
      bankName: profile?.clientFinance?.bankName
        ? profile?.clientFinance?.bankName
        : "",
      accountNumber: profile?.clientFinance?.accountNumber
        ? profile?.clientFinance?.accountNumber
        : "",
      accountDigit: profile?.clientFinance?.accountDigit
        ? profile?.clientFinance?.accountDigit
        : "",
      agencyNumber: profile?.clientFinance?.agencyNumber
        ? profile?.clientFinance?.agencyNumber
        : "",
      agencyDigit: profile?.clientFinance?.agencyDigit
        ? profile?.clientFinance?.agencyDigit
        : "",
      pixKeyType: profile?.clientFinance?.pixKeyType
        ? profile?.clientFinance?.pixKeyType
        : "",
      pixKey: profile?.clientFinance?.pixKey
        ? profile?.clientFinance?.pixKey
        : "",
    },
    validationSchema,
    onSubmit: (values) => {
      handlePutFinanceInformation(values);
    },
  });
  type FormValues = Yup.InferType<typeof validationSchema>;

  const handlePutFinanceInformation = async (data: FormValues) => {
    try {
      await api.put(`profiles/finance/${profile?.clientFinance?.id}`, {
        profileId: profile?.id,
        ...data,
      });
      toast("Updated successfully", {
        type: "success",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast("Error updating.", {
        type: "error",
        autoClose: 3000,
      });
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-WHITE p-8 w-full rounded-md "
    >
      <div className="flex items-center gap-4">
        <Icon height={16} icon={"heroicons:banknotes"} color="black" />
        <SectionTitle
          size="sm"
          text={t("default.myAccount.client.bankDetails.title")}
        />
      </div>
      <div className="mt-8 flex flex-col gap-6 ">
        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label={t("default.myAccount.client.bankDetails.accountType.title")}
            name="accountType"
            value={formik.values.accountType}
            onChange={(selectedValue) => {
              formik.setFieldValue("accountType", selectedValue);
            }}
            error={
              formik.touched.accountType && Boolean(formik.errors.accountType)
            }
          >
            <Option value="Conta corrente">
              {t(
                "default.myAccount.client.bankDetails.accountType.currentAccount"
              )}
            </Option>
            <Option value="Conta conjunta">
              {t(
                "default.myAccount.client.bankDetails.accountType.jointAccount"
              )}
            </Option>
            <Option value="Conta poupança">
              {t(
                "default.myAccount.client.bankDetails.accountType.savingsAccount"
              )}
            </Option>
            <Option value="Outra">
              {t("default.myAccount.client.bankDetails.accountType.other")}
            </Option>
          </Select>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="text"
            label={t("default.myAccount.client.bankDetails.bankName")}
            name="bankName"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          />
          {formik.touched.bankName && formik.errors.bankName ? (
            <div className="text-red-600">{formik.errors.bankName}</div>
          ) : null}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="text"
            label={t("default.myAccount.client.bankDetails.agencyNumber")}
            name="agencyNumber"
            value={formik.values.agencyNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.agencyNumber && Boolean(formik.errors.agencyNumber)
            }
          />
          {formik.touched.agencyNumber && formik.errors.agencyNumber ? (
            <div className="text-red-600">{formik.errors.agencyNumber}</div>
          ) : null}
          <Input
            type="text"
            label={t("default.myAccount.client.bankDetails.agencyDigit")}
            name="agencyDigit"
            value={formik.values.agencyDigit}
            onChange={formik.handleChange}
            error={
              formik.touched.agencyDigit && Boolean(formik.errors.agencyDigit)
            }
          />
          {formik.touched.agencyDigit && formik.errors.agencyDigit ? (
            <div className="text-red-600">{formik.errors.agencyDigit}</div>
          ) : null}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="text"
            label={t("default.myAccount.client.bankDetails.numberAccount")}
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.accountNumber &&
              Boolean(formik.errors.accountNumber)
            }
          />
          {formik.touched.accountNumber && formik.errors.accountNumber ? (
            <div className="text-red-600">{formik.errors.accountNumber}</div>
          ) : null}
          <Input
            type="text"
            label={t("default.myAccount.client.bankDetails.accountDigit")}
            name="accountDigit"
            value={formik.values.accountDigit}
            onChange={formik.handleChange}
            error={
              formik.touched.accountDigit && Boolean(formik.errors.accountDigit)
            }
          />
          {formik.touched.accountDigit && formik.errors.accountDigit ? (
            <div className="text-red-600">{formik.errors.accountDigit}</div>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label={t("default.myAccount.client.bankDetails.pixKeyType.title")}
            id="pixKeyType"
            name="pixKeyType"
            value={formik.values.pixKeyType}
            onChange={(selectedValue) => {
              formik.setFieldValue("pixKeyType", selectedValue);
            }}
            error={
              formik.touched.pixKeyType && Boolean(formik.errors.pixKeyType)
            }
          >
            <Option value="Email">
              {t("default.myAccount.client.bankDetails.pixKeyType.email")}
            </Option>
            <Option value="Telephone">
              {t("default.myAccount.client.bankDetails.pixKeyType.phone")}
            </Option>
            <Option value="CPF">
              {t("default.myAccount.client.bankDetails.pixKeyType.cpf")}
            </Option>
            <Option value="CNPJ">
              {t("default.myAccount.client.bankDetails.pixKeyType.cnpj")}
            </Option>
            <Option value="Random">
              {t("default.myAccount.client.bankDetails.pixKeyType.randomKey")}
            </Option>
          </Select>

          <Input
            type="text"
            label={t("default.myAccount.client.bankDetails.pixKey")}
            name="pixKey"
            value={formik.values.pixKey}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-start mt-8">
        <Button
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Atualizar dados
        </Button>
      </div>
    </form>
  );
};
