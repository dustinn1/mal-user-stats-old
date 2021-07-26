import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./styles.css";

interface Props {
  genre: number;
  anime: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
}

export default function SmallCoverImage(props: Props) {
  const settings = useContext(SettingsContext);
  const anime = props.anime;

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`tooltip-${props.genre}-${props.anime.id}`}>
            <strong>
              {settings.language === "romaji" && anime.title}
              {settings.language === "english" && anime.title_en}
              {settings.language === "japanese" && anime.title_ja}
            </strong>
          </Tooltip>
        }
      >
        <a
          href={`https://myanimelist.net/anime/${anime.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <picture className="small-cover-image">
            <source
              srcSet={`https://cdn.myanimelist.net/images/anime/${anime.image_url_id}.webp`}
              type="image/webp"
            />
            <img
              src={`https://cdn.myanimelist.net/images/anime/${anime.image_url_id}.jpg`}
              alt="anime cover"
            />
          </picture>
        </a>
      </OverlayTrigger>
    </>
  );
}
