import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import dayjs from "dayjs";
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
  localStorage.setItem("theme", "system");
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
  return response.ok && response.status === 200;
}

export default function StatsGenerate(props: Props) {
  const navigate = useNavigate();
  const stats = useContext(StatsContext);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [rateLimit, setRateLimit] = useState(0);

  function wakeHeroku() {
    getBackendStatus()
      .then((response) => {
        setLoaded(response);
      })
      .catch(() => {
        let second = 0;
        const interval = setInterval(() => {
          if (
            second <
            parseInt(process.env.REACT_APP_BACKEND_WAKEUP_DELAY as string)
          ) {
            second++;
            if (
              second ===
              parseInt(process.env.REACT_APP_BACKEND_WAKEUP_DELAY as string) - 1
            ) {
              getBackendStatus()
                .then((response) => setLoaded(response))
                .catch(() => setError(true));
            }
          } else {
            clearInterval(interval);
          }
        }, 1000);
      });
  }

  async function getStats(): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/stats/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: Cookie.get("user"),
          }),
        }
      );
      if (!response.ok && response.status === 401) {
        return navigate("/?error=auth");
      }
      if (!response.ok && response.status === 429) {
        return setRateLimit(
          parseInt(response.headers.get("X-RateLimit-Reset") as string)
        );
      }
      const responseJSON = await response.json();
      if (!props.update) {
        saveLocalStorage(responseJSON);
        navigate("/stats");
      } else {
        stats.updateData(responseJSON);
        props.onHide();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onModalShow = () => {
    wakeHeroku();
  };

  const onModalHide = () => {
    setLoaded(false);
    setError(false);
    setRateLimit(0);
  };

  const onStatsGenerate = () => {
    getBackendStatus()
      .then(() => {
        getStats();
      })
      .catch(() => {
        setLoaded(false);
        wakeHeroku();
      });
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        onEnter={() => onModalShow()}
        onExited={onModalHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.update ? "Update" : "Generate"} Stats
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {rateLimit > 0 ? (
            <div className="text-danger">
              <span>
                Sorry, you've generated your stats too many times in a short
                period.
              </span>
              <br />
              <span className="fw-bold">
                {" "}
                Please try again in{" "}
                {dayjs.unix(rateLimit).diff(dayjs(), "minutes") > 1
                  ? `${dayjs.unix(rateLimit).diff(dayjs(), "minutes")} minutes`
                  : `${dayjs.unix(rateLimit).diff(dayjs(), "seconds")} seconds`}
                .
              </span>
            </div>
          ) : !loaded ? (
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
            "Are you sure you want to update your stats? Your current stats will be overriden. It will take a few seconds."
          ) : (
            "Press the Generate button to view your stats. It will take a few seconds."
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={onStatsGenerate}
            disabled={!loaded || rateLimit > 0}
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
