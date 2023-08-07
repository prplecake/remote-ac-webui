import React from "react";
import {fetchLatestNWSObservation} from "@/api/nws-api";
import {NWSObservation} from "@/common/types";
import {convertToFahrenheit} from "@/components/remote-ac";
import useSWR from "swr";

const fetchData = (weatherStation: string): Promise<NWSObservation> => {
  return fetchLatestNWSObservation(weatherStation).then(
    response => {
      const data = response.properties;
      return {
        temp_c: data?.temperature.value,
        humidity: data?.relativeHumidity.value,
      } as NWSObservation;
    });
};

export function LatestNWSObservation(props: { wxGridPoints: string, weatherStation: string }) {
  const {data, error} = useSWR<NWSObservation, Error>(props.weatherStation, fetchData);

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;
  console.log("latest observation: ", data);

  return (<>
    NWS Observations ({props.weatherStation}):<br/>
    Temp: {convertToFahrenheit(data.temp_c)}&deg;F<br/>
    RH: {data.humidity.toFixed(0)}%
  </>);
}