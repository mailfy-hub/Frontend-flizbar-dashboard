import {
  ArrowLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { StepButtonIndicator } from "../../../components/stepButtonIndicator";
import { useAuth } from "../../../hook/auth";
import { Profile } from "../../../types/auth";
import { Address } from "./address";
import { Attachments } from "./attachments";
import { BankData } from "./bankData";
import { Beneficiary } from "./beneficiary";
import { Contact } from "./contact";
import { Contract } from "./contract";
import { GenerateData } from "./generateData";

export interface FormStepType {
  handleConfirmationClick: () => void;
}


export const UserDataProfile = () => {
  const { profile, isLoadingData, handleFullfiledAccountInfo } = useAuth();
  const [ActiveFormStepPosition, setActiveFormStepPosition] =
    useState<number>(0);

  const navigate = useNavigate();

  const handleStepOnClick = (position: number) => {
    setActiveFormStepPosition(position);
  };

  const handleFinishForm = () => {
    navigate("/");
    handleFullfiledAccountInfo(true);
  };

  const verifyAccountData = (profile: Profile) => {
    const isClientDetailsFilled = profile?.clientDetails == null ? false : true;
    const isClientAddressesFilled =
      profile?.clientAddresses.length > 0 ? true : false;
    const isClientContactsFilled =
      profile?.clientContacts.length > 0 ? true : false;
    const isClientFinanceFilled = profile?.clientFinance == null ? false : true;
    const isClientBeneficiaryFilled =
      profile?.beneficiaries.length > 0 ? true : false;
    const isClientAttachmentsFilled =
      profile?.attachments.length > 0 ? true : false;

    const currentStep = !isClientDetailsFilled
      ? 1
      : !isClientAddressesFilled
      ? 2
      : !isClientFinanceFilled
      ? 3
      : !isClientBeneficiaryFilled
      ? 4
      : !isClientAttachmentsFilled
      ? 5
      : !isClientContactsFilled
      ? 6
      : 7;

    setActiveFormStepPosition(currentStep);
  };

  useEffect(() => {
    if (!isLoadingData) {
      verifyAccountData(profile!);
    }
  }, [profile]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
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
            isStepActive={ActiveFormStepPosition == 3}
            handleStepClick={() => {}}
            position={3}
            isStepFilled={ActiveFormStepPosition > 3}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:banknotes"}
            name={"Beneficiário"}
            isStepActive={ActiveFormStepPosition == 4}
            handleStepClick={() => {}}
            position={4}
            isStepFilled={ActiveFormStepPosition > 4}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:link-20-solid"}
            name={"Anexos"}
            isStepActive={ActiveFormStepPosition == 5}
            handleStepClick={() => {}}
            position={5}
            isStepFilled={ActiveFormStepPosition > 5}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:user-circle"}
            name={"Contatos"}
            isStepActive={ActiveFormStepPosition == 6}
            handleStepClick={() => {}}
            position={6}
            isStepFilled={ActiveFormStepPosition > 6}
          />
          <ChevronDoubleRightIcon color="#757575" height={16} />

          <StepButtonIndicator
            icon={"heroicons:banknotes"}
            name={"Contrato"}
            isStepActive={ActiveFormStepPosition == 7}
            handleStepClick={() => {}}
            position={7}
            isStepFilled={ActiveFormStepPosition > 7}
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
        {/* {ActiveFormStepPosition === 4 && (
          <AdditionalData handleConfirmationClick={handleConfirmationData} />
        )} */}
        {ActiveFormStepPosition === 3 && (
          <BankData
            handleConfirmationClick={() => {
              handleStepOnClick(4);
            }}
          />
        )}

        {ActiveFormStepPosition === 4 && (
          <Beneficiary
            handleConfirmationClick={() => {
              handleStepOnClick(5);
            }}
          />
        )}

        {ActiveFormStepPosition === 5 && (
          <Attachments
            handleConfirmationClick={() => {
              handleStepOnClick(6);
            }}
          />
        )}

        {ActiveFormStepPosition === 6 && (
          <Contact
            handleConfirmationClick={() => {
              handleStepOnClick(7);
            }}
          />
        )}

        {ActiveFormStepPosition === 7 && (
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
