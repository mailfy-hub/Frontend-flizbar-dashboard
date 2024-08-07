import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

import { useFormik } from "formik";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../client/api";
import { DocumentTypeSelect } from "../../../components/documentTypeSelect";
import { useAuth } from "../../../hook/auth";

export const GenerateData = ({ handleConfirmationClick }: FormStepType) => {
  const { userData, updateProfileDetails } = useAuth();
  const validationSchema = Yup.object().shape({
    personType: Yup.string()
      .oneOf(["Física", "Jurídica"])
      .required("Tipo de pessoa é obrigatório"),
    /* name: Yup.string().when("personType", {
      is: "Física",
      then(schema) {
        return schema.required("name is required");
      },
    }), */
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
      is: ("Casado(a)" || "União Estável"),
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
    spouseDocumentType: Yup.string().when("maritalStatus", {
      is: ("Casado(a)" || "União Estável"),
      then(schema) {
        return schema.required("Must enter a spouse name");
      },
    }),
    spousedocument: Yup.string().when("maritalStatus", {
      is: ("Casado(a)" || "União Estável"),
      then(schema) { 
        return schema.required("Must enter a spouse name");
      },
    }),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    personType: "Física",
    corporateName: "",
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
      handlePostClientData(values);
    },
  });

  const handlePostClientData = async (data: FormValues) => {
    try {
      formik.setSubmitting(true);
      if (!userData) return;

      const formattedDate = data?.birthDate && new Date(data.birthDate);

      const mappedDataToServer = {
        ...data,
        profileId: userData.id,
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

      await api.post(`/profiles/${userData.id}/details`, mappedDataToServer);

      updateProfileDetails({
        personType: data.personType,
        birthDate: formattedDate?.toISOString()
          ? formattedDate?.toISOString()
          : "",
        nationality: data.nationality,
        documentType: data.documentType,
        document: data.document,
        gender: data?.gender ? data?.gender : "",
        fatherName: data.fatherName,
        motherName: data.motherName,
        maritalStatus: data.maritalStatus,
        education: data.education,
        politicalPerson: data.politicalPerson == "true" ? true : false,
        profession: data.profession,
        declaresUsTaxes: data.declaresUsTaxes == "true" ? true : false,
        spouseDetails: data.maritalStatus == "União Estável" ||
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
        corporateName: data.corporateName ? data.corporateName : "",
        id: userData.id,
        isEnterprise: data.corporateName ? true : false,
        personalPhone: "",
        profileId: userData.id,
      });

      handleConfirmationClick();
    } catch (error) {
      console.log(error);
    } finally {
      formik.setSubmitting(false);
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
                formik.setFieldValue("personType", selectedOption);
              }}
              label="Tipo de pessoa"
              error={formik.touched.personType && Boolean(formik.errors.personType)}
            >
              <Option value="Física">Física</Option>
              <Option value="Jurídica">Jurídica</Option>
              {/*  <Option value="pj">Jurídica</Option> */}
            </Select>
            {formik.values.personType == "Física" ? (
              <Input
                name="name"
                id="name"
                value={`${userData?.name} ${userData?.surname}`}
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
                value={formik.values.birthDate?.toString()}
                onChange={formik.handleChange}
                type="date"
                label="Date de nascimento"
                error={Boolean(formik.errors.birthDate)}
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
            <DocumentTypeSelect
              personType={formik.values.personType}
              value={formik.values.documentType}
              setFieldValue={formik.setFieldValue}
              fieldName={"documentType"}
              type=""
              error={formik.touched.documentType && Boolean(formik.errors.documentType)}
            />
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
          <div className="grid md:grid-cols-2 gap-6">
            {formik.values.personType == "Física" && (
              <Select
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={(selectedValue) => {
                  formik.setFieldValue("gender", selectedValue);
                }}
                label="Gênero"
                error={formik.touched.gender && Boolean(formik.errors.gender)}
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
              error={formik.touched.education && Boolean(formik.errors.education)}
            >
              <Option value="Ensino médio incompleto">
                Ensino médio incompleto
              </Option>
              <Option value="Ensino médio completo">
                Ensino médio completo
              </Option>
              <Option value="Curso técnico">Curso técnico</Option>
              <Option value="Ensino superior Incompleto">
                Ensino superior Incompleto
              </Option>
              <Option value="Ensino superior Completo">Ensino superior Completo</Option>
              <Option value="Pós Graduação/Mestrado/Doutorado">Pós Graduação/Mestrado/Doutorado</Option>
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
              <DocumentTypeSelect
                personType={"Física"}
                value={formik.values.spouseDocumentType}
                setFieldValue={formik.setFieldValue}
                fieldName={"spouseDocumentType"}
                type=" do cônjuge"
                error={formik.touched.spouseDocumentType && Boolean(formik.errors.spouseDocumentType)}
              />
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

      <div className={`w-full flex ${formik.isValid ? 'justify-end' : 'justify-between'} mt-8`}>
        {!formik.isValid && (
          <Typography variant="small" className="text-red-500">
            Todos os campos são obrigatórios
          </Typography>
        )}
        <Button
          /* onClick={() => {
            handleConfirmationClick(1);
          }} */
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
