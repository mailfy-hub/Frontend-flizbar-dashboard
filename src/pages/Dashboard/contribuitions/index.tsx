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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../client/api";
import exampleImageAporte from "../../../assets/example-image-aporte.png";
import { ImageDialog } from "../../../components/imageDialog";
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useAuth } from "../../../hook/auth";
import { Contribuition } from "../../../types/dashboard/contribuitions";
import { formatDate } from "../../../utils/formatDate";

interface TABLE_ROW_PROPS {
  code: string;
  customer: string;
  contribuition: string;
  value: number;
  created_at: string;
  currency: "BRL" | "USD" | "EUR" | "JPY";
}

const TABLE_ROW: TABLE_ROW_PROPS[] = [
  /* {
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
  }, */
];

export const Contribuitions = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const handleInsert = () => {
    navigate("insert");
  };

  const TABLE_HEAD =
    userData?.isAdmin
      ? ["Código", "Cliente", "Valor do Aporte", "Valor do Dólar", "Status", "Data de criação", "Ações"]
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



  const [contribuitionsList, setContribuitionsList] = useState<Contribuition[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const getContribuitionsList = async (page: number) => {
    try {
      const { data } = await api.get(
        `contributions?page=${page}&itemsPerPage=${itemsPerPage}`
      );

      console.log('API Response:', data); // Log adicional

   
      const mappedData = data.map((contribuition: Contribuition) => {
        return {
          ...contribuition,
          createdAt: formatDate(contribuition.createdAt),
        };
      });
      setContribuitionsList(mappedData);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContribuitionsList(currentPage);
  }, [currentPage]);


  const [contribuitionIdSelected, setContribuitionIdSelected] = useState("");
  const handleContribuitionIdSelected = (id: string) => {
    setContribuitionIdSelected(id);
  };

  const handleDeleteContribuition = async (id: string) => {
    handleToggleConfirmationDialog();
    handleContribuitionIdSelected(id);
  };

  const handleCancelDeleteContribuition = () => {
    handleToggleConfirmationDialog();
    setContribuitionIdSelected("");
  };

  const DeleteContribuitionAction = async () => {
    try {
      await api.delete(`/contributions/${contribuitionIdSelected}`);
      const filteredContribuitionsList = contribuitionsList?.filter(
        (contribuition) => contribuition.id !== contribuitionIdSelected
      );
      setContribuitionsList(filteredContribuitionsList);
      handleOpenSuccessDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
            onClick={handleCancelDeleteContribuition}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={DeleteContribuitionAction}
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
            {contribuitionsList &&
                contribuitionsList.map(({ id, clientID,   contributionAmount,  dollarValue, status , createdAt}) => {

       
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
                          <div>
                            <Typography
                              variant="small"
                              color="black"
                              className="!font-normal"
                            >
                              {clientID}
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
                            {contributionAmount}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {dollarValue}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {status}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {createdAt}
                        </Typography>
                      </td>

                      {userData?.isAdmin && (
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
                          <Tooltip content="Deletar usuário">
                        <IconButton onClick={() => handleDeleteContribuition(id)} variant="text">
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
          Página {currentPage} de {totalPages}
          </Typography>
          <div className="flex gap-4">
          <Button
              variant="text"
              className="flex items-center gap-1"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              Anterior
            </Button>
            <Button
              variant="text"
              className="flex items-center gap-1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próximo
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
