import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import StatsGenerateModal from "../components/modals/statsgenerate";
import Footer from "../components/footer";

export default function Homepage() {
  const theme = useContext(ThemeContext);
  const [showStatsModal, setShowStatsModal] = useState(false);

  function HomepageButton(props: { theme: string }) {
    if ((localStorage.getItem("data") as string) !== null) {
      return (
        <LinkContainer to="/stats/anime/overview">
          <Button size="lg">View Profile</Button>
        </LinkContainer>
      );
    } else {
      return (
        <>
          <Button onClick={() => setShowStatsModal(true)} size="lg">
            Generate Stats
          </Button>
          <small className={`mt-2 ${props.theme === "dark" && "text-light"}`}>
            All generated stats are stored locally on your browser.
            <br />
            Your stats will only be visible to you.
          </small>
        </>
      );
    }
  }

  return (
    <>
      <Container className="mt-3 flex-grow-1">
        <div className="text-end">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => theme.updateTheme("system")}
            active={theme.theme === "system"}
          >
            <FontAwesomeIcon icon={faDesktop} className="me-2" />
            System
          </Button>{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => theme.updateTheme("light")}
            active={theme.theme === "light"}
          >
            <FontAwesomeIcon icon={faSun} className="me-2" />
            Light
          </Button>{" "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => theme.updateTheme("dark")}
            active={theme.theme === "dark"}
          >
            <FontAwesomeIcon icon={faMoon} className="me-2" />
            Dark
          </Button>
        </div>
        <Row className="py-5 align-items-center">
          <Col xs={12} lg={6} className="text-center mb-4">
            <h1
              className={`display-5 fw-bold lh-1 mb-3 ${
                theme.colorTheme === "dark" && "text-light"
              }`}
            >
              MyAnimeList User Stats
            </h1>
            <p
              className={`lead pb-lg-3 ${
                theme.colorTheme === "dark" && "text-light"
              }`}
            >
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
              <HomepageButton theme={theme.colorTheme} />
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
          show={showStatsModal}
          onHide={() => setShowStatsModal(false)}
        />
      </Container>
      <Footer homepage />
    </>
  );
}
