import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { HeaderMobile } from "../../../components/headerMobile";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
import { useAuth } from "../../../hook/auth";
import { loginProps } from "../../../types/auth";
export function Login() {
  const { login } = useAuth();
  const [inputPassType, setInputPassType] = useState("password");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleLogin(values);
    },
  });

  const handleLogin = async (credentials: loginProps) => {
    try {
      console.log(credentials);
      await login(credentials);
    } catch (error) {
      console.log(error);
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
            Entre na sua conta
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Que bom te ver denovo, faça seu login.
          </Typography>
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Seu e-mail
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
                  placeholder="Insira seu e-mail"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Senha de acesso
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
                Esqueci minha senha
              </Link>
            </div>
            <Button fullWidth className="mt-6 bg-GOLD_MAIN" type="submit">
              Entrar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="font-medium text-gray-900">
                Cadastrar
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
