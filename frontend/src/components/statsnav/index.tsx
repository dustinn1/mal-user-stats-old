import { useRouteMatch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import "./styles.css";

export default function StatsNav() {
  const { url } = useRouteMatch();

  return (
    <Nav variant="pills" className="stats-tabs">
      <div className="stats-tab-divider">Anime</div>
      <div className="stats-tab-section">
        <Nav.Item>
          <LinkContainer to={`${url}/anime/overview`}>
            <Nav.Link>Overview</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={`${url}/anime/history`}>
            <Nav.Link>History</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={`${url}/anime/genres`}>
            <Nav.Link>Genres</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={`${url}/anime/studios`}>
            <Nav.Link>Studios</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </div>
      <div className="stats-tab-divider">Manga</div>
      <div className="stats-tab-section">
        <Nav.Item>
          <LinkContainer to={`${url}/manga/overview`}>
            <Nav.Link>Overview</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={`${url}/manga/history`}>
            <Nav.Link>History</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to={`${url}/manga/genres`}>
            <Nav.Link>Genres</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </div>
    </Nav>
  );
}
