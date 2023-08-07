import React, {useState} from "react";
import {fetchHistoricalSensorData} from "@/api/remote-ac-api";
import {convertToFahrenheit, formatDate} from "@/components/remote-ac";
import {DhtSensorData} from "@/common/types";
import {Button, Col, Row} from "reactstrap";
import useSWR from "swr";

interface HistoricalDataApiResponse {
  count: number | null,
  next: string | null,
  previous: string | null,
  results: Array<DhtSensorData> | null,
}

const fetchData = (page: number): Promise<HistoricalDataApiResponse> => {
  return fetchHistoricalSensorData(page).then((result) => {
    console.log("historical data: ", result);
    return result;
  });
};

export function HistoricalSensorData() {
  const [page, setPage] = useState(1);
  const {data, error} = useSWR<HistoricalDataApiResponse, Error>(page.toString(), fetchData);

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;

  console.log("data", data);

  return (
    <>
      {data!.results!.map((item, i) => (
        <p key={i}>
          {formatDate(new Date(item.date))} ::{" "}
          {convertToFahrenheit(item.temp_c)}&deg;F ({item.temp_c}&deg;C)
          H: {item.humidity}%
        </p>
      ))}
      <Row>
        {/* Earlier/Next button */}
        <Col>
          {page < (Math.ceil(data!.count! / 20)) ? (
            <>
              <Button
                color={"secondary"}
                onClick={() => setPage(Math.ceil(data!.count! / 20))}
                size={"sm"}
              >
                <i className="bi bi-chevron-double-left"></i>
              </Button>&nbsp;
            </>
          ) : null}
          {data?.next !== null ? (
            <Button
              color='secondary'
              onClick={() => setPage(page + 1)}
              size={"sm"}
            >
              <i className="bi bi-chevron-left"></i>
            </Button>
          ) : null}
        </Col>
        {/* Later/Previous button */}
        <Col>
          {data?.previous !== null ? (
            <Button
              color={"secondary"}
              onClick={() => setPage(page - 1)}
              size={"sm"}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          ) : null}
          {page > 2 ? (
            <>
              &nbsp;<Button
              color={"secondary"}
              onClick={() => setPage(1)}
              size={"sm"}
            >
              <i className="bi bi-chevron-double-right"></i>
            </Button>
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
}