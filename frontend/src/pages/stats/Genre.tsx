import { useContext } from "react";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import prettyMs from "pretty-ms";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { StatsContext } from "../../contexts/StatsContext";
import LargeCoverImage from "../../components/coverimage/large";

const genres = [
  "action",
  "adventure",
  "cars",
  "comedy",
  "dementia",
  "demons",
  "mystery",
  "drama",
  "ecchi",
  "fantasy",
  "game",
  "hentai",
  "historical",
  "horror",
  "kids",
  "magic",
  "martial_arts",
  "mecha",
  "music",
  "parody",
  "samurai",
  "romance",
  "school",
  "sci-fi",
  "shoujo",
  "shoujo_ai",
  "shounen",
  "shounen_ai",
  "space",
  "sports",
  "super_power",
  "vampire",
  "yaoi",
  "yuri",
  "harem",
  "slice_of_life",
  "supernatural",
  "military",
  "police",
  "psychological",
  "thriller",
  "seinen",
  "josei",
];

interface Anime {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}

export default function Genre() {
  const data = useContext(StatsContext);
  const { genre } = useParams<{ genre: string }>();

  const genreStats = data.statistics.genres.find(
    (element) => element.name.toLowerCase() === genre.replaceAll("_", " ")
  )!;

  const animes: Array<Anime> = [];
  for (let animeId of genreStats.all_animes) {
    animes.push(
      data.animes.find((anime: any) => anime.id === animeId) as Anime
    );
  }

  return genres.includes(genre) ? (
    <>
      <Breadcrumb>
        <LinkContainer to={"../genres"}>
          <Breadcrumb.Item>Genres</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{genreStats.name}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{genreStats.name}</h1>
      <p>{genreStats.count}</p>
      <p>{genreStats.mean_score}</p>
      <p>{prettyMs(genreStats.time_watched * 1000, { verbose: true })}</p>
      <h3>Animes ({animes.length})</h3>
      <hr />
      <div className="cover-images-grid">
        {animes.map((anime: Anime) => (
          <LargeCoverImage key={anime.id} anime={anime} />
        ))}
      </div>
    </>
  ) : (
    <div>Nothing</div>
  );
}
