import { LinkContainer } from "react-router-bootstrap";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function LoginBox() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card>
        <Card.Body>
          <Card.Title className="text-center fs-1">
            MyAnimeList User Stats
          </Card.Title>
          <div className="d-grid gap-2">
            <LinkContainer to="/auth">
              <Button variant="primary" size="lg" className="mt-3">
                Log in with MyAnimeList
              </Button>
            </LinkContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
