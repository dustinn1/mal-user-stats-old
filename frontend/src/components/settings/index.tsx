import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
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
          <div className="settings-modal-buttons">
            <Button
              variant="outline-primary"
              onClick={() => theme.updateTheme("system")}
              active={theme.theme === "system"}
            >
              System
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => theme.updateTheme("light")}
              active={theme.theme === "light"}
            >
              Light
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => theme.updateTheme("dark")}
              active={theme.theme === "dark"}
            >
              Dark
            </Button>{" "}
          </div>
          <br />
          <span>Title Language</span>
          <div className="settings-modal-buttons">
            <Button
              variant="outline-primary"
              onClick={() => language.updateLanguage("romaji")}
              active={language.language === "romaji"}
            >
              Romaji
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => language.updateLanguage("english")}
              active={language.language === "english"}
            >
              English
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => language.updateLanguage("japanese")}
              active={language.language === "japanese"}
            >
              日本語
            </Button>
          </div>
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
