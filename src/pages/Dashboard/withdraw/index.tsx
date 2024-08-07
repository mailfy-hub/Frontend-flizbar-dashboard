import { TrashIcon } from "@heroicons/react/16/solid";
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
import { SectionTitle } from "../../../components/sectionTitle";
import SuccessDialog from "../../../components/successDialog";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useAuth } from "../../../hook/auth";
import { useTranslation } from "react-i18next";

interface TABLE_ROW_PROPS {
  wallet: string;
  created_at: string;
  value: number;
  currency: "BRL" | "USD" | "EUR" | "JPY";
  code: string;
  customer: string;
}

const TABLE_ROW: TABLE_ROW_PROPS[] = [
  /*   {
    wallet: "T-BOND Brazil",
    value: 2700.0,
    created_at: "22/05/2023",
    currency: "BRL",
    customer: "Marlon Lencina B. S.",
    code: "",
  }, */
];

export const Withdraw = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInsert = () => {
    navigate("insert");
  };
  const { userData } = useAuth();

  const TABLE_HEAD = userData?.isAdmin
    ? [
        `${t("default.rescues.code")}`,
        `${t("default.rescues.client")}`,
        `${t("default.rescues.found")}`,
        `${t("default.rescues.value")}`,
        `${t("default.rescues.createdAt")}`,
        `${t("default.rescues.client")}`,
        `${t("default.rescues.actions")}`,
      ]
    : [
        `${t("default.rescues.code")}`,
        `${t("default.rescues.found")}`,
        `${t("default.rescues.value")}`,
        `${t("default.rescues.createdAt")}`,
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
            onClick={handleToggleConfirmationDialog}
            className="mr-1"
          >
            <span>{t("default.modals.buttonCancel")}</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpenSuccessDelete}
          >
            <span>{t("default.modals.buttonConfirm")}</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SectionTitle text={t("default.rescues.title")} />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              {t("default.rescues.tableTitle")}
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              {t("default.rescues.text")}
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <Button
              onClick={() => {
                handleInsert();
              }}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              {t("default.rescues.button")}
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
                ({ code, created_at, customer, wallet, currency, value }) => {
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
                      {userData?.isAdmin && (
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="!font-semibold"
                              >
                                {customer}
                              </Typography>
                            </div>
                          </div>
                        </td>
                      )}

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {wallet}
                        </Typography>
                      </td>

                      <td className={`${classes} flex items-center gap-2`}>
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
                      {userData?.isAdmin && (
                        <td className={`${classes} flex justify-start `}>
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
            {t("default.pagination.page")} 1{" "}
            <span className="font-normal text-BLACK">
              {t("default.pagination.of")} 1
            </span>
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
