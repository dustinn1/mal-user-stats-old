import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { StatsContext } from "../../contexts/StatsContext";
import ChartContainer from "../../components/charts/Container";
import Table from "../../components/table";

export default function History() {
  const data = useContext(StatsContext).statistics;
  return (
    <>
      <Helmet>
        <title>History Stats</title>
      </Helmet>
      <h1 className="stats-header">History</h1>
      <ChartContainer
        chartType="line"
        data={data.release_years}
        dataIndex="year"
        reverse={true}
      />
      <Table data={data.release_years} dataIndex="year" />
      <ChartContainer
        chartType="line"
        data={data.watch_years}
        dataIndex="year"
        reverse={true}
      />
      <Table data={data.watch_years} dataIndex="year" />
    </>
  );
}
