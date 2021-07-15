import { ResponsiveLine } from "@nivo/line";
import prettyMs from "pretty-ms";

interface Props {
  data: Array<any>;
  dataIndex: string;
  dataKey: string;
}

interface PointData {
  [x: string]: any;
}

export default function LineGraph(props: Props) {
  const stats = [
    {
      id: "Watch years",
      data: props.data.map((o) => ({
        ...o,
        x: o[props.dataIndex],
        y: o[props.dataKey],
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={stats}
      margin={{ top: 30, bottom: 25, left: 90, right: 15 }}
      pointSize={10}
      pointBorderWidth={2}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={props.dataKey !== "time_watched" ? true : false}
      pointLabelYOffset={-15}
      enableArea={true}
      areaOpacity={0.5}
      useMesh={true}
      theme={{
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
      }}
      axisLeft={{
        tickPadding: 20,
      }}
      tooltip={(d) => {
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
            Time Watched: {prettyMs(data.time_watched * 1000, { unitCount: 2 })}
          </div>
        );
      }}
    />
  );
}
