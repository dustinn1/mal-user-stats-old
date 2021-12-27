import { ResponsiveLine, Line } from "@nivo/line";
import prettyMs from "pretty-ms";

interface Props {
  type: "anime" | "manga";
  data: Array<any>;
  dataIndex: string;
  dataKey: string;
  dark: boolean;
}

interface PointData {
  [x: string]: any;
}

export default function LineGraph(props: Props) {
  const stats = [
    {
      id: props.dataIndex,
      data: props.data.map((o) => ({
        ...o,
        x: o[props.dataIndex],
        y: o[props.dataKey],
      })),
    },
  ];

  const ChartProps = {
    data: stats,
    margin: { top: 30, bottom: 25, left: 15, right: 15 },
    pointSize: 10,
    pointBorderWidth: 2,
    pointColor: { from: "color", modifiers: [] },
    pointBorderColor: { from: "serieColor" },
    enablePointLabel: true,
    yFormat:
      props.dataKey === "time_watched"
        ? (value: any) => prettyMs((value as number) * 1000, { unitCount: 1 })
        : "",
    pointLabelYOffset: -15,
    enableArea: true,
    areaOpacity: 0.5,
    useMesh: true,
    theme: {
      textColor: props.dark ? "#fff" : "#000",
      dots: {
        text: {
          fontSize: "16px",
        },
      },
      axis: {
        ticks: {
          text: {
            fontSize: "14px",
          },
        },
      },
    },
    axisLeft: null,
    tooltip: (d: any) => {
      const data: PointData = d.point.data;
      return (
        <div
          style={{
            fontSize: "14px",
            padding: 12,
            color: "#fff",
            background: "rgba(34, 34, 34, 0.6)",
          }}
        >
          <strong>
            <span style={{ textTransform: "capitalize" }}>
              {props.dataIndex}
            </span>
            : {data[props.dataIndex] ?? 0}
          </strong>
          <br />
          Count: {data.count ?? 0}
          <br />
          Mean Score: {data.mean_score ?? 0}
          <br />
          {props.type === "anime" && (
            <>
              Time Watched:{" "}
              {prettyMs((data.time_watched as number) * 1000, {
                unitCount: 2,
              })}
            </>
          )}
          {props.type === "manga" && (
            <>Chapters Read: {data.chapters_read ?? 0}</>
          )}
        </div>
      );
    },
  };

  return props.data.length < 10 ? (
    <ResponsiveLine {...ChartProps} />
  ) : (
    <Line {...ChartProps} height={300} width={1050} />
  );
}
