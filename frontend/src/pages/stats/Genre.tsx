import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (genres.includes(genre)) {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"../genres"}>Genres</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{genreStats.name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{genreStats.name}</h1>
        <p>{genreStats.count}</p>
        <h3>Animes ({animes.length})</h3>
        <hr />
        <div className="cover-images-grid">
          {animes.map((anime: Anime) => (
            <LargeCoverImage
              key={anime.id}
              title={anime.title}
              malId={anime.id}
              imageUrlId={anime.image_url_id}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <div>Nothing</div>;
  }
}
