import { useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function Settings(props: Props) {
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);

  return (
    <Modal show={props.show} onHide={props.onHide} className="settings-modal">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <span>Theme</span>
          <Row className="text-center">
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => theme.updateTheme("system")}
                active={theme.theme === "system"}
              >
                <FontAwesomeIcon icon={faDesktop} className="me-2" />
                System
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => theme.updateTheme("light")}
                active={theme.theme === "light"}
              >
                <FontAwesomeIcon icon={faSun} className="me-2" />
                Light
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => theme.updateTheme("dark")}
                active={theme.theme === "dark"}
              >
                <FontAwesomeIcon icon={faMoon} className="me-2" />
                Dark
              </Button>
            </Col>
          </Row>
          <br />
          <span>Title Language</span>
          <Row className="text-center">
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => language.updateLanguage("romaji")}
                active={language.language === "romaji"}
              >
                Romaji
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => language.updateLanguage("english")}
                active={language.language === "english"}
              >
                English
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-primary"
                onClick={() => language.updateLanguage("japanese")}
                active={language.language === "japanese"}
              >
                日本語
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
