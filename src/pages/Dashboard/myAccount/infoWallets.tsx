import { Icon } from "@iconify/react/dist/iconify.js";
import { Typography } from "@material-tailwind/react";
import { SectionTitle } from "../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

interface TABLE_ROW_TYPE {
  code: string;
  wallet: string;
}

const TABLE_ROW: TABLE_ROW_TYPE[] = [
  /*   {
    code: "#TBR52536267",
    wallet: "Convencional",
  },
  {
    code: "#TUS26737352",
    wallet: "Fundo de emergência",
  }, */
];

export const InfoWallets = () => {
  const { t } = useTranslation();

  const TABLE_HEAD = [
    `${t("default.myAccount.client.wallets.code")}`,
    `${t("default.myAccount.client.wallets.name")}`,
  ];

  return (
    <form className="mt-12">
      <div className="bg-WHITE p-8 w-full rounded-md">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:wallet"} color="black" />
          <SectionTitle
            size="sm"
            text={t("default.myAccount.client.wallets.title")}
          />
        </div>

        <div className="mt-8 flex flex-col gap-6 ">
          <p className="font-body font-normal text-body16 text-GRAY_400">
            {t("default.myAccount.client.wallets.text")}
            Esse cliente não possui nenhuma carteira.
          </p>
        </div>

        <table className="w-full min-w-max table-auto text-left mt-8">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="">
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
            {TABLE_ROW.map(({ code, wallet }) => {
              const classes = "!py-6 ";
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
                        {/*                             <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {detail}
                            </Typography> */}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </form>
  );
};
