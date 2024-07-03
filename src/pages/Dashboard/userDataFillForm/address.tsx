import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InferType } from "yup";
import { FormStepType } from ".";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";

export const Address = ({ handleConfirmationClick }: FormStepType) => {
  const { userData, profile } = useAuth();
  const validationSchema = Yup.object().shape({
    addressType: Yup.string().required("Tipo de endereço é obrigatório"),
    zipCode: Yup.string().required("CEP é obrigatório"),
    city: Yup.string().required("Cidade é obrigatória"),
    state: Yup.string().required("Estado é obrigatório"),
    street: Yup.string().required("Logradouro é obrigatório"),
    number: Yup.string().required("Número é obrigatório"),
    neighborhood: Yup.string().required("Bairro é obrigatório"),
    complement: Yup.string(),
    reference: Yup.string(),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    addressType: "",
    zipCode: "",
    city: "",
    state: "",
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    reference: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handlePostAddressInformation(values);
    },
  });

  const handlePostAddressInformation = async (data: FormValues) => {
    try {
      const dataFormatted = {
        clientId: profile?.id,
        documentNumber: profile?.clientDetails?.document,
        ...data
      }
      await api.post(`profiles/${userData?.id}/address`, dataFormatted);
      handleConfirmationClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:map-pin"} color="black" />
          <SectionTitle size="sm" text="Endereço" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              id="addressType"
              label="Tipo do endereço"
              onChange={(selectedValue) =>
                formik.setFieldValue("addressType", selectedValue)
              }
              value={formik.values.addressType}
            >
              <Option value="Residencial">Residencial</Option>
              <Option value="Comercial">Comercial</Option>
              <Option value="Outro">Outro</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Input
              id="zipCode"
              type="text"
              label="Cep"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
            />
            <Input
              id="city"
              type="text"
              label="Cidade"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <Select
              id="state"
              label="Estado"
              onChange={(selectedValeu) =>
                formik.setFieldValue("state", selectedValeu)
              }
              value={formik.values.state}
            >
              <Option value="SP">São Paulo</Option>
              <Option value="RJ">Rio de Janeiro</Option>
              <Option value="MG">Minas Gerais</Option>
              {/* Add more states as needed */}
            </Select>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Input
              id="street"
              type="text"
              label="Logradouro"
              onChange={formik.handleChange}
              value={formik.values.street}
            />
            <Input
              id="number"
              type="text"
              label="Número"
              onChange={formik.handleChange}
              value={formik.values.number}
            />
            <Input
              id="neighborhood"
              type="text"
              label="Bairro"
              onChange={formik.handleChange}
              value={formik.values.neighborhood}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              id="complement"
              type="text"
              label="Complemento"
              onChange={formik.handleChange}
              value={formik.values.complement}
            />
            <Input
              id="reference"
              type="text"
              label="Referência"
              onChange={formik.handleChange}
              value={formik.values.reference}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button className="bg-GOLD_MAIN w-full md:w-auto" type="submit">
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
