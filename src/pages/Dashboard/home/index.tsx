import { CurrencyCard } from "../../../components/currencyCard";
import { FastAccessButton } from "../../../components/fastAccessButton";
import {
  DefaultLineChart,
  DefaultLineChartConfig,
} from "../../../components/lineChart";
import { SectionTitle } from "../../../components/sectionTitle";
import { Props } from "react-apexcharts";
import { useAuth } from "../../../hook/auth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ImageHeroAdmin from "../../../assets/admin-banner-image.png";
import { useTranslation } from "react-i18next";

const ChartRendimentosData: Props = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Rendimentos",
      /* data: [50, 40, 300, 320, 500, 350, 200, 230, 500], */
      data: [0],
    },
  ],
  options: {
    ...DefaultLineChartConfig,
    colors: ["#C89305"],
    stroke: {
      lineCap: "round",
      width: 3,
    },
    markers: {
      size: 6,
    },
    xaxis: {
      ...DefaultLineChartConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
const ChartRendimentosPercentualData: Props = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Rendimentos",
      /* data: [3.0, 2.0, 6.5, 8.4, 4.1, 6.0, 2.0, 1.2, 4.5], */
      data: [0],
    },
  ],
  options: {
    ...DefaultLineChartConfig,
    colors: ["#C89305"],
    stroke: {
      lineCap: "round",
      width: 3,
    },
    markers: {
      size: 6,
    },
    xaxis: {
      ...DefaultLineChartConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const data = [
  { name: "Real (R$) ", value: 1 },
  { name: "Dólar ($) ", value: 1 },
  { name: "Euro (€)", value: 1 },
  { name: "Iene (¥) ", value: 1 },
];

const COLORS = ["#A06A08", "#C89305", "#CBAD77", "#ECBF6E"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const Home = () => {
  const { userData, isFullfiledAccountInfo } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateFullfillForm = () => {
    navigate("fullfill-user-form");
  };

  useEffect(() => {}, []);
  return (
    <>
      {!userData?.isAdmin ? (
        <div>
          {!isFullfiledAccountInfo && (
            <div
              onClick={handleNavigateFullfillForm}
              className="w-full bg-white rounded-md flex items-center p-6 gap-6 cursor-pointer hover:opacity-75 transition-all border-[1px] border-WHITE hover:border-GOLD_DARK mb-8"
            >
              <div className="flex w-full items-center gap-4">
                <div className=" h-10 w-10 rounded-full bg-GOLD_MAIN grid place-content-center">
                  <Icon icon={"ph:user"} className="text-WHITE text-body16" />
                </div>
                <div className="w-full">
                  <h4 className="font-display font-semibold text-BLACK text-body18 leading-tight">
                    {t("default.dashboard.titleFullfillForm")}
                  </h4>
                  <p className="font-body font-normal text-GRAY_400 text-body16 mt-1">
                    {t("default.dashboard.textFullfillForm")}
                  </p>
                </div>
              </div>
              <div>
                <Icon
                  icon={"ph:arrow-right"}
                  className="text-GRAY_400 text-body16"
                />
              </div>
            </div>
          )}
          <div className="">
            <SectionTitle text={t("default.dashboard.yourWallet")} />
            <div className="grid grid-cols-1 md:grid-cols-4 md:flex-row gap-0 md:gap-8 mt-8">
              <div className="col-span-3 w-full grid md:grid-cols-3 gap-8">
                <div className="col-span-2 w-full bg-GOLD_DARK h-[124px] rounded-lg p-6 flex flex-col justify-between">
                  <div className="">
                    <p className="font-display font-medium text-WHITE text-body16 leading-tight flex gap-2">
                      {t("default.dashboard.approximateTotalValue")}
                      <span
                        className="cursor-pointer "
                        data-tooltip-id="cotation-tooltip"
                        data-tooltip-content={t(
                          "default.dashboard.infoApproxiTotalValue"
                        )}
                        style={{
                          maxWidth: "248px",
                          textAlign: "center",
                        }}
                      >
                        *
                      </span>
                    </p>

                    <ReactTooltip
                      id="cotation-tooltip"
                      className="text-center max-w-[324px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-normal text-WHITE text-head32 leading-tight">
                      R$
                    </span>
                    <span className="font-display font-normal text-WHITE text-head32 leading-tight">
                      0,00
                    </span>
                  </div>
                </div>
                <CurrencyCard
                  color="#A06A08"
                  Name="Dólar"
                  Symbol="$"
                  Value={0.0}
                />
                <CurrencyCard
                  color="#C89305"
                  Name="Euro"
                  Symbol="€"
                  Value={0.0}
                />
                <CurrencyCard
                  color="#CBAD77"
                  Name="Real"
                  Symbol="R$"
                  Value={0.0}
                />
                <CurrencyCard
                  color="#ECBF6E"
                  Name="Iene"
                  Symbol="¥"
                  Value={0.0}
                />
              </div>
              <div className=" w-full max-w-full bg-white px-4 min-h-[240px] mt-8 md:mt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={384} height={384}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={renderCustomizedLabel}
                      labelLine={false}
                      width="100%"
                    >
                      {data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[248px] bg-GRAY_800 rounded-md p-8 flex items-center justify-between">
          <div className="h-full w-full flex flex-col justify-center">
            <span className="font-body font-normal uppercase text-GOLD_DARK text-sm14">
              {t("default.dashboard.Subtitle")}{" "}
              <b>{t("default.dashboard.typeUser")}</b>
            </span>
            <h1 className="font-display font-normal text-white text-head32 mt-2">
              {t("default.dashboard.welcome")}{" "}
              <b>{userData?.name.split(" ")[0]}</b>
            </h1>
            <p className="font-body font-normal text-GRAY_500 text-body18 mt-2">
              {t("default.dashboard.text")}
            </p>
          </div>
          <div>
            <img alt="logo flizbar" src={ImageHeroAdmin} />
          </div>
        </div>
      )}
      <div className="mt-12">
        <SectionTitle text={t("default.dashboard.quickAccess")} />
        <div className="w-full mt-8 grid md:grid-cols-4 gap-8">
          <FastAccessButton
            icon={"radix-icons:dashboard"}
            link="/contributions"
            pageName={t("default.dashboard.firstCard")}
          />
          <FastAccessButton
            icon={"heroicons:arrow-uturn-down"}
            link="/withdraw"
            pageName={t("default.dashboard.secondCard")}
          />
          <FastAccessButton
            icon={"heroicons:arrows-right-left"}
            link="/movements"
            pageName={t("default.dashboard.thirdCard")}
          />
          <FastAccessButton
            icon={"heroicons:user-circle-16-solid"}
            link="/my-account"
            pageName={t("default.dashboard.fourthCard")}
          />
        </div>
      </div>
      {!userData?.isAdmin && (
        <div>
          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle={t("default.dashboard.fifthCard")}
                chartSubtitle={t("default.dashboard.assetDevelopment")}
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle={t("default.dashboard.fifthCard")}
                chartSubtitle={t("default.dashboard.incomePercentage")}
              />
            </div>
          </div>
          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle="T-Bond USA"
                chartSubtitle={t("default.dashboard.assetDevelopment")}
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="T-Bond USA"
                chartSubtitle={t("default.dashboard.incomePercentage")}
              />
            </div>
          </div>

          <div className="mt-12">
            <SectionTitle text={t("default.dashboard.graphicalView")} />
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle="T-Bond Brazil"
                chartSubtitle={t("default.dashboard.assetDevelopment")}
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="T-Bond Brazil"
                chartSubtitle={t("default.dashboard.incomePercentage")}
              />
            </div>
          </div>

          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle={t("default.dashboard.lowRisk")}
                chartSubtitle={t("default.dashboard.assetDevelopment")}
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle={t("default.dashboard.lowRisk")}
                chartSubtitle={t("default.dashboard.incomePercentage")}
              />
            </div>
          </div>
          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle={t("default.dashboard.highRisk")}
                chartSubtitle={t("default.dashboard.assetDevelopment")}
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle={t("default.dashboard.highRisk")}
                chartSubtitle={t("default.dashboard.incomePercentage")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
