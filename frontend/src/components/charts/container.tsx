import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import BarGraph from "./Bar";
import LineGraph from "./Line";
import PieChart from "./Pie";
import "./styles.css";

interface Props {
  chartType: "bar" | "line" | "pie";
  data: Array<any>;
  dataIndex: string;
  reverse?: boolean;
}

export default function ChartContainer(props: Props) {
  const [sort, setSort] = useState("count");

  return (
    <div className="chart-container">
      <Nav variant="pills" className="justify-content-end">
        <Nav.Item>
          <Nav.Link active={sort === "count"} onClick={() => setSort("count")}>
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
      <div className={`chart ${props.reverse && "reverse"}`}>
        {props.chartType === "bar" && (
          <BarGraph
            data={props.data}
            dataIndex={props.dataIndex}
            dataKey={sort}
          />
        )}
        {props.chartType === "line" && (
          <LineGraph
            data={props.data}
            dataIndex={props.dataIndex}
            dataKey={sort}
          />
        )}
        {props.chartType === "pie" && (
          <PieChart
            data={props.data}
            dataIndex={props.dataIndex}
            dataKey={sort}
          />
        )}
      </div>
    </div>
  );
}
