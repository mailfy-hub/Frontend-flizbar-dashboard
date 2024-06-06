import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import exampleImageAporte from "../../../assets/example-image-aporte.png";
import { ImageDialog } from "../../../components/imageDialog";
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useAuth } from "../../../hook/auth";

interface TABLE_ROW_PROPS {
  code: string;
  customer: string;
  wallet: string;
  value: number;
  created_at: string;
  currency: "BRL" | "USD" | "EUR" | "JPY";
}

const TABLE_ROW: TABLE_ROW_PROPS[] = [
  {
    code: "#TBR52536267",
    customer: "Emma Roberts",
    wallet: "T-BOND Brazil",
    value: 2700.0,
    created_at: "23/05/2024",
    currency: "BRL",
  },
  {
    code: "#TBR52536264",
    customer: "Emma Roberts",
    wallet: "T-BOND Brazil",
    value: 120.0,
    created_at: "23/05/2024",
    currency: "USD",
  },
  {
    code: "#TBR52536262",
    customer: "Emma Roberts",
    wallet: "T-BOND Brazil",
    value: 50.0,
    created_at: "23/05/2024",
    currency: "EUR",
  },
];

export const Contribuitions = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const handleInsert = () => {
    navigate("insert");
  };

  const TABLE_HEAD =
    userData?.role === "admin"
      ? ["Código", "Cliente", "Carteira", "Valor", "Data de criação", "Ações"]
      : ["Código", "Carteira", "Valor", "Data de criação"];

  const [openConfimationDialog, setOpenConfimationDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const handleOpenSuccessDelete = () => {
    handleToggleConfirmationDialog();
    handleToggleSuccessDialog();
  };

  const handleToggleSuccessDialog = () => {
    setOpenSuccessDialog(!openSuccessDialog);
  };

  const handleToggleConfirmationDialog = () => {
    setOpenConfimationDialog(!openConfimationDialog);
  };

  const [isDialogImageOpen, setIsDialogImageOpen] = useState(false);

  const handleToggleDialogImage = () => {
    setIsDialogImageOpen((prevOpen) => !prevOpen);
  };

  const handleDetails = () => {
    navigate("details");
  };
  return (
    <div>
      <ImageDialog
        imageUrl={exampleImageAporte}
        open={isDialogImageOpen}
        imageAlt="test"
        onClose={handleToggleDialogImage}
      />
      <SuccessDialog
        open={openSuccessDialog}
        handleClose={handleToggleSuccessDialog}
      />
      <Dialog
        size="xs"
        open={openConfimationDialog}
        handler={handleToggleConfirmationDialog}
      >
        <DialogHeader>
          Tem certeza que deseja <br /> deletar este registro?
        </DialogHeader>
        <DialogBody>
          Essa ação é irreversível, tome cuidado ao prosseguir.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleToggleConfirmationDialog}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpenSuccessDelete}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SectionTitle text="Todos aportes" />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              Tabela de aportes
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              Veja informações sobre todos seus aportes
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <Button
              onClick={() => {
                handleInsert();
              }}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              ADICIONAR APORTE
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
              {TABLE_ROW.map(
                ({ code, customer, created_at, value, wallet, currency }) => {
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

                      {userData?.role === "admin" && (
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
                      )}

                      <td className={classes}>
                        <div>
                          <Typography
                            variant="small"
                            color="black"
                            className="!font-normal"
                          >
                            {wallet}
                          </Typography>
                        </div>
                      </td>

                      <td className={`${classes} flex items-center gap-2`}>
                        {/* <span className="font-display font-semibold text-body16 text-GOLD_MAIN">
                          {CURRENCY_MAP[currency]}
                        </span>
                        <p className="font-display font-semibold text-body16 text-BLACK">
                          {value}
                        </p> */}
                        <CurrencyRow currency={currency} value={value} />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {created_at}
                        </Typography>
                      </td>

                      {userData?.role === "admin" && (
                        <td className={`${classes} flex justify-start `}>
                          <Tooltip content="Visualizar">
                            <IconButton onClick={handleDetails} variant="text">
                              <EyeIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Comprovante">
                            <IconButton
                              onClick={handleToggleDialogImage}
                              variant="text"
                            >
                              <DocumentArrowDownIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Excluir">
                            <IconButton
                              onClick={handleToggleConfirmationDialog}
                              variant="text"
                            >
                              <TrashIcon className="w-4 h-4 text-gray-400" />
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
