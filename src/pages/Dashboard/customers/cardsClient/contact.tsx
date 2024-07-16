import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useAuth } from "../../../../hook/auth";

interface ClientContactFormik {
  contactsList: ClientContactServer[];
}

interface ClientContactServer {
  id: string;
  name: string;
  phone: string;
}

export const Contact = () => {
  const { profile } = useAuth();
  const ContactSchema = Yup.object().shape({
    contactsList: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        phone: Yup.string().required("Número de Telefone é obrigatório"),
      })
    ),
  });

  const initialValues = {
    contactsList: profile?.clientContacts ? profile.clientContacts : [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      console.log(values);
      handlePutContactsInformation(values);
    },
  });

  /*   const handleNewContact = () => {
    const newContact = {
      index: formik.values.contactsList.length + 1,
      name: "",
      phone: "",
    };
    formik.setFieldValue("contactsList", [
      ...formik.values.contactsList,
      newContact,
    ]);
  }; */

  const handleRemoveContact = (id: string) => {
    if (formik.values.contactsList.length <= 1) {
      return;
    }
    const contactsFiltered = formik.values.contactsList.filter(
      (contact) => contact.id !== id
    );
    formik.setFieldValue("contactsList", contactsFiltered);
  };

  const handlePutContactsInformation = async (data: ClientContactFormik) => {
    try {
      if (data.contactsList) {
        data?.contactsList.map(async (contact) => {
          const data = {
            name: contact.name,
            phone: contact.phone,
          };
          await api.put(`profiles/contacts/${contact.id}`, data);
        });
      }
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
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md ">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user-circle"} color="black" />
          <SectionTitle size="sm" text="Contato" />
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
                    onClick={() => handleRemoveContact(contact.id)}
                    className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* <Button
            type="button"
            onClick={handleNewContact}
            className="bg-GRAY_100 w-full md:w-auto text-GRAY_400"
          >
            Novo contato
          </Button> */}
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
          Atualizar dados
        </Button>
      </div>
    </form>
  );
};
