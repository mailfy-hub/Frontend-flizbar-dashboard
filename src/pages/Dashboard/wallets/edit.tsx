import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { api } from "../../../client/api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup"

export const WalletEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, walletName, type } = location.state;

  const validationSchema = Yup.object().shape({
    walletName: Yup.string().required("Nome é obrigatório"),
    type: Yup.string().required("Tipo é obrigatório"),
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    walletName: walletName,
    type: type
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      await api.put(`wallets/${id}`, data)
      toast.success("Alterada com sucesso!")
      navigate(-1)
    } catch (error) {
      console.log(error);
    } finally {
      formik.setSubmitting(false);
    }
  }

  const handleNavigateBack = () => {
    navigate(-1);
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
        <SectionTitle text="Dados da carteira" />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-12"
      >
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:wallet"} color="black" />
            <SectionTitle size="sm" text="Carteira" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                id="walletName"
                name="walletName"
                type="text"
                label="Nome da carteira"
                value={formik.values.walletName}
                onChange={formik.handleChange}
                error={formik.touched.walletName && Boolean(formik.errors.walletName)}
              />
              <Select
                id="type"
                name="type"
                label="Tipo do fundo"
                value={formik.values.type}
                onChange={(selectedValue) => formik.setFieldValue("type", selectedValue)}
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <Option value="conventional">Convencional</Option>
                <Option value="emergency">Emergencial</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
            Atualizar dados
          </Button>
        </div>
      </form>
    </div>
  );
};
