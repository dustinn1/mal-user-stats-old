import { useState } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.css";

export default function Footer() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const hideDeleteModal = () => setShowDeleteModal(false);
  const openDeleteModal = () => setShowDeleteModal(true);

  function deleteStats() {
    localStorage.removeItem("data");
    setDeleted(true);
  }

  return (
    <>
      <footer className="bg-light sticky-bottom">
        <Container>
          <div className="footer-section">
            All data from{" "}
            <a href="https://myanimelist.net/" target="_blank" rel="noreferrer">
              MyAnimeList
            </a>
          </div>
          <div className="footer-section">
            <span>
              Made by{" "}
              <a
                href="https://github.com/dustinn1"
                target="_blank"
                rel="noreferrer"
              >
                dustinn1
              </a>
            </span>
            {"-"}
            <span>
              <a
                href="https://github.com/dustinn1/mal-user-stats"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </span>
          </div>
          <div className="footer-section">
            <span
              className="link-danger footer-delete"
              onClick={openDeleteModal}
            >
              Delete Stats
            </span>
          </div>
        </Container>
      </footer>
      {deleted && <Redirect to={"/"} />}
      <Modal show={showDeleteModal} onHide={hideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your stats?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteStats()}>
            Delete
          </Button>
          <Button variant="secondary" onClick={hideDeleteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
