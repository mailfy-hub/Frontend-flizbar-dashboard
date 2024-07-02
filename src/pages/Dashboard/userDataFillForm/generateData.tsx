import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { FormStepType } from ".";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { SectionTitle } from "../../../components/sectionTitle";
import { CountryType, countries } from "../../../utils/number-config";

import { useFormik } from "formik";
import * as Yup from "yup";

export const GenerateData = ({ handleConfirmationClick }: FormStepType) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );
  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  const validationSchema = Yup.object().shape({
    personType: Yup.string()
      .oneOf(["pf", "pj"])
      .required("Tipo de pessoa é obrigatório"),
    name: Yup.string().when("personType", {
      is: "pf",
      then(schema) {
        return schema.required("name is required");
      },
    }),
    birthDate: Yup.date().when("personType", {
      is: "pf",
      then(schema) {
        return schema.required("birth date is required");
      },
    }),
    nationality: Yup.string().required("nacionality is required"),
    documentType: Yup.string().required("doctype is required"),
    documentNumber: Yup.string().required("docnum is required"),
    gender: Yup.string().when("personType", {
      is: "pf",
      then(schema) {
        return schema.required("Must enter a gender");
      },
    }),
    phone: Yup.string().required("phone is required"),
    companyName: Yup.string().when("personType", {
      is: "pj",
      then(schema) {
        return schema.required("Must enter a company name");
      },
    }),
  });

  const formik = useFormik({
    initialValues: {
      personType: "pf",
      name: "",
      companyName: "",
      birthDate: "",
      documentType: "",
      documentNumber: "",
      gender: "",
      /* country: countries[0], */
      nationality: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      console.log(values)
      handleConfirmationClick(2)

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados gerais" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              id="name"
              value={formik.values.personType}
              onChange={(selectedOption) => {
                formik.setFieldValue("personType", selectedOption);
              }}
              label="Tipo de pessoa"
            >
              <Option value="pf">Física</Option>
              <Option value="pj">Jurídica</Option>
            </Select>
            {formik.values.personType == "pf" ? (
              <Input
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                label="Nome"
              />
            ) : (
              <Input
                name="companyName"
                id="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                type="text"
                label="Razão social"
              />
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {formik.values.personType == "pf" && (
              <Input
                name="birthDate"
                id="birthDate"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                type="date"
                label="Date de nascimento"
              />
            )}
            <Select
              name="nationality"
              id="nationality"
              value={formik.values.nationality}
              onChange={(selectedValue) => {
                formik.setFieldValue("nationality", selectedValue);
              }}
              label="Nacionalidade"
            >
              <Option value="brazil">Brasileiro</Option>
              <Option value="other">Outra</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              name="documentType"
              id="documentType"
              value={formik.values.documentType}
              onChange={(selectedValue) => {
                formik.setFieldValue("documentType", selectedValue);
              }}
              label="Tipo do documento"
            >
              <Option value="state-registration">Inscrição estadual</Option>
              <Option value="driver-license">Carteira de habilitação</Option>
              <Option value="passport">Passaporte</Option>
            </Select>
            <Input
              name="documentNumber"
              id="documentNumber"
              value={formik.values.documentNumber}
              onChange={formik.handleChange}
              type="text"
              label="Número do documento"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {formik.values.personType == "pf" && (
              <Select
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={(selectedValue) => {
                  formik.setFieldValue("gender", selectedValue);
                }}
                label="Gênero"
              >
                <Option value="man">Masculino</Option>
                <Option value="female">Feminino</Option>
                <Option value="not-declare">Prefiro não declarar</Option>
              </Select>
            )}
            <InputWithDropdown
              handleChangeCountry={handleSelectedCountry}
              selectedCountry={selectedCountry}
              value={formik.values.phone}
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button
          /* onClick={() => {
            handleConfirmationClick(1);
          }} */
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
        >
          Próxima etapa
        </Button>
      </div>
      <div className="mt-4">
        {Object.keys(formik.errors).length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Erros no formulário:</strong>
            <ul className="mt-2">
              {Object.values(formik.errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};
