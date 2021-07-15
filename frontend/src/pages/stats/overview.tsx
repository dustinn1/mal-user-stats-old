import { useContext } from "react";
import { StatsContext } from "../../contexts/statscontext";
import ChartContainer from "../../components/charts/container";
import "./styles.css";

export default function Overview() {
  const data = useContext(StatsContext).statistics;
  console.log(data.scores);

  return (
    <div className="overall-stats">
      <p>{data.overview.total_anime}</p>
      <br />
      <br />
      <ChartContainer chartType="bar" data={data.scores} dataIndex="score" />
      <br />
      <br />
      <ChartContainer
        chartType="bar"
        data={data.episode_count}
        dataIndex="length"
      />
      <br />
      <br />
      <ChartContainer
        chartType="line"
        data={data.release_years}
        dataIndex="year"
      />
      <br />
      <br />
      <ChartContainer
        chartType="line"
        data={data.watch_years}
        dataIndex="year"
      />
      <br />
      <br />
      <ChartContainer
        chartType="pie"
        data={data.format_distribution}
        dataIndex="format"
      />
      <br />
      <br />
      <ChartContainer
        chartType="pie"
        data={data.status_distribution}
        dataIndex="status"
      />
    </div>
  );
}
