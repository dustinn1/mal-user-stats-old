import { useState, useEffect } from "react";
import cookie from "cookie";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import StatsGenerateModal from "../../components/statsgenerate";
import Footer from "../../components/footer";

interface Props {
  invalid?: boolean;
}

export default function Homepage(props: Props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (props.invalid) {
      const allCookies = document.cookie.split(";");
      for (var i = 0; i < allCookies.length; i++)
        document.cookie =
          allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    }
  }, [props.invalid]);

  function HomepageButton() {
    if ((localStorage.getItem("data") as string) !== null) {
      return (
        <LinkContainer to="/stats">
          <Button size="lg">View Profile</Button>
        </LinkContainer>
      );
    } else if (cookie.parse(document.cookie).user !== undefined) {
      return (
        <>
          <Button onClick={() => setShowModal(true)} size="lg">
            Generate Stats
          </Button>
          <small className="mt-2">
            All generated stats are stored locally on your browser.
            <br />
            Your stats will only be visible to you.
          </small>
        </>
      );
    } else {
      return (
        <>
          <LinkContainer to="/auth">
            <Button size="lg">Log in</Button>
          </LinkContainer>
          <small className="mt-2">
            You will be redirected to myanimelist.net to login.
          </small>
        </>
      );
    }
  }

  return (
    <>
      <Container className="mt-5 flex-grow-1">
        {props.invalid && (
          <div className="text-center text-danger fs-5">
            There was a problem authenticating your MyAnimeList account. Please{" "}
            <a href="/auth" className="link-danger">
              log in
            </a>{" "}
            again to generate your stats.
          </div>
        )}
        <Row className="py-5 align-items-center">
          <Col xs={12} lg={6} className="text-center mb-4">
            <h1 className="display-5 fw-bold lh-1 mb-3">
              MyAnimeList User Stats
            </h1>
            <p className="lead pb-lg-3">
              Generate statistics similar to AniList (
              <a
                href="https://anilist.co/user/triplezko/stats/anime/overview"
                target="_blank"
                rel="noreferrer"
              >
                example
              </a>
              ) using data from your MyAnimeList profile.
            </p>
            <div className="d-grid justify-content-center mt-2 mt-lg-4">
              <HomepageButton />
            </div>
          </Col>
          <Col xs={12} lg={6} className="mt-4 mt-lg-0">
            <Carousel
              controls={false}
              indicators={false}
              fade
              interval={2500}
              className="shadow"
            >
              <Carousel.Item>
                <picture>
                  <source srcSet="/homepage/1.webp" type="image/webp" />
                  <img
                    className="img-fluid"
                    src="/homepage/1.jpg"
                    alt="Overview Page"
                  />
                </picture>
              </Carousel.Item>
              <Carousel.Item>
                <picture>
                  <source srcSet="/homepage/2.webp" type="image/webp" />
                  <img
                    className="img-fluid"
                    src="/homepage/2.jpg"
                    alt="Genres Page"
                  />
                </picture>
              </Carousel.Item>
              <Carousel.Item>
                <picture>
                  <source srcSet="/homepage/3.webp" type="image/webp" />
                  <img
                    className="img-fluid"
                    src="/homepage/3.jpg"
                    alt="Single Studio Page"
                  />
                </picture>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <StatsGenerateModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </Container>
      <Footer homepage />
    </>
  );
}
