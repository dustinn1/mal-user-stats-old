import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function StorageErrorFallback() {
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-4 fw-bold lh-1 mb-3">
        Please Enable Cookies and Local Storage
      </h1>
      <p className="lead pb-lg-3">
        It seems like cookies and/or local storage has been disabled in your
        browser.
        <br />
        The website will not work without them.
        <br />
        <br />
        See{" "}
        <a
          href="https://www.whatismybrowser.com/guides/how-to-enable-cookies/auto"
          target="_blank"
          rel="noreferrer"
        >
          how to enable cookies.
        </a>
      </p>
      <div className="d-grid justify-content-center mt-2 mt-lg-3">
        <Button size="lg" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </Container>
  );
}
