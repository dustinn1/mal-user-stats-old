import { useContext } from "react";
import { StatsContext } from "../../contexts/statscontext";
import ChartContainer from "../../components/charts/container";
import "./styles.css";

export default function Overview() {
  const data = useContext(StatsContext).statistics;

  return (
    <div className="overall-stats">
      <p>{data.overview.total_anime}</p>
      <ChartContainer chartType="bar" data={data.scores} dataIndex="score" />
      <ChartContainer
        chartType="bar"
        data={data.episode_count}
        dataIndex="length"
      />
      <ChartContainer
        chartType="pie"
        data={data.format_distribution}
        dataIndex="format"
      />
      <ChartContainer
        chartType="pie"
        data={data.status_distribution}
        dataIndex="status"
      />
    </div>
  );
}
