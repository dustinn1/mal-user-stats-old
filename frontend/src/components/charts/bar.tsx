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
      groupMode="grouped"
      valueScale={{ type: "symlog" }}
      margin={{ bottom: 30 }}
      padding={0.5}
      borderRadius={5}
      labelTextColor={"#fff"}
      labelSkipHeight={20}
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
      gridYValues={[0]}
      axisBottom={{
        tickSize: 0,
        tickPadding: 12,
      }}
      tooltip={(d) => {
        return (
          <div
            style={{
              fontSize: "14px",
              padding: 12,
              color: "#fff",
              background: "rgba(34, 34, 34, 0.7)",
            }}
          >
            <strong>Score: {d.data.score}</strong>
            <br />
            Count: {d.data.count}
            <br />
            Time Watched:{" "}
            {prettyMs(d.data.time_watched * 1000, { unitCount: 2 })}
          </div>
        );
      }}
    />
  );
}
