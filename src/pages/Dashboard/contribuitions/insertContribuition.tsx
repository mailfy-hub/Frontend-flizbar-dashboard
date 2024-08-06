import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { FormikProps, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";
import { useTranslation } from "react-i18next";

interface WalletType {
  createdAt: string;
  id: string;
  type: "conventional" | "emergency";
  walletName: string;
}

interface UserType {
  documentType: string;
  email: string;
  id: string;
  name: string;
  personType: string;
  phone: string;
  profileId: string;
  surname: string;
  username: string;
}

interface UserFormValues {
  walletID: string;
  contributionDate: string;
  dollarValue: number;
  contributionAmount: number;
}

interface AdminFormValues extends UserFormValues {
  status: string;
  clientID: string;
}

export const ContribuitionInsert = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { t } = useTranslation();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [clients, setClients] = useState<UserType[]>([]);

  const getAllWallets = async () => {
    try {
      const response = await api.get("wallets");
      setWallets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientsList = async () => {
    try {
      const response = await api.get("/admin/users/clients-without-pagination");
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWallets();
    if (profile?.user.isAdmin) {
      getClientsList();
    }
  }, [profile?.user.isAdmin]);

  const userForm = useFormik<UserFormValues>({
    initialValues: {
      walletID: "",
      contributionDate: "",
      dollarValue: 5.12,
      contributionAmount: 0,
    },
    validationSchema: Yup.object({
      walletID: Yup.string().required(`${t("default.error.walletRequired")}`),
      contributionDate: Yup.date().required(
        `${t("default.error.contributionDateRequired")}`
      ),
      dollarValue: Yup.number().required(
        `${t("default.error.dollarValueRequired")}`
      ),
      contributionAmount: Yup.number()
        .required(`${t("default.error.contributionValueRequired")}`)
        .min(0, `${t("default.error.valueMustBeGreaterThanZero")}`),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          clientID: profile?.id,
          walletID: values.walletID,
          contributionDate: values.contributionDate,
          dollarValue: values.dollarValue,
          contributionAmount: values.contributionAmount,
        };
        const response = await api.post("contributions", data);
        console.log("Form submitted successfully:", response);
        navigate("/contributions");
        toast("Contribution inserted successfully!", {
          type: "success",
          autoClose: 3000,
        });
      } catch (error) {
        console.log("Form submission error:", error);
      }
    },
  });

  const adminForm = useFormik<AdminFormValues>({
    initialValues: {
      status: "",
      clientID: "",
      walletID: "",
      contributionDate: "",
      dollarValue: 5.12,
      contributionAmount: 0,
    },
    validationSchema: Yup.object({
      status: Yup.string().required(`${t("default.error.statusRequired")}`),
      clientID: Yup.string().required(`${t("default.error.clientRequired")}`),
      walletID: Yup.string().required(`${t("default.error.walletRequired")}`),
      contributionDate: Yup.date().required(
        `${t("default.error.contributionDateRequired")}`
      ),
      dollarValue: Yup.number().required(
        `${t("default.error.dollarValueRequired")}`
      ),
      contributionAmount: Yup.number()
        .required(`${t("default.error.contributionValueRequired")}`)
        .min(0, `${t("default.error.valueMustBeGreaterThanZero")}`),
    }),
    onSubmit: async (values) => {
      try {
        const data = {
          clientID: values.clientID,
          walletID: values.walletID,
          contributionDate: values.contributionDate,
          dollarValue: values.dollarValue,
          contributionAmount: values.contributionAmount,
          status: values.status,
        };
        const response = await api.post("contributions", data);
        console.log("Form submitted successfully:", response);
        navigate("/contributions");
        toast("Contribution inserted successfully!", {
          type: "success",
          autoClose: 3000,
        });
      } catch (error) {
        console.log("Form submission error:", error);
      }
    },
  });

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
      {profile?.user.isAdmin ? (
        <AdminForm formik={adminForm} clients={clients} wallets={wallets} />
      ) : (
        <UserForm formik={userForm} wallets={wallets} t={t} />
      )}
    </div>
  );
};

interface UserFormProps {
  formik: FormikProps<UserFormValues>;
  wallets: WalletType[];
}

const UserForm = ({ formik, wallets }: UserFormProps) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={formik.handleSubmit} className="mt-12">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"radix-icons:dashboard"} color="black" />
          <SectionTitle
            size="sm"
            text={t("default.contribution.addContributionForm.subtitle")}
          />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="date"
              label={t(
                "default.contribution.addContributionForm.dateOfContribution"
              )}
              name="contributionDate"
              onChange={formik.handleChange}
              value={formik.values.contributionDate}
              error={
                formik.touched.contributionDate &&
                Boolean(formik.errors.contributionDate)
              }
            />
            <Select
              label={t("default.contribution.wallet")}
              id="walletID"
              name="walletID"
              onChange={(val) => formik.setFieldValue("walletID", val)}
              value={formik.values.walletID}
              error={formik.touched.walletID && Boolean(formik.errors.walletID)}
            >
              {wallets.map((wallet) => (
                <Option key={wallet.id} value={wallet.id}>
                  {wallet.walletName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="number"
              label={t(
                "default.contribution.addContributionForm.contributionValue"
              )}
              name="contributionAmount"
              onChange={formik.handleChange}
              value={formik.values.contributionAmount}
              error={
                formik.touched.contributionAmount &&
                Boolean(formik.errors.contributionAmount)
              }
            />
            <Input
              type="number"
              label={t("default.contribution.addContributionForm.dollarValue")}
              name="dollarValue"
              value={formik.values.dollarValue}
              disabled
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
          {t("default.contribution.addContributionForm.button")}
        </Button>
      </div>
    </form>
  );
};

interface AdminFormProps {
  formik: FormikProps<AdminFormValues>;
  clients: UserType[];
  wallets: WalletType[];
}

const AdminForm = ({ formik, clients, wallets }: AdminFormProps) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={formik.handleSubmit} className="mt-12">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"radix-icons:dashboard"} color="black" />
          <SectionTitle
            size="sm"
            text={t("default.contributions.addContributionForm.subtitle")}
          />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="date"
              label={t(
                "default.contributions.addContributionForm.dateOfContribution"
              )}
              name="contributionDate"
              onChange={formik.handleChange}
              value={formik.values.contributionDate}
              error={
                formik.touched.contributionDate &&
                Boolean(formik.errors.contributionDate)
              }
            />
            <Select
              label={t("default.contributions.addContributionForm.client")}
              id="clientID"
              name="clientID"
              onChange={(val) => formik.setFieldValue("clientID", val)}
              value={formik.values.clientID}
              error={formik.touched.clientID && Boolean(formik.errors.clientID)}
            >
              {clients.map((client) => (
                <Option key={client.profileId} value={client.profileId}>
                  {client.name} {client.surname} - {client.email}
                </Option>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label={t("default.contributions.addContributionForm.wallet")}
              id="walletID"
              name="walletID"
              onChange={(val) => formik.setFieldValue("walletID", val)}
              value={formik.values.walletID}
              error={formik.touched.walletID && Boolean(formik.errors.walletID)}
            >
              {wallets.map((wallet) => (
                <Option key={wallet.id} value={wallet.id}>
                  {wallet.walletName}
                </Option>
              ))}
            </Select>
            <Input
              type="number"
              label={t(
                "default.contributions.addContributionForm.contributionValue"
              )}
              name="contributionAmount"
              onChange={formik.handleChange}
              value={formik.values.contributionAmount}
              error={
                formik.touched.contributionAmount &&
                Boolean(formik.errors.contributionAmount)
              }
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="number"
              label={t("default.contributions.addContributionForm.dollarValue")}
              name="dollarValue"
              value={formik.values.dollarValue}
              onChange={formik.handleChange}
            />
            <Select
              label={t("default.contributions.addContributionForm.status")}
              id="status"
              name="status"
              onChange={(val) => formik.setFieldValue("status", val)}
              value={formik.values.status}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <Option value="pending">
                {t("default.contributions.addContributionForm.pending")}
              </Option>
              <Option value="approved">
                {t("default.contributions.addContributionForm.approved")}
              </Option>
              <Option value="completed">
                {t("default.contributions.addContributionForm.concluded")}
              </Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
          {t("default.contributions.addContributionForm.button")}
        </Button>
      </div>
    </form>
  );
};
