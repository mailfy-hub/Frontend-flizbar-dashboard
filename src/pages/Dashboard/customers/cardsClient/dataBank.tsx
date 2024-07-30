import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";

export const BankData = ({ userData }: any) => {
  const profile = userData;
  const validationSchema = Yup.object().shape({
    accountType: Yup.string().required("Tipo da conta é obrigatório"),
    bankName: Yup.string().required("Nome do banco é obrigatório"),
    accountNumber: Yup.string().required("Número da conta é obrigatório"),
    accountDigit: Yup.string(),
    agencyNumber: Yup.string(),
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
      toast("Alterado com sucesso", {
        type: "success",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast("Erro ao atualizar.", {
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
        <SectionTitle size="sm" text="Dados bancários" />
      </div>
      <div className="mt-8 flex flex-col gap-6 ">
        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label="Tipo da conta"
            name="accountType"
            value={formik.values.accountType}
            onChange={(selectedValue) => {
              formik.setFieldValue("accountType", selectedValue);
            }}
            error={
              formik.touched.accountType && Boolean(formik.errors.accountType)
            }
          >
            <Option value="Conta corrente">Conta corrente</Option>
            <Option value="Conta conjunta">Conta conjunta</Option>
            <Option value="Conta poupança">Conta poupança</Option>
            <Option value="Outra">Outra</Option>
          </Select>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="text"
            label="Nome do banco"
            name="bankName"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            error={formik.touched.bankName && Boolean(formik.errors.bankName)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="text"
            label="Número da conta"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.accountNumber &&
              Boolean(formik.errors.accountNumber)
            }
          />
          <Input
            type="text"
            label="Dígito da conta"
            name="accountDigit"
            value={formik.values.accountDigit}
            onChange={formik.handleChange}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="text"
            label="Número da agência"
            name="agencyNumber"
            value={formik.values.agencyNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.agencyNumber &&
              Boolean(formik.errors.agencyNumber)
            }
          />
          <Input
            type="text"
            label="Dígito da agência"
            name="agencyDigit"
            value={formik.values.agencyDigit}
            onChange={formik.handleChange}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label="Tipo da chave PIX"
            id="pixKeyType"
            name="pixKeyType"
            value={formik.values.pixKeyType}
            onChange={(selectedValue) => {
              formik.setFieldValue("pixKeyType", selectedValue);
            }}
          >
            <Option value="E-mail">Chave e-mail</Option>
            <Option value="Telefone">Chave número de telefone</Option>
            <Option value="CPF">Chave CPF</Option>
            <Option value="CNPJ">Chave CNPJ</Option>
            <Option value="Aleatória">Chave aleatória</Option>
          </Select>

          <Input
            type="text"
            label="Chave PIX"
            name="pixKey"
            value={formik.values.pixKey}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className={`w-full flex ${formik.isValid ? 'justify-end' : 'justify-between'} mt-8`}>
        {!formik.isValid && (
          <Typography variant="small" className="text-red-500">
            Os campos marcados são obrigatórios
          </Typography>
        )}
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
