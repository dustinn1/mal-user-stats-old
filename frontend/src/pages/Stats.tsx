import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

export default function Stats() {
  let { username } = useParams<{ username: string }>();

  return (
    <>
      <Helmet>
        <title>{username}</title>
      </Helmet>
      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/home">Active</Nav.Link>
              <Nav.Link eventKey="link-1">Link</Nav.Link>
              <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav>
          </Col>
          <Col md={9}>
            <h1>Hello</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}
