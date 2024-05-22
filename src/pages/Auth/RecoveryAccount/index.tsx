import { Button, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";

export function RecoveryAccount() {
  return (
    <div className="h-screen w-full flex bg-white">
      <SideImageAuthorization />
      <div className="w-full h-full flex justify-center items-center">
        <form className=" bg-white rounded-md">
          <Typography variant="h4" color="blue-gray">
            Recupere sua conta
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Vamos te ajudar a recuperar seu acesso
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
            </div>

            <Button className="mt-6 bg-GOLD_MAIN" fullWidth>
              Recuperar minha conta
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Lembrou sua senha?{" "}
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
