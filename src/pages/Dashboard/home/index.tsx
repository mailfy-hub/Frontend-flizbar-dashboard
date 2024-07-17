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
                    Preencha com todos seus dados
                  </h4>
                  <p className="font-body font-normal text-GRAY_400 text-body16 mt-1">
                    Complete os dados da sua conta, clique aqui para ser
                    redirecionado.
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
            <SectionTitle text="Sua carteira" />
            <div className="grid grid-cols-1 md:grid-cols-4 md:flex-row gap-0 md:gap-8 mt-8">
              <div className="col-span-3 w-full grid md:grid-cols-3 gap-8">
                <div className="col-span-2 w-full bg-GOLD_DARK h-[124px] rounded-lg p-6 flex flex-col justify-between">
                  <div className="">
                    <p className="font-display font-medium text-WHITE text-body16 leading-tight flex gap-2">
                      Valor Total Aproximado
                      <span
                        className="cursor-pointer "
                        data-tooltip-id="cotation-tooltip"
                        data-tooltip-content="Os valores totais são estimados e podem variar de acordo com a cotação do dólar no dia da transação."
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
              PAINEL DO <b>ADMISTRADOR</b>
            </span>
            <h1 className="font-display font-normal text-white text-head32 mt-2">
              Bem-vindo <b>{userData?.name.split(" ")[0]}</b>
            </h1>
            <p className="font-body font-normal text-GRAY_500 text-body18 mt-2">
              Que bom ter você devolta, o que faremos hoje?
            </p>
          </div>
          <div>
            <img alt="logo flizbar" src={ImageHeroAdmin} />
          </div>
        </div>
      )}
      <div className="mt-12">
        <SectionTitle text="Acesso Rápido" />
        <div className="w-full mt-8 grid md:grid-cols-4 gap-8">
          <FastAccessButton
            icon={"radix-icons:dashboard"}
            link="/contributions"
            pageName="Aportes"
          />
          <FastAccessButton
            icon={"heroicons:arrow-uturn-down"}
            link="/withdraw"
            pageName="Resgates"
          />
          <FastAccessButton
            icon={"heroicons:arrows-right-left"}
            link="/movements"
            pageName="Movimentações"
          />
          <FastAccessButton
            icon={"heroicons:user-circle-16-solid"}
            link="/my-account"
            pageName="Minha conta"
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
                chartTitle="Total"
                chartSubtitle="Evolução Patrimonial"
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="Total"
                chartSubtitle="Percentual de Rendimentos"
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
                chartSubtitle="Evolução Patrimonial"
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="T-Bond USA"
                chartSubtitle="Percentual de Rendimentos"
              />
            </div>
          </div>

          <div className="mt-12">
            <SectionTitle text="Visualização Gráfica" />
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle="T-Bond Brazil"
                chartSubtitle="Evolução Patrimonial"
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="T-Bond Brazil"
                chartSubtitle="Percentual de Rendimentos"
              />
            </div>
          </div>

          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle="Baixo Risco"
                chartSubtitle="Evolução Patrimonial"
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="Baixo Risco"
                chartSubtitle="Percentual de Rendimentos"
              />
            </div>
          </div>
          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/*                 <Chart {...ChartRendimentosData} />
               */}{" "}
              <DefaultLineChart
                chartProps={ChartRendimentosData}
                chartTitle="Alto Risco"
                chartSubtitle="Evolução Patrimonial"
              />
              <DefaultLineChart
                chartProps={ChartRendimentosPercentualData}
                chartTitle="Alto Risco"
                chartSubtitle="Percentual de Rendimentos"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
