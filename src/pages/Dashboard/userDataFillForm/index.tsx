import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { StepButtonIndicator } from "../../../components/stepButtonIndicator";
import { AdditionalData } from "./additionalData";
import { Address } from "./address";
import { BankData } from "./bankData";
import { Contact } from "./contact";
import { GenerateData } from "./generateData";

export interface FormStepType {
  handleConfirmationClick: (position: number) => void;
}

export const UserDataProfile = () => {
  const [ActiveFormStepPosition, setActiveFormStepPosition] =
    useState<number>(1);

  const navigate = useNavigate();

  const handleConfirmationData = (position: number) => {
    setActiveFormStepPosition(position + 1);
  };

  const handleStepOnClick = (position: number) => {
    if (position <= ActiveFormStepPosition) {
      setActiveFormStepPosition(position);
    }
  };

  const handleFinishForm = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionTitle text="Complete seus dados" />
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-6">
          <StepButtonIndicator
            icon={"heroicons:user"}
            name={"Dados gerais"}
            isStepActive={ActiveFormStepPosition == 1}
            isStepFilled={ActiveFormStepPosition > 1}
            handleStepClick={handleStepOnClick}
            position={1}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />
          <StepButtonIndicator
            icon={"heroicons:map-pin"}
            name={"Endereço"}
            isStepActive={ActiveFormStepPosition == 2}
            handleStepClick={handleStepOnClick}
            position={2}
            isStepFilled={ActiveFormStepPosition > 2}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:user-circle"}
            name={"Contato"}
            isStepActive={ActiveFormStepPosition == 3}
            handleStepClick={handleStepOnClick}
            position={3}
            isStepFilled={ActiveFormStepPosition > 3}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:user"}
            name={"Dados complementares"}
            isStepActive={ActiveFormStepPosition == 4}
            handleStepClick={handleStepOnClick}
            isStepFilled={ActiveFormStepPosition > 4}
            position={4}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:banknotes"}
            name={"Dados bancários"}
            isStepActive={ActiveFormStepPosition == 5}
            handleStepClick={handleStepOnClick}
            position={5}
            isStepFilled={ActiveFormStepPosition > 5}
          />
        </div>
      </div>

      <div className="mt-8">
        {ActiveFormStepPosition === 1 && (
          <GenerateData handleConfirmationClick={handleConfirmationData} />
        )}
        {ActiveFormStepPosition === 2 && (
          <Address handleConfirmationClick={handleConfirmationData} />
        )}
        {ActiveFormStepPosition === 3 && (
          <Contact handleConfirmationClick={handleConfirmationData} />
        )}
        {ActiveFormStepPosition === 4 && (
          <AdditionalData handleConfirmationClick={handleConfirmationData} />
        )}
        {ActiveFormStepPosition === 5 && (
          <BankData handleConfirmationClick={handleFinishForm} />
        )}
      </div>
    </div>
  );
};
