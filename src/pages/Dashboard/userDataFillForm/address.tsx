import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import { InferType } from "yup";
import { FormStepType } from ".";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";

interface dataAddressInformation {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  unidade: string;
}

export const Address = ({ handleConfirmationClick }: FormStepType) => {
  const { userData, profile, updateProfileAddress } = useAuth();
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

  const [zipCodeData, setZipcodeData] =
    useState<dataAddressInformation | null>();
  const initialValues: FormValues = {
    addressType: "",
    zipCode: "",
    city: zipCodeData?.localidade ? zipCodeData.localidade : "",
    state: zipCodeData?.uf ? zipCodeData.uf : "",
    street: zipCodeData?.logradouro ? zipCodeData.logradouro : "",
    number: "",
    neighborhood: zipCodeData?.bairro ? zipCodeData.bairro : "",
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
        ...data,
      };
      await api.post(`profiles/${userData?.id}/address`, dataFormatted);
      updateProfileAddress({
        addressType: data.addressType,
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        complement: data.complement ? data.complement : "",
        reference: data.reference ? data.reference : "",
      });
      handleConfirmationClick();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setzipcodeGetError("");
    const zipCode = event.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue("zipCode", zipCode);
    if (zipCode.length == 8) {
      handleGetAddressByZipCode(zipCode);
    }
  };

  const [isLoadingZipcodeData, setIsLoadingZipcodeData] = useState(false);
  const [zipcodeGetError, setzipcodeGetError] = useState<string | null>();
  const mappedError = useMemo(() => {
    switch (zipcodeGetError) {
      case "zip code not found":
        return "Cep não encontrado";
      default:
        "Erro de servidor, tente novamente ou retorne mais tarde.";
        break;
    }
  }, [zipcodeGetError]);

  const handleGetAddressByZipCode = async (zipCode: string) => {
    try {
      setIsLoadingZipcodeData(true);
      const { data } = await axios.get<dataAddressInformation>(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );

      if (!data.localidade) {
        setZipcodeData(null);
        throw new Error("zip code not found");
      }

      setZipcodeData(data);

      formik.setFieldValue("city", data.localidade);
      formik.setFieldValue("state", data.uf);
      formik.setFieldValue("street", data.logradouro);
      formik.setFieldValue("neighborhood", data.bairro);
    } catch (error: Error | any) {
      setzipcodeGetError(error?.message);
    } finally {
      setIsLoadingZipcodeData(false);
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
          <div className=" gap-6">
            <div>
              <div className="flex items-center gap-8">
                <div className="md:max-w-[448px]">
                  <Input
                    id="zipCode"
                    type="text"
                    label="Cep"
                    maxLength={8}
                    minLength={8}
                    onChange={handleChangeZipcode}
                    value={formik.values.zipCode}
                    className="w-full"
                  />
                </div>

                {isLoadingZipcodeData && (
                  <div>
                    <Typography
                      className="mt-2"
                      variant={"small"}
                      color={"black"}
                    >
                      Carregando dados do CEP...
                    </Typography>
                  </div>
                )}
              </div>

              {zipcodeGetError && (
                <div>
                  <Typography className="mt-2" variant={"small"} color={"red"}>
                    {mappedError}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          {formik.values.zipCode.length == 8 && zipCodeData?.localidade && (
            <div className="grid md:grid-cols-3 gap-6">
              <Select
                id="addressType"
                label="Tipo do endereço"
                onChange={(selectedValue) =>
                  formik.setFieldValue("addressType", selectedValue)
                }
                value={formik.values.addressType}
                error={formik.touched.addressType && Boolean(formik.errors.addressType)}
              >
                <Option value="Residencial">Residencial</Option>
                <Option value="Comercial">Comercial</Option>
                <Option value="Outro">Outro</Option>
              </Select>
              <Input
                id="city"
                type="text"
                label="Cidade"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
              />
              <Select
                id="state"
                label="Estado"
                onChange={(selectedValeu) =>
                  formik.setFieldValue("state", selectedValeu)
                }
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
              >
                <Option value="AC">AC</Option>
                <Option value="AL">AL</Option>
                <Option value="AP">AP</Option>
                <Option value="AM">AM</Option>
                <Option value="BA">BA</Option>
                <Option value="CE">CE</Option>
                <Option value="DF">DF</Option>
                <Option value="ES">ES</Option>
                <Option value="GO">GO</Option>
                <Option value="MA">MA</Option>
                <Option value="MT">MT</Option>
                <Option value="MS">MS</Option>
                <Option value="MG">MG</Option>
                <Option value="PA">PA</Option>
                <Option value="PB">PB</Option>
                <Option value="PR">PR</Option>
                <Option value="PE">PE</Option>
                <Option value="PI">PI</Option>
                <Option value="RJ">RJ</Option>
                <Option value="RN">RN</Option>
                <Option value="RS">RS</Option>
                <Option value="RO">RO</Option>
                <Option value="RR">RR</Option>
                <Option value="SC">SC</Option>
                <Option value="SP">SP</Option>
                <Option value="SE">SE</Option>
                <Option value="TO">TO</Option>
              </Select>
            </div>
          )}
          {formik.values.zipCode.length == 8 && zipCodeData?.localidade && (
            <div className="grid md:grid-cols-3 gap-6">
              <Input
                id="street"
                type="text"
                label="Logradouro"
                onChange={formik.handleChange}
                value={formik.values.street}
                error={formik.touched.street && Boolean(formik.errors.street)}
              />
              <Input
                id="number"
                type="text"
                label="Número"
                onChange={formik.handleChange}
                value={formik.values.number}
                error={formik.touched.number && Boolean(formik.errors.number)}
              />
              <Input
                id="neighborhood"
                type="text"
                label="Bairro"
                onChange={formik.handleChange}
                value={formik.values.neighborhood}
                error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
              />
            </div>
          )}
          {formik.values.zipCode.length == 8 && zipCodeData?.localidade && (
            <div className="grid md:grid-cols-3 gap-6">
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
          )}
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
