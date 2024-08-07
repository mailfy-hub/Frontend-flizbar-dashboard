import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { HeaderMobile } from "../../../components/headerMobile";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
import { useAuth } from "../../../hook/auth";
import { AUTH_ERROR, loginProps } from "../../../types/auth";
import { useTranslation } from "react-i18next";

export function Login() {
  const { login } = useAuth();
  const [inputPassType, setInputPassType] = useState("password");

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-mail inválido")
        .required("Preencha esse campo"),
      password: Yup.string().required("Preencha esse campo"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleLogin(values);
    },
  });

  const [responseError, setResponseError] = useState<AUTH_ERROR | null>();
  const mappedError = useMemo(() => {
    console.log(responseError);
    switch (responseError?.message) {
      case "Invalid username or password":
        return "Endereço de e-mail ou senha incorretos.";
      case "User is deleted":
        return "Usuário foi deletado.";
      default:
        "Erro de servidor, tente novamente ou retorne mais tarde.";
        break;
    }
  }, [responseError]);
  const handleLogin = async (credentials: loginProps) => {
    try {
      setResponseError(null);
      await login(credentials);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseError(error.response?.data as AUTH_ERROR);
        console.log(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleSeePass = () => {
    if (inputPassType === "password") {
      setInputPassType("text");
    } else {
      setInputPassType("password");
    }
  };

  return (
    <div className="h-screen w-full md:flex bg-WHITE">
      <SideImageAuthorization />
      <HeaderMobile />

      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 bg-white rounded-md"
        >
          <Typography variant="h4" color="blue-gray">
            {t("default.login.title")}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {t("default.login.subtitle")}
          </Typography>
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    {t("default.login.labelEmail")}
                  </Typography>
                  {formik.errors.email && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  size="md"
                  placeholder={t("default.login.placeHolderEmail")}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    {t("default.login.labelPassword")}
                  </Typography>
                  {formik.errors.password && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.password}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  type={inputPassType}
                  size="md"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  icon={
                    <button onClick={handleSeePass} type="button">
                      <Icon
                        color="#90A4AE"
                        icon={"heroicons:eye"}
                        height={16}
                      />
                    </button>
                  }
                />
              </div>
            </div>
            <div>
              <Link
                className="font-body font-medium text-body14 text-GOLD_MAIN"
                to={"/recovery"}
              >
                {t("default.login.forgotPassword")}
              </Link>
            </div>
            <div className="mt-6 flex flex-col items-center">
              {responseError?.message && (
                <div>
                  <Typography variant={"small"} color={"red"}>
                    {mappedError}
                  </Typography>
                </div>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                className="mt-2 bg-GOLD_MAIN disabled:opacity-65"
                type="submit"
              >
                {t("default.login.button")}
              </Button>
            </div>
            <Typography color="gray" className="mt-4 text-center font-normal">
              {t("default.login.register")}{" "}
              <Link to="/register" className="font-medium text-gray-900">
                {t("default.login.linkRegister")}
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
