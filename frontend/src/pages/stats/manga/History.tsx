import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { StatsContext } from "../../../contexts/StatsContext";
import ChartContainer from "../../../components/charts/Container";
import Table from "../../../components/table/manga";

export default function History() {
  const stats = useContext(StatsContext).data.manga_statistics;
  return (
    <>
      <Helmet>
        <title>History Stats</title>
      </Helmet>
      <h1 className="stats-header">History</h1>
      <ChartContainer
        type="manga"
        chartType="line"
        data={stats.release_years}
        dataIndex="year"
        reverse={true}
        title="Release Years"
      />
      <Table data={stats.release_years} dataIndex="year" />
      <ChartContainer
        type="manga"
        chartType="line"
        data={stats.read_years}
        dataIndex="year"
        reverse={true}
        title="Read Years"
      />
      <Table data={stats.read_years} dataIndex="year" />
    </>
  );
}
