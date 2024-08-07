import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
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
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useAuth } from "../../../hook/auth";
import { deleteQuotation, getAllQuotations } from "../../../client/quotations";
import { formatDate } from "../../../utils/formatDate";

interface TABLE_ROW_PROPS {
  id: string;
  createdAt: string;
  dollar: number;
  euro: number;
  yen: number;
  quotationDate: string;
}

const TABLE_HEAD = [
  "Código",
  "Data de criação",
  "Dólar",
  "Euro",
  "Yene",
  "Ações",
];

export const Quotes = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  const handleInsert = () => {
    navigate("insert");
  };

  const handleEdit = (res: Omit<TABLE_ROW_PROPS, "createdAt">) => {
    navigate("edit", { state: { data: res }});
  };

  const [openConfimationDialog, setOpenConfimationDialog] = useState(false);
  const [quotations, setQuotations] = useState<TABLE_ROW_PROPS[]>([]);
  const [currentId, setCurrentId] = useState('')
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleOpenSuccessDelete = () => {
    deleteQuotation(currentId)
      .then(() => {
        handleToggleConfirmationDialog()
        handleToggleSuccessDialog()
      })
      .catch(err => console.log(err))
  };

  const handleToggleSuccessDialog = () => {
    setOpenSuccessDialog(!openSuccessDialog);
  };

  const handleToggleConfirmationDialog = () => {
    setOpenConfimationDialog(!openConfimationDialog);
  };

  useEffect(() => {
    async function fetchData() {
      await getAllQuotations()
      .then(res => setQuotations(res))
      .catch(err => console.log(err))

    }
    fetchData()

  })

  return (
    <div>
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
      <SectionTitle text="Todas cotações" />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
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
              {quotations?.map(({ id, createdAt, quotationDate, dollar, euro, yen }) => {
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
                        </div>
                      </div>
                    </td>

                    <td className={`${classes}`}>
                      <CurrencyRow
                        currency={"USD"}
                        value={dollar}
                      />
                    </td>
                    <td className={`${classes}`}>
                      <CurrencyRow
                        currency={"EUR"}
                        value={euro}
                      />
                    </td>
                    <td className={`${classes}`}>
                      <CurrencyRow
                        currency={"JPY"}
                        value={yen}
                      />
                    </td>
                    {userData?.isAdmin && (
                      <td className={`${classes} flex justify-end `}>
                        <Tooltip content="Editar">
                          <IconButton onClick={() => handleEdit({ id, quotationDate, dollar, euro, yen })} variant="text">
                            <PencilIcon className="w-4 h-4 text-gray-400" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Excluir">
                          <IconButton
                            onClick={() => {
                              setCurrentId(id)
                              handleToggleConfirmationDialog()
                            }}
                            variant="text"
                          >
                            <TrashIcon className="w-4 h-4 text-gray-400" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    )}
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
