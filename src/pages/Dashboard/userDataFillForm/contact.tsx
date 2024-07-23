import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InferType } from "yup";
import { FormStepType } from ".";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";

export const Contact = ({ handleConfirmationClick }: FormStepType) => {
  const { userData } = useAuth();
  const ContactSchema = Yup.object().shape({
    contactsList: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        phone: Yup.string(),
      })
    ),
  });

  const initialValues = {
    contactsList: [
      {
        index: 1,
        name: "",
        phone: "",
      },
    ],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      handlePostContactsInformation(values);
      handleConfirmationClick();
    },
  });

  const handleNewContact = () => {
    const newContact = {
      index: formik.values.contactsList.length + 1,
      name: "",
      phone: "",
    };
    formik.setFieldValue("contactsList", [
      ...formik.values.contactsList,
      newContact,
    ]);
  };

  const handleRemoveContact = (idx: number) => {
    if (formik.values.contactsList.length <= 1) {
      return;
    }
    const contactsFiltered = formik.values.contactsList.filter(
      (contact) => contact.index !== idx
    );
    formik.setFieldValue("contactsList", contactsFiltered);
  };

  type FormValues = InferType<typeof ContactSchema>;

  const handlePostContactsInformation = async (data: FormValues) => {
    try {
      if (data.contactsList) {
        const formattedData = data?.contactsList.map((contact) => {
          return {
            name: contact.name,
            phone: contact.phone,
          };
        });
        await api.post(`profiles/${userData?.id}/contacts`, formattedData);
      }
      // handleConfirmationClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div>
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user-circle"} color="black" />
            <SectionTitle size="sm" text="Contato adicional" />
          </div>
          <p className="mt-2 font-body text-body14 text-GRAY_400">
            Se desejar, inclua um contato adicional como uma pessoa alternativa
            para caso não conseguimos contato com você.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid gap-6">
            {formik.values.contactsList.map((contact, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-end md:items-center gap-6"
              >
                <Input
                  type="text"
                  label="Nome"
                  id={`contactsList.${index}.name`}
                  name={`contactsList.${index}.name`}
                  value={formik.values.contactsList[index].name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <Input
                  type="text"
                  label="Número de Telefone"
                  id={`contactsList.${index}.phone`}
                  name={`contactsList.${index}.phone`}
                  value={formik.values.contactsList[index].phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.values.contactsList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveContact(contact.index)}
                    className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
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
      <div className="w-full flex justify-end mt-8">
        <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
