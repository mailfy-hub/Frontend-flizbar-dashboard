import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { useAuth } from "../../../hook/auth";
import {
  Attachment,
  Contribution,
} from "../../../types/dashboard/contribuitions";

interface WalletType {
  createdAt: string;
  id: string;
  type: "conventional" | "emergency";
  walletName: string;
}

interface UserType {
  documentType: string;
  email: string;
  id: string;
  name: string;
  personType: string;
  phone: string;
  profileId: string;
  surname: string;
  username: string;
}

interface AdminFormValues {
  status: string;
  clientID: string;
  walletID: string;
  paymentDate: Date;
  contributionAmount: number;
}

export const ContribuitionEdit = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [clients, setClients] = useState<UserType[]>([]);
  const [contribution, setContribution] = useState<Contribution>();
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const params = useParams();

  const handleNavigateBack = () => {
    navigate("/contributions");
  };

  const getAllWallets = async () => {
    try {
      const response = await api.get("wallets");
      setWallets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientsList = async () => {
    try {
      const response = await api.get("/admin/users/clients-without-pagination");
      console.log(response);
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getContribuitionById = async (id: string) => {
    try {
      const { data } = await api.get(`/contributions/${id}`);

      formik.setValues({
        clientID: data.clientId,
        contributionAmount: data.contributionAmount,
        paymentDate: new Date(data.paymentDate),
        status: data.status,
        walletID: data.walletId,
      });

      setContribution(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (profile?.user.isAdmin) {
        await getClientsList();
        await getAllWallets();
        await getContribuitionById(params?.id || "");
      }
    };

    fetchData();
  }, [profile?.user.isAdmin]);

  const formik = useFormik<AdminFormValues>({
    initialValues: {
      status: "",
      clientID: "",
      walletID: "",
      paymentDate: new Date(),
      contributionAmount: 0,
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Status é obrigatório"),
      clientID: Yup.string().required("Cliente é obrigatório"),
      walletID: Yup.string().required("Carteira é obrigatória"),
      paymentDate: Yup.date().required("Data do aporte é obrigatória"),

      contributionAmount: Yup.number()
        .required("Valor do aporte é obrigatório")
        .min(0, "O valor deve ser maior ou igual a 0"),
    }),
    onSubmit: async (values) => {
      try {
        const paymentDateFormatted = new Date(values.paymentDate);

        const data = {
          clientId: values.clientID,
          walletId: values.walletID,
          paymentDate: paymentDateFormatted.toISOString(),
          contributionAmount: values.contributionAmount,
          status: values.status,
        };
        const response = await api.put(
          `contributions/${contribution?.id}`,
          data
        );
        console.log("Form submitted successfully:", response);
        navigate("/contributions");
        toast("Aporte alterado com sucesso!", {
          type: "success",
          autoClose: 3000,
        });
      } catch (error) {
        console.log("Form submission error:", error);
      }
    },
  });

  const isDisabled =
    formik.values.status === "PENDING" || formik.values.status === "COMPLETED";

  console.log(formik.values);

  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [proofOfPaymentError, setProofOfPaymentError] = useState<string | null>(
    null
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleToggleDialog = () => {
    setIsDialogOpen((state) => !state);
  };

  const uploadFile = async (file: File | null): Promise<void> => {
    if (!file) return;

    const formData = new FormData();

    const data = {
      clientId: contribution?.clientId,
    };

    formData.append("file", file);
    formData.append("data", JSON.stringify(data));

    try {
      await api.post(
        `contributions/${contribution?.id}/attachments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error(`Error uploading:`, error);
    }
  };

  const handleSubmitFiles = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      if (!proofOfPayment)
        return setProofOfPaymentError("Documento não anexado.");
      await uploadFile(proofOfPayment);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const getAttachmentById = async (id: string) => {
    try {
      const { data } = await api.get(`/attachment/${id}`);
      setAttachment(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(contribution?.profOfPaymentId);
    if (contribution?.profOfPaymentId) {
      getAttachmentById(contribution?.profOfPaymentId);
    }
  }, [contribution]);

  return (
    <div>
      <Dialog handler={handleToggleDialog} open={isDialogOpen}>
        <DialogHeader className="text-lg font-semibold">
          Anexar comprovante de pagamento
        </DialogHeader>

        <form onSubmit={handleSubmitFiles}>
          <DialogBody className="p-8">
            <div>
              <div>
                <p className="font-display text-body16 font-semibold text-BLACK">
                  Comprovante de pagamento
                </p>
                {proofOfPaymentError && (
                  <p className="text-red-500 text-body16 font-semibold">
                    {proofOfPaymentError}
                  </p>
                )}
              </div>

              {proofOfPayment ? (
                <div className="px-8 py-8 mt-4 group relative w-full  rounded-md border-[1px] border-gray-400 border-dashed  transition-all flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <p>{proofOfPayment?.name}</p>

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
                      setProofOfPayment(null);
                    }}
                    disabled={isUploading}
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
                    name="proofOfPayment"
                    id="proofOfPayment"
                    onChange={(event) => {
                      if (!event.currentTarget.files) return;
                      setProofOfPayment(event.currentTarget.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
          </DialogBody>

          <DialogFooter className="">
            <Button
              variant="text"
              color="red"
              onClick={handleToggleDialog}
              className="mr-1"
              type="button"
            >
              <span>Fechar</span>
            </Button>
            <Button type="submit">Anexar comprovante</Button>
          </DialogFooter>
        </form>
      </Dialog>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Edite seu aporte" />
      </div>
      {clients && wallets && contribution && (
        <div>
          <form onSubmit={formik.handleSubmit} className="mt-12">
            <div className="bg-WHITE p-8 w-full rounded-md">
              <div className="flex items-center gap-4">
                <Icon
                  height={16}
                  icon={"radix-icons:dashboard"}
                  color="black"
                />
                <SectionTitle size="sm" text="Aporte" />
              </div>
              <div className="mt-8 flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="date"
                    label="Data do aporte"
                    name="paymentDate"
                    onChange={(selectedValue) => {
                      formik.setFieldValue(
                        "paymentDate",
                        new Date(selectedValue.target.value)
                      );
                    }}
                    value={formik.values.paymentDate
                      ?.toISOString()
                      .substring(0, 10)}
                    disabled={isDisabled}
                  />
                  <Select
                    label="Cliente"
                    id="clientID"
                    name="clientID"
                    onChange={() => {
                      formik.handleChange("clientID");
                    }}
                    onBlur={formik.handleBlur("clientID")}
                    value={formik.values.clientID}
                    error={
                      formik.touched.clientID && Boolean(formik.errors.clientID)
                    }
                    disabled={isDisabled}
                  >
                    {clients.map((client) => (
                      <Option key={client.profileId} value={client.profileId}>
                        {client.name} {client.surname} - {client.email}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    label="Carteira"
                    id="walletID"
                    name="walletID"
                    onChange={(val) => formik.setFieldValue("walletID", val)}
                    onBlur={formik.handleBlur("walletID")}
                    value={formik.values.walletID}
                    error={
                      formik.touched.walletID && Boolean(formik.errors.walletID)
                    }
                    disabled={isDisabled}
                  >
                    {wallets.map((wallet) => (
                      <Option key={wallet.id} value={wallet.id}>
                        {wallet.walletName}
                      </Option>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    label="Valor do aporte"
                    name="contributionAmount"
                    onChange={formik.handleChange}
                    value={formik.values.contributionAmount}
                    error={
                      formik.touched.contributionAmount &&
                      Boolean(formik.errors.contributionAmount)
                    }
                    disabled={isDisabled}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    label="Status"
                    id="status"
                    name="status"
                    onChange={(val) => formik.setFieldValue("status", val)}
                    value={formik.values.status}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                  >
                    <Option value="PENDING">Pendente</Option>
                    <Option value="APPROVED">Aprovado</Option>
                    <Option value="COMPLETED">Concluído</Option>
                    <Option value="REJECTED">Rejeitado</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end mt-8 gap-6">
              {!attachment && (
                <Button
                  type="button"
                  className="bg-GRAY_400 w-full md:w-auto"
                  onClick={handleToggleDialog}
                >
                  Comprovante de pagamento
                </Button>
              )}

              <Button
                type="submit"
                className="bg-GOLD_MAIN w-full md:w-auto"
                disabled={formik.isSubmitting}
              >
                Atualizar Aporte
              </Button>
            </div>
          </form>
          {attachment && (
            <div className="w-full bg-WHITE rounded-md mt-8 p-8">
              <div className="flex items-center gap-4">
                <Icon
                  height={16}
                  icon={"radix-icons:dashboard"}
                  color="black"
                />
                <SectionTitle size="sm" text="Comprovante de pagamento" />
              </div>
              <div className="grid md:grid-cols-3 mt-8">
                <a
                  href={attachment.url}
                  target="_blank"
                  className="h-[148px] hover:opacity-75 transition-all w-full relative"
                >
                  <img
                    className="h-full rounded-md overflow-hidden w-full object-cover"
                    src={attachment.url}
                    alt={attachment.name}
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
