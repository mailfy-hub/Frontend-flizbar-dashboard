import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SectionTitle } from "../../../components/sectionTitle";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import { IconButton } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/16/solid";

type Attachment = {
  url: string;
  name: keyof typeof mappedFileName;
  createdAt: string;
  identifier?: string;
};

const mappedFileName = {
  personDocument: "RG ou CPF",
  proofAddress: "Comprovante de endereço",
  additionalDocument: "Arquivo adicional",
  businessDocument: "Documento empresarial",
};

type Profile = {
  attachments: Attachment[];
};

type EditFilesProps = {
  dataUser: Profile;
};

export const EditFiles = ({ dataUser }: EditFilesProps) => {
  const profile = dataUser;
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  return (
    <form className="mt-12">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:clipboard"} color="black" />
          <SectionTitle
            size="sm"
            text={t("default.myAccount.client.myAnexes.secondaryTitle")}
          />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          {profile?.attachments.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {profile.attachments.map((attach) => (
                <a
                  key={attach.url}
                  target="_blank"
                  href={attach.url}
                  className="w-full relative rounded-md overflow-hidden max-h-[248px]"
                >
                  <img
                    className="max-h-[164px] w-full object-cover"
                    src={attach.url}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 absolute top-0 right-0 left-0 bottom-0 bg-BLACK bg-opacity-55 hover:bg-opacity-85 transition-all cursor-pointer">
                    <div>
                      <Icon
                        height={18}
                        icon={"heroicons:download"}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <p className="text-WHITE text-body14 font-display font-semibold">
                        {mappedFileName[attach.name]}
                      </p>
                      <Tooltip content="Editar usuário">
                        <IconButton>
                          <PencilIcon className="w-4 h-4 text-gray-400" />
                        </IconButton>
                      </Tooltip>
                      <span className="text-WHITE text-body14 font-body">
                        {formatDate(attach.createdAt)}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="font-body font-normal text-body16 text-GRAY_400">
              {t("default.myAccount.client.myAnexes.text")}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Icon height={16} icon={"heroicons:clipboard"} color="black" />
          <SectionTitle size="sm" text="Anexos do beneficiário" />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          {profile?.attachments.some(
            (attach) => attach.identifier === "beneficiary"
          ) ? (
            <div className="grid md:grid-cols-3 gap-6">
              {profile.attachments.map(
                (attach) =>
                  attach.identifier === "beneficiary" && (
                    <a
                      key={attach.url}
                      target="_blank"
                      href={attach.url}
                      className="w-full relative rounded-md overflow-hidden max-h-[248px]"
                    >
                      <img
                        className="max-h-[164px] w-full object-cover"
                        src={attach.url}
                        alt=""
                      />
                      <div className="flex flex-col justify-between p-4 absolute top-0 right-0 left-0 bottom-0 bg-BLACK bg-opacity-55 hover:bg-opacity-85 transition-all cursor-pointer">
                        <div>
                          <Icon
                            height={18}
                            icon={"heroicons:download"}
                            className="text-white"
                          />
                        </div>
                        <div>
                          <p className="text-WHITE text-body14 font-display font-semibold">
                            {mappedFileName[attach.name]}
                          </p>
                          <span className="text-WHITE text-body14 font-body">
                            {formatDate(attach.createdAt)}
                          </span>
                        </div>
                      </div>
                    </a>
                  )
              )}
            </div>
          ) : (
            <p className="font-body font-normal text-body16 text-GRAY_400">
              Esse cliente não possui nenhum anexo de beneficiário
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
