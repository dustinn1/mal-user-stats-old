import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Tippy, { useSingleton } from "@tippyjs/react";
import prettyMs from "pretty-ms";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "./styles.css";

import { StatsContext } from "../../contexts/StatsContext";
import CoverImage from "../coverimage";

interface Props {
  index: number;
  genre: number;
  name: string;
  count: number;
  mean_score: number;
  time_watched: number;
  animes: Array<number>;
}

interface Anime {
  id: number;
  title: string;
  image_url_id: string;
  title_en: string;
  title_ja: string;
}

function listButton(genre: number, direction: string) {
  const container = document
    .getElementById(`genre-${genre}`)!
    .getElementsByClassName("covers")[0];
  let scrollAmount = 0;
  const scrollStep = 28;
  var slideTimer = setInterval(() => {
    if (direction === "prev") {
      container.scrollLeft -= scrollStep;
    } else if (direction === "next") {
      container.scrollLeft += scrollStep;
    }
    scrollAmount += 10;
    if (scrollAmount >= 100) {
      window.clearInterval(slideTimer);
    }
  }, 10);
}

export default function StatCard(props: Props) {
  let { url } = useRouteMatch();
  const [source, target] = useSingleton();
  const allAnimes = useContext(StatsContext).animes;
  const animes: Array<Anime> = [];

  for (let animeId of [...props.animes].splice(0, 10)) {
    animes.push(allAnimes.find((anime: any) => anime.id === animeId) as Anime);
  }

  return (
    <>
      <Tippy
        singleton={source}
        theme="material"
        allowHTML={true}
        moveTransition="transform 0.2s ease-out"
      />
      <Card className="stats-card shadow-sm" id={`genre-${props.genre}`}>
        <h2 className="stats-card-header">
          <Link to={`${url}/${props.name.toLowerCase().replaceAll(" ", "_")}`}>
            {props.name}
          </Link>
          <Badge pill bg="dark">
            {props.index}
          </Badge>
        </h2>
        <div className="stats">
          <p>
            {props.count} <strong>Animes</strong>
          </p>
          <p>
            {props.mean_score} <strong>Average Score</strong>
          </p>
          <p>
            {props.time_watched !== 0
              ? prettyMs(props.time_watched * 1000, {
                  verbose: true,
                  unitCount: 2,
                })
              : 0}{" "}
            <strong>Time Watched</strong>
          </p>
        </div>
        <div className="covers-list">
          {props.count > 5 && (
            <>
              <Button
                variant="dark"
                className="prev-button"
                onClick={() => listButton(props.genre, "prev")}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
              <Button
                variant="dark"
                className="next-button"
                onClick={() => listButton(props.genre, "next")}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            </>
          )}
          <div className="covers">
            {animes.map((anime: Anime) => (
              <CoverImage key={anime.id} target={target} anime={anime} />
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
