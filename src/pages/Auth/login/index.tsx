import { Button, Input, Typography } from "@material-tailwind/react";
import { SideImageAuthorization } from "../../../components/SideImageAuthorization";

export function Login() {
  return (
    <div className="h-screen w-full flex bg-GRAY_100">
      <SideImageAuthorization />
      <div className="w-full h-full flex justify-center items-center">
        <form className="p-6 bg-white rounded-md">
          <Typography variant="h4" color="blue-gray">
            Entre na sua conta
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Que bom te ver denovo, faça seu login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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

            <Button className="mt-6 bg-GOLD_MAIN" fullWidth>
              Entrar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Ainda não tem uma conta?{" "}
              <a href="#" className="font-medium text-gray-900">
                Cadastrar
              </a>
            </Typography>
          </form>
        </form>
      </div>
    </div>
  );
}
