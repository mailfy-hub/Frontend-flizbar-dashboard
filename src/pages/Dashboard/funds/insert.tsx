import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { api } from "../../../client/api";
import { toast } from "react-toastify";

type Fund = {
  name: string;
  currency: string;
  type: string;
  defaultPercentage: string;
};

export const FundsInsert = () => {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  const [fund, setFund] = useState<Fund>({
    name: "",
    currency: "",
    type: "",
    defaultPercentage: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFund((prevFund) => ({
      ...prevFund,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dados enviados:", fund);

    try {
      const response = await api.post("/funds", fund);
      toast("Fundo adicionado com sucesso", {
        type: "success",
        autoClose: 3000,
      });
      navigate(-1);
    } catch (error) {
      console.error("Erro ao adicionar fundo:", error.response ? error.response.data : error.message);
      toast("Erro ao adicionar fundo", {
        type: "error",
        autoClose: 3000,
      });
    }
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
        <SectionTitle text="Preencha o formulário de inclusão" />
      </div>
      <form className="mt-12" onSubmit={handleSubmit}>
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:currency-dollar"} color="black" />
            <SectionTitle size="sm" text="Fundo" />
          </div>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex-1 grid md:grid-cols-2 gap-6">
              <Input
                type="text"
                label="Nome"
                name="name"
                value={fund.name}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <Select
                label="Moeda"
                name="currency"
                value={fund.currency}
                onChange={(value) =>
                  handleInputChange("currency", value)
                }
              >
                <Option value="BRL">BRL</Option>
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
                <Option value="JPY">JPY</Option>
              </Select>
              <Select
                label="Tipo"
                name="type"
                value={fund.type}
                onChange={(value) =>
                  handleInputChange("type", value)
                }
              >
                <Option value="conventional">Convencional</Option>
                <Option value="emergency">Emergencial</Option>
              </Select>
              <Input
                type="text"
                label="Percentual Padrão"
                name="defaultPercentage"
                value={fund.defaultPercentage}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto" type="submit">
            Adicionar Fundo
          </Button>
        </div>
      </form>
    </div>
  );
};