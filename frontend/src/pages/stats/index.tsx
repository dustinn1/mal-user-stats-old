import { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LinkContainer } from "react-router-bootstrap";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./styles.css";

import statsJSON from "../../interfaces/statsjson";
import { StatsContext } from "../../contexts/statscontext";
import OverviewStats from "./overview";
import GenresStats from "./genres";
import SingleGenreStats from "./genre";
import HistoryStats from "./history";

export default function Stats() {
  const { path, url } = useRouteMatch();
  const [data, setData] = useState({} as statsJSON);
  const [loaded, setLoaded] = useState(false);

  function getData() {
    const data = JSON.parse(localStorage.getItem("data") as string);
    setData(data as statsJSON);
    setLoaded(true);
  }

  useEffect(() => getData(), []);

  return (
    <>
      <Helmet>
        <title>Stats</title>
      </Helmet>
      {loaded ? (
        <Container>
          <div className="profile-header">
            <picture>
              <source
                srcSet={`https://cdn.myanimelist.net/images/userimages/${data.mal_id}.webp`}
                type="image/webp"
              />
              <img
                src={`https://cdn.myanimelist.net/images/userimages/${data.mal_id}.jpg`}
                alt="profile"
              />
            </picture>
            <h1>{data.username}</h1>
          </div>
          <div>
            <Row>
              <Col lg={2}>
                <Nav variant="pills" className="stats-tabs">
                  <Nav.Item>
                    <LinkContainer to={`${url}/overview`}>
                      <Nav.Link>Overview</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to={`${url}/history`}>
                      <Nav.Link>History</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <LinkContainer to={`${url}/genres`}>
                      <Nav.Link>Genres</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>Studios</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={10}>
                <StatsContext.Provider value={data}>
                  <Switch>
                    <Route exact path={`${path}/`}>
                      <Redirect to={`${url}/overview`} />
                    </Route>
                    <Route path={`${path}/overview`}>
                      <OverviewStats />
                    </Route>
                    <Route path={`${path}/history`}>
                      <HistoryStats />
                    </Route>
                    <Route exact path={`${path}/genres`}>
                      <GenresStats />
                    </Route>
                    <Route path={`${path}/genres/:genre`}>
                      <SingleGenreStats />
                    </Route>
                  </Switch>
                </StatsContext.Provider>
              </Col>
            </Row>
          </div>
        </Container>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
