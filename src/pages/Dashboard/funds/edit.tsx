import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { Fund } from "../../../types/dashboard/funds";

export const FundsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fund, setFund] = useState<Fund | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome do fundo é obrigatório"),
    currency: Yup.string().required("A moeda é obrigatória"),
    type: Yup.string().required("O tipo é obrigatório"),
    defaultPercentage: Yup.string().required(
      "O percentual padrão é obrigatório"
    ),
    customId: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      currency: "",
      type: "",
      defaultPercentage: "",
      customId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handlePutFinanceInformation(values);
    },
    enableReinitialize: true,
  });

  const handlePutFinanceInformation = async (data: {
    name: string;
    currency: string;
    type: string;
    defaultPercentage: string;
  }) => {
    try {
      await api.put(`funds/${fund?.id}`, {
        ...data,
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
      formik.setSubmitting(false);
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const getFund = async (id: string) => {
    try {
      const { data } = await api.get(`/funds/${id}`);
      setFund(data);
      formik.setValues({
        name: data.name || "",
        currency: data.currency || "",
        type: data.type || "",
        defaultPercentage: data.defaultPercentage || "",
        customId: data.customId || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getFund(id);
    }
  }, [id]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Dados do fundo" />
      </div>
      <form className="mt-12" onSubmit={formik.handleSubmit}>
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon
              height={16}
              icon={"heroicons:currency-dollar"}
              color="black"
            />
            <SectionTitle size="sm" text="Fundo" />
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="flex-1 grid md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Nome do fundo"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name ? true : false}
                />

                <Select
                  label="Moeda"
                  name="currency"
                  value={formik.values.currency}
                  onChange={(value) => formik.setFieldValue("currency", value)}
                  error={formik.errors.currency ? true : false}
                >
                  <Option value="BRL">BRL</Option>
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="JPY">JPY</Option>
                </Select>

                <Select
                  label="Tipo"
                  name="type"
                  value={formik.values.type}
                  onChange={(value) => formik.setFieldValue("type", value)}
                  error={formik.errors.type ? true : false}
                >
                  <Option value="conventional">Convencional</Option>
                  <Option value="emergency">Emergencial</Option>
                </Select>

                <Input
                  type="text"
                  label="Percentual Padrão"
                  name="defaultPercentage"
                  value={formik.values.defaultPercentage}
                  onChange={formik.handleChange}
                  error={formik.errors.defaultPercentage ? true : false}
                />

                <Input
                  type="text"
                  label="ID Personalizado"
                  name="customId"
                  value={formik.values.customId}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            className="bg-GOLD_MAIN w-full md:w-auto"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Atualizar dados
          </Button>
        </div>
      </form>
    </div>
  );
};
