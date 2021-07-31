import { useState, useContext, useEffect } from "react";
//import cookie from "cookie";
import { Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import statsJSON from "../../interfaces/StatsJson";
import { StatsContext } from "../../contexts/StatsContext";

interface Props {
  show: boolean;
  onHide: () => void;
  update?: boolean;
}

function saveLocalStorage(data: statsJSON): void {
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("language", "romaji");
}

async function getBackendStatus(): Promise<boolean> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 3000);
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/status`,
    {
      signal: controller.signal,
    }
  );
  clearTimeout(id);
  return response.ok;
}

export default function StatsGenerate(props: Props) {
  const stats = useContext(StatsContext);
  const [generated, setGenerated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setGenerated(false), []);

  useEffect(() => {
    getBackendStatus()
      .then((response) => setLoaded(response))
      .catch((err) => console.log(err));
  }, []);

  function generateStats(): void {
    //const userCookie = cookie.parse(document.cookie).user;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stats/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //user: userCookie,
        user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWxfaWQiOjcyOTY1MjksInVzZXJuYW1lIjoidHJpcGxlemtvIiwiaWF0IjoxNjI0MjM3MjMwLCJleHAiOjE2MzQyNDA4MzB9.FmKlVmH5sN7tzkxNe44KlNg76osLKUCVzMnGSpYqzN4",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!props.update) {
          saveLocalStorage(data);
          setGenerated(true);
        } else {
          stats.updateData(data);
          props.onHide();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {!props.update && generated && <Redirect to={"/stats"} />}
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.update ? "Update" : "Generate"} Stats
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loaded ? (
            <div className="d-flex justify-content-center py-2 flex-column text-center">
              <span className="w-100 pb-3">
                <Spinner animation="border" />
              </span>
              Please wait for the website's backend to load...
            </div>
          ) : props.update ? (
            "Are you sure you want to update your stats? Your current stats will be overriden."
          ) : (
            "Generate"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => generateStats()}
            disabled={!loaded}
          >
            {props.update ? "Update" : "Generate"}
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
