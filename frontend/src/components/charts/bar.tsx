import { ResponsiveBar } from "@nivo/bar";
import prettyMs from "pretty-ms";

interface Props {
  data: Array<any>;
  dataIndex: string;
  dataKey: string;
}

export default function BarGraph(props: Props) {
  return (
    <ResponsiveBar
      data={props.data}
      indexBy={props.dataIndex}
      keys={[props.dataKey]}
      margin={{ top: 30, bottom: 30 }}
      valueFormat={
        props.dataKey === "time_watched"
          ? (value) => prettyMs(value * 1000, { unitCount: 2 })
          : ""
      }
      //padding={0.45}
      borderRadius={5}
      labelTextColor={"#fff"}
      labelSkipHeight={30}
      theme={{
        labels: {
          text: {
            fontSize: "16px",
            fontWeight: 700,
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
      enableGridX={true}
      axisBottom={{
        tickSize: 6,
      }}
      tooltip={(d) => {
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
              : {d.data[props.dataIndex] ?? 0}
            </strong>
            <br />
            Count: {d.data.count ?? 0}
            <br />
            Mean Score: {d.data.mean_score ?? 0}
            <br />
            Time Watched:{" "}
            {prettyMs((d.data.time_watched as number) * 1000, { unitCount: 2 })}
          </div>
        );
      }}
    />
  );
}
