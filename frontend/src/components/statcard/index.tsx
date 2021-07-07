import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import './styles.css';

import CoverImage from '../coverimage';

function listButton(genre: number, direction: string) {
  const container = document.getElementsByClassName('covers')[genre];
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
  }, 15);
}

export default function GenreBox(props: any) {
  return (
    <Card className="stats-card">
      <h2 className="stats-card-header">
        Comedy
        <Badge bg="primary">#1</Badge> 
      </h2>
      <div className="stats">
        <p>198 <strong>Animes</strong></p>
        <p>8.18 <strong>Average Score</strong></p>
        <p>29 days 15 hours <strong>Time Watched</strong></p>
      </div>
      <div className="covers-list">
        <Button variant="primary" className="prev-button" onClick={() => listButton(props.genre, "prev")}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <Button variant="primary" className="next-button" onClick={() => listButton(props.genre, "next")}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
        <div className="covers">
          <CoverImage malId="5114" imageUrlId="1223/96541" />
          <CoverImage malId="4181" imageUrlId="1299/110774" />
          <CoverImage malId="40591" imageUrlId="1764/106659" />
          <CoverImage malId="40417" imageUrlId="1972/111635" />
          <CoverImage malId="35839" imageUrlId="6/89879" />
          <CoverImage malId="38474" imageUrlId="1255/110636" />
          <CoverImage malId="20583" imageUrlId="7/76014" />
          <CoverImage malId="32182" imageUrlId="8/80356" />
          <CoverImage malId="36885" imageUrlId="1671/111411" />
          <CoverImage malId="34612" imageUrlId="1961/91383" />
        </div>
      </div>
    </Card>
  )
}
