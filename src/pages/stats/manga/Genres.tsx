import { useContext, useState, ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { StatsContext } from "../../../contexts/StatsContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import StatCard from "../../../components/statcard/manga";
import "../styles.css";

interface Genre {
  id: number;
  name: string;
  count: number;
  chapters_read: number;
  mean_score: number;
  top_mangas: Array<Object>;
  all_mangas: Array<Object>;
}

function compare(prop: string) {
  if (prop === "count" || prop === "mean_score" || prop === "chapters_read") {
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

  const genresCopy = [...stats.data.manga_statistics.genres];

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
            Manga Count
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
            onClick={() => setSort("chapters_read")}
            active={sort === "chapters_read"}
          >
            Chapters Read
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
              chapters_read={genre.chapters_read}
              mangas={genre.top_mangas}
            />
          ))}
      </div>
    </>
  );
}
