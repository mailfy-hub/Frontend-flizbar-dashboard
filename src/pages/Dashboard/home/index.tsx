import { CurrencyCard } from "../../../components/currencyCard";
import { FastAccessButton } from "../../../components/fastAccessButton";
import {
  DefaultLineChart,
  DefaultLineChartConfig,
} from "../../../components/lineChart";
import { SectionTitle } from "../../../components/sectionTitle";

import { Props } from "react-apexcharts";
import { useAuth } from "../../../hook/auth";

import ImageHeroAdmin from "../../../assets/admin-banner-image.png";
import { useEffect } from "react";

const ChartRendimentosData: Props = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Rendimentos",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
      data: [3.0, 2.0, 6.5, 8.4, 4.1, 6.0, 2.0, 1.2, 4.5],
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
export const Home = () => {
  const { getUserRole, userData } = useAuth();
  const userRole = getUserRole();


  useEffect(() => {
  }, [])
  return (
    <>
      {userRole === "user" ? (
        <div>
          <SectionTitle text="Sua carteira" />
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
            <div className="md:max-w-[332px] w-full bg-GOLD_DARK h-[124px] rounded-lg p-6 flex flex-col justify-between">
              <p className="font-display font-medium text-WHITE text-body16 leading-tight">
                Valor Total Aproximado
              </p>
              <div className="flex items-center gap-2">
                <span className="font-display font-normal text-WHITE text-head32 leading-tight">
                  R$
                </span>
                <span className="font-display font-normal text-WHITE text-head32 leading-tight">
                  588,21
                </span>
              </div>
            </div>
            <div className="w-full grid md:grid-cols-4 gap-8">
              <CurrencyCard Name="Dólar" Symbol="$" Value={81.63} />
              <CurrencyCard Name="Euro" Symbol="€" Value={0.0} />
              <CurrencyCard Name="Real" Symbol="R$" Value={175.98} />
              <CurrencyCard Name="Iene" Symbol="¥" Value={0.0} />
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
            icon={"heroicons:wallet"}
            link="/wallets"
            pageName="Carteiras"
          />
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
            icon={"heroicons:user-circle-16-solid"}
            link="/my-account"
            pageName="Minha conta"
          />
        </div>
      </div>
      {userRole === "user" && (
        <div>
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
        </div>
      )}
    </>
  );
};
