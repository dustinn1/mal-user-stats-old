import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./styles.css";

interface Props {
  type: "anime" | "manga";
  genre: number;
  title: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
}

export default function SmallCoverImage(props: Props) {
  const language = useContext(LanguageContext);
  const title = props.title;

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`tooltip-${props.genre}-${props.title.id}`}>
            <strong>
              {language.language === "romaji" && title.title}
              {language.language === "english" && title.title_en}
              {language.language === "japanese" && title.title_ja}
            </strong>
          </Tooltip>
        }
      >
        <a
          href={`https://myanimelist.net/${props.type}/${title.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <picture className="small-cover-image">
            <source
              srcSet={`https://cdn.myanimelist.net/images/${props.type}/${title.image_url_id}.webp`}
              type="image/webp"
            />
            <img
              src={`https://cdn.myanimelist.net/images/${props.type}/${title.image_url_id}.jpg`}
              alt="anime cover"
            />
          </picture>
        </a>
      </OverlayTrigger>
    </>
  );
}
