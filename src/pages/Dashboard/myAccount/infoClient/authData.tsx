import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionTitle } from "../../../../components/sectionTitle";
import { useAuth } from "../../../../hook/auth";
import { toast } from "react-toastify";

export const AuthData = () => {
  const { userData } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Tipo da conta é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: userData?.email ? userData?.email : "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handlePutAccessInformation(values);
    },
  });
  type FormValues = Yup.InferType<typeof validationSchema>;

  const handlePutAccessInformation = (values: FormValues) => {
    try {
      console.log(values);
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
    <form
      onSubmit={formik.handleSubmit}
      className="bg-WHITE p-8 w-full rounded-md"
    >
      <div className="flex items-center gap-4">
        <Icon height={16} icon={"heroicons:user"} color="black" />
        <SectionTitle size="sm" text="Dados de acesso" />
      </div>
      <div className="mt-8 flex flex-col gap-6 ">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            value={formik.values.email}
            type="email"
            id="email"
            name="email"
            label="E-mail de acesso"
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-full">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            Atualizar dados
          </Button>
        </div>
      </div>
    </form>
  );
};
