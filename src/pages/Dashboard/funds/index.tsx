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
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { Fund } from "../../../types/dashboard/funds";
import { formatDate } from "../../../utils/formatDate";
import { useTranslation } from "react-i18next";

export const Funds = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const TABLE_HEAD = [
    `${t("default.myAccount.admin.founds.code")}`,
    `${t("default.myAccount.admin.founds.name")}`,
    `${t("default.myAccount.admin.founds.currency")}`,
    `${t("default.myAccount.admin.founds.percentage")}`,
    `${t("default.myAccount.admin.founds.type")}`,
    `${t("default.myAccount.admin.founds.actions")}`,
  ];

  const handleNavigate = () => {
    navigate("insert");
  };

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

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

  const [fundsList, setFundsList] = useState<Fund[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const getFundsList = async (page: number) => {
    try {
      const { data } = await api.get(
        `funds?page=${page}&itemsPerPage=${itemsPerPage}`
      );

      const mappedData = data.map((fund: Fund) => {
        return {
          ...fund,
          createdAt: formatDate(fund.createdAt),
        };
      });
      setFundsList(mappedData);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFundsList(currentPage);
  }, [currentPage]);

  const [fundIdSelected, setFundIdSelected] = useState("");
  const handleFundIdSelected = (id: string) => {
    setFundIdSelected(id);
  };

  const handleDeleteFund = async (id: string) => {
    handleToggleConfirmationDialog();
    handleFundIdSelected(id);
  };

  const handleCancelDeleteFund = () => {
    handleToggleConfirmationDialog();
    setFundIdSelected("");
  };

  const DeleteFundAction = async () => {
    try {
      await api.delete(`/funds/${fundIdSelected}`);
      const filteredFundsList = fundsList?.filter(
        (fund) => fund.id !== fundIdSelected
      );
      setFundsList(filteredFundsList);
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

  //{t("default.myAccount.admin.founds.actions")}

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
        <DialogHeader>{t("default.modals.title")}</DialogHeader>
        <DialogBody>{t("default.modals.text")}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancelDeleteFund}
            className="mr-1"
          >
            <span>{t("default.modals.buttonCancel")}</span>
          </Button>
          <Button variant="gradient" color="red" onClick={DeleteFundAction}>
            <span>{t("default.modals.buttonConfirm")}</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SectionTitle text={t("default.myAccount.admin.founds.title")} />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              {t("default.myAccount.admin.founds.tableTitle")}
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              {t("default.myAccount.admin.founds.text")}
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
              onClick={handleNavigate}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              {t("default.myAccount.admin.founds.button")}
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
              {fundsList &&
                fundsList.map(
                  ({ id, name, currency, defaultPercentage, type }) => {
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
                                {`${name}`}
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
                              {currency}
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
                              {defaultPercentage}
                            </Typography>
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
                                {type}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        <td className="flex items-center justify-end text-right p-4 border-b border-gray-300 gap-2">
                          <Tooltip
                            content={t(
                              "default.myAccount.admin.founds.editFound"
                            )}
                          >
                            <IconButton
                              onClick={() => handleEdit(id)}
                              variant="text"
                            >
                              <PencilIcon className="w-4 h-4 text-gray-400" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            content={t(
                              "default.myAccount.admin.founds.deleteFound"
                            )}
                          >
                            <IconButton
                              onClick={() => handleDeleteFund(id)}
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
