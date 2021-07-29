import Container from "react-bootstrap/Container";
import "./styles.css";

export default function Footer() {
  return (
    <footer className="bg-light">
      <Container>
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
      </Container>
    </footer>
  );
}
