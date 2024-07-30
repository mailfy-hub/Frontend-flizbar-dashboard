import { Option, Select } from "@material-tailwind/react";

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
  [key: string]: any
}

export const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  personType,
  value = "",
  setFieldValue,
  fieldName,
  type,
  ...rest
}) => {
  const optionsPF: OptionType[] = [
    { value: "CPF", label: "CPF" },
    { value: "RG", label: "RG" },
    { value: "PASSAPORTE", label: "PASSAPORTE" },
    { value: "CARTEIRA DE HABILITAÇÃO", label: "CARTEIRA DE HABILITAÇÃO" },
    { value: "NATIONAL ID", label: "NATIONAL ID" },
    { value: "RNE", label: "RNE" },
  ];

  const optionsPJ: OptionType[] = [
    { value: "CNPJ", label: "CNPJ" },
    { value: "IBAN", label: "IBAN" },
  ];

  const options = personType === "pf" ? optionsPF : optionsPJ;

  return (
    <Select
      name={fieldName}
      id={fieldName}
      value={value}
      onChange={(selectedValue) => {
        setFieldValue(fieldName, selectedValue);
      }}
      label={`Tipo do documento${type}`}
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
