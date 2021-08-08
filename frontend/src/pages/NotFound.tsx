import { Helmet } from "react-helmet-async";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <Container className="mt-5 text-center">
        <h1 className="display-4 fw-bold lh-1 mb-3">404</h1>
        <p className="lead pb-lg-3">Page Not Found</p>
        <div className="d-grid justify-content-center mt-2 mt-lg-3">
          <LinkContainer exact to="/">
            <Button size="lg">Go Home</Button>
          </LinkContainer>
        </div>
      </Container>
    </>
  );
}
