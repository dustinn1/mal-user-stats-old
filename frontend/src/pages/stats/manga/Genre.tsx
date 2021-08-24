import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LinkContainer } from "react-router-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  faPlusCircle,
  faDivide,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { StatsContext } from "../../../contexts/StatsContext";
import LargeCoverImage from "../../../components/coverimage/large";
import ValueStatCard from "../../../components/statcard/value";

interface Manga {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}

export default function Genre() {
  const stats = useContext(StatsContext);
  const { genre } = useParams<{ genre: string }>();

  useEffect(() => window.scrollTo(0, 0), []);

  const validGenre: boolean = stats.data.manga_statistics.genres.some(
    (n) => n.name.toLowerCase() === genre.replaceAll("_", " ")
  );

  if (validGenre) {
    const genreStats = stats.data.manga_statistics.genres.find(
      (element) => element.name.toLowerCase() === genre.replaceAll("_", " ")
    )!;

    const mangas: Array<Manga> = [];
    for (let mangaId of genreStats.all_mangas) {
      mangas.push(
        stats.data.manga_statistics.all_mangas.find(
          (manga: any) => manga.id === mangaId
        ) as Manga
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
            stat="Total Manga"
            value={genreStats.count}
            icon={faPlusCircle}
          />
          <ValueStatCard
            stat="Mean Score"
            value={genreStats.mean_score}
            icon={faDivide}
          />
          <ValueStatCard
            stat="Chapters Read"
            value={genreStats.chapters_read}
            icon={faBook}
          />
        </div>
        <h3 className="stats-subheader">Mangas ({mangas.length})</h3>
        <hr />
        <div className="cover-images-grid">
          {mangas.map((manga: Manga) => (
            <LargeCoverImage key={manga.id} type="manga" title={manga} />
          ))}
        </div>
      </>
    );
  } else {
    return <div>Nothing</div>;
  }
}
