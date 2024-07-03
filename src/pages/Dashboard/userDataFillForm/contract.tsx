import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@material-tailwind/react";
import { FormStepType } from ".";
import { SectionTitle } from "../../../components/sectionTitle";

export const Contract = ({ handleConfirmationClick }: FormStepType) => {
  return (
    <form>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Contrato" />
        </div>
      </div>
      <div className="w-full flex justify-end mt-8">
        <Button
          onClick={handleConfirmationClick}
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="button"
        >
          Finalizar cadastro
        </Button>
      </div>
    </form>
  );
};
