import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import prettyMs from "pretty-ms";
import {
  faPlusCircle,
  faPlayCircle,
  faDivide,
  faClock,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";
import { StatsContext } from "../../contexts/StatsContext";
import ChartContainer from "../../components/charts/Container";
import Table from "../../components/table";
import ValueStatCard from "../../components/statcard/value";
import "./styles.css";

export default function Overview() {
  const stats = useContext(StatsContext).data.statistics;

  return (
    <>
      <Helmet>
        <title>Overview Stats</title>
      </Helmet>
      <div className="overall-stats">
        <h1 className="stats-header">Overview</h1>
        <div className="d-flex flex-wrap justify-content-evenly">
          <ValueStatCard
            stat="Total Anime"
            value={stats.overview.total_anime}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Episodes Watched"
            value={stats.overview.episodes_watched}
            icon={faPlayCircle}
          />
          <ValueStatCard
            stat="Mean Score"
            value={stats.overview.mean_score}
            icon={faDivide}
          />
          <ValueStatCard
            stat="Time Watched"
            value={prettyMs(stats.overview.time_watched * 1000, {
              unitCount: 3,
            })}
            icon={faClock}
          />
          <ValueStatCard
            stat="Standard Deviation"
            value={stats.overview.standard_deviation}
            icon={faPercentage}
          />
        </div>
        <ChartContainer
          chartType="bar"
          data={stats.scores}
          dataIndex="score"
          title="Scores"
        />
        <Table data={stats.scores} dataIndex="score" />
        <ChartContainer
          chartType="bar"
          data={stats.episode_count}
          dataIndex="length"
          title="Episode Count"
        />
        <Table data={stats.episode_count} dataIndex="length" />
        <ChartContainer
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
