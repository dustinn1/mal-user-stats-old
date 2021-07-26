import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import prettyMs from "pretty-ms";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  const data = useContext(StatsContext).statistics;

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
            value={data.overview.total_anime}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Episodes Watched"
            value={data.overview.episodes_watched}
            icon={faPlayCircle}
          />
          <ValueStatCard
            stat="Mean Score"
            value={data.overview.mean_score}
            icon={faDivide}
          />
          <ValueStatCard
            stat="Time Watched"
            value={prettyMs(data.overview.time_watched * 1000, {
              unitCount: 3,
            })}
            icon={faClock}
          />
          <ValueStatCard
            stat="Standard Deviation"
            value={data.overview.standard_deviation}
            icon={faPercentage}
          />
        </div>
        <ChartContainer chartType="bar" data={data.scores} dataIndex="score" />
        <Table data={data.scores} dataIndex="score" />
        <ChartContainer
          chartType="bar"
          data={data.episode_count}
          dataIndex="length"
        />
        <Table data={data.episode_count} dataIndex="length" />
        <Row>
          <Col xs={12} lg={6} className="mt-4 order-2 order-lg-1">
            <Table
              data={data.format_distribution}
              dataIndex="format"
              sortBy="count"
            />
          </Col>
          <Col xs={12} lg={6} className="order-1 order-lg-2">
            <ChartContainer
              chartType="pie"
              data={data.format_distribution}
              dataIndex="format"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6} className="mt-4 order-2 order-lg-1">
            <Table
              data={data.status_distribution}
              dataIndex="status"
              sortBy="count"
            />
          </Col>
          <Col xs={12} lg={6} className="order-1 order-lg-2">
            <ChartContainer
              chartType="pie"
              data={data.status_distribution}
              dataIndex="status"
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
