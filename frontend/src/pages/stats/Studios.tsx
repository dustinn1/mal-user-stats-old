import { useContext, useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { StatsContext } from "../../contexts/StatsContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StatCard from "../../components/statcard";
import "./styles.css";

interface Studio {
  id: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  top_animes: Array<Object>;
  all_animes: Array<Object>;
}

function compare(prop: string) {
  if (prop === "count" || prop === "mean_score" || prop === "time_watched") {
    return function (a: Studio, b: Studio) {
      return b[prop] - a[prop];
    };
  } else {
    return function (a: Studio, b: Studio) {
      return b.count - a.count;
    };
  }
}

export default function Studios() {
  const stats = useContext(StatsContext);
  const [sort, setSort] = useState("count");
  const [search, setSearch] = useState("");

  const studiosCopy = [...stats.data.statistics.studios];

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <>
      <Helmet>
        <title>Studios Stats</title>
      </Helmet>
      <h1 className="stats-header">Studios</h1>
      <div className="sort-section">
        <div className="sort-buttons">
          <span>Sort by:</span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setSort("count")}
            active={sort === "count"}
          >
            Anime Count
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setSort("mean_score")}
            active={sort === "mean_score"}
          >
            Mean Score
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setSort("time_watched")}
            active={sort === "time_watched"}
          >
            Time Watched
          </Button>
        </div>
        <div className="search-section">
          <Form.Control
            size="sm"
            type="search"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="stats-cards">
        {studiosCopy
          .sort(compare(sort))
          .filter((studio) =>
            studio.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((studio, index: number) => (
            <StatCard
              key={studio.id}
              index={index + 1}
              genre={studio.id}
              name={studio.name}
              count={studio.count}
              mean_score={studio.mean_score}
              time_watched={studio.time_watched}
              animes={studio.top_animes}
            />
          ))}
      </div>
    </>
  );
}
