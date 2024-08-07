import { Option, Select } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

type OptionType = {
  value: string;
  label: string;
};

interface DocumentTypeSelectProps {
  personType: string;
  fieldName: string;
  value?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  type?: string;
  [key: string]: any;
}

export const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  personType,
  value = "",
  setFieldValue,
  fieldName,
  type,
  ...rest
}) => {
  const { t } = useTranslation();

  const optionsPF: OptionType[] = [
    { value: "CPF", label: `${t("default.documentTypes.cpf")}` },
    { value: "RG", label: `${t("default.documentTypes.rg")}` },
    { value: "PASSPORT", label: `${t("default.documentTypes.passport")}` },
    {
      value: "DRIVER LICENSE",
      label: `${t("default.documentTypes.driverLicense")}`,
    },
    { value: "NATIONAL ID", label: "NATIONAL ID" },
    { value: "RNE", label: "RNE" },
  ];

  const optionsPJ: OptionType[] = [
    { value: "CNPJ", label: "CNPJ" },
    { value: "IBAN", label: "IBAN" },
  ];

  const options = personType === "Física" ? optionsPF : optionsPJ;

  return (
    <Select
      name={fieldName}
      id={fieldName}
      value={value}
      onChange={(selectedValue) => {
        setFieldValue(fieldName, selectedValue);
      }}
      label={`${t(
        "default.myAccount.client.generalData.labelDocumentType"
      )}${type}`}
      {...rest}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};
