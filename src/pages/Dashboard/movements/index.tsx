import {
  EyeIcon,
} from "@heroicons/react/16/solid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useAuth } from "../../../hook/auth";
import { useEffect, useState } from "react";
import { getAllTransactions } from "../../../client/transactions";
import { Fund } from "../../../types/dashboard/funds";
import { Profile } from "../../../types/auth";
import { formatDate } from "../../../utils/formatDate";

interface TableRowProps {
  id: string;
  clientId: string;
  fundId: string;
  type: 'INCOME' | 'CONTRIBUTIONS' | 'WITHDRAWAL';
  amount: number;
  currency: 'BRL' | 'USD' | 'EUR' | 'YEN';
  observation: string;
  createdAt: string;
  clientProfile: Profile;
  fund: Fund;
}

const translate = (text: string) => {
  switch(text) {
    case "INCOME":
      return "Rendimento"
    case "CONTRIBUTION":
      return "Contribuição"
    case "WITHDRAWAL":
      return "Resgate"
  }
}

export const Movements = () => {
  const { userData } = useAuth();

  const [transactions, setTransactions] = useState<TableRowProps[]>([])

  const navigate = useNavigate();
  const handleNavigateDetails = () => {
    navigate("/contributions/details");
  };
  const TABLE_HEAD = userData?.isAdmin
    ? ["Código", "Cliente", "Data", "Tipo", "Fundo", "Valor", "Ações"]
    : ["Código", "Data", "Tipo", "Fundo", "Valor"];

  
  useEffect(() => {
    async function fetchData() {
      await getAllTransactions(userData?.id)
        .then(res => setTransactions(res))
        .catch(err => console.log(err))
    }

    fetchData()
  }, []);

    
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
              {transactions?.map(
                ({
                  id,
                  currency,
                  createdAt,
                  type,
                  clientProfile,
                  fund,
                  amount,
                }) => {
                  const classes = "!p-6 ";
                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      {userData?.isAdmin && (
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="!font-semibold"
                              >
                                {clientProfile.user.name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                      )}
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="!font-semibold"
                            >
                              {formatDate(createdAt)}
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
                            {translate(type)}
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
                            {fund.name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <CurrencyRow currency={currency} value={amount} />
                      </td>
                      {userData?.isAdmin && (
                        <td className={`${classes} flex justify-start `}>
                          <Tooltip content="Detalhes">
                            <IconButton
                              onClick={handleNavigateDetails}
                              variant="text"
                            >
                              <EyeIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <Typography variant="h6" color="blue-gray">
            Página 1 <span className="font-normal text-BLACK">de 1</span>
          </Typography>
          <div className="flex gap-4">
            {/* <Button variant="text" className="flex items-center gap-1">
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              Anterior
            </Button>
            <Button variant="text" className="flex items-center gap-1">
              Próximo
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
