import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function StatsGenerate(props: Props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Generate Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>Generate Stats</Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Generate</Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
