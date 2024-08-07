import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { CurrencyRow } from "../../../components/table/currencyRow";
import { useTranslation } from "react-i18next";

interface TABLE_ROW_PROPS {
  wallet: string;
  created_at: string;
  value: number;
  currency: "BRL" | "USD" | "EUR" | "JPY";
  code: string;
}

const TABLE_ROW: TABLE_ROW_PROPS[] = [
  {
    wallet: "T-BOND Brazil",
    value: 2700.0,
    created_at: "22/05/2023",
    currency: "BRL",
    code: "",
  },
];

export const Income = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const TABLE_HEAD = [
    `${t("default.myAccount.admin.income.code")}`,
    `${t("default.myAccount.admin.income.fund")}`,
    `${t("default.myAccount.admin.income.value")}`,
    `${t("default.myAccount.admin.income.createdAt")}`,
  ];

  const handleInsert = () => {
    navigate("insert");
  };
  return (
    <div>
      <SectionTitle text={t("default.myAccount.admin.income.title")} />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="black">
              {t("default.myAccount.admin.income.tableTitle")}
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              {t("default.myAccount.admin.income.text")}
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label={t("default.myAccount.admin.income.fundName")}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              onClick={() => {
                handleInsert();
              }}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              {t("default.myAccount.admin.income.button")}
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
                ({ code, created_at, currency, value, wallet }) => {
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
                              {wallet}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div>
                          <CurrencyRow currency={currency} value={value} />
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="!font-normal text-gray-600"
                        >
                          {created_at}
                        </Typography>
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
            {t("default.pagination.page")} 2{" "}
            <span className="font-normal text-BLACK">
              {t("default.pagination.of")} 10
            </span>
          </Typography>
          <div className="flex gap-4">
            <Button variant="text" className="flex items-center gap-1">
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              {t("default.pagination.previous")}
            </Button>
            <Button variant="text" className="flex items-center gap-1">
              {t("default.pagination.next")}
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
