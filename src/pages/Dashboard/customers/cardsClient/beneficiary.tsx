import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { SectionTitle } from "../../../../components/sectionTitle";

import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../../client/api";

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

export const Beneficiary = ({ userData }: any) => {
  const profile = userData;
  const [isCheckedNotBeneficiary, setIsCheckedNotBeneficiary] = useState(
    profile?.beneficiaries[0].fullName === "" ? true : false
  );

  const validationSchema = Yup.object().shape({
    nationality: Yup.string().required("nacionality is required"),
    maritalStatus: Yup.string().required("Estado civil é obrigatório"),
    profession: Yup.string().required("Qual sua profissão é obrigatória"),
    zipCode: Yup.string().required("CEP é obrigatório"),
    city: Yup.string().required("Cidade é obrigatória"),
    state: Yup.string().required("Estado é obrigatório"),
    street: Yup.string().required("Logradouro é obrigatório"),
    number: Yup.string().required("Número é obrigatório"),
    neighborhood: Yup.string().required("Bairro é obrigatório"),
    complement: Yup.string(),
    reference: Yup.string(),
    fullName: Yup.string().required("Nome completo é obrigatório."),
    RG: Yup.string().required("RG é obrigatório."),
    CPF: Yup.string().required("CPF é obrigatório."),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("E-mail é obrigatório."),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    fullName: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].fullName
      : "",
    email: profile?.beneficiaries[0] ? profile?.beneficiaries[0].email : "",
    RG: profile?.beneficiaries[0] ? profile?.beneficiaries[0].RG : "",
    CPF: profile?.beneficiaries[0] ? profile?.beneficiaries[0].CPF : "",
    nationality: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].nationality
      : "",
    maritalStatus: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].maritalStatus
      : "",
    profession: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].profession
      : "",
    zipCode: profile?.beneficiaries[0] ? profile?.beneficiaries[0].zipCode : "",
    city: profile?.beneficiaries[0] ? profile?.beneficiaries[0].city : "",
    state: profile?.beneficiaries[0] ? profile?.beneficiaries[0].state : "",
    street: profile?.beneficiaries[0] ? profile?.beneficiaries[0].street : "",
    number: profile?.beneficiaries[0] ? profile?.beneficiaries[0].number : "",
    neighborhood: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].neighborhood
      : "",
    complement: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].complement
      : "",
    reference: profile?.beneficiaries[0]
      ? profile?.beneficiaries[0].reference
      : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      handlePutClientData(values);
    },
  });

  const handlePutClientData = async (data: FormValues) => {
    try {
      if (!data) return;
      await api.put(`/profiles/beneficiaries/${profile?.beneficiaries[0].id}`, {
        clientId: profile?.id,
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

  const handleChangeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setzipcodeGetError("");
    const zipCode = event.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue("zipCode", zipCode);
    if (zipCode.length == 8) {
      handleGetAddressByZipCode(zipCode);
    }
  };

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

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md ">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Beneficiário" />
        </div>
        <div>
          <div className="flex items-center gap-2 mt-4">
            <Checkbox
              onChange={(e) => {
                setIsCheckedNotBeneficiary(e.target.checked);
              }}
              label={"Não desejo adicionar um beneficiário"}
              defaultChecked={isCheckedNotBeneficiary}
            />
          </div>
        </div>
        {!isCheckedNotBeneficiary && (
          <>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="fullName"
                    id="fullName"
                    type="text"
                    label="Nome"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <Typography variant="small" color="red">
                      {formik.errors.fullName}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    label="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    name="RG"
                    id="RG"
                    type="text"
                    label="RG"
                    value={formik.values.RG}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.RG && formik.errors.RG && (
                    <Typography variant="small" color="red">
                      {formik.errors.RG}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    name="CPF"
                    id="CPF"
                    type="text"
                    label="CPF"
                    maxLength={11}
                    minLength={11}
                    value={formik.values.CPF}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.CPF && formik.errors.CPF && (
                    <Typography variant="small" color="red">
                      {formik.errors.CPF}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Select
                    name="nationality"
                    id="nationality"
                    value={formik.values.nationality}
                    onChange={(selectedValue) => {
                      formik.setFieldValue("nationality", selectedValue);
                    }}
                    label="Nacionalidade"
                  >
                    <Option value="Brasileiro">Brasileiro</Option>
                    <Option value="Português">Português</Option>
                    <Option value="Argentino">Argentino</Option>
                    <Option value="Iraniano">Iraniano</Option>
                    <Option value="Americano">Americano</Option>
                    <Option value="Inglês">Inglês</Option>
                    <Option value="Espanhol">Espanhol</Option>
                    <Option value="Outra">Outra</Option>
                  </Select>
                  {formik.touched.nationality && formik.errors.nationality && (
                    <Typography variant="small" color="red">
                      {formik.errors.nationality}
                    </Typography>
                  )}
                </div>
                <div>
                  <Select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formik.values.maritalStatus}
                    onChange={(selectedValue) =>
                      formik.setFieldValue("maritalStatus", selectedValue)
                    }
                    label="Estado civil"
                  >
                    <Option value="Solteiro(a)">Solteiro(a)</Option>
                    <Option value="Casado(a)">Casado(a)</Option>
                    <Option value="Divorciado(a)">Divorciado(a)</Option>
                    <Option value="Viúvo(a)">Viúvo(a)</Option>
                    <Option value="União estável">União estável</Option>
                    <Option value="Outro">Outro</Option>
                  </Select>
                  {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                    <Typography variant="small" color="red">
                      {formik.errors.maritalStatus}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Input
                    value={formik.values.profession}
                    id="profession"
                    name="profession"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    label="Qual sua profissão?"
                  />
                  {formik.touched.profession && formik.errors.profession && (
                    <Typography variant="small" color="red">
                      {formik.errors.profession}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-12">
              <Icon height={16} icon={"heroicons:map-pin"} color="black" />
              <SectionTitle size="sm" text="Endereço do Beneficiário" />
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
              {formik.values.zipCode.length === 8 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      id="city"
                      type="text"
                      label="Cidade"
                      onChange={formik.handleChange}
                      value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <Typography variant="small" color="red">
                        {formik.errors.city}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <Select
                      id="state"
                      label="Estado"
                      onChange={(selectedValue) =>
                        formik.setFieldValue("state", selectedValue)
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
                    {formik.touched.state && formik.errors.state && (
                      <Typography variant="small" color="red">
                        {formik.errors.state}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <Input
                      id="street"
                      type="text"
                      label="Logradouro"
                      onChange={formik.handleChange}
                      value={formik.values.street}
                    />
                    {formik.touched.street && formik.errors.street && (
                      <Typography variant="small" color="red">
                        {formik.errors.street}
                      </Typography>
                    )}
                  </div>
                </div>
              )}
              {formik.values.zipCode.length === 8 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      id="number"
                      type="text"
                      label="Número"
                      onChange={formik.handleChange}
                      value={formik.values.number}
                    />
                    {formik.touched.number && formik.errors.number && (
                      <Typography variant="small" color="red">
                        {formik.errors.number}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <Input
                      id="neighborhood"
                      type="text"
                      label="Bairro"
                      onChange={formik.handleChange}
                      value={formik.values.neighborhood}
                    />
                    {formik.touched.neighborhood && formik.errors.neighborhood && (
                      <Typography variant="small" color="red">
                        {formik.errors.neighborhood}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <Input
                      id="complement"
                      type="text"
                      label="Complemento"
                      onChange={formik.handleChange}
                      value={formik.values.complement}
                    />
                    {formik.touched.complement && formik.errors.complement && (
                      <Typography variant="small" color="red">
                        {formik.errors.complement}
                      </Typography>
                    )}
                  </div>
                </div>
              )}
              {formik.values.zipCode.length === 8 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Input
                      id="reference"
                      type="text"
                      label="Referência"
                      onChange={formik.handleChange}
                      value={formik.values.reference}
                    />
                    {formik.touched.reference && formik.errors.reference && (
                      <Typography variant="small" color="red">
                        {formik.errors.reference}
                      </Typography>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
        
      <div className="w-full flex justify-end mt-8">
        <Button className="bg-GOLD_MAIN w-full md:w-auto" type="submit">
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
