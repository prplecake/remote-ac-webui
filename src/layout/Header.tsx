"use client";
import {Col, Container, Row} from "reactstrap";
import {LatestNWSObservation} from "@/components/LatestNWSObservation";
import {LatestSensorData} from "@/components/LatestSensorData";

export default function Header() {
  const weatherStation = "",
    wxGridPoints = "";
  return (
    <Container fluid>
      <header className={"header"}>
        <Row xs={1} md={2}>
          <Col>
            <p>remote-ac-controller</p>
          </Col>
          <Col xs={9}>
            <LatestNWSObservation
              weatherStation={weatherStation}
              wxGridPoints={wxGridPoints}
            />
          </Col>
        </Row>
        <LatestSensorData/>
      </header>
    </Container>
  );
}
