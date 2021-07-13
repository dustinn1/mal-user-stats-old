import { ResponsivePie } from "@nivo/pie";
import prettyMs from "pretty-ms";

interface Props {
  data: Array<any>;
  dataId: string;
  dataValue: string;
}

export default function PieChart(props: Props) {
  return (
    <ResponsivePie
      data={props.data}
      id={props.dataId}
      value={props.dataValue}
      sortByValue={true}
      innerRadius={0.3}
      padAngle={3}
      arcLabelsSkipAngle={12}
      arcLabelsTextColor={"#fff"}
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
            textTransform: "uppercase",
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
              background: "rgba(34, 34, 34, 0.7)",
            }}
          >
            <strong>Format: {d.datum.data.format}</strong>
            <br />
            Count: {d.datum.data.count}
            <br />
            Mean Score: {d.datum.data.mean_score}
            <br />
            Time Watched:{" "}
            {prettyMs(d.datum.data.time_watched * 1000, { unitCount: 2 })}
          </div>
        );
      }}
    />
  );
}
