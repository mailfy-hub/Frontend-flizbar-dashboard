import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

export const Contract = ({ handleConfirmationClick }: FormStepType) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsSelected(event.target.checked);
  };

  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Contrato" />
        </div>
        <div className="mt-8">
          <Typography variant="h6" color="blue-gray">
            Termos e Condições de Uso da Flizbar
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            Bem-vindo à Flizbar! Ao se cadastrar, você concorda com os seguintes
            termos e condições de uso:
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            1. A Flizbar é uma plataforma de gerenciamento financeiro baseada em
            capital de mercado.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            2. O usuário é responsável por manter a confidencialidade de sua
            senha e conta.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            3. É proibido utilizar a plataforma para atividades ilegais ou não
            autorizadas.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            4. A Flizbar se reserva o direito de encerrar contas que violem
            estes termos.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            5. O uso contínuo da plataforma implica na aceitação de possíveis
            alterações nos termos.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            6. A Flizbar não se responsabiliza por perdas financeiras
            decorrentes do uso da plataforma.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            7. As informações fornecidas pelo usuário devem ser precisas e
            verdadeiras.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            8. O usuário concorda em receber comunicações eletrônicas da
            Flizbar.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            9. Todos os dados do usuário são tratados conforme a política de
            privacidade da Flizbar.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            10. Em caso de dúvidas, entre em contato com nosso suporte.
          </Typography>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            onChange={handleSelectionChange}
            className="mr-2"
          />
          <label
            htmlFor="terms"
            className=" font-display text-BLACK text-body18"
          >
            Eu li e aceito os termos e condições de uso
          </label>
        </div>
      </div>

      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={handleConfirmationClick}
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="button"
          disabled={!isSelected}
        >
          Finalizar cadastro
        </Button>
      </div>
    </form>
  );
};
