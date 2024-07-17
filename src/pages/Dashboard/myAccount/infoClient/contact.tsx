import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../../client/api";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useAuth } from "../../../../hook/auth";
import { ClientContact } from "../../../../types/auth";

interface ClientContactFormik {
  contactsList: ClientContactServer[];
}

interface ClientContactServer {
  id: string;
  name: string;
  phone: string;
}

export const Contact = () => {
  const { profile, userData, updateProfileContacts } = useAuth();

  const [isModalAddContactOpen, setIsModalAddContactOpen] = useState(false);
  const handleOpenAddContact = () => {
    setIsModalAddContactOpen((state) => !state);
  };

  const ContactSchema = Yup.object().shape({
    contactsList: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        phone: Yup.string().required("Número de Telefone é obrigatório"),
      })
    ),
  });

  const ContactSchemaNewContacct = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    phone: Yup.string().required("Número de Telefone é obrigatório"),
  });

  const initialValues = {
    contactsList: profile?.clientContacts ? profile.clientContacts : [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      handlePutContactsInformation(values);
    },
  });

  const formikNewContact = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: ContactSchemaNewContacct,
    onSubmit: (values) => {
      handlePostNewContact(values);
    },
  });

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

  type FormValuesNewContact = Yup.InferType<typeof ContactSchemaNewContacct>;

  const handlePostNewContact = async (values: FormValuesNewContact) => {
    try {
      formikNewContact.setSubmitting(true);
      const formattedData = [
        {
          name: values.name,
          phone: values.phone,
        },
      ];
      await api.post(`profiles/${userData?.id}/contacts`, formattedData);
      toast("Contato adicionado com sucesso", {
        type: "success",
        autoClose: 3000,
      });
      handleOpenAddContact();
      formikNewContact.resetForm();
      handleUpdateContacts();
    } catch (error) {
      console.log(error);
      toast("Erro ao adicionar contato.", {
        type: "error",
        autoClose: 3000,
      });
    } finally {
      formikNewContact.setSubmitting(false);
    }
  };

  const handleUpdateContacts = async () => {
    try {
      const { data } = await api.get<ClientContact[]>(
        `profiles/${userData?.id}/contacts`
      );
      if (!data) return;
      updateProfileContacts(data);
      formik.setFieldValue("contactsList", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await api.delete(`profiles/contacts/${id}`);
      handleUpdateContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        size="xs"
        open={isModalAddContactOpen}
        handler={handleOpenAddContact}
      >
        <DialogHeader>Criar novo contato</DialogHeader>
        <form onSubmit={formikNewContact.handleSubmit}>
          <DialogBody>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                label="Nome"
                id="name"
                name="name"
                value={formikNewContact.values.name}
                onChange={formikNewContact.handleChange}
              />
              <Input
                type="text"
                label="Número de Telefone"
                id="phone"
                name="phone"
                value={formikNewContact.values.phone}
                onChange={formikNewContact.handleChange}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenAddContact}
              className="mr-1"
              type="button"
            >
              <span>Cancelar</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
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
                      onClick={() => handleDeleteContact(contact.id)}
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
          <div className="w-full flex flex-col md:flex-row gap-4 justify-between mt-8">
            <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
              Atualizar dados
            </Button>
            <Button
              type="button"
              onClick={handleOpenAddContact}
              className="bg-gray-300 w-full md:w-auto text-gray-700"
            >
              Adicionar contato
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
