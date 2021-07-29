import { useContext } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatsContext } from "../../contexts/StatsContext";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./styles.css";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Header() {
  const data = useContext(StatsContext);

  return (
    <header className="profile-header bg-light">
      <Container>
        <span>
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
        </span>
        <Button variant="outline-primary">Update Stats</Button>
      </Container>
      <div className="stats-generated-time">
        Stats generated on{" "}
        {dayjs(data.generated_on).tz(dayjs.tz.guess()).format("LLL")} (
        {dayjs(data.generated_on).fromNow()})
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
  );
}
