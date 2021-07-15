import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import BarGraph from "./bar";
import LineGraph from "./line";
import PieChart from "./pie";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faChartArea,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

interface Props {
  chartType: "bar" | "line" | "pie";
  data: Array<any>;
  dataIndex: string;
}

export default function ChartContainer(props: Props) {
  const [sort, setSort] = useState("count");
  const [chartType, setChartType] = useState(props.chartType);

  return (
    <div className="chart-container">
      <Row className="chart-controls">
        <Col>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link
                active={chartType === "bar"}
                onClick={() => setChartType("bar")}
                className={props.chartType === "bar" ? "default" : ""}
              >
                <FontAwesomeIcon icon={faChartBar} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={chartType === "line"}
                onClick={() => setChartType("line")}
                className={props.chartType === "line" ? "default" : ""}
              >
                <FontAwesomeIcon icon={faChartArea} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={chartType === "pie"}
                onClick={() => setChartType("pie")}
                className={props.chartType === "pie" ? "default" : ""}
              >
                <FontAwesomeIcon icon={faChartPie} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <Nav variant="pills" className="justify-content-end">
            <Nav.Item>
              <Nav.Link
                active={sort === "count"}
                onClick={() => setSort("count")}
              >
                Count
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={sort === "time_watched"}
                onClick={() => setSort("time_watched")}
              >
                Time Watched
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={sort === "mean_score"}
                onClick={() => setSort("mean_score")}
              >
                Mean Score
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      {chartType === "bar" && (
        <BarGraph
          data={props.data}
          dataIndex={props.dataIndex}
          dataKey={sort}
        />
      )}
      {chartType === "line" && (
        <LineGraph
          data={props.data}
          dataIndex={props.dataIndex}
          dataKey={sort}
        />
      )}
      {chartType === "pie" && (
        <PieChart
          data={props.data}
          dataIndex={props.dataIndex}
          dataKey={sort}
        />
      )}
    </div>
  );
}
