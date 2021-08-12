import { useState, useContext } from "react";
import Cookie from "js-cookie";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatsContext } from "../../contexts/StatsContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faSync,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import StatsGenerateModal from "../../components/statsgenerate";
import StatsLoginModal from "../statsgenerate/login";
import SettingsModal from "../../components/settings";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Header() {
  const stats = useContext(StatsContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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
          <div className="header-buttons">
            <Button
              variant="outline-primary"
              onClick={
                Cookie.get("user") !== undefined
                  ? () => setShowUpdateModal(true)
                  : () => setShowLoginModal(true)
              }
            >
              <FontAwesomeIcon icon={faSync} /> Update Stats
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => setShowSettingsModal(true)}
            >
              <FontAwesomeIcon icon={faCog} /> Settings
            </Button>
          </div>
        </Container>
        <div className="stats-generated-time">
          Stats generated on{" "}
          {dayjs(stats.data.generated_on).tz(dayjs.tz.guess()).format("LLL")} (
          {dayjs(stats.data.generated_on).fromNow()})
        </div>
      </header>
      <StatsGenerateModal
        update
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
      />
      <StatsLoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
      <SettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
      />
    </>
  );
}
