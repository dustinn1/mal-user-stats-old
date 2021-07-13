import { ResponsiveLine } from "@nivo/line";

interface Props {
  data: Array<any>;
  dataIndex: string;
  dataKey: string;
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
      margin={{ top: 25, bottom: 25, left: 35, right: 35 }}
      pointSize={15}
      pointBorderWidth={2}
      pointColor={{ theme: "background" }}
      pointBorderColor={{ from: "serieColor" }}
      enablePointLabel={true}
      useMesh={true}
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
            <strong>Year: {d.point.data.x}</strong>
          </div>
        );
      }}
    />
  );
}
