import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useAuth } from "../../../hook/auth";

interface TABLE_ROW_PROPS {
  id: string;
  fund: string;
  dolarValue: number;
  realValue: number;
  currency: "BRL" | "USD" | "EUR" | "JPY";
  percentage: number;
}

const TABLE_HEAD = [
  "Fundo",
  "Moeda",
  "Valor ($)",
  "Valor (R$)",
  "Porcentagem (%)",
];
const TABLE_ROW: TABLE_ROW_PROPS[] = [
  {
    id: "1",
    fund: "T-BOND Brazil",
    currency: "BRL",
    dolarValue: 585.0,
    realValue: 3000.0,
    percentage: 0,
  },
  {
    id: "2",
    fund: "T-Bond USA",
    currency: "USD",
    dolarValue: 0,
    realValue: 0,
    percentage: 0,
  },
  {
    id: "3",
    fund: "Baixo Risco",
    currency: "BRL",
    dolarValue: 0,
    realValue: 0,
    percentage: 0,
  },
  {
    id: "4",
    fund: "Alto Risco",
    currency: "BRL",
    dolarValue: 0,
    realValue: 0,
    percentage: 0,
  },
];

export const ContribuitionDetails = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pendente");
  const { userData } = useAuth();

  const params = useParams();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleAllocate = () => {
    setStatus("Concluído");
    toast("Sucesso", {
      type: "success",
      autoClose: 3000,
    });

    // Impedir que o status seja editado após a alocação
  };

  // onst [contribuition, setContribuition] = useState();
  const getContribuitionById = async (id: string) => {
    try {
      const response = await api.get(`/contributions/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    params.id && getContribuitionById(params.id);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Detalhes aporte #41" />
      </div>
      <div className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div>
            <SectionTitle size="sm" text="Marlon Lencina B." />
            <Typography
              variant="small"
              className="text-GRAY_400 font-normal mt-2"
            >
              Aporte realizado em 26/09/2024
            </Typography>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-6 w-full">
              <div className="flex flex-col max-w-[152px] w-full">
                <span className="font-body font-normal text-sm10 text-GRAY_400 uppercase leading-tight">
                  TIPO DO APORTE
                </span>
                <span className="font-display font-semibold text-BLACK text-body18">
                  Convecional
                </span>
              </div>
              <div className="flex flex-col max-w-[152px] w-full">
                <span className="font-body font-normal text-sm10 text-GRAY_400 uppercase leading-tight">
                  COTAÇÃO DO DÓLAR
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-GOLD_DARK text-body18">
                    $
                  </span>
                  <span className="font-display font-semibold text-BLACK text-body18">
                    5.12
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-nowrap">
              <Typography
                variant="small"
                className="text-GRAY_400 font-medium mt-2 text-nowrap"
              >
                VALOR DO APORTE
              </Typography>
              <div className="flex items-center gap-1 bg-GOLD_DARK py-2 px-4 rounded-sm">
                <span className="font-display font-medium text-WHITE text-body20">
                  R$
                </span>
                <span className="font-display font-medium text-WHITE text-body20">
                  648,56
                </span>
              </div>
            </div>
          </div>
          {userData?.isAdmin && (
            <div className="mt-6">
              <Select
                label="Status do aporte"
                // disabled={status === "Concluído"}
                value={status}
                onChange={(value) => value && setStatus(value)}
                className="pt-2"
                disabled
              >
                <Option value="Rejeitado">Rejeitado</Option>
                <Option value="Pendente">Pendente</Option>
                <Option value="Aprovado">Aprovado</Option>
                <Option value="Creditado">Creditado</Option>
              </Select>
            </div>
          )}
          {status === "Aprovado" && (
            <div className="mt-6">
              <Button onClick={handleAllocate} color="green">
                Alocar Aporte
              </Button>
            </div>
          )}
        </div>
        <table className="w-full min-w-max table-auto text-left bg-WHITE rounded-md mt-8">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="!p-6">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="!font-bold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROW.map(
              ({ currency, dolarValue, fund, realValue, id, percentage }) => {
                const classes = "!p-6 ";
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant="small"
                          color="black"
                          className="!font-normal"
                        >
                          {fund}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="!font-normal text-gray-600"
                      >
                        {currency}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <CurrencyRow currency="USD" value={dolarValue} />
                    </td>
                    <td className={classes}>
                      <CurrencyRow currency="BRL" value={realValue} />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="!font-normal text-gray-600"
                      >
                        {percentage} %
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
