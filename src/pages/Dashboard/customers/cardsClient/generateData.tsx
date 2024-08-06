import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { InferType } from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

export const GenerateData = ({ dataUser }: any) => {
  const userData = dataUser;
  const { t } = useTranslation();

  const profile = dataUser;

  const validationSchema = Yup.object().shape({
    personType: Yup.string()
      .oneOf(["Física", "Jurídica"])
      .required(`${t("default.error.typePersonRequired")}`),
    birthDate: Yup.date().when("personType", {
      is: "Física",
      then(schema) {
        return schema.required(`${t("default.error.bornDateRequired")}`);
      },
    }),
    nationality: Yup.string().required(
      `${t("default.error.nationalityRequired")}`
    ),
    documentType: Yup.string().required(
      `${t("default.error.documentTypeRequired")}`
    ),
    document: Yup.string().required(
      `${t("default.error.documentNumberRequired")}`
    ),
    gender: Yup.string().when("personType", {
      is: "Física",
      then(schema) {
        return schema.required(`${t("default.error.genderRequired")}`);
      },
    }),
    /* personalPhone: Yup.string().required("personalPhone is required"), */
    corporateName: Yup.string().when("personType", {
      is: "Jurídica",
      then(schema) {
        return schema.required(`${t("default.error.companyNameRequired")}`);
      },
    }),
    fatherName: Yup.string().required(
      `${t("default.error.fatherNameRequired")}`
    ),
    motherName: Yup.string().required(
      `${t("default.error.matherNameRequired")}`
    ),
    maritalStatus: Yup.string().required(
      `${t("default.error.maritalStatusRequired")}`
    ),
    education: Yup.string().required(`${t("default.error.educationRequired")}`),
    politicalPerson: Yup.string().required(
      `${t("default.error.personExportPoliticallyRequired")}`
    ),
    profession: Yup.string().required(
      `${t("default.error.professionRequired")}`
    ),
    declaresUsTaxes: Yup.string().required(
      `${t("default.error.requiredField")}`
    ),
    spouseName: Yup.string().when("maritalStatus", {
      is: "União Estável" || "Casado(a)",
      then(schema) {
        return schema.required(`${t("default.error.spouseNameRequired")}`);
      },
    }),
    spouseDocumentType: Yup.string().when("maritalStatus", {
      is: "União Estável" || "Casado(a)",
      then(schema) {
        return schema.required(`${t("default.error.spouseNameRequired")}`);
      },
    }),
    spousedocument: Yup.string().when("maritalStatus", {
      is: "União Estável" || "Casado(a)",
      then(schema) {
        return schema.required(`${t("default.error.spouseNameRequired")}`);
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

  console.log(formik);

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
      .email(`${t("default.error.emailInvalid")}`)
      .required(`${t("default.error.emailRequired")}`),
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
            <SectionTitle
              size="sm"
              text={t("default.myAccount.client.generalData.titleSecondary")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                value={formikAccessData.values.email}
                type="email"
                id="email"
                name="email"
                label={t("default.myAccount.client.generalData.email")}
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
                {t("default.myAccount.client.buttonUpdateData")}
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
              <SectionTitle
                size="sm"
                text={t("default.myAccount.client.generalData.title")}
              />
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
                  label={t(
                    "default.myAccount.client.generalData.typePerson.labelTypePerson"
                  )}
                  error={
                    formik.touched.personType &&
                    Boolean(formik.errors.personType)
                  }
                >
                  <Option value="Física">
                    {t(
                      "default.myAccount.client.generalData.typePerson.physical"
                    )}
                  </Option>
                  <Option value="Jurídica">
                    {t("default.myAccount.client.generalData.typePerson.legal")}
                  </Option>
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
                    label={t(
                      "default.myAccount.client.generalData.companyName"
                    )}
                    error={
                      formik.touched.corporateName &&
                      Boolean(formik.errors.corporateName)
                    }
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
                    label={t(
                      "default.myAccount.client.generalData.labelBornDate"
                    )}
                    error={
                      formik.touched.birthDate &&
                      Boolean(formik.errors.birthDate)
                    }
                  />
                )}
                <Select
                  name="nationality"
                  id="nationality"
                  value={formik.values.nationality}
                  onChange={(selectedValue) => {
                    formik.setFieldValue("nationality", selectedValue);
                  }}
                  label={t("default.myAccount.client.generalData.nationality")}
                  error={
                    formik.touched.nationality &&
                    Boolean(formik.errors.nationality)
                  }
                >
                  <Option value="Brasileiro">
                    {t("default.nationality.brazilian")}
                  </Option>
                  <Option value="Português">
                    {t("default.nationality.portuguese")}
                  </Option>
                  <Option value="Argentino">
                    {t("default.nationality.argentine")}
                  </Option>
                  <Option value="Iraniano">
                    {t("default.nationality.iranian")}
                  </Option>
                  <Option value="Americano">
                    {t("default.nationality.american")}
                  </Option>
                  <Option value="Inglês">
                    {t("default.nationality.english")}
                  </Option>
                  <Option value="Espanhol">
                    {t("default.nationality.spanish")}
                  </Option>
                  <Option value="Outra">
                    {t("default.nationality.other")}
                  </Option>
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
                  label={t(
                    "default.myAccount.client.generalData.labelDocumentType"
                  )}
                  error={
                    formik.touched.documentType &&
                    Boolean(formik.errors.documentType)
                  }
                >
                  <Option value="CPF">{t("default.documentTypes.cpf")}</Option>
                  <Option value="RG">{t("default.documentTypes.rg")}</Option>
                  <Option value="NATIONAL ID">
                    {t("default.documentTypes.nationalID")}
                  </Option>
                  <Option value="CARTEIRA DE HABILITAÇÃO">
                    {t("default.documentTypes.driverLicense")}
                  </Option>
                  <Option value="PASSAPORTE">
                    {t("default.documentTypes.passport")}
                  </Option>
                  <Option value="RNE">{t("default.documentTypes.rne")}</Option>
                </Select>
                <Input
                  name="document"
                  id="document"
                  value={formik.values.document}
                  onChange={formik.handleChange}
                  type="text"
                  label={t(
                    "default.myAccount.client.generalData.documentNumber"
                  )}
                  error={
                    formik.touched.document && Boolean(formik.errors.document)
                  }
                />
              </div>
              <div></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 ">
              <Icon height={16} icon={"heroicons:user"} color="black" />
              <SectionTitle
                size="sm"
                text={t("default.myAccount.client.generalData.titleTertiary")}
              />
            </div>
            <div className="mt-8 flex flex-col gap-6 ">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={formik.values.fatherName}
                  onChange={formik.handleChange}
                  type="text"
                  label={t("default.myAccount.client.generalData.fatherName")}
                  error={
                    formik.touched.fatherName &&
                    Boolean(formik.errors.fatherName)
                  }
                />
                <Input
                  id="motherName"
                  name="motherName"
                  value={formik.values.motherName}
                  onChange={formik.handleChange}
                  type="text"
                  label={t("default.myAccount.client.generalData.matherName")}
                  error={
                    formik.touched.motherName &&
                    Boolean(formik.errors.motherName)
                  }
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
                  label={t(
                    "default.myAccount.client.generalData.maritalStatus"
                  )}
                  error={
                    formik.touched.maritalStatus &&
                    Boolean(formik.errors.maritalStatus)
                  }
                >
                  <Option value="Solteiro(a)">
                    {t("default.maritalStatus.single")}
                  </Option>
                  <Option value="Casado(a)">
                    {t("default.maritalStatus.married")}
                  </Option>
                  <Option value="Divorciado(a)">
                    {t("default.maritalStatus.divorced")}
                  </Option>
                  <Option value="Viúvo(a)">
                    {t("default.maritalStatus.widower")}
                  </Option>
                  <Option value="União Estável">
                    {t("default.maritalStatus.stableUnion")}
                  </Option>
                  <Option value="Outro">
                    {t("default.maritalStatus.other")}
                  </Option>
                </Select>
                <Select
                  id="education"
                  name="education"
                  value={formik.values.education}
                  onChange={(selectedValue) =>
                    formik.setFieldValue("education", selectedValue)
                  }
                  label={t("default.myAccount.client.generalData.education")}
                  error={
                    formik.touched.education && Boolean(formik.errors.education)
                  }
                >
                  <Option value="Incomplete HighSchool">
                    {t("default.education.incompleteHighSchool")}
                  </Option>
                  <Option value="Complete HighSchool">
                    {t("default.education.completeHighSchool")}
                  </Option>
                  <Option value="Technical Course">
                    {t("default.education.technicalCourse")}
                  </Option>
                  <Option value="Incomplete Bachelor Degree">
                    {t("default.education.incompleteBachelorDegree")}
                  </Option>
                  <Option value="Complete Bachelor Degree">
                    {t("default.education.completeBachelorDegree")}
                  </Option>
                  <Option value="postGraduate/Master/Doctorate">
                    {t("default.education.postGraduateMasterDoctorate")}
                  </Option>
                  <Option value="Outro">{t("default.education.other")}</Option>
                </Select>
                <Select
                  id="politicalPerson"
                  name="politicalPerson"
                  value={formik.values.politicalPerson}
                  onChange={(selectedValue) => {
                    formik.setFieldValue("politicalPerson", selectedValue);
                  }}
                  label={t(
                    "default.myAccount.client.generalData.personExportPolitically"
                  )}
                  error={
                    formik.touched.politicalPerson &&
                    Boolean(formik.errors.politicalPerson)
                  }
                >
                  <Option value="Yes">
                    {t("default.otherSelectOptions.yes")}
                  </Option>
                  <Option value="No">
                    {t("default.otherSelectOptions.no")}
                  </Option>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  value={formik.values.profession}
                  id="profession"
                  name="profession"
                  onChange={formik.handleChange}
                  type="text"
                  label={t("default.myAccount.client.generalData.profession")}
                  error={
                    formik.touched.profession &&
                    Boolean(formik.errors.profession)
                  }
                />
                <Select
                  id="declaresUsTaxes"
                  name="declaresUsTaxes"
                  value={formik.values.declaresUsTaxes}
                  onChange={(selectedValue) => {
                    formik.setFieldValue("declaresUsTaxes", selectedValue);
                  }}
                  label={t(
                    "default.myAccount.client.generalData.taxesUSGovernment"
                  )}
                  error={
                    formik.touched.declaresUsTaxes &&
                    Boolean(formik.errors.declaresUsTaxes)
                  }
                >
                  <Option value={"Yes"}>
                    {t("default.otherSelectOptions.yes")}
                  </Option>
                  <Option value={"No"}>
                    {t("default.otherSelectOptions.no")}
                  </Option>
                </Select>
              </div>
              {(formik.values.maritalStatus == "Stable Union" ||
                formik.values.maritalStatus == "Married") && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    id="spouseName"
                    name="spouseName"
                    value={formik.values.spouseName}
                    onChange={formik.handleChange}
                    label={t("default.myAccount.client.generalData.spouseName")}
                    error={
                      formik.touched.spouseName &&
                      Boolean(formik.errors.spouseName)
                    }
                  />
                </div>
              )}
              {(formik.values.maritalStatus == "Stable Union" ||
                formik.values.maritalStatus == "Married") && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    id="spouseDocumentType"
                    name="spouseDocumentType"
                    value={formik.values.spouseDocumentType}
                    onChange={(selectedValue) => {
                      formik.setFieldValue("spouseDocumentType", selectedValue);
                    }}
                    label={t(
                      "default.myAccount.client.generalData.labelDocumentType"
                    )}
                    className="w-full"
                    error={
                      formik.touched.spouseDocumentType &&
                      Boolean(formik.errors.spouseDocumentType)
                    }
                  >
                    <Option value="CPF">
                      {t("default.documentTypes.cpf")}
                    </Option>
                    <Option value="RG">{t("default.documentTypes.rg")}</Option>
                    <Option value="NATIONAL ID">
                      {t("default.documentTypes.nationalID")}
                    </Option>
                    <Option value="Driver License">
                      {t("default.documentTypes.driverLicense")}
                    </Option>
                    <Option value="Passport">
                      {t("default.documentTypes.passport")}
                    </Option>
                    <Option value="RNE">
                      {t("default.documentTypes.rne")}
                    </Option>
                  </Select>
                  <Input
                    id="spousedocument"
                    name="spousedocument"
                    value={formik.values.spousedocument}
                    onChange={formik.handleChange}
                    label={t(
                      "default.myAccount.client.generalData.spousedocumentNumber"
                    )}
                    className="w-full"
                    error={
                      formik.touched.spousedocument &&
                      Boolean(formik.errors.spousedocument)
                    }
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
              {t("default.myAccount.client.buttonUpdateData")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
