import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";

import { StatsContextProvider } from "../../contexts/StatsContext";
import { LanguageContextProvider } from "../../contexts/LanguageContext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import StatsNav from "../../components/statsnav";

export default function Stats() {
  return localStorage.getItem("data") !== null ? (
    <StatsContextProvider>
      <LanguageContextProvider>
        <Header />
        <Container className="flex-grow-1">
          <Row>
            <Col lg={2}>
              <StatsNav />
            </Col>
            <Col lg={10}>
              <Outlet />
            </Col>
          </Row>
        </Container>
        <Footer />
      </LanguageContextProvider>
    </StatsContextProvider>
  ) : (
    <h1>Test</h1>
  );
}
