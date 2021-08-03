import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import {
  faPlusCircle,
  faDivide,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";
import { StatsContext } from "../../../contexts/StatsContext";
import ChartContainer from "../../../components/charts/Container";
import Table from "../../../components/table/manga";
import ValueStatCard from "../../../components/statcard/value";
import "../styles.css";

export default function Overview() {
  const stats = useContext(StatsContext).data.manga_statistics;

  return (
    <>
      <Helmet>
        <title>Overview Stats</title>
      </Helmet>
      <div className="overall-stats">
        <h1 className="stats-header">Overview</h1>
        <div className="d-flex flex-wrap justify-content-evenly">
          <ValueStatCard
            stat="Total Manga"
            value={stats.overview.total_manga}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Chapters Read"
            value={stats.overview.chapters_read}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Volume Read"
            value={stats.overview.volumes_read}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Mean Score"
            value={stats.overview.mean_score}
            icon={faDivide}
          />
          <ValueStatCard
            stat="Standard Deviation"
            value={stats.overview.standard_deviation}
            icon={faPercentage}
          />
        </div>
        <ChartContainer
          type="manga"
          chartType="bar"
          data={stats.scores}
          dataIndex="score"
          title="Scores"
        />
        <Table data={stats.scores} dataIndex="score" />
        <ChartContainer
          type="manga"
          chartType="bar"
          data={stats.chapter_count}
          dataIndex="length"
          title="Chapter Count"
        />
        <Table data={stats.chapter_count} dataIndex="length" />
        <ChartContainer
          type="manga"
          chartType="bar"
          data={stats.volume_count}
          dataIndex="length"
          title="Volume Count"
        />
        <Table data={stats.volume_count} dataIndex="length" />
        <ChartContainer
          type="manga"
          chartType="pie"
          data={stats.format_distribution}
          dataIndex="format"
          title="Format Distribution"
        />
        <Table
          data={stats.format_distribution}
          dataIndex="format"
          sortBy="count"
        />
        <ChartContainer
          type="manga"
          chartType="pie"
          data={stats.status_distribution}
          dataIndex="status"
          title="Status Distribution"
        />
        <Table
          data={stats.status_distribution}
          dataIndex="status"
          sortBy="count"
        />
      </div>
    </>
  );
}
