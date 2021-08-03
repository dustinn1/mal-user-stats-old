import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./styles.css";

import { StatsContextProvider } from "../../contexts/StatsContext";
import { SettingsContextProvider } from "../../contexts/SettingsContext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AnimeOverviewStats from "./anime/Overview";
import AnimeHistoryStats from "./anime/History";
import AnimeGenresStats from "./anime/Genres";
import AnimeSingleGenreStats from "./anime/Genre";
import AnimeStudiosStats from "./anime/Studios";
import AnimeSingleStudioStats from "./anime/Studio";
import MangaOverviewStats from "./manga/Overview";
import MangaHistoryStats from "./manga/History";
import MangaGenresStats from "./manga/Genres";
import MangaSingleGenreStats from "./manga/Genre";

export default function Stats() {
  const { path, url } = useRouteMatch();

  return (
    <SettingsContextProvider>
      <StatsContextProvider>
        <Header />
        <Container>
          <Row>
            <Col lg={2}>
              <Nav variant="pills" className="stats-tabs">
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
              </Nav>
            </Col>
            <Col lg={10}>
              <Switch>
                {/* Anime */}
                <Route path={`${path}/anime/overview`}>
                  <AnimeOverviewStats />
                </Route>
                <Route path={`${path}/anime/history`}>
                  <AnimeHistoryStats />
                </Route>
                <Route exact path={`${path}/anime/genres`}>
                  <AnimeGenresStats />
                </Route>
                <Route path={`${path}/anime/genres/:genre`}>
                  <AnimeSingleGenreStats />
                </Route>
                <Route exact path={`${path}/anime/studios`}>
                  <AnimeStudiosStats />
                </Route>
                <Route path={`${path}/anime/studios/:studio`}>
                  <AnimeSingleStudioStats />
                </Route>
                {/* Manga */}
                <Route path={`${path}/manga/overview`}>
                  <MangaOverviewStats />
                </Route>
                <Route path={`${path}/manga/history`}>
                  <MangaHistoryStats />
                </Route>
                <Route exact path={`${path}/manga/genres`}>
                  <MangaGenresStats />
                </Route>
                <Route path={`${path}/manga/genres/:genre`}>
                  <MangaSingleGenreStats />
                </Route>
                <Route path={`${path}` || `${path}/*`}>
                  <Redirect to={`${url}/anime/overview`} />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </StatsContextProvider>
    </SettingsContextProvider>
  );
}
