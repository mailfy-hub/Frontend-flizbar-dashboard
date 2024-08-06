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
import exampleImageAporte from "../../../assets/example-image-aporte.png";
import { api } from "../../../client/api";
import { ImageDialog } from "../../../components/imageDialog";
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { useAuth } from "../../../hook/auth";
import { Contribuition } from "../../../types/dashboard/contribuitions";
import { formatDate } from "../../../utils/formatDate";
import { useTranslation } from "react-i18next";

export const Contribuitions = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInsert = () => {
    navigate("insert");
  };

  const TABLE_HEAD = userData?.isAdmin
    ? [
        `${t("default.contributions.code")}`,
        `${t("default.contributions.client")}`,
        `${t("default.contributions.contributionValue")}`,
        `${t("default.contributions.dollarValue")}`,
        `${t("default.contributions.status")}`,
        `${t("default.contributions.createdAt")}`,
        `${t("default.contributions.actions")}`,
      ]
    : [
        `${t("default.contributions.code")}`,
        `${t("default.contributions.wallet")}`,
        `${t("default.contributions.value")}`,
        `${t("default.contributions.createdAt")}`,
      ];

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

  const handleDetails = (id: string) => {
    navigate(`details/${id}`);
  };

  const [contribuitionsList, setContribuitionsList] = useState<Contribuition[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);
  const [_totalItems] = useState(0);
  const itemsPerPage = 10;

  const getContribuitionsList = async (page: number) => {
    try {
      const { data } = await api.get(
        `contributions?page=${page}&itemsPerPage=${itemsPerPage}`
      );

      const mappedData = data.map((contribuition: Contribuition) => {
        return {
          ...contribuition,
          createdAt: formatDate(contribuition.createdAt),
        };
      });
      setContribuitionsList(mappedData);
      /*  setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems); */
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
        <DialogHeader>{t("default.modals.title")}</DialogHeader>
        <DialogBody>{t("default.contributions.text")}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancelDeleteContribuition}
            className="mr-1"
          >
            <span>{t("default.modals.buttonCancel")}</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={DeleteContribuitionAction}
          >
            <span>{t("default.modals.buttonConfirm")}</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SectionTitle text={t("default.contributions.title")} />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              {t("default.contributions.tableTitle")}
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              {t("default.contributions.text")}
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <Button
              onClick={() => {
                handleInsert();
              }}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              {t("default.contributions.button")}
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
                contribuitionsList.map(
                  ({
                    id,
                    clientID,
                    contributionAmount,
                    dollarValue,
                    status,
                    createdAt,
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
                              <IconButton
                                onClick={() => handleDetails(id)}
                                variant="text"
                              >
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
                              <IconButton
                                onClick={() => handleDeleteContribuition(id)}
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
            {t("default.pagination.page")} {currentPage}{" "}
            {t("default.pagination.of")} {totalPages}
          </Typography>
          <div className="flex gap-4">
            <Button
              variant="text"
              className="flex items-center gap-1"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              {t("default.pagination.previous")}
            </Button>
            <Button
              variant="text"
              className="flex items-center gap-1"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {t("default.pagination.next")}
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
