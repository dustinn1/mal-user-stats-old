import { useState, useEffect } from 'react';
import { useParams, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import './styles.css';

import OverviewStats from './overview';
import GenresStats from './genres';

interface dataJSON {
  mal_id: number,
  username: string,
  statistics: {
    overview: Object,
    scores: Array<Object>,
    episode_count: Array<Object>,
    format_distribution: Array<Object>,
    status_distribution: Array<Object>,
    release_years: Array<Object>,
    watch_years: Array<Object>,
    genres: Array<Object>
  }
}

export default function Stats() {
  let { username } = useParams<{ username: string }>();
  let { path, url } = useRouteMatch();
  const [data, setData] = useState({} as dataJSON);
  const [loaded, setLoaded] = useState(false);

  function getData() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stats/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWxfaWQiOjcyOTY1MjksInVzZXJuYW1lIjoidHJpcGxlemtvIiwiaWF0IjoxNjI0MjM3MjMwLCJleHAiOjE2MzQyNDA4MzB9.FmKlVmH5sN7tzkxNe44KlNg76osLKUCVzMnGSpYqzN4"})
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoaded(true);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => getData(), []);

  return (
    <>
      <Helmet>
        <title>{username}</title>
      </Helmet>
      {loaded ? (
        <Container>
          <div className="profile-header">
            <picture>
              <source srcSet={`https://cdn.myanimelist.net/images/userimages/${data.mal_id}.webp`} type="image/webp" />
              <img src={`https://cdn.myanimelist.net/images/userimages/${data.mal_id}.jpg`} alt="profile"/>
            </picture>
            <h1>
              {data.username}
            </h1>
          </div>
          <div>
            <Row>
              <Col lg={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <LinkContainer to={`${url}/overview`}>
                      <Nav.Link>Overview</Nav.Link>
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
                  <Route path={`${path}/genres`}>
                    <GenresStats />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </div>
        </Container>
      ) : <Spinner animation="border" />}
    </>
  )
}
