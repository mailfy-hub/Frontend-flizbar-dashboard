import { ApexOptions } from "apexcharts";
import Chart, { Props } from "react-apexcharts";

interface DefaultLineChartProps {
  chartProps: Props;
  chartTitle: string;
  chartSubtitle: string;
}

export const DefaultLineChartConfig: ApexOptions = {
  stroke: {
    lineCap: "round",
    width: 3,
  },
  markers: {
    size: 6,
  },
  chart: {
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#757575",
        fontSize: "12px",
        fontFamily: "Roboto",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#757575",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  responsive: [
    {
      options: {},
    },
  ],
  grid: {
    show: true,
    borderColor: "#EEEEEE",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "light",
  },
};

export const DefaultLineChart = ({
  chartProps,
  chartSubtitle,
  chartTitle,
}: DefaultLineChartProps) => {
  return (
    <div className="w-full bg-WHITE rounded-lg p-6">
      <Chart {...chartProps} />
      <div className="mt-4 ">
        <h4 className="font-display font-semibold text-body18 text-black">
          {chartTitle}
        </h4>
        <p className="font-body font-normal text-body16 text-GRAY_400">
          {chartSubtitle}
        </p>
      </div>
    </div>
  );
};
