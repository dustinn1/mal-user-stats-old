import { LinkContainer } from "react-router-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function StatsLoginModal(props: Props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please log in to update your stats.</Modal.Body>
      <Modal.Footer>
        <LinkContainer to="/auth/stats">
          <Button variant="primary">Log In</Button>
        </LinkContainer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
