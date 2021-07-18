import { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StatsContext } from "../../contexts/StatsContext";
import ChartContainer from "../../components/charts/Container";
import Table from "../../components/table";
import "./styles.css";

export default function Overview() {
  const data = useContext(StatsContext).statistics;

  return (
    <div className="overall-stats">
      <p>{data.overview.total_anime}</p>
      <ChartContainer chartType="bar" data={data.scores} dataIndex="score" />
      <Table data={data.episode_count} dataIndex="length" />
      <ChartContainer
        chartType="bar"
        data={data.episode_count}
        dataIndex="length"
      />
      <Row>
        <Col className="mt-4">
          <Table
            data={data.format_distribution}
            dataIndex="format"
            sortBy="count"
          />
        </Col>
        <Col>
          <ChartContainer
            chartType="pie"
            data={data.format_distribution}
            dataIndex="format"
          />
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <Table
            data={data.status_distribution}
            dataIndex="status"
            sortBy="count"
          />
        </Col>
        <Col>
          <ChartContainer
            chartType="pie"
            data={data.status_distribution}
            dataIndex="status"
          />
        </Col>
      </Row>
    </div>
  );
}
