import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import LOGO from "../../../assets/FLIZBAR_DEFAULT_LOGO.png";
export const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="h-screen w-screen fixed top-0 left-0 right-0 bottom-0 bg-BLACK grid place-content-center z-50">
      <div className="flex flex-col gap-6">
        <img className="h-8 object-contain" src={LOGO} alt="Flizbar LOGO" />
        <div className="flex flex-col gap-4">
          <p className="font-display font-medium text-body16 text-GOLD_WHITE">
            Página não encontrada ou sem autorização para acesso.
          </p>
          <Button color="white" onClick={handleClick}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};
