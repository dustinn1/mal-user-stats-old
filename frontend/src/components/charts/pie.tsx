import { ResponsivePie } from "@nivo/pie";
import prettyMs from "pretty-ms";

interface Props {
  data: Array<any>;
  dataIndex: string;
  dataKey: string;
}

export default function PieChart(props: Props) {
  return (
    <ResponsivePie
      data={props.data}
      id={props.dataIndex}
      value={props.dataKey}
      margin={{ top: 30, bottom: 30 }}
      valueFormat={
        props.dataKey === "time_watched"
          ? (value) => prettyMs(value * 1000)
          : ""
      }
      sortByValue={true}
      innerRadius={0.4}
      padAngle={3}
      arcLabelsSkipAngle={12}
      arcLabelsTextColor={"#fff"}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextOffset={20}
      activeInnerRadiusOffset={10}
      activeOuterRadiusOffset={10}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          itemWidth: 80,
          itemHeight: 24,
          symbolSize: 14,
        },
      ]}
      theme={{
        labels: {
          text: {
            fontSize: "14px",
            fontWeight: 700,
          },
        },
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
              : {d.datum.data[props.dataIndex] ?? 0}
            </strong>
            <br />
            Count: {d.datum.data.count ?? 0}
            <br />
            Mean Score: {d.datum.data.mean_score ?? 0}
            <br />
            Time Watched:{" "}
            {prettyMs(d.datum.data.time_watched * 1000, { unitCount: 2 })}
          </div>
        );
      }}
    />
  );
}
