import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Tippy from "@tippyjs/react";
import "./styles.css";

interface Props {
  target: any;
  anime: {
    id: number;
    title: string;
    image_url_id: string;
    title_en: string;
    title_ja: string;
  };
}

export default function CoverImage(props: Props) {
  const settings = useContext(SettingsContext);
  const anime = props.anime;

  return (
    <>
      <Tippy
        content={
          <p className="text-center m-0">
            {settings.language === "romaji" && anime.title}
            {settings.language === "english" && anime.title_en}
            {settings.language === "japanese" && anime.title_ja}
          </p>
        }
        singleton={props.target}
      >
        <a
          href={`https://myanimelist.net/anime/${anime.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <picture className="cover-image">
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
      </Tippy>
    </>
  );
}
