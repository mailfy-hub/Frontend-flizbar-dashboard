import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { SectionTitle } from "../../../components/sectionTitle";
import { CurrencyRow } from "../../../components/table/currencyRow";

interface TableRowProps {
  currency: "BRL" | "USD" | "EUR" | "JPY";
  value: number;
  code: string;
  type: string;
  fund: string;
  customer: string;
  created_at: string;
}

const TABLE_ROW: TableRowProps[] = [
  {
    code: "#TBR52536267",
    type: "Resgate",
    value: 120.0,
    created_at: "23/05/2024",
    currency: "USD",
    customer: "Marlon Lencina S. B.",
    fund: "T-Bond Brazil",
  },
];

const TABLE_HEAD = ["Código", "Data", "Tipo", "Cliente", "Fundo", "Valor"];

export const Movements = () => {
  return (
    <div>
      <SectionTitle text="Todas movimentações" />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              Tabela de movimentações
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              Visualize todas suas movimentações no sistema de forma conjunta
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max"></div>
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
              {TABLE_ROW.map(
                ({
                  code,
                  currency,
                  created_at,
                  customer,
                  fund,
                  type,
                  value,
                }) => {
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
                            {/*                             <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {detail}
                            </Typography> */}
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div>
                          <Typography
                            variant="small"
                            color="black"
                            className="!font-normal"
                          >
                            {type}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div>
                          <Typography
                            variant="small"
                            color="black"
                            className="!font-normal"
                          >
                            {customer}
                          </Typography>
                        </div>
                      </td>
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
                        <CurrencyRow currency={currency} value={value} />
                      </td>
                    </tr>
                  );
                }
              )}
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
