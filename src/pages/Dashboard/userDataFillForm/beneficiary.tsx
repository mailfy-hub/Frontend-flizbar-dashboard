import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

import axios from "axios";
import { useFormik } from "formik";
import { FormEvent, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../client/api";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp", "pdf"];

export const Beneficiary = ({ handleConfirmationClick }: FormStepType) => {
  const [personDocumentFile, setPersonDocumentFile] = useState<File | null>(
    null
  );
  const [personDocumentFileError, setPersonDocumentFileError] =
    useState<string>("");

  const [proofAddressFile, setProofAddressFile] = useState<File | null>(null);
  const [proofAddressFileError, setProofAddressFileError] =
    useState<string>("");

  const [additionalFile, setAdditionalFile] = useState<File | null>(null);
  const [additionalFileError, _] = useState<string>("");

  const { profile } = useAuth();
  const [zipCodeData, setZipcodeData] =
    useState<dataAddressInformation | null>();

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
    fullName: "",
    email: "",
    RG: "",
    CPF: "",
    nationality: "",
    maritalStatus: "",
    profession: "",
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
    validateOnBlur: false,
    onSubmit: async (values) => {
      const isCheckedDocumentFile = handleCheckDocFiles(
        personDocumentFile,
        setPersonDocumentFileError,
        true
      );

      const isCheckedProofAddress = handleCheckDocFiles(
        proofAddressFile,
        setProofAddressFileError,
        true
      );

      if (!isCheckedProofAddress || !isCheckedDocumentFile) {
        return;
      }

      handlePostClientData(values);
      await uploadFile(personDocumentFile, profile?.id!, "personDocument");
      await uploadFile(proofAddressFile, profile?.id!, "proofAddress");

      if (additionalFile) {
        await uploadFile(additionalFile, profile?.id!, "additionalFile");
      }

      handleConfirmationClick();
    },
  });

  const handlePostClientData = async (data: FormValues) => {
    try {
      if (!data) return;
      await api.post("/profiles/beneficiaries", {
        clientId: profile?.id,
        ...data,
      });
      handleConfirmationClick();
    } catch (error) {
      console.log(error);
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

  const [isCheckedNotBeneficiary, setIsCheckedNotBeneficiary] = useState(false);

  const handleNotBeneficiaryNextStep = async (e: FormEvent) => {
    e.preventDefault();
    try {
      handleConfirmationClick();
      await handlePostClientData({
        fullName: "",
        email: "",
        RG: "",
        CPF: "",
        nationality: "",
        maritalStatus: "",
        profession: "",
        zipCode: "",
        city: "",
        state: "",
        street: "",
        number: "",
        neighborhood: "",
        complement: "",
        reference: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  const handleCheckDocFiles = (
    file: File | null,
    setError: React.Dispatch<React.SetStateAction<string>>,
    isRequired: boolean
  ): boolean => {
    if (!file) {
      if (!isRequired) {
        return true;
      }
      setError("Você precisa anexar um arquivo.");
      return false;
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !validFileExtensions.includes(fileExtension)) {
      setError(
        "Formato de arquivo não permitido. Apenas imagens (jpg, png, gif, svg) são aceitas."
      );
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "O arquivo excede o limite de 10MB. Tente fazer o upload de um arquivo menor."
      );
      return false;
    }

    setError("");
    return true;
  };

  const uploadFile = async (
    file: File | null,
    clientId: string,
    docName: string
  ): Promise<void> => {
    if (!file) return;

    const formData = new FormData();

    const data = {
      clientId: clientId,
      name: docName,
      identifier: "beneficiary",
    };

    formData.append("file", file);
    formData.append("data", JSON.stringify(data));

    try {
      const response = await api.post("/attachment/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`${data} uploaded:`, response.data);
    } catch (error) {
      console.error(`Error uploading ${data}:`, error);
    }
  };

  return (
    <form
      onSubmit={
        isCheckedNotBeneficiary
          ? handleNotBeneficiaryNextStep
          : formik.handleSubmit
      }
    >
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div>
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle size="sm" text="Beneficiário" />
          </div>
          <p className="mt-2 font-body text-body14 text-GRAY_400">
            Se desejar, inclua as informações de uma pessoa ou entidade que
            receberá benefícios ou terá direitos associados.
          </p>
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
        <div>
          {!isCheckedNotBeneficiary && (
            <div>
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
                    {formik.touched.nationality &&
                      formik.errors.nationality && (
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
                    {formik.touched.maritalStatus &&
                      formik.errors.maritalStatus && (
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
                        <Typography
                          className="mt-2"
                          variant={"small"}
                          color={"red"}
                        >
                          {mappedError}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
                {formik.values.zipCode.length === 8 &&
                  zipCodeData?.localidade && (
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
                {formik.values.zipCode.length === 8 &&
                  zipCodeData?.localidade && (
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
                        {formik.touched.neighborhood &&
                          formik.errors.neighborhood && (
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
                        {formik.touched.complement &&
                          formik.errors.complement && (
                            <Typography variant="small" color="red">
                              {formik.errors.complement}
                            </Typography>
                          )}
                      </div>
                    </div>
                  )}
                {formik.values.zipCode.length === 8 &&
                  zipCodeData?.localidade && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Input
                          id="reference"
                          type="text"
                          label="Referência"
                          onChange={formik.handleChange}
                          value={formik.values.reference}
                        />
                        {formik.touched.reference &&
                          formik.errors.reference && (
                            <Typography variant="small" color="red">
                              {formik.errors.reference}
                            </Typography>
                          )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isCheckedNotBeneficiary && (
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:link-20-solid"} color="black" />
            <SectionTitle size="sm" text="Anexos" />
          </div>
          <div className="mt-8 flex flex-col gap-8">
            <div>
              <div>
                <p className="font-display text-body16 font-semibold text-BLACK">
                  Documento RG ou CPF
                </p>
                {personDocumentFileError && (
                  <p className="text-red-500 text-body16 font-semibold">
                    {personDocumentFileError}
                  </p>
                )}
              </div>

              {personDocumentFile ? (
                <div className="px-8 py-8 mt-4 group relative w-full md:h-[124px] rounded-md border-[1px] border-gray-400 border-dashed  transition-all flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <p>{personDocumentFile?.name}</p>

                    <div className="flex items-center gap-2">
                      <Icon
                        height={16}
                        icon={"heroicons:check-circle"}
                        className="text-green-500"
                      />
                      <p className="text-body16 font-semibold text-green-500">
                        Arquivo carregado com sucesso
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full md:w-auto mt-4 md:mt-0"
                    type="button"
                    onClick={() => {
                      setPersonDocumentFile(null);
                    }}
                  >
                    Clique aqui para remover
                  </Button>
                </div>
              ) : (
                <div className="mt-4 group relative w-full h-[124px] rounded-md border-[1px] border-gray-400 border-dashed hover:border-GOLD_MAIN transition-all flex justify-center items-center gap-2">
                  <Icon
                    height={18}
                    icon={"heroicons:document-arrow-down"}
                    className="text-GRAY_400 group-hover:text-GOLD_MAIN"
                  />
                  <p className="text-body18 text-GRAY_400 font-display group-hover:text-BLACK">
                    Clique aqui para selecionar seu arquivo
                  </p>
                  <input
                    className="absolute opacity-0 top-0 right-0 bottom-0 left-0 cursor-pointer"
                    type="file"
                    name="personDocument"
                    id="personDocument"
                    onChange={(event) => {
                      if (!event.currentTarget.files) return;
                      setPersonDocumentFile(event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <div>
                <p className="font-display text-body16 font-semibold text-BLACK">
                  Comprovante de residência
                </p>
                {proofAddressFileError && (
                  <p className="text-red-500 text-body16 font-semibold">
                    {proofAddressFileError}
                  </p>
                )}
              </div>

              {proofAddressFile ? (
                <div className="px-8 py-8 mt-4 group relative w-full md:h-[124px] rounded-md border-[1px] border-gray-400 border-dashed  transition-all flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <p>{proofAddressFile?.name}</p>

                    <div className="flex items-center gap-2">
                      <Icon
                        height={16}
                        icon={"heroicons:check-circle"}
                        className="text-green-500"
                      />
                      <p className="text-body16 font-semibold text-green-500">
                        Arquivo carregado com sucesso
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full md:w-auto mt-4 md:mt-0"
                    type="button"
                    onClick={() => {
                      setProofAddressFile(null);
                    }}
                  >
                    Clique aqui para remover
                  </Button>
                </div>
              ) : (
                <div className="mt-4 group relative w-full h-[124px] rounded-md border-[1px] border-gray-400 border-dashed hover:border-GOLD_MAIN transition-all flex justify-center items-center gap-2">
                  <Icon
                    height={18}
                    icon={"heroicons:document-arrow-down"}
                    className="text-GRAY_400 group-hover:text-GOLD_MAIN"
                  />
                  <p className="text-body18 text-GRAY_400 font-display group-hover:text-BLACK">
                    Clique aqui para selecionar seu arquivo
                  </p>
                  <input
                    className="absolute opacity-0 top-0 right-0 bottom-0 left-0 cursor-pointer"
                    type="file"
                    name="personDocument"
                    id="personDocument"
                    onChange={(event) => {
                      if (!event.currentTarget.files) return;
                      setProofAddressFile(event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <div>
                <p className="font-display text-body16 font-semibold text-BLACK">
                  Documento complementar (Quando houver)
                </p>
                {additionalFileError && (
                  <p className="text-red-500 text-body16 font-semibold">
                    {additionalFileError}
                  </p>
                )}
              </div>

              {additionalFile ? (
                <div className="px-8 py-8 mt-4 group relative w-full md:h-[124px] rounded-md border-[1px] border-gray-400 border-dashed  transition-all flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <p>{additionalFile?.name}</p>

                    <div className="flex items-center gap-2">
                      <Icon
                        height={16}
                        icon={"heroicons:check-circle"}
                        className="text-green-500"
                      />
                      <p className="text-body16 font-semibold text-green-500">
                        Arquivo carregado com sucesso
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full md:w-auto mt-4 md:mt-0"
                    type="button"
                    onClick={() => {
                      setAdditionalFile(null);
                    }}
                  >
                    Clique aqui para remover
                  </Button>
                </div>
              ) : (
                <div className="mt-4 group relative w-full h-[124px] rounded-md border-[1px] border-gray-400 border-dashed hover:border-GOLD_MAIN transition-all flex justify-center items-center gap-2">
                  <Icon
                    height={18}
                    icon={"heroicons:document-arrow-down"}
                    className="text-GRAY_400 group-hover:text-GOLD_MAIN"
                  />
                  <p className="text-body18 text-GRAY_400 font-display group-hover:text-BLACK">
                    Clique aqui para selecionar seu arquivo
                  </p>
                  <input
                    className="absolute opacity-0 top-0 right-0 bottom-0 left-0 cursor-pointer"
                    type="file"
                    name="additionalDocument"
                    id="additionalDocument"
                    onChange={(event) => {
                      if (!event.currentTarget.files) return;
                      setAdditionalFile(event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end mt-8">
        <Button className="bg-GOLD_MAIN w-full md:w-auto" type="submit">
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
