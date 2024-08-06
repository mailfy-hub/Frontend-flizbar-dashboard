import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { FormStepType } from ".";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";

export interface bankType {
  code: number;
  fullName: string;
  ispb: string;
  name: string;
}

export const BankData = ({ handleConfirmationClick }: FormStepType) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [bankList, setBankList] = useState<bankType[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<bankType[]>([]);

  const { userData, updateProfileFinance } = useAuth();
  const validationSchema = Yup.object().shape({
    accountType: Yup.string().required("Tipo da conta é obrigatório"),
    bankName: Yup.string().required("Nome do banco é obrigatório"),
    accountNumber: Yup.string().required("Número da conta é obrigatório"),
    accountDigit: Yup.string(),
    agencyNumber: Yup.string().required("Número da agência é obrigatório"),
    agencyDigit: Yup.string(),
    pixKeyType: Yup.string(),
    pixKey: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      accountType: "",
      bankName: "",
      accountNumber: "",
      accountDigit: "",
      agencyNumber: "",
      agencyDigit: "",
      pixKeyType: "",
      pixKey: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handlePostFinanceInformation(values);
    },
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

  const handlePostFinanceInformation = async (data: FormValues) => {
    try {
      await api.post(`profiles/${userData?.id}/finance`, {
        profileId: userData?.id,
        ...data,
      });
      updateProfileFinance({
        accountType: data.accountType,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        accountDigit: data.accountDigit ? data.accountDigit : "",
        agencyNumber: data.agencyNumber ? data.agencyNumber : "",
        agencyDigit: data.agencyDigit ? data.agencyDigit : "",
        pixKeyType: data.pixKeyType ? data.pixKeyType : "",
        pixKey: data.pixKey ? data.pixKey : "",
      });
      handleConfirmationClick();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBankList = async () => {
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/banks/v1`);
      setBankList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBankSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("bankName", e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filtered = bankList.filter(
      (bank) =>
        bank.fullName && bank.fullName.toLowerCase().includes(searchValue)
    );
    setFilteredBanks(filtered);
  };

  useEffect(() => {
    handleBankList();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setFilteredBanks([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
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
            <div className="relative">
              <Input
                type="text"
                label="Nome do banco"
                name="bankName"
                id="bankName"
                value={formik.values.bankName}
                onChange={handleBankSearch}
                onSelect={handleBankSearch}
                error={
                  formik.touched.bankName && Boolean(formik.errors.bankName)
                }
              />
              {filteredBanks.length > 0 && formik.values.bankName && (
                <div ref={dropdownRef} className="absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-y-auto">
                  {filteredBanks.map((bank, idx) => (
                    <div
                      key={idx}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        formik.setFieldValue("bankName", bank.fullName);
                        setFilteredBanks([]);
                      }}
                    >
                      {bank.fullName}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <Input
              type="text"
              label="Nome do banco"
              name="bankName"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              error={formik.touched.bankName && Boolean(formik.errors.bankName)}
            />
            {formik.touched.bankName && formik.errors.bankName ? (
              <div className="text-red-600">{formik.errors.bankName}</div>
            ) : null} */}
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
      </div>
      <div className={`w-full flex ${formik.isValid ? 'justify-end' : 'justify-between'} mt-8`}>
        {!formik.isValid && (
          <Typography variant="small" className="text-red-500">
            Os campos marcados são obrigatórios
          </Typography>
        )}
        <Button className="bg-GOLD_MAIN w-full md:w-auto" type="submit">
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
