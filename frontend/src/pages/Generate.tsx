import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import cookie from "cookie";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import statsJSON from "../interfaces/statsjson";

function saveLocalStorage(data: statsJSON): void {
  localStorage.setItem("data", JSON.stringify(data));
}

export default function Generate() {
  const [generated, setGenerated] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState<boolean>();
  const [userCookie, setUserCookie] = useState("");

  function checkLogin(): void {
    const userCookie = cookie.parse(document.cookie).user;
    if (userCookie !== undefined) {
      setIsLoggedIn(true);
      setUserCookie(userCookie);
    } else {
      setIsLoggedIn(false);
    }
  }

  function generateStats(): void {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stats/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userCookie,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        saveLocalStorage(data);
        setGenerated(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => checkLogin(), []);

  return (
    <>
      <Helmet>
        <title>Generate Stats</title>
      </Helmet>
      {generated ? (
        <Redirect to={"/stats"} />
      ) : (
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
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-3"
                  onClick={() => generateStats()}
                >
                  Generate Stats
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
