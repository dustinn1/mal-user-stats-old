import { useState, useContext } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatsContext } from "../../contexts/StatsContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import StatsGenerateModal from "../../components/statsgenerate";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Header() {
  const stats = useContext(StatsContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="profile-header bg-light">
        <Container>
          <span>
            <picture>
              <source
                srcSet={`https://cdn.myanimelist.net/images/userimages/${stats.data.mal_id}.webp`}
                type="image/webp"
              />
              <img
                src={`https://cdn.myanimelist.net/images/userimages/${stats.data.mal_id}.jpg`}
                alt="profile"
              />
            </picture>
            <a
              href={`https://myanimelist.net/profile/${stats.data.username}`}
              target="_blank"
              rel="noreferrer"
            >
              <h1>
                {stats.data.username}
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </h1>
            </a>
          </span>
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            Update Stats
          </Button>
        </Container>
        <div className="stats-generated-time">
          Stats generated on{" "}
          {dayjs(stats.data.generated_on).tz(dayjs.tz.guess()).format("LLL")} (
          {dayjs(stats.data.generated_on).fromNow()})
        </div>
        {/* <Button
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
          </Button> */}
      </header>
      <StatsGenerateModal
        update
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}
