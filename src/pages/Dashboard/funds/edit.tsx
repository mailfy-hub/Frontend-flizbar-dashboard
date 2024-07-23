import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { Fund } from "../../../types/dashboard/funds";


type fund = {
  index: string;
  name: string;
  currency: string;
};

export const FundsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();


  const [_, setFund] = useState<Fund | null>(null);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const getFund = async (id: string) => {
    try {
      const { data } = await api.get(`/funds/${id}`);
      setFund(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getFund(id);
    }
  }, [id]);


  const [fundList, setFundList] = useState<fund[]>([
    {
      index: `${Date.now()}-${Math.random().toString(36)}`,
      name: "",
      currency: "",
    },
  ]);

  const handleNewFund = () => {
    const newFund = {
      index: `${Date.now()}-${Math.random().toString(36)}`,
      name: "",
      currency: "",
    };

    setFundList((state) => [newFund, ...state]);
  };
  const handleRemoveFund = (idx: string) => {
    const fundListFiltered = fundList.filter((fund) => fund.index !== idx);
    setFundList(fundListFiltered);
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
        <SectionTitle text="Dados do fundo" />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon
              height={16}
              icon={"heroicons:currency-dollar"}
              color="black"
            />
            <SectionTitle size="sm" text="Fundo" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            {fundList.map((fund) => {
              return (
                <div className="flex items-center gap-6">
                  <div className="flex-1 grid md:grid-cols-2 gap-6">
                    <Input type="text" label="Nome" />
                    <Select label="Moeda">
                      <option value=""></option>
                    </Select>
                  </div>
                  {fundList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveFund(fund.index);
                      }}
                      className="font-body font-medium text-GRAY text-body14 underline hover:text-GOLD_MAIN text-nowrap"
                    >
                      Remover
                    </button>
                  )}
                </div>
              );
            })}
            <div>
              <Button onClick={handleNewFund}>Vincular novo fundo</Button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            Atualizar dados
          </Button>
        </div>
      </form>
    </div>
  );
};
