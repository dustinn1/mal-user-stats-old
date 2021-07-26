import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LinkContainer } from "react-router-bootstrap";
import prettyMs from "pretty-ms";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  faPlusCircle,
  faDivide,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { StatsContext } from "../../contexts/StatsContext";
import LargeCoverImage from "../../components/coverimage/large";
import ValueStatCard from "../../components/statcard/value";

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

  const validGenre: boolean = data.statistics.genres.some(
    (n) => n.name.toLowerCase() === genre.replaceAll("_", " ")
  );

  if (validGenre) {
    const genreStats = data.statistics.genres.find(
      (element) => element.name.toLowerCase() === genre.replaceAll("_", " ")
    )!;

    const animes: Array<Anime> = [];
    for (let animeId of genreStats.all_animes) {
      animes.push(
        data.animes.find((anime: any) => anime.id === animeId) as Anime
      );
    }

    return (
      <>
        <Helmet>
          <title>{`${genreStats.name} Genre Stats`}</title>
        </Helmet>
        <Breadcrumb>
          <LinkContainer to={"../genres"}>
            <Breadcrumb.Item>Genres</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>{genreStats.name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="stats-header">{genreStats.name}</h1>
        <div className="d-flex flex-wrap justify-content-evenly mb-3">
          <ValueStatCard
            stat="Total Anime"
            value={genreStats.count}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Mean Score"
            value={genreStats.mean_score}
            icon={faDivide}
          />
          <ValueStatCard
            stat="Total Anime"
            value={prettyMs(genreStats.time_watched * 1000, {
              unitCount: 3,
            })}
            icon={faClock}
          />
        </div>
        <h3>Animes</h3>
        <hr />
        <div className="cover-images-grid">
          {animes.map((anime: Anime) => (
            <LargeCoverImage key={anime.id} anime={anime} />
          ))}
        </div>
      </>
    );
  } else {
    return <div>Nothing</div>;
  }
}