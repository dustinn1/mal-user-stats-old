import { useContext } from "react";
import { StatsContext } from "../../contexts/statscontext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BarGraph from "../../components/charts/bar";
import PieChart from "../../components/charts/pie";
import LineGraph from "../../components/charts/line";
import "./styles.css";

export default function Overview() {
  const data = useContext(StatsContext).statistics;

  return (
    <div className="overall-stats">
      <p>{data.overview.total_anime}</p>
      <br />
      <br />
      <div className="chart-container">
        <BarGraph data={data.scores} dataIndex="score" dataKey="count" />
      </div>
      <br />
      <br />
      <div className="chart-container">
        <BarGraph data={data.scores} dataIndex="score" dataKey="time_watched" />
      </div>
      <br />
      <br />
      <Row>
        <Col>
          <div className="chart-container">
            <PieChart
              data={data.format_distribution}
              dataId="format"
              dataValue="count"
            />
          </div>
        </Col>
        <Col>
          <div className="chart-container">
            <PieChart
              data={data.status_distribution}
              dataId="status"
              dataValue="mean_score"
            />
          </div>
        </Col>
      </Row>
      <br />
      <br />
      <div className="chart-container">
        <LineGraph
          data={data.watch_years}
          dataIndex="year"
          dataKey="mean_score"
        />
      </div>
      <br />
      <br />
      <div className="chart-container">
        <LineGraph
          data={data.release_years}
          dataIndex="year"
          dataKey="mean_score"
        />
      </div>
      <br />
      <br />
    </div>
  );
}
