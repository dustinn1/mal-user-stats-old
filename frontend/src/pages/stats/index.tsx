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
import OverviewStats from "./Overview";
import HistoryStats from "./History";
import GenresStats from "./Genres";
import SingleGenreStats from "./Genre";
import StudiosStats from "./Studios";
import SingleStudioStats from "./Studio";

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
                  <LinkContainer to={`${url}/studios`}>
                    <Nav.Link>Studios</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={10}>
              <Switch>
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
                <Route exact path={`${path}/studios`}>
                  <StudiosStats />
                </Route>
                <Route path={`${path}/studios/:studio`}>
                  <SingleStudioStats />
                </Route>
                <Route path={`${path}` || `${path}/*`}>
                  <Redirect to={`${url}/overview`} />
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
