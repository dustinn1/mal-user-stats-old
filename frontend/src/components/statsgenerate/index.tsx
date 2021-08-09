import { useState, useContext, useEffect } from "react";
import cookie from "cookie";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (props.show && !loaded) {
      getBackendStatus()
        .then((response) => setLoaded(response))
        .catch((err) => {
          console.log(err);
          let second = 0;
          const interval = setInterval(() => {
            if (second < 10) {
              second++;
              if (second === 9) {
                getBackendStatus()
                  .then((response) => setLoaded(response))
                  .catch((err) => {
                    console.log(err);
                    setError(true);
                  });
              }
            } else {
              clearInterval(interval);
            }
          }, 1000);
        });
    }
    return setError(false);
  }, [props.show, loaded]);

  async function generateStats(): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/stats/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: cookie.parse(document.cookie).user,
          }),
        }
      );
      if (!response.ok && response.status === 401) {
        return history.push("/invalid");
      }
      const responseJSON = await response.json();
      if (!props.update) {
        saveLocalStorage(responseJSON);
        history.push("/stats");
      } else {
        stats.updateData(responseJSON);
        props.onHide();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.update ? "Update" : "Generate"} Stats
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loaded ? (
            <div
              className={`d-flex justify-content-center py-2 flex-column text-center ${
                error && "text-danger"
              }`}
            >
              <span className="w-100 pb-3">
                {!error ? (
                  <Spinner animation="border" />
                ) : (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="fs-2"
                  />
                )}
              </span>
              {!error
                ? "Please wait for the website's backend to load..."
                : "Unable to connect to the backend. Please try again later."}
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
