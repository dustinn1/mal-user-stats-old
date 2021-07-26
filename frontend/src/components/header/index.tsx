import { useContext } from "react";
import { StatsContext } from "../../contexts/StatsContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./styles.css";

export default function Header() {
  const data = useContext(StatsContext);
  const settings = useContext(SettingsContext);

  return (
    <div className="profile-header">
      <Row>
        <Col>
          <picture>
            <source
              srcSet={`https://cdn.myanimelist.net/images/userimages/${data.mal_id}.webp`}
              type="image/webp"
            />
            <img
              src={`https://cdn.myanimelist.net/images/userimages/${data.mal_id}.jpg`}
              alt="profile"
            />
          </picture>
          <h1>{data.username}</h1>
        </Col>
        <Col>
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
            Japanese
          </Button>{" "}
        </Col>
      </Row>
    </div>
  );
}
