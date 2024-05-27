import { Button, Input, Typography } from "@material-tailwind/react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../../components/headerMobile";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
import { useAuth } from "../../../hook/auth";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [roleLogin, setRoleLogin] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login({
      email: "marlon@mailfy.com",
      password: "marlon123",
    });

    navigate("/my-account");
  };

  const handleLoginAdmin = (e: FormEvent) => {
    e.preventDefault();
    login({
      email: "admin@flibzar.com",
      password: "admin",
    });

    navigate("/verify-access");
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      return setRoleLogin("user");
    } else if (location.pathname === "/login/admin") {
      return setRoleLogin("admin");
    }
  }, [location]);

  return (
    <div className="h-screen w-full md:flex bg-WHITE">
      <SideImageAuthorization />
      <HeaderMobile />

      <div className="w-full h-full flex justify-center items-center">
        {roleLogin === "user" ? (
          <form onSubmit={handleLogin} className="p-6 bg-white rounded-md">
            <Typography variant="h4" color="blue-gray">
              Entre na sua conta
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Que bom te ver denovo, faça seu login.
            </Typography>
            <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Seu e-mail
                </Typography>

                <Input
                  size="md"
                  placeholder="Insira seu e-mail"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Senha de acesso
                </Typography>
                <Input
                  type="password"
                  size="md"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
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
        ) : (
          <form onSubmit={handleLoginAdmin} className="p-6 bg-white rounded-md">
            <Typography variant="h4" color="blue-gray">
              Painel do Administrador
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Que bom te ver denovo, faça seu login.
            </Typography>
            <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Seu e-mail
                </Typography>

                <Input
                  size="md"
                  placeholder="Insira seu e-mail"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Senha de acesso
                </Typography>
                <Input
                  type="password"
                  size="md"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <Button fullWidth className="mt-6 bg-GOLD_MAIN" type="submit">
                Entrar
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
