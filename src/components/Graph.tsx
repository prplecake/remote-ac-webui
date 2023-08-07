"use client";
import {convertToFahrenheit, formatDate} from "./remote-ac";
import React, {useState} from "react";
import {fetchDhtData} from "@/api/remote-ac-api";
import {Chart, ChartItem} from "chart.js/auto";
import {Col, Container, Row} from "reactstrap";
import {DhtSensorData} from "@/common/types";
import {prefersDark} from "@/app/ThemeContext";
import {getLocalStorageItem, setLocalStorageItem} from "@/common/LocalStorage";
import useSWR from "swr";

const CHART_TIMEFRAME_KEY = "chartTimeframe";
const CHART_LAST_TIMEFRAME_KEY = "lastChartTf";
let nextInterval = getNextInterval();

function setChartTimeframe(tf: string) {
  setLocalStorageItem(CHART_TIMEFRAME_KEY, tf);
  updateChart();
}

function setLastChartTf(tf: string) {
  setLocalStorageItem(CHART_LAST_TIMEFRAME_KEY, tf);
}

if (getLocalStorageItem(CHART_TIMEFRAME_KEY) == null) {
  void setChartTimeframe("3d");
} else {
  updateChart();
}

function getNextInterval() {
  const now = new Date();
  const millisTillNext =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + 1,
      0,
      5,
      0
    ).getTime() - now.getTime();
  if (millisTillNext < 0) {
    getNextInterval();
  }
  return millisTillNext;
}

// Update chart every hour
setInterval(updateChart, nextInterval);

function updateChart() {
  const timeframe: string = getLocalStorageItem(CHART_TIMEFRAME_KEY) as string;
  fetchDhtData(timeframe)
    .then(data => makeChart(data, timeframe));
  nextInterval = getNextInterval();
}

let chart: Chart;

function makeChart(data: Array<DhtSensorData>, timeframe: string = getLocalStorageItem(CHART_TIMEFRAME_KEY) as string) {
  const gridColor = prefersDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
  const chartTitleText: string = "Previous " + timeframe;
  let chartDisplayTitle = true;
  if (timeframe === "") {
    chartDisplayTitle = false;
  }
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(document.getElementById("chart") as ChartItem, {
    type: "line",
    data: {
      labels: data.map((row) => formatDate(new Date(row.date))),
      datasets: [
        {
          label: "Temp (F)",
          data: data.map((row) => convertToFahrenheit(row.temp_c) as unknown as number),
          yAxisID: "y",
        },
        {
          label: "Humidity (%)",
          data: data.map((row) => row.humidity),
          yAxisID: "y1",
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: screen.width >= 500,
          grid: {
            color: gridColor
          }
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          grid: {
            color: gridColor
          },
          title: {
            display: true,
            text: "Temp. (F)",
          }
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          suggestedMax: 100,
          suggestedMin: 0,
          title: {
            display: true,
            text: "Humidity (%)"
          }
        },
      },
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: chartDisplayTitle,
          text: chartTitleText
        }
      }
    },
  });
}

const fetchData = (): Promise<DhtSensorData[]> =>
  fetchDhtData(getLocalStorageItem(CHART_TIMEFRAME_KEY) as string).then((data) => {
    return data;
  });

export function Graph() {
  const [newTf, setNewTf] = useState<string>(getLocalStorageItem(CHART_LAST_TIMEFRAME_KEY) as string);
  const {data, error} = useSWR("graph", fetchData);

  const handleTfSubmit = () => {
    setChartTimeframe(newTf!);
    setLastChartTf(newTf as string);
  };

  if (data) makeChart(data);

  return (
    <Container>
      <Row>
        <Col
          xs={"auto"}>
          <input
            type="button"
            onClick={() => setChartTimeframe("14d")}
            value="14 days"
          />
          <input
            type="button"
            onClick={() => setChartTimeframe("3d")}
            value="3 days"
          />
          <input
            type="button"
            onClick={() => setChartTimeframe("24h")}
            value="24 hours"
          />
          <input
            type="button"
            onClick={() => setChartTimeframe("12h")}
            value="12 hours"
          />
        </Col>
        <Col>
          <input
            className={"w-25"}
            type={"text"}
            onChange={(e) => {
              setNewTf(e.target.value);
            }}
            value={newTf as string}
            style={{
              minWidth: "100px"
            }}
          />
          <input
            type={"button"}
            onClick={handleTfSubmit}
            value={"Set"}
          />
        </Col>
      </Row>
      <br/>
      {error ? <p>error</p> : <>{
        !data ? <p>Loading...</p> : <></>
      }</>}
      <div className={"chart-container"}>
        <canvas id="chart"></canvas>
      </div>
    </Container>
  );
}