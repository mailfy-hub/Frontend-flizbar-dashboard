import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleStackIcon,
  MagnifyingGlassIcon,
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
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { User } from "../../../types/dashboard/users";
import { api } from "../../../client/api";

const TABLE_HEAD = ["Id", "Nome", "Tipo", "Telefone", "E-mail", "Ações"];

export const Customers = () => {
  const navigate = useNavigate();
  const handleInsert = () => {
    navigate("insert");
  };
  const handleEdit = (id: string) => {
    navigate("edit", { state: { id: id } });
  };

  const [openConfimationDialog, setOpenConfimationDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [userIdSelected, setUserIdSelected] = useState("");
  const [usersList, setUsersList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const getUsersList = async (page: number) => {
    try {
      const { data } = await api.get(
        `admin/users/clients?page=${page}&itemsPerPage=${itemsPerPage}&name=${searchTerm}`
      );
      setUsersList(data.items);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersList(currentPage);
  }, [currentPage, searchTerm]);

  const handleOpenSuccessDelete = () => {
    handleToggleConfirmationDialog();
    handleToggleSuccessDialog();
  };

  const handleUserIdSelected = (id: string) => {
    setUserIdSelected(id);
  };

  const handleDeleteUser = async (id: string) => {
    handleToggleConfirmationDialog();
    handleUserIdSelected(id);
  };

  const handleToggleSuccessDialog = () => {
    setOpenSuccessDialog(!openSuccessDialog);
  };

  const handleToggleConfirmationDialog = () => {
    setOpenConfimationDialog(!openConfimationDialog);
  };

  const DeleteUserAction = async () => {
    try {
      await api.delete(`/users/${userIdSelected}/delete`);
      const filteredUsersList = usersList?.filter(
        (user) => user.id !== userIdSelected
      );
      setUsersList(filteredUsersList);
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
          <Button variant="gradient" color="red" onClick={DeleteUserAction}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SectionTitle text="Todos clientes" />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              Tabela de clientes
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              Veja informações sobre todos seus clientes
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                name="search client"
                label="Nome do cliente"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                handleInsert();
              }}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              ADICIONAR CLIENTE
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
              {usersList &&
                usersList.map(
                  ({ id, email, name, surname, phone, personType }) => {
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
                                {id.slice(0, 8)}
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
                                {`${name} ${surname}`}
                              </Typography>
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
                              {personType?.toUpperCase()}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="!font-normal text-gray-600"
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="!font-normal text-gray-600"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={`${classes} flex justify-end `}>
                          <Tooltip content="Cotações">
                            <IconButton variant="text">
                              <CircleStackIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Editar usuário">
                            <IconButton
                              onClick={() => handleEdit(id)}
                              variant="text"
                            >
                              <PencilIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Deletar usuário">
                            <IconButton
                              onClick={() => handleDeleteUser(id)}
                              variant="text"
                            >
                              <TrashIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
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
