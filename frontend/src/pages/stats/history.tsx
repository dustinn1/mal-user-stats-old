import { useContext } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import ChartContainer from "../../components/charts/Container";

export default function History() {
  const data = useContext(StatsContext).statistics;
  return (
    <>
      <ChartContainer
        chartType="line"
        data={data.release_years}
        dataIndex="year"
        reverse={true}
      />
      <ChartContainer
        chartType="line"
        data={data.watch_years}
        dataIndex="year"
        reverse={true}
      />
    </>
  );
}
