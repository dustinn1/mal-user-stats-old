import { useContext, useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { StatsContext } from "../../../contexts/StatsContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StatCard from "../../../components/statcard/anime";
import "../styles.css";

interface Genre {
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
    return function (a: Genre, b: Genre) {
      return b[prop] - a[prop];
    };
  } else {
    return function (a: Genre, b: Genre) {
      return b.count - a.count;
    };
  }
}

export default function Genres() {
  const stats = useContext(StatsContext);
  const [sort, setSort] = useState("count");
  const [search, setSearch] = useState("");

  const genresCopy = [...stats.data.anime_statistics.genres];

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <>
      <Helmet>
        <title>Genres Stats</title>
      </Helmet>
      <h1 className="stats-header">Genres</h1>
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
        {genresCopy
          .sort(compare(sort))
          .filter((genre) =>
            genre.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((genre, index: number) => (
            <StatCard
              key={genre.id}
              index={index + 1}
              genre={genre.id}
              name={genre.name}
              count={genre.count}
              mean_score={genre.mean_score}
              time_watched={genre.time_watched}
              animes={genre.top_animes}
            />
          ))}
      </div>
    </>
  );
}
