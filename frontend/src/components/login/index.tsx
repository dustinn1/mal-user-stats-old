import { useState } from "react";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  show: boolean;
  onHide: () => void;
  redirect: "home" | "stats";
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

export default function LoginModal(props: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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

  const onModalShow = () => {
    wakeHeroku();
  };

  const onModalHide = () => {
    setLoaded(false);
    setError(false);
  };

  const onLogin = () => {
    getBackendStatus()
      .then(() =>
        window.location.replace(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth?user=${
            Cookies.get("user") ?? ""
          }&redirect=${props.redirect}`
        )
      )
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
        className="settings-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div
            className={`d-flex justify-content-center py-2 flex-column text-center ${
              error && "text-danger"
            }`}
          >
            {!loaded ? (
              <>
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
              </>
            ) : (
              "You will be redirected to myanimelist.net to login."
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onLogin} disabled={!loaded}>
            Log In
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
