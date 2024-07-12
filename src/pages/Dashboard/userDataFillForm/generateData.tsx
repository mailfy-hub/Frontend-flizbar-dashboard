import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../client/api";
import { useAuth } from "../../../hook/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp", "pdf"];

export const GenerateData = ({ handleConfirmationClick }: FormStepType) => {
  const { userData, profile } = useAuth();

  const [personDocumentFile, setPersonDocumentFile] = useState<File | null>(
    null
  );
  const [personDocumentFileError, setPersonDocumentFileError] =
    useState<string>("");

  const [businessDocumentFile, setbusinessDocumentFile] = useState<File | null>(
    null
  );
  const [businessDocumentFileError, setbusinessDocumentFileError] =
    useState<string>("");

  const [proofAddressFile, setProofAddressFile] = useState<File | null>(null);
  const [proofAddressFileError, setProofAddressFileError] =
    useState<string>("");

  const [additionalFile, setAdditionalFile] = useState<File | null>(null);
  const [additionalFileError, _] = useState<string>("");

  const validationSchema = Yup.object().shape({
    personType: Yup.string()
      .oneOf(["pf", "pj"])
      .required("Tipo de pessoa é obrigatório"),
    /* name: Yup.string().when("personType", {
      is: "pf",
      then(schema) {
        return schema.required("name is required");
      },
    }), */
    birthDate: Yup.date().when("personType", {
      is: "pf",
      then(schema) {
        return schema.required("birth date is required");
      },
    }),
    nationality: Yup.string().required("nacionality is required"),
    documentType: Yup.string().required("doctype is required"),
    document: Yup.string().required("docnum is required"),
    gender: Yup.string().when("personType", {
      is: "pf",
      then(schema) {
        return schema.required("Must enter a gender");
      },
    }),
    /* personalPhone: Yup.string().required("personalPhone is required"), */
    corporateName: Yup.string().when("personType", {
      is: "pj",
      then(schema) {
        return schema.required("Must enter a company name");
      },
    }),
    fatherName: Yup.string().required("Nome do pai é obrigatório"),
    motherName: Yup.string().required("Nome da mãe é obrigatório"),
    maritalStatus: Yup.string().required("Estado civil é obrigatório"),
    education: Yup.string().required("Escolaridade é obrigatória"),
    politicalPerson: Yup.string().required(
      "Pessoa politicamente exposta é obrigatório"
    ),
    profession: Yup.string().required("Qual sua profissão é obrigatória"),
    declaresUsTaxes: Yup.string().required("Campo obrigatório"),
    spouseName: Yup.string().when("maritalStatus", {
      is: "Stable Union",
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
    spouseDocumentType: Yup.string().when("maritalStatus", {
      is: "Stable Union" || "Married",
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
    spousedocument: Yup.string().when("maritalStatus", {
      is: "Stable Union",
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    personType: "pf",
    corporateName: "",
    birthDate: new Date(),
    documentType: "",
    document: "",
    gender: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    education: "",
    politicalPerson: "",
    profession: "",
    declaresUsTaxes: "",
    spouseName: "",
    spouseDocumentType: "",
    spousedocument: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const isCheckedDocumentFile =
        values.personType === "pf"
          ? handleCheckDocFiles(
              personDocumentFile,
              setPersonDocumentFileError,
              true
            )
          : handleCheckDocFiles(
              businessDocumentFile,
              setbusinessDocumentFileError,
              true
            );

      const isCheckedProofAddress = handleCheckDocFiles(
        proofAddressFile,
        setProofAddressFileError,
        true
      );


      if (!isCheckedProofAddress || !isCheckedDocumentFile) return;
      handlePostClientData(values);
    },
  });

  const handlePostClientData = async (data: FormValues) => {
    try {
      if (!userData) return;

      const formattedDate = data?.birthDate && new Date(data.birthDate);

      const mappedDataToServer = {
        ...data,
        profileId: userData.id,
        birthDate: formattedDate,
        politicalPerson: data.politicalPerson == "true" ? true : false,
        declaresUsTaxes: data.declaresUsTaxes == "true" ? true : false,
        spouseDetails:
          data.maritalStatus == "Stable Union" ||
          data.maritalStatus == "Married"
            ? {
                spouseName: data.spouseName,
                spouseDocumentType: data.spouseDocumentType,
                spousedocument: data.spousedocument,
              }
            : {},
        spouse:
          data.maritalStatus == "Stable Union" ||
          data.maritalStatus == "Married"
            ? true
            : false,
      };
      delete mappedDataToServer.spouseName;
      delete mappedDataToServer.spouseDocumentType;
      delete mappedDataToServer.spousedocument;

      await api.post(`/profiles/${userData.id}/details`, mappedDataToServer);

      if (data.personType === "pf") {
        await uploadFile(personDocumentFile, profile?.id!, "personDocument");
      } else {
        await uploadFile(
          businessDocumentFile,
          profile?.id!,
          "businessDocument"
        );
      }

      await uploadFile(proofAddressFile, profile?.id!, "proofAddress");

      if (additionalFile) {
        await uploadFile(additionalFile, profile?.id!, "additionalFile");
      }

     handleConfirmationClick();
    } catch (error) {
      console.log(error);
    }
  };

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
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados gerais" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              id="personType"
              name="personType"
              value={formik.values.personType}
              onChange={(selectedOption) => {
                console.log(selectedOption);
                formik.setFieldValue("personType", selectedOption);
              }}
              label="Tipo de pessoa"
            >
              <Option value="pf">Física</Option>
              <Option value="pj">Jurídica</Option>
              {/*  <Option value="pj">Jurídica</Option> */}
            </Select>
            {formik.values.personType == "pf" ? (
              <Input
                name="name"
                id="name"
                value={`${userData?.name} ${userData?.surname}`}
                type="text"
                label="Nome"
                disabled
              />
            ) : (
              <Input
                name="corporateName"
                id="corporateName"
                value={formik.values.corporateName}
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
                value={formik.values.birthDate?.toString()}
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
              <Option value="Brasileiro">Brasileiro</Option>
              <Option value="Outra">Outra</Option>
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
              <Option value="Inscrição estadual">Inscrição estadual</Option>
              <Option value="Carteira de habilitação">
                Carteira de habilitação
              </Option>
              <Option value="Passaporte">Passaporte</Option>
            </Select>
            <Input
              name="document"
              id="document"
              value={formik.values.document}
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
                <Option value="Masculino">Masculino</Option>
                <Option value="Feminino">Feminino</Option>
                <Option value="Prefiro não declarar">
                  Prefiro não declarar
                </Option>
              </Select>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-8">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Dados complementares" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              id="fatherName"
              name="fatherName"
              value={formik.values.fatherName}
              onChange={formik.handleChange}
              type="text"
              label="Nome do pai"
            />
            <Input
              id="motherName"
              name="motherName"
              value={formik.values.motherName}
              onChange={formik.handleChange}
              type="text"
              label="Nome da mãe"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
            <Select
              id="education"
              name="education"
              value={formik.values.education}
              onChange={(selectedValue) =>
                formik.setFieldValue("education", selectedValue)
              }
              label="Escolaridade"
            >
              <Option value="Ensino médio incompleto">
                Ensino médio incompleto
              </Option>
              <Option value="Ensino médio completo">
                Ensino médio completo
              </Option>
              <Option value="Curso técnico">Curso técnico</Option>
              <Option value="Bacharelado Incompleto">
                Bacharelado Incompleto
              </Option>
              <Option value="Bacherelado Completo">Bacherelado Completo</Option>
              <Option value="Pós-graduação">Pós-graduação</Option>
              <Option value="Mestrado">Mestrado</Option>
              <Option value="Doutorado">Doutorado</Option>
              <Option value="Outro">Outro</Option>
            </Select>
            <Select
              id="politicalPerson"
              name="politicalPerson"
              value={formik.values.politicalPerson}
              onChange={(selectedValue) => {
                formik.setFieldValue("politicalPerson", selectedValue);
              }}
              label="É pessoa politicamente exposta?"
            >
              <Option value="Sim">Sim</Option>
              <Option value="Não">Não</Option>
            </Select>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              value={formik.values.profession}
              id="profession"
              name="profession"
              onChange={formik.handleChange}
              type="text"
              label="Qual sua profissão?"
            />
            <Select
              id="declaresUsTaxes"
              name="declaresUsTaxes"
              value={formik.values.declaresUsTaxes}
              onChange={(selectedValue) => {
                formik.setFieldValue("declaresUsTaxes", selectedValue);
              }}
              label="Declara imposto ao governo dos EUA?"
            >
              <Option value={"Sim"}>Sim</Option>
              <Option value={"Não"}>Não</Option>
            </Select>
          </div>
          {formik.values.maritalStatus == "Stable Union" ||
            (formik.values.maritalStatus == "Married" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  id="spouseName"
                  name="spouseName"
                  value={formik.values.spouseName}
                  onChange={formik.handleChange}
                  label="Nome do cônjuge"
                />
              </div>
            ))}
          {formik.values.maritalStatus == "Stable Union" ||
            (formik.values.maritalStatus == "Married" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  id="spouseDocumentType"
                  name="spouseDocumentType"
                  value={formik.values.spouseDocumentType}
                  onChange={(selectedValue) => {
                    formik.setFieldValue("spouseDocumentType", selectedValue);
                  }}
                  label="Tipo do documento"
                  className="w-full"
                >
                  <Option value="Inscrição estadual">Inscrição estadual</Option>
                  <Option value="Carteira de habilitação">
                    Carteira de habilitação
                  </Option>
                  <Option value="Passaporte">Passaporte</Option>
                </Select>
                <Input
                  id="spousedocument"
                  name="spousedocument"
                  value={formik.values.spousedocument}
                  onChange={formik.handleChange}
                  label="Número do documento"
                  className="w-full"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:link-20-solid"} color="black" />
          <SectionTitle size="sm" text="Anexos" />
        </div>
        <div className="mt-8 flex flex-col gap-8">
          {formik.values.personType === "pf" ? (
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
          ) : (
            <div>
              <div>
                <p className="font-display text-body16 font-semibold text-BLACK">
                  Documento Empresarial
                </p>
                {businessDocumentFileError && (
                  <p className="text-red-500 text-body16 font-semibold">
                    {businessDocumentFileError}
                  </p>
                )}
              </div>

              {businessDocumentFile ? (
                <div className="px-8 py-8 mt-4 group relative w-full md:h-[124px] rounded-md border-[1px] border-gray-400 border-dashed  transition-all flex flex-col md:flex-row justify-between md:items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <p>{businessDocumentFile?.name}</p>

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
                      setbusinessDocumentFile(null);
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
                    name="businessDocument"
                    id="businessDocument"
                    onChange={(event) => {
                      if (!event.currentTarget.files) return;
                      setbusinessDocumentFile(event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
          )}
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
    </form>
  );
};
