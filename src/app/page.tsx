"use client";
import Header from "@/layout/Header";
import {Col, Container, Row} from "reactstrap";
import {RemoteControl} from "@/components/RemoteControl";
import {HistoricalSensorData} from "@/components/HistoricalSensorData";
import {Metrics} from "@/components/Metrics";
import {Graph} from "@/components/Graph";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <main>
      <Header/>
      <Container className={"main"}>
        <Row>
          <Col className={"order-lg-2"}>
            <RemoteControl/>
            <br/>
            <Graph/>
            <br/>
            <Metrics/>
          </Col>
          <Col className={"order-lg-1"}>
            <Row>
              <HistoricalSensorData/>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </main>
  );
}
