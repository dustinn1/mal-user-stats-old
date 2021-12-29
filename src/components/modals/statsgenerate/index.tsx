import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import statsJSON from "../../../interfaces/StatsJson";
import { StatsContext } from "../../../contexts/StatsContext";

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

export default function StatsGenerate(props: Props) {
  const navigate = useNavigate();
  const stats = useContext(StatsContext);

  /* async function getStats(): Promise<void> {
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

  const onModalHide = () => {
    setLoaded(false);
    setError(false);
    setRateLimit(0);
  }; */

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.update ? "Update" : "Generate"} Stats
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {props.update
            ? "Are you sure you want to update your stats? Your current stats will be overriden."
            : "Press the Generate button to view your stats."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
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
