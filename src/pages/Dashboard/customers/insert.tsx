import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

type contact = {
  index: number;
  name: string;
  contact: string;
};

type MaritalStatus =
  | "Solteiro(a)"
  | "Casado(a)"
  | "Divorciado(a)"
  | "Viúvo(a)"
  | "União Estável"
  | "Outro";

export const CustomerInsert = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const [documentType, setDocumentType] = useState<"pf" | "pj">("pf");
  const handleDocumentType = (docType: string) => {
    if (docType === "pf" || docType === "pj") setDocumentType(docType);
  };

  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState<MaritalStatus>("Solteiro(a)"); // Initial state

  const handleMaritalStatusChange = (val: MaritalStatus) => {
    setSelectedMaritalStatus(val);
  };
  const [contactsList, setContactsList] = useState<contact[]>([
    {
      index: 1,
      name: "",
      contact: "",
    },
  ]);

  const handleNewContact = () => {
    const newContact = {
      index: contactsList.length + 1,
      name: "",
      contact: "",
    };

    setContactsList((state) => [newContact, ...state]);
  };
  const handleRemoveContact = (idx: number) => {
    const contactsFiltered = contactsList.filter(
      (contact) => contact.index !== idx
    );
    setContactsList(contactsFiltered);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle
          text={t("default.myAccount.admin.users.addUserForm.titleSecondary")}
        />
      </div>

      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle size="sm" text={t("default.myAccount.admin.title")} />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="email"
                label={t("default.myAccount.admin.users.addUserForm.email")}
              />
            </div>
          </div>
        </div>
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
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
                value={documentType}
                onChange={(val) => val && handleDocumentType(val)}
                label={`${t(
                  "default.myAccount.client.generalData.typePerson.labelTypePerson"
                )}*`}
              >
                <Option value="pf">
                  {t(
                    "default.myAccount.client.generalData.typePerson.physical"
                  )}
                </Option>
                <Option value="pj">
                  {t("default.myAccount.client.generalData.typePerson.legal")}
                </Option>
              </Select>
              {documentType == "pf" ? (
                <Input
                  type="text"
                  label={`${t("default.myAccount.client.generalData.name")}*`}
                />
              ) : (
                <Input
                  type="text"
                  label={`${t(
                    "default.myAccount.client.generalData.companyName"
                  )}*`}
                />
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {documentType == "pf" && (
                <Input
                  type="date"
                  label={`${t(
                    "default.myAccount.client.generalData.labelBornDate"
                  )}*`}
                />
              )}
              <Select label="Nacionalidade*">
                <Option value="Brazilian">
                  {t("default.nationality.brazilian")}
                </Option>
                <Option value="Portuguese">
                  {t("default.nationality.portuguese")}
                </Option>
                <Option value="Argentine">
                  {t("default.nationality.argentine")}
                </Option>
                <Option value="Iranian">
                  {t("default.nationality.iranian")}
                </Option>
                <Option value="American">
                  {t("default.nationality.american")}
                </Option>
                <Option value="English">
                  {t("default.nationality.english")}
                </Option>
                <Option value="Spanish">
                  {t("default.nationality.spanish")}
                </Option>
                <Option value="Other">{t("default.nationality.other")}</Option>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label={`${t(
                  "default.myAccount.client.generalData.labelDocumentType"
                )}*`}
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
                type="text"
                label={`${t(
                  "default.myAccount.client.generalData.documentNumber"
                )}*`}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {documentType == "pf" && (
                <Select label={`${t("default.gender.title")}*`}>
                  <Option>{t("default.gender.male")}</Option>
                  <Option>{t("default.gender.female")}</Option>
                  <Option>{t("default.gender.other")}</Option>
                </Select>
              )}
            </div>
          </div>
        </div>
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:map-pin"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.myAccount.client.address.title")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Select label={`${t("default.addressType.title")}*`}>
                <Option>{t("default.addressType.residential")}</Option>
                <Option>{t("default.addressType.commercial")}</Option>
                <Option>{t("default.addressType.other")}</Option>
              </Select>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.zipCode")}*`}
              />
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.city")}*`}
              />
              <Select label={`${t("default.myAccount.client.address.state")}*`}>
                <Option>1</Option>
              </Select>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.street")}*`}
              />
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.number")}*`}
              />
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.neighborhood")}*`}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.complement")}*`}
              />
              <Input
                type="text"
                label={`${t("default.myAccount.client.address.reference")}*`}
              />
            </div>
          </div>
        </div>
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user-circle"} color="black" />
            <SectionTitle size="sm" text="Contato*" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid gap-6">
              {contactsList.map((contact) => {
                return (
                  <div className="flex items-center gap-6">
                    <Input type="email" label="Nome*" />
                    <Input type="email" label="Número de Telefone*" />
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveContact(contact.index);
                      }}
                      className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                    >
                      Remover
                    </button>
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              onClick={handleNewContact}
              className="bg-GRAY_100 w-full md:w-auto text-GRAY_400"
            >
              Novo contato
            </Button>
          </div>
        </div>
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.myAccount.client.generalData.titleTertiary")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.generalData.fatherName"
                )}*`}
              />
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.generalData.matherName"
                )}*`}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Select
                value={selectedMaritalStatus}
                onChange={(val) =>
                  val && handleMaritalStatusChange(val as MaritalStatus)
                }
                label={`${t(
                  "default.myAccount.client.generalData.maritalStatus"
                )}*`}
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
                label={`${t(
                  "default.myAccount.client.generalData.education"
                )}*`}
              >
                <Option>{t("default.education.incompleteHighSchool")}</Option>
                <Option>{t("default.education.completeHighSchool")}</Option>
                <Option>{t("default.education.technicalCourse")}</Option>
                <Option>
                  {t("default.education.incompleteBachelorDegree")}
                </Option>
                <Option>{t("default.education.completeBachelorDegree")}</Option>
                <Option>
                  {t("default.education.postGraduateMasterDoctorate")}
                </Option>
                <Option>{t("default.education.other")}</Option>
              </Select>
              <Select
                label={`${t(
                  "default.myAccount.client.generalData.personExportPolitically"
                )}*`}
              >
                <Option>{t("default.otherSelectOptions.yes")}</Option>
                <Option>{t("default.otherSelectOptions.no")}</Option>
              </Select>{" "}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.generalData.profession"
                )}*`}
              />
              <Select
                label={`${t(
                  "default.myAccount.client.generalData.taxesUSGovernment"
                )}*`}
              >
                <Option>{t("default.otherSelectOptions.yes")}</Option>
                <Option>{t("default.otherSelectOptions.no")}</Option>
              </Select>
            </div>
            {selectedMaritalStatus == "União Estável" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label={`${t(
                    "default.myAccount.client.generalData.spouseName"
                  )}*`}
                />
              </div>
            )}
            {selectedMaritalStatus == "União Estável" && (
              <div className="grid md:grid-cols-2 gap-6">
                <Select
                  label={`${t(
                    "default.myAccount.client.generalData.labelDocumentType"
                  )}*`}
                  className="w-full"
                >
                  <Option value="State Registration">
                    {t("default.documentTypes.stateRegistration")}
                  </Option>
                  <Option value="Driver license">
                    {t("default.documentTypes.driverLicense")}
                  </Option>
                  <Option value="Passport">
                    {t("default.documentTypes.passport")}
                  </Option>
                  <Option value="cpf">{t("default.documentTypes.cpf")}</Option>
                </Select>
                <Input
                  label={`${t(
                    "default.myAccount.client.generalData.documentNumber"
                  )}*`}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
        <div className="bg-WHITE p-8 w-full rounded-md mt-8">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:banknotes"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.myAccount.client.bankDetails.title")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label={`${t(
                  "default.myAccount.client.bankDetails.accountType.title"
                )}*`}
              >
                <Option>
                  {t(
                    "default.myAccount.client.bankDetails.accountType.currentAccount"
                  )}
                </Option>
                <Option>
                  {t(
                    "default.myAccount.client.bankDetails.accountType.jointAccount"
                  )}
                </Option>
                <Option>
                  {t(
                    "default.myAccount.client.bankDetails.accountType.savingsAccount"
                  )}
                </Option>
                <Option>
                  {t("default.myAccount.client.bankDetails.accountType.other")}
                </Option>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label={`${t("default.myAccount.client.bankDetails.bankName")}*`}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.bankDetails.numberAccount"
                )}*`}
              />
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.bankDetails.accountDigit"
                )}*`}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.bankDetails.agencyNumber"
                )}*`}
              />
              <Input
                type="text"
                label={`${t(
                  "default.myAccount.client.bankDetails.agencyDigit"
                )}*`}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label={`${t(
                  "default.myAccount.client.bankDetails.pixKeyType.title"
                )}*`}
              >
                <Option>
                  {t("default.myAccount.client.bankDetails.pixKeyType.email")}
                </Option>
                <Option>
                  {t("default.myAccount.client.bankDetails.pixKeyType.phone")}
                </Option>
                <Option>
                  {t("default.myAccount.client.bankDetails.pixKeyType.cpf")}
                </Option>
                <Option>
                  {t("default.myAccount.client.bankDetails.pixKeyType.cnpj")}
                </Option>
                <Option>
                  {t(
                    "default.myAccount.client.bankDetails.pixKeyType.randomKey"
                  )}
                </Option>
              </Select>
              <Input
                type="text"
                label={`${t("default.myAccount.client.bankDetails.pixKey")}*`}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            {t("default.clients.button")}
          </Button>
        </div>
      </form>
    </div>
  );
};
