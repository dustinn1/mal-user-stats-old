import { useState } from "react";
import cookie from "cookie";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import StatsGenerateModal from "../../components/statsgenerate";
import "./styles.css";

export default function Homepage() {
  const [showModal, setShowModal] = useState(false);

  function HomepageButton() {
    if ((localStorage.getItem("data") as string) !== null) {
      return (
        <Link to="/stats">
          <Button>View Profile</Button>
        </Link>
      );
    } else if (cookie.parse(document.cookie).user !== undefined) {
      return <Button onClick={() => setShowModal(true)}>Generate Stats</Button>;
    } else {
      return <Button>Log in</Button>;
    }
  }

  return (
    <div className="homepage">
      <Container>
        <h1>MyAnimeList User Stats</h1>
        <HomepageButton />
      </Container>
      {showModal && (
        <StatsGenerateModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
