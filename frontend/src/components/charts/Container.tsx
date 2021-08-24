import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Nav from "react-bootstrap/Nav";
import BarGraph from "./Bar";
import LineGraph from "./Line";
import PieChart from "./Pie";
import "./styles.css";

interface Props {
  type: "anime" | "manga";
  chartType: "bar" | "line" | "pie";
  data: Array<any>;
  dataIndex: string;
  reverse?: boolean;
  title: string;
}

export default function ChartContainer(props: Props) {
  const theme = useContext(ThemeContext);
  const [sort, setSort] = useState("count");

  return (
    <div className="chart-container">
      <div className="chart-container-header">
        <h3>{props.title}</h3>
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link
              active={sort === "count"}
              onClick={() => setSort("count")}
            >
              Count
            </Nav.Link>
          </Nav.Item>
          {props.type === "anime" && (
            <Nav.Item>
              <Nav.Link
                active={sort === "time_watched"}
                onClick={() => setSort("time_watched")}
              >
                Time Watched
              </Nav.Link>
            </Nav.Item>
          )}
          {props.type === "manga" && (
            <Nav.Item>
              <Nav.Link
                active={sort === "chapters_read"}
                onClick={() => setSort("chapters_read")}
              >
                Chapters Read
              </Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link
              active={sort === "mean_score"}
              onClick={() => setSort("mean_score")}
            >
              Mean Score
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className={`chart ${props.reverse && "reverse"}`}>
        {props.chartType === "bar" && (
          <BarGraph
            type={props.type}
            data={props.data}
            dataIndex={props.dataIndex}
            dataKey={sort}
            dark={theme.theme === "dark"}
          />
        )}
        {props.chartType === "line" && (
          <LineGraph
            type={props.type}
            data={props.data}
            dataIndex={props.dataIndex}
            dataKey={sort}
            dark={theme.theme === "dark"}
          />
        )}
        {props.chartType === "pie" && (
          <PieChart
            type={props.type}
            data={props.data}
            dataIndex={props.dataIndex}
            dataKey={sort}
            dark={theme.theme === "dark"}
          />
        )}
      </div>
    </div>
  );
}
