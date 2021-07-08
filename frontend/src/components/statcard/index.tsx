import Tippy, { useSingleton } from '@tippyjs/react';
import prettyMs from 'pretty-ms';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import './styles.css';

import CoverImage from '../coverimage';

interface Props {
  index: number,
  genre: number,
  name: string,
  count: number,
  mean_score: number,
  time_watched: number,
  animes: Array<any>
}

interface Anime {
  id: number,
  title: string,
  image_url_id: number
}

function listButton(genre: number, direction: string) {
  const container = document.getElementById(`genre-${genre}`)!.getElementsByClassName('covers')[0];
  let scrollAmount = 0;
  const scrollStep = 28;
  var slideTimer = setInterval(() => {
    if (direction === "prev") {
      container.scrollLeft -= scrollStep;
    } else if (direction === "next") {
      container.scrollLeft += scrollStep;
    }
    scrollAmount += 10;
    if (scrollAmount >= 100){
      window.clearInterval(slideTimer);
    }
  }, 10);
}

export default function StatCard(props: Props) {
  const [source, target] = useSingleton();

  return (
    <>
      <Tippy
          singleton={source}
          theme="material"
          allowHTML={true}
          moveTransition="transform 0.2s ease-out"
        />
      <Card className="stats-card" id={`genre-${props.genre}`}>
        <h2 className="stats-card-header">
          {props.name}
          <Badge pill bg="dark">{props.index}</Badge> 
        </h2>
        <div className="stats">
          <p>{props.count} <strong>Animes</strong></p>
          <p>{props.mean_score} <strong>Average Score</strong></p>
          <p>{prettyMs(props.time_watched * 1000, { verbose: true, unitCount: 2 })} <strong>Time Watched</strong></p>
        </div>
        <div className="covers-list">
          <Button variant="primary" className="prev-button" onClick={() => listButton(props.genre, "prev")}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
          <Button variant="primary" className="next-button" onClick={() => listButton(props.genre, "next")}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
          <div className="covers">
            {props.animes.map((anime: Anime) => (
              <CoverImage 
                key={anime.id}
                title={anime.title} 
                target={target} 
                malId={anime.id} 
                imageUrlId={anime.image_url_id} />
            ))}
          </div>
        </div>
      </Card>
    </>
  )
}
