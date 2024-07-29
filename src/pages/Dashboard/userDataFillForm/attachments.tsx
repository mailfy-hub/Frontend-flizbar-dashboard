import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp", "pdf"];

export interface FormStepType {
  handleConfirmationClick: () => void;
}

export const Attachments = ({ handleConfirmationClick }: FormStepType) => {
  const { profile } = useAuth();

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

  const [isLoading, setIsLoading] = useState(false);

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
      identifier: "client",
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

  const handleSubmitFiles = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const isCheckedDocumentFile =
        profile?.clientDetails?.personType === "pf"
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

      if (!isCheckedProofAddress || !isCheckedDocumentFile) {
        return;
      }

      if (profile?.clientDetails?.personType === "pf") {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitFiles}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:link-20-solid"} color="black" />
          <SectionTitle size="sm" text="Meus Anexos" />
        </div>
        <div className="mt-8 flex flex-col gap-8">
          {profile?.clientDetails?.personType === "pf" ? (
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
          disabled={isLoading}
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
        >
          Próxima etapa
        </Button>
      </div>
    </form>
  );
};
