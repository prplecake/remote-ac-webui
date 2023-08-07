import React from "react";
import {fetchLatestSensorData} from "@/api/remote-ac-api";
import {convertToFahrenheit} from "./remote-ac";
import useSWR from "swr";
import {DhtSensorData} from "@/common/types";


const fetchData = (): Promise<DhtSensorData> =>
  fetchLatestSensorData().then(result => result as DhtSensorData);

export function LatestSensorData() {
  const {data, error} = useSWR<DhtSensorData, Error>("LatestSensorData", fetchData);

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <div id='current-temp'>
      Local Observations<br/>
      Temp: {convertToFahrenheit(data!.temp_c)}&deg;F ({data!.temp_c}&deg;C)<br/>
      Humidity: {data!.humidity}%<br/>
    </div>
  );
}