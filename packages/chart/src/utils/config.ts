import { formatDate, LineData } from "./utils";

export const createConfig = (data: LineData[]) => {
  return {
    data: data,
    padding: "auto" as "auto",
    xField: "date",
    yField: "value",
    seriesField: "label",
    xAxis: {
      type: "timeCat",
    },
    animation: false as false,
    yAxis: {
      nice: true,
      max: Math.max.apply(
        Math,
        data.map((item) => {
          return item.value;
        })
      ),
      min: Math.min.apply(
        Math,
        data.map((item) => {
          return item.value;
        })
      ),
      tickCount: 5,
    },
    meta: {
      date: {
        formatter: formatDate,
      },
    },
    legend: {
      position: "bottom" as "bottom",
    },
    tooltip: {
      showCrosshairs: true,
      showMarkers: true,
      crosshairs: {
        type: "x" as "x",
      },
      customContent: () => null as any,
    },
    interactions: [{ type: "marker-active" }, { type: "element-active" }],
  };
};
