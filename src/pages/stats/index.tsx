import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";

import { StatsContextProvider } from "../../contexts/StatsContext";
import { LanguageContextProvider } from "../../contexts/LanguageContext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import StatsNav from "../../components/statsnav";
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

  return localStorage.getItem("data") !== null ? (
    <StatsContextProvider>
      <LanguageContextProvider>
        <Header />
        <Container className="flex-grow-1">
          <Row>
            <Col lg={2}>
              <StatsNav />
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
                <Route path={`${path}/manga` || `${path}/manga/*`}>
                  <Redirect to={`${url}/manga/overview`} />
                </Route>
                <Route path={`${path}` || `${path}/anime` || `${path}/anime/*`}>
                  <Redirect to={`${url}/anime/overview`} />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </LanguageContextProvider>
    </StatsContextProvider>
  ) : (
    <Redirect to={"/"} />
  );
}
