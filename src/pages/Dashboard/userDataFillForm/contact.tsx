import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

type contact = {
  index: number;
  name: string;
  contact: string;
};

export const Contact = ({ handleConfirmationClick }: FormStepType) => {
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
    if (contactsList.length <= 1) {
      return;
    }
    const contactsFiltered = contactsList.filter(
      (contact) => contact.index !== idx
    );
    setContactsList(contactsFiltered);
  };
  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user-circle"} color="black" />
          <SectionTitle size="sm" text="Contato" />
        </div>
        <div className="mt-8 flex flex-col gap-6 ">
          <div className="grid gap-6">
            {contactsList.map((contact) => {
              return (
                <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
                  <Input type="email" label="Nome" />
                  <Input type="email" label="Número de Telefone" />
                  {contactsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveContact(contact.index);
                      }}
                      className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                    >
                      Remover
                    </button>
                  )}
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
      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={() => {
            handleConfirmationClick(3);
          }}
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
        >
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
