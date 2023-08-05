import React, {useCallback, useEffect, useState} from "react";
import {fetchLatestNWSObservation} from "@/api/nws-api";
import {NWSObservation} from "@/common/types";
import {useRefresh} from "@/hooks/useRefresh";
import {convertToFahrenheit, minuteInMiliseconds} from "@/components/remote-ac";
import {Feature} from "geojson";

export function LatestNWSObservation(props: { wxGridPoints: string, weatherStation: string }) {
  const [latestObservation, setLatestObservation] = useState<NWSObservation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function processNWSObservation(response: Feature) {
    const data = response.properties;
    setLatestObservation({
      temp_c: data?.temperature.value,
      humidity: data?.relativeHumidity.value,
    } as NWSObservation);
  }

  const fetchData = useCallback(() => {
    if (props.weatherStation !== "") {
      fetchLatestNWSObservation(props.weatherStation).then(
        (response) => processNWSObservation(response)
      );
    }
  }, [props.weatherStation]);

  useEffect(() => {
    if (latestObservation !== null) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [props.weatherStation, latestObservation, fetchData]);

  useRefresh(fetchData, minuteInMiliseconds * 60);

  console.log("latest observation: ", latestObservation);

  return (
    <>
      {isLoading ? (
        <>
          Loading...
        </>
      ) : (
        <>
          NWS Observations ({props.weatherStation}):<br/>
          Temp: {convertToFahrenheit(latestObservation!.temp_c)}&deg;F<br/>
          RH: {latestObservation?.humidity.toFixed(0)}%
        </>
      )}
    </>
  );
}