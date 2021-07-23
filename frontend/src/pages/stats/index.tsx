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

import { StatsContextProvider } from "../../contexts/StatsContext";
import { SettingsContextProvider } from "../../contexts/SettingsContext";
import Header from "../../components/header";
import OverviewStats from "./Overview";
import GenresStats from "./Genres";
import SingleGenreStats from "./Genre";
import HistoryStats from "./History";

export default function Stats() {
  const { path, url } = useRouteMatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Stats</title>
      </Helmet>
      {loaded ? (
        <SettingsContextProvider>
          <StatsContextProvider>
            <Container>
              <Header />
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
                </Col>
              </Row>
            </Container>
          </StatsContextProvider>
        </SettingsContextProvider>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
