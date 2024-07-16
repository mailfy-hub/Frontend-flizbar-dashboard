import { Button, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../../client/api";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";

export function RecoveryAccount() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Insira um e-mail válido")
        .required("E-mail é obrigatório"),
    }),
    onSubmit: (values) => {
      handleSendEmailResetPassword(values.email);
    },
  });

  const handleSendEmailResetPassword = async (email: string) => {
    try {
      formik.setSubmitting(true);
      await api.post(`/auth/send-reset-password-token`, {
        email,
      });
      toast("Token de recuperação enviado.", {
        type: "success",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white">
      <SideImageAuthorization />
      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={formik.handleSubmit} className=" bg-white rounded-md">
          <Typography variant="h4" color="blue-gray">
            Recupere sua conta
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Vamos te ajudar a recuperar seu acesso
          </Typography>
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Seu e-mail
              </Typography>
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                name="email"
                size="md"
                placeholder="Insira seu e-mail"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>

            <Button
              disabled={formik.isSubmitting || !formik.values.email}
              type="submit"
              className="mt-6 bg-GOLD_MAIN"
              fullWidth
            >
              Recuperar minha conta
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Lembrou sua senha?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Fazer login
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
