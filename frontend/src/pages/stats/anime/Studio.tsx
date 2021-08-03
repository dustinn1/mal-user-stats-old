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
import { StatsContext } from "../../../contexts/StatsContext";
import LargeCoverImage from "../../../components/coverimage/large";
import ValueStatCard from "../../../components/statcard/value";

interface Anime {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}

export default function Studio() {
  const stats = useContext(StatsContext);
  const { studio } = useParams<{ studio: string }>();

  const validStudio: boolean = stats.data.anime_statistics.studios.some(
    (n) => n.name.toLowerCase() === studio.replaceAll("_", " ")
  );

  if (validStudio) {
    const studioStats = stats.data.anime_statistics.studios.find(
      (element) => element.name.toLowerCase() === studio.replaceAll("_", " ")
    )!;

    const animes: Array<Anime> = [];
    for (let animeId of studioStats.all_animes) {
      animes.push(
        stats.data.anime_statistics.all_animes.find(
          (anime: any) => anime.id === animeId
        ) as Anime
      );
    }

    return (
      <>
        <Helmet>
          <title>{`${studioStats.name} Studio Stats`}</title>
        </Helmet>
        <Breadcrumb>
          <LinkContainer to={"../studios"}>
            <Breadcrumb.Item>Studios</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>{studioStats.name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="stats-header">{studioStats.name}</h1>
        <div className="d-flex flex-wrap justify-content-evenly mb-3">
          <ValueStatCard
            stat="Total Anime"
            value={studioStats.count}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Mean Score"
            value={studioStats.mean_score}
            icon={faDivide}
          />
          <ValueStatCard
            stat="Total Anime"
            value={prettyMs(studioStats.time_watched * 1000, {
              unitCount: 3,
            })}
            icon={faClock}
          />
        </div>
        <h3>Animes ({animes.length})</h3>
        <hr />
        <div className="cover-images-grid">
          {animes.map((anime: Anime) => (
            <LargeCoverImage key={anime.id} type="anime" title={anime} />
          ))}
        </div>
      </>
    );
  } else {
    return <div>Nothing</div>;
  }
}
