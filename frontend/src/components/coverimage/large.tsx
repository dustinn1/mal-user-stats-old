import LazyLoad from "react-lazyload";
import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Placeholder from "./placeholder";

interface Props {
  type: "anime" | "manga";
  title: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
}

export default function LargeCoverImage(props: Props) {
  const settings = useContext(SettingsContext);
  const title = props.title;

  return (
    <a
      href={`https://myanimelist.net/${props.type}/${title.id}`}
      target="_blank"
      rel="noreferrer"
      className="large-cover-image"
    >
      <LazyLoad once offset={200} placeholder={<Placeholder />}>
        <picture>
          <source
            srcSet={`https://cdn.myanimelist.net/images/${props.type}/${title.image_url_id}l.webp`}
            type="image/webp"
          />
          <img
            src={`https://cdn.myanimelist.net/images/${props.type}/${title.image_url_id}l.jpg`}
            alt="anime cover"
          />
        </picture>
      </LazyLoad>
      <span>
        {settings.language === "romaji" && title.title}
        {settings.language === "english" && title.title_en}
        {settings.language === "japanese" && title.title_ja}
      </span>
    </a>
  );
}
