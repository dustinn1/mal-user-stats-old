import LazyLoad from "react-lazyload";
import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Placeholder from "./placeholder";

interface Props {
  anime: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
}

export default function LargeCoverImage(props: Props) {
  const settings = useContext(SettingsContext);
  const anime = props.anime;

  return (
    <a
      href={`https://myanimelist.net/anime/${anime.id}`}
      target="_blank"
      rel="noreferrer"
      className="large-cover-image"
    >
      <LazyLoad once offset={200} placeholder={<Placeholder />}>
        <picture>
          <source
            srcSet={`https://cdn.myanimelist.net/images/anime/${anime.image_url_id}l.webp`}
            type="image/webp"
          />
          <img
            src={`https://cdn.myanimelist.net/images/anime/${anime.image_url_id}l.jpg`}
            alt="anime cover"
          />
        </picture>
      </LazyLoad>
      <span>
        {settings.language === "romaji" && anime.title}
        {settings.language === "english" && anime.title_en}
        {settings.language === "japanese" && anime.title_ja}
      </span>
    </a>
  );
}
