import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Typography } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../../components/headerMobile";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
import { useAuth } from "../../../hook/auth";

export function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [inputPassType, setInputPassType] = useState("password");
  const handleSeePass = () => {
    if (inputPassType === "password") {
      setInputPassType("text");
    } else {
      setInputPassType("password");
    }
  };

  const handleNavigate = (e: FormEvent) => {
    e.preventDefault();
    login({
      email: "marlon@mailfy.com",
      password: "marlon123",
    });
    navigate("/profile");
  };
  return (
    <div className="h-screen w-full md:flex bg-white">
      <SideImageAuthorization />
      <HeaderMobile />

      <div className="w-full h-full flex justify-center items-center">
        <form className=" bg-white rounded-md">
          <Typography variant="h4" color="blue-gray">
            Cadastre-se
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Prazer em te conhecer, faça seu cadastro.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Seu nome
              </Typography>
              <Input
                size="md"
                placeholder="Insira seu nome"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

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
                Telefone
              </Typography>
              {/* <Input
                size="md"
                placeholder="00/00/0000"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
 */}
              <InputWithDropdown />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Senha de acesso
              </Typography>
              <Input
                type={inputPassType}
                size="md"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                icon={
                  <button onClick={handleSeePass} type="button">
                    <Icon color="#90A4AE" icon={"heroicons:eye"} height={16} />
                  </button>
                }
              />
            </div>

            <Button
              onClick={handleNavigate}
              type="button"
              className="mt-6 bg-GOLD_MAIN"
              fullWidth
            >
              Cadastrar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Fazer login
              </Link>
            </Typography>
          </form>
        </form>
      </div>
    </div>
  );
}
