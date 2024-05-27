import { Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../../components/headerMobile";
import { Logo } from "../../../components/logo";

export function VerifyAccessCode() {
  const navigate = useNavigate();
  const handleNumberVerify = () => {
    navigate("/");
  };
  return (
    <div className="h-full md:h-screen w-full md:flex bg-GOLD_BLACK">
      <HeaderMobile />

      <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
        <div className="hidden md:block">
          <Logo />
        </div>
        <form className=" bg-white rounded-md p-8">
          <Typography variant="h4" color="blue-gray">
            Confirme seu celular
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Precisamos confirmar seu número de telefone
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="flex gap-1 w-full">
              <input
                maxLength={1}
                className="bg-transparent border border-gray-300 rounded-lg w-full h-[48px] text-center"
              />
              <input
                maxLength={1}
                className="bg-transparent border border-gray-300 rounded-lg w-full h-[48px] text-center"
              />
              <input
                maxLength={1}
                className="bg-transparent border border-gray-300 rounded-lg w-full h-[48px] text-center"
              />
              <input
                maxLength={1}
                className="bg-transparent border border-gray-300 rounded-lg w-full h-[48px] text-center"
              />
              <input
                maxLength={1}
                className="bg-transparent border border-gray-300 rounded-lg w-full h-[48px] text-center"
              />
              <input
                maxLength={1}
                className="bg-transparent border border-gray-300 rounded-lg w-full h-[48px] text-center"
              />
            </div>

            <Button
              onClick={handleNumberVerify}
              className="mt-6 bg-GOLD_MAIN"
              fullWidth
            >
              Verificar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Algo de errado?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Contatar suporte
              </Link>
            </Typography>
          </form>
        </form>
      </div>
    </div>
  );
}
