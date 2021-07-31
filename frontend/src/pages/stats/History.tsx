import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { StatsContext } from "../../contexts/StatsContext";
import ChartContainer from "../../components/charts/Container";
import Table from "../../components/table";

export default function History() {
  const stats = useContext(StatsContext).data.statistics;
  return (
    <>
      <Helmet>
        <title>History Stats</title>
      </Helmet>
      <h1 className="stats-header">History</h1>
      <ChartContainer
        chartType="line"
        data={stats.release_years}
        dataIndex="year"
        reverse={true}
        title="Release Years"
      />
      <Table data={stats.release_years} dataIndex="year" />
      <ChartContainer
        chartType="line"
        data={stats.watch_years}
        dataIndex="year"
        reverse={true}
        title="Watch Years"
      />
      <Table data={stats.watch_years} dataIndex="year" />
    </>
  );
}
