import { useContext } from "react";
import LazyLoad from "react-lazyload";
import { SettingsContext } from "../../contexts/SettingsContext";
import Tippy from "@tippyjs/react";
import "./styles.css";
import Placeholder from "./placeholder";

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

export default function SmallCoverImage(props: Props) {
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
          <LazyLoad once offset={200} placeholder={<Placeholder />}>
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
          </LazyLoad>
        </a>
      </Tippy>
    </>
  );
}
