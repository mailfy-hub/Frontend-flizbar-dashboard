import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { StepButtonIndicator } from "../../../components/stepButtonIndicator";
import { useAuth } from "../../../hook/auth";
import { Profile } from "../../../types/auth";
import { Address } from "./address";
import { BankData } from "./bankData";
import { Contact } from "./contact";
import { Contract } from "./contract";
import { GenerateData } from "./generateData";

export interface FormStepType {
  handleConfirmationClick: () => void;
}

export const UserDataProfile = () => {
  const { profile, isLoadingData } = useAuth();
  const [ActiveFormStepPosition, setActiveFormStepPosition] =
    useState<number>(0);

  const navigate = useNavigate();

  const handleStepOnClick = (position: number) => {
    setActiveFormStepPosition(position);
  };

  const handleFinishForm = () => {
    navigate("/");
  };

  const verifyAccountData = (profile: Profile) => {
    console.log("profile data: " + profile);

    const isClientDetailsFilled = profile?.clientDetails == null ? false : true;
    const isClientAddressesFilled =
      profile?.clientAddresses.length > 0 ? true : false;
    const isClientContactsFilled =
      profile?.clientContacts.length > 0 ? true : false;
    const isClientFinanceFilled = profile?.clientFinance == null ? false : true;

    console.log("isClientDetailsFilled " + isClientDetailsFilled);
    console.log("isClientFinanceFilled " + isClientFinanceFilled);
    console.log("isClientContactsFilled " + isClientContactsFilled);
    console.log("isClientAddressesFilled " + isClientAddressesFilled);

    const currentStep = !isClientDetailsFilled
      ? 1
      : !isClientAddressesFilled
      ? 2
      : !isClientContactsFilled
      ? 3
      : !isClientFinanceFilled
      ? 4
      : 5;

    setActiveFormStepPosition(currentStep);
  };

  useEffect(() => {
    console.log("oi 🫡");

    if (!isLoadingData) {
      verifyAccountData(profile!);
    }
  }, [profile]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionTitle text="Complete seus dados" />
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3 md:gap-6 snap-end snap-proximity snap-x overflow-x-auto">
          <StepButtonIndicator
            icon={"heroicons:user"}
            name={"Dados gerais"}
            isStepActive={ActiveFormStepPosition == 1}
            isStepFilled={ActiveFormStepPosition > 1}
            handleStepClick={() => {}}
            position={1}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />
          <StepButtonIndicator
            icon={"heroicons:map-pin"}
            name={"Endereço"}
            isStepActive={ActiveFormStepPosition == 2}
            handleStepClick={() => {}}
            position={2}
            isStepFilled={ActiveFormStepPosition > 2}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:user-circle"}
            name={"Contato"}
            isStepActive={ActiveFormStepPosition == 3}
            handleStepClick={() => {}}
            position={3}
            isStepFilled={ActiveFormStepPosition > 3}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          {/*         <StepButtonIndicator
            icon={"heroicons:user"}
            name={"Dados complementares"}
            isStepActive={ActiveFormStepPosition == 4}
            handleStepClick={handleStepOnClick}
            isStepFilled={ActiveFormStepPosition > 4}
            position={4}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} /> */}

          <StepButtonIndicator
            icon={"heroicons:banknotes"}
            name={"Dados bancários"}
            isStepActive={ActiveFormStepPosition == 4}
            handleStepClick={() => {}}
            position={4}
            isStepFilled={ActiveFormStepPosition > 4}
          />

          <StepButtonIndicator
            icon={"heroicons:banknotes"}
            name={"Contrato"}
            isStepActive={ActiveFormStepPosition == 5}
            handleStepClick={() => {}}
            position={5}
            isStepFilled={ActiveFormStepPosition > 5}
          />
        </div>
      </div>

      <div className="mt-8">
        {ActiveFormStepPosition === 1 && (
          <GenerateData
            handleConfirmationClick={() => {
              handleStepOnClick(2);
            }}
          />
        )}
        {ActiveFormStepPosition === 2 && (
          <Address
            handleConfirmationClick={() => {
              handleStepOnClick(3);
            }}
          />
        )}
        {ActiveFormStepPosition === 3 && (
          <Contact
            handleConfirmationClick={() => {
              handleStepOnClick(4);
            }}
          />
        )}
        {/* {ActiveFormStepPosition === 4 && (
          <AdditionalData handleConfirmationClick={handleConfirmationData} />
        )} */}
        {ActiveFormStepPosition === 4 && (
          <BankData
            handleConfirmationClick={() => {
              handleStepOnClick(5);
            }}
          />
        )}

        {ActiveFormStepPosition === 5 && (
          <Contract
            handleConfirmationClick={() => {
              handleFinishForm();
            }}
          />
        )}
      </div>
    </div>
  );
};
