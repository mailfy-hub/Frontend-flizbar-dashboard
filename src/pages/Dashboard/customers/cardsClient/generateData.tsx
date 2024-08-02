import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";

export const GenerateData = ({ dataUser }: any) => {
  const userData = dataUser;

  const profile = dataUser;

  const validationSchema = Yup.object().shape({
    personType: Yup.string()
      .oneOf(["Física", "Jurídica"])
      .required("Tipo de pessoa é obrigatório"),
    birthDate: Yup.date().when("personType", {
      is: "Física",
      then(schema) {
        return schema.required("birth date is required");
      },
    }),
    nationality: Yup.string().required("nacionality is required"),
    documentType: Yup.string().required("doctype is required"),
    document: Yup.string().required("docnum is required"),
    gender: Yup.string().when("personType", {
      is: "Física",
      then(schema) {
        return schema.required("Must enter a gender");
      },
    }),
    /* personalPhone: Yup.string().required("personalPhone is required"), */
    corporateName: Yup.string().when("personType", {
      is: "Jurídica",
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
      is: ("União Estável" || "Casado(a)"),
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
    spouseDocumentType: Yup.string().when("maritalStatus", {
      is: ("União Estável" || "Casado(a)"),
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
    spousedocument: Yup.string().when("maritalStatus", {
      is:("União Estável" || "Casado(a)"),
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    personType: profile?.clientDetails?.personType
      ? profile?.clientDetails?.personType
      : "Física",
    corporateName: profile?.clientDetails?.corporateName
      ? profile?.clientDetails?.corporateName
      : "",
    birthDate: profile?.clientDetails?.birthDate
      ? new Date(profile?.clientDetails?.birthDate)
      : new Date(),
    documentType: profile?.clientDetails?.documentType
      ? profile?.clientDetails?.documentType
      : "",
    document: profile?.clientDetails?.document
      ? profile?.clientDetails?.document
      : "",
    gender: profile?.clientDetails?.gender
      ? profile?.clientDetails?.gender
      : "",
    nationality: profile?.clientDetails?.nationality
      ? profile?.clientDetails?.nationality
      : "",
    fatherName: profile?.clientDetails?.fatherName
      ? profile?.clientDetails?.fatherName
      : "",
    motherName: profile?.clientDetails?.motherName
      ? profile?.clientDetails?.motherName
      : "",
    maritalStatus: profile?.clientDetails?.maritalStatus
      ? profile?.clientDetails?.maritalStatus
      : "",
    education: profile?.clientDetails?.education
      ? profile?.clientDetails?.education
      : "",
    politicalPerson: profile?.clientDetails?.politicalPerson ? "Sim" : "Não",
    profession: profile?.clientDetails?.profession
      ? profile?.clientDetails?.profession
      : "",
    declaresUsTaxes: profile?.clientDetails?.declaresUsTaxes ? "Sim" : "Não",
    spouseName: profile?.clientDetails?.spouse
      ? profile?.clientDetails?.spouseDetails?.spouseName
      : "",
    spouseDocumentType: profile?.clientDetails?.spouse
      ? profile?.clientDetails?.spouseDetails?.spouseDocumentType
      : "",
      spousedocument: profile?.clientDetails?.spouse
      ? profile?.clientDetails?.spouseDetails?.spousedocument
      : "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handlePutUserInformation(values);
    },
  });

  console.log(formik)

  const handlePutUserInformation = async (data: FormValues) => {
    try {
      if (!profile) return;
      const formattedDate = data?.birthDate && new Date(data.birthDate);

      const mappedDataToServer = {
        ...data,
        profileId: profile?.id,
        birthDate: formattedDate,
        politicalPerson: data.politicalPerson == "true" ? true : false,
        declaresUsTaxes: data.declaresUsTaxes == "true" ? true : false,
        spouseDetails:
          data.maritalStatus == "União Estável" ||
          data.maritalStatus == "Casado(a)"
            ? {
                spouseName: data.spouseName,
                spouseDocumentType: data.spouseDocumentType,
                spousedocument: data.spousedocument,
              }
            : {},
        spouse:
          data.maritalStatus == "União Estável" ||
          data.maritalStatus == "Casado(a)"
            ? true
            : false,
      };
      delete mappedDataToServer.spouseName;
      delete mappedDataToServer.spouseDocumentType;
      delete mappedDataToServer.spousedocument;

      await api.put(
        `/profiles/details/${profile?.clientDetails?.id}`,
        mappedDataToServer
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

  const validationSchemaAccessData = Yup.object().shape({
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("email é obrigatório"),
  });

  const formikAccessData = useFormik({
    initialValues: {
      email: userData?.user?.email ? userData?.user?.email : "",
    },
    validationSchema: validationSchemaAccessData,
    onSubmit: (values) => {
      handlePutAccessInformation(values);
    },
  });
  type FormValuesAccessData = Yup.InferType<typeof validationSchemaAccessData>;

  const handlePutAccessInformation = async (values: FormValuesAccessData) => {
    try {
      formikAccessData.setSubmitting(true);
      await api.put(`/users/${userData?.id}`, {
        email: values.email,
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
      formikAccessData.setSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={formikAccessData.handleSubmit}
          className="bg-WHITE p-8 w-full rounded-md"
        >
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle size="sm" text="Dados de acesso" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                value={formikAccessData.values.email}
                type="email"
                id="email"
                name="email"
                label="E-mail de acesso"
                onChange={formikAccessData.handleChange}
              />
            </div>
            <div className="w-full">
              <Button
                type="submit"
                disabled={
                  formikAccessData.isSubmitting ||
                  !formikAccessData.values.email
                }
                className="bg-GOLD_MAIN w-full md:w-auto disabled:opacity-75"
              >
                Atualizar dados
              </Button>
            </div>
          </div>
        </form>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-WHITE p-8 w-full rounded-md "
        >
          <div>
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
                    formik.setFieldValue("personType", selectedOption);
                  }}
                  label="Tipo de pessoa"
                  error={formik.touched.personType && Boolean(formik.errors.personType)}
                >
                  <Option value="Física">Física</Option>
                  <Option value="Jurídica">Jurídica</Option>
                </Select>
                {formik.values.personType == "Física" ? (
                  <Input
                    name="name"
                    id="name"
                    value={`${userData?.user?.name} ${userData?.user?.surname}`}
                    type="text"
                    label="Nome"
                  />
                ) : (
                  <Input
                    name="corporateName"
                    id="corporateName"
                    value={formik.values.corporateName}
                    onChange={formik.handleChange}
                    type="text"
                    label="Razão social"
                    error={formik.touched.corporateName && Boolean(formik.errors.corporateName)}
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {formik.values.personType == "Física" && (
                  <Input
                    name="birthDate"
                    id="birthDate"
                    value={formik.values.birthDate
                      ?.toISOString()
                      .substring(0, 10)}
                    onChange={formik.handleChange}
                    type="date"
                    label="Date de nascimento"
                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
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
                  error={formik.touched.nationality && Boolean(formik.errors.nationality)}
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
                  error={formik.touched.documentType && Boolean(formik.errors.documentType)}
                >
                  <Option value="CPF">CPF</Option>
                  <Option value="RG">RG</Option>
                  <Option value="NATIONAL ID">NATIONAL ID</Option>
                  <Option value="CARTEIRA DE HABILITAÇÃO">CARTEIRA DE HABILITAÇÃO</Option>
                  <Option value="PASSAPORTE">PASSAPORTE</Option>
                  <Option value="RNE">RNE</Option>
                </Select>
                <Input
                  name="document"
                  id="document"
                  value={formik.values.document}
                  onChange={formik.handleChange}
                  type="text"
                  label="Número do documento"
                  error={formik.touched.document && Boolean(formik.errors.document)}
                />
              </div>
              <div></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 ">
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
                  error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
                />
                <Input
                  id="motherName"
                  name="motherName"
                  value={formik.values.motherName}
                  onChange={formik.handleChange}
                  type="text"
                  label="Nome da mãe"
                  error={formik.touched.motherName && Boolean(formik.errors.motherName)}
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
                  error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
                >
                  <Option value="Solteiro(a)">Solteiro(a)</Option>
                  <Option value="Casado(a)">Casado(a)</Option>
                  <Option value="Divorciado(a)">Divorciado(a)</Option>
                  <Option value="Viúvo(a)">Viúvo(a)</Option>
                  <Option value="União Estável">União Estável</Option>
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
                  error={formik.touched.education && Boolean(formik.errors.education)}
                >
                  <Option value="Ensino médio incompleto">
                    Ensino médio incompleto
                  </Option>
                  <Option value="Ensino médio completo">
                    Ensino médio completo
                  </Option>
                  <Option value="Curso técnico">Curso técnico</Option>
                  <Option value="Ensino superior incompleto">
                    Ensino superior Incompleto
                  </Option>
                  <Option value="Ensino superior completo">
                    Ensino superior Completo
                  </Option>
                  <Option value="Pós Graduação/Mestrado/Doutorado">Pós Graduação/Mestrado/Doutorado</Option>
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
                  error={formik.touched.politicalPerson && Boolean(formik.errors.politicalPerson)}
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
                  error={formik.touched.profession && Boolean(formik.errors.profession)}
                />
                <Select
                  id="declaresUsTaxes"
                  name="declaresUsTaxes"
                  value={formik.values.declaresUsTaxes}
                  onChange={(selectedValue) => {
                    formik.setFieldValue("declaresUsTaxes", selectedValue);
                  }}
                  label="Declara imposto ao governo dos EUA?"
                  error={formik.touched.declaresUsTaxes && Boolean(formik.errors.declaresUsTaxes)}
                >
                  <Option value={"Sim"}>Sim</Option>
                  <Option value={"Não"}>Não</Option>
                </Select>
              </div>
              {(formik.values.maritalStatus == "União estável" ||
                formik.values.maritalStatus == "Casado(a)") && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    id="spouseName"
                    name="spouseName"
                    value={formik.values.spouseName}
                    onChange={formik.handleChange}
                    label="Nome do cônjuge"
                    error={formik.touched.spouseName && Boolean(formik.errors.spouseName)}
                  />
                </div>
              )}
              {(formik.values.maritalStatus == "União estável" ||
                formik.values.maritalStatus == "Casado(a)") && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    id="spouseDocumentType"
                    name="spouseDocumentType"
                    value={formik.values.spouseDocumentType}
                    onChange={(selectedValue) => {
                      formik.setFieldValue("spouseDocumentType", selectedValue);
                    }}
                    label="Tipo do documento do cônjuge"
                    className="w-full"
                    error={formik.touched.spouseDocumentType && Boolean(formik.errors.spouseDocumentType)}
                  >
                    <Option value="CPF">CPF</Option>
                    <Option value="RG">RG</Option>
                    <Option value="NATIONAL ID">NATIONAL ID</Option>
                    <Option value="CARTEIRA DE HABILITAÇÃO">CARTEIRA DE HABILITAÇÃO</Option>
                    <Option value="PASSAPORTE">PASSAPORTE</Option>
                    <Option value="RNE">RNE</Option>
                  </Select>
                  <Input
                    id="spousedocument"
                    name="spousedocument"
                    value={formik.values.spousedocument}
                    onChange={formik.handleChange}
                    label="Número do documento do cônjuge"
                    className="w-full"
                    error={formik.touched.spousedocument && Boolean(formik.errors.spousedocument)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex justify-start mt-8">
            <Button
              className="bg-GOLD_MAIN w-full md:w-auto"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Atualizar dados
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
