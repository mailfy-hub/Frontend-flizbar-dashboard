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
import { toast } from "react-toastify";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

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

export const AddressData = ({ userData }: any) => {
  const { t } = useTranslation();
  const profile = userData;

  const validationSchema = Yup.object().shape({
    addressType: Yup.string().required(
      `${t("default.error.addressTypeRequired")}`
    ),
    zipCode: Yup.string().required(`${t("default.error.zipCodeRequired")}`),
    city: Yup.string().required(`${t("default.error.cityRequired")}`),
    state: Yup.string().required(`${t("default.error.stateRequired")}`),
    street: Yup.string().required(`${t("default.error.streetRequired")}`),
    number: Yup.string().required(`${t("default.error.numberRequired")}`),
    neighborhood: Yup.string().required(
      `${t("default.error.neighborhoodRequired")}`
    ),
    complement: Yup.string(),
    reference: Yup.string(),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    addressType: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].addressType
      : "",
    zipCode: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].zipCode
      : "",
    city: profile?.clientAddresses[0] ? profile?.clientAddresses[0].city : "",
    state: profile?.clientAddresses[0] ? profile?.clientAddresses[0].state : "",
    street: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].street
      : "",
    number: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].number
      : "",
    neighborhood: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].neighborhood
      : "",
    complement: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].complement
      : "",
    reference: profile?.clientAddresses[0]
      ? profile?.clientAddresses[0].reference
      : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handlePutAddressInformation(values);
    },
  });

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
        throw new Error("zip code not found");
      }

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

  const handlePutAddressInformation = async (data: FormValues) => {
    try {
      const dataFormatted = {
        clientId: profile?.id,
        ...data,
      };
      await api.put(
        `profiles/address/${profile?.clientAddresses[0].id}`,
        dataFormatted
      );
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
      className="bg-WHITE p-8 w-full rounded-md"
    >
      <div className="flex items-center gap-4">
        <Icon height={16} icon={"heroicons:map-pin"} color="black" />
        <SectionTitle
          size="sm"
          text={t("default.myAccount.client.address.title")}
        />
      </div>

      <div className="mt-8 flex flex-col gap-6 ">
        <div className=" gap-6">
          <div>
            <div className="flex items-center gap-8">
              <div className="md:max-w-[448px]">
                <Input
                  id="zipCode"
                  type="text"
                  label={t("default.myAccount.client.address.zipCode")}
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
                    {t("default.loadingZipCodeData")}
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
        {formik.values.zipCode.length == 8 && (
          <div className="grid md:grid-cols-3 gap-6">
            <Select
              id="addressType"
              label={t("default.addressType.title")}
              onChange={(selectedValue) =>
                formik.setFieldValue("addressType", selectedValue)
              }
              value={formik.values.addressType}
            >
              <Option value="Residential">
                {t("default.addressType.residential")}
              </Option>
              <Option value="Commercial">
                {t("default.addressType.commercial")}
              </Option>
              <Option value="Other">{t("default.addressType.other")}</Option>
            </Select>
            <Input
              id="city"
              type="text"
              label={t("default.myAccount.client.address.city")}
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <Select
              id="state"
              label={t("default.myAccount.client.address.state")}
              onChange={(selectedValeu) =>
                formik.setFieldValue("state", selectedValeu)
              }
              value={formik.values.state}
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
        {formik.values.zipCode.length == 8 && (
          <div className="grid md:grid-cols-3 gap-6">
            <Input
              id="street"
              type="text"
              label={t("default.myAccount.client.address.street")}
              onChange={formik.handleChange}
              value={formik.values.street}
            />
            <Input
              id="number"
              type="text"
              label={t("default.myAccount.client.address.number")}
              onChange={formik.handleChange}
              value={formik.values.number}
            />
            <Input
              id="neighborhood"
              type="text"
              label={t("default.myAccount.client.address.neighborhood")}
              onChange={formik.handleChange}
              value={formik.values.neighborhood}
            />
          </div>
        )}
        {formik.values.zipCode.length == 8 && (
          <div className="grid md:grid-cols-3 gap-6">
            <Input
              id="complement"
              type="text"
              label={t("default.myAccount.client.address.complement")}
              onChange={formik.handleChange}
              value={formik.values.complement}
            />
            <Input
              id="reference"
              type="text"
              label={t("default.myAccount.client.address.reference")}
              onChange={formik.handleChange}
              value={formik.values.reference}
            />
          </div>
        )}
      </div>
      <div className="w-full flex justify-start mt-8">
        <Button className="bg-GOLD_MAIN w-full md:w-auto" type="submit">
          {t("default.myAccount.client.buttonUpdateData")}
        </Button>
      </div>
    </form>
  );
};
