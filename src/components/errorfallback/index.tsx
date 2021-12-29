import { useEffect, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FallbackProps } from "react-error-boundary";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  const theme = useContext(ThemeContext);

  //useEffect(() => localStorage.clear(), []);

  return (
    <Container className="mt-5 text-center">
      <h1
        className={`display-4 fw-bold lh-1 mb-3 ${
          theme.colorTheme === "dark" && "text-light"
        }`}
      >
        Something Went Wrong
      </h1>
      <p
        className={`lead pb-lg-3 ${
          theme.colorTheme === "dark" && "text-light"
        }`}
      >
        It seems like there is a problem with your saved stats.
        <br />
        You will have to regenerate them.
      </p>
      <div className="d-grid justify-content-center mt-2 mt-lg-3">
        <LinkContainer to="/">
          <Button size="lg" onClick={resetErrorBoundary}>
            Go Home
          </Button>
        </LinkContainer>
      </div>
    </Container>
  );
}
