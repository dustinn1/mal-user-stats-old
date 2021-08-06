import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { SettingsContext } from "../../contexts/SettingsContext";
import "./styles.css";

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function Settings(props: Props) {
  const settings = useContext(SettingsContext);

  return (
    <Modal show={props.show} onHide={props.onHide} className="settings-modal">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <span>Title Language</span>
          <div className="settings-modal-buttons">
            <Button
              variant="outline-primary"
              onClick={() => settings.updateLanguage("romaji")}
              active={settings.language === "romaji"}
            >
              Romaji
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => settings.updateLanguage("english")}
              active={settings.language === "english"}
            >
              English
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => settings.updateLanguage("japanese")}
              active={settings.language === "japanese"}
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
