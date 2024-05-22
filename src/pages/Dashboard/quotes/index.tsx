import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { CurrencyRow } from "../../../components/table/currencyRow";

interface CURRENCY_PROPS {
  currency_code: "USD" | "EUR" | "JPY" | "BRL";
  symbol: string;
  value: number;
}

interface TABLE_ROW_PROPS {
  code: string;
  created_at: string;
  USD: CURRENCY_PROPS;
  EUR: CURRENCY_PROPS;
  JPY: CURRENCY_PROPS;
}

const TABLE_ROW: TABLE_ROW_PROPS[] = [
  {
    code: "#TBR52536267",
    created_at: "23/04/2024",
    USD: {
      currency_code: "USD",
      symbol: "$",
      value: 2700,
    },
    EUR: {
      currency_code: "EUR",
      symbol: "€",
      value: 2700,
    },
    JPY: {
      currency_code: "JPY",
      symbol: "¥",
      value: 2700,
    },
  },
];

const TABLE_HEAD = ["Código", "Data de criação", "Dólar", "Yene", "Euro"];

export const Quotes = () => {
  const navigate = useNavigate();
  const handleInsert = () => {
    navigate("insert");
  };
  return (
    <div>
      <SectionTitle text="Todas cotações" />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="#0C0B0A">
              Tabela de cotações
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              Veja informações sobre todos suas cotações
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              {/* <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              /> */}
            </div>
            <Button
              onClick={() => {
                handleInsert();
              }}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              ADICIONAR COTAÇÃO
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto !p-0">
          <table className="w-full min-w-max table-auto text-left">
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
              {TABLE_ROW.map(({ code, created_at, USD, EUR, JPY }) => {
                const classes = "!p-6 ";
                return (
                  <tr key={code}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-semibold"
                          >
                            {code}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-semibold"
                          >
                            {created_at}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={`${classes}`}>
                      <CurrencyRow
                        currency={USD.currency_code}
                        value={USD.value}
                      />
                    </td>
                    <td className={`${classes}`}>
                      <CurrencyRow
                        currency={EUR.currency_code}
                        value={USD.value}
                      />
                    </td>
                    <td className={`${classes}`}>
                      <CurrencyRow
                        currency={JPY.currency_code}
                        value={JPY.value}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <Typography variant="h6" color="blue-gray">
            Página 2 <span className="font-normal text-BLACK">of 10</span>
          </Typography>
          <div className="flex gap-4">
            <Button variant="text" className="flex items-center gap-1">
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              Anterior
            </Button>
            <Button variant="text" className="flex items-center gap-1">
              Próximo
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
