import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import MapBoxRoute from "./MapBoxRoute";
import { DirectionDataContext } from "@/context/DirectionDataContext";

import DistanceTime from "../Booking/DistanceTime";
import PassengerList from "@/data/PassengerList";
import { DirectionMatrixDataContext } from "@/context/DirectionMatrixDataContext";
import { SelectCordiContext } from "@/context/SelectCordiContext";
import { DirectionDataSelectionContext } from "@/context/DirectionDataSelectionContext";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

const MAPBOX_MATRIX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/";
const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";

const path2 = [4, 3, 1];
const path3 = [5, 4, 3, 2, 1];
const colors = ["#F28585", "#FFA447", "#B7E5B4"];

interface MapboxMapProps {
  height?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ height }) => {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCoordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { selectCordinates, setSelectCordinates } =
    useContext(SelectCordiContext);

  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { directionDataSelection, setDirectionDataSelection } = useContext(
    DirectionDataSelectionContext
  );
  const { directionMatrixData, setDirectionMatrixData } = useContext(
    DirectionMatrixDataContext
  );

  //Use to Fly to Source Marker Location

  useEffect(() => {
    if (selectCordinates) {
      mapRef.current?.flyTo({
        center: [selectCordinates.lng, selectCordinates.lat],
        duration: 2500,
      });
    }
  }, [selectCordinates]);

  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  //Use to Fly to Destination Markers Location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [
          (14.483940354296136 + 14.862691940592999) / 2,
          (46.04372643727317 + 45.64146945693639) / 2,
        ],
        duration: 2500,
        zoom: 9,
      });

      if (userLocation.length !== 0 && destinationCordinates.length !== 0) {
        getDirectionRoute([], colors[0]);
        getDirectionRoute(path2, colors[1]);
        getDirectionRoute(path3, colors[2]);
        getMatrixDirectionRoute();
      }
    }
  }, [destinationCordinates]);
  /*
  //Newly Added
  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCordinates.lng +
        "," +
        sourceCordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    const result = await res.json();

    setDirectionData(result);
  };
*/
  const getDirectionRoute = async (indices: number[], color: string) => {
    // Use the index argument in your function. For example, you might use it to get a specific item from an array.
    const items = indices.map((index) => {
      if (PassengerList[index - 1]) {
        return `${PassengerList[index - 1].lng},${
          PassengerList[index - 1].lat
        }`;
      }
    });

    const itemsString = items.join(";");

    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        userLocation.lng +
        "," +
        userLocation.lat +
        (itemsString ? ";" + itemsString + ";" : ";") +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    result.color = color;

    setDirectionData((currentData: any) => [...currentData, result]);
    setDirectionDataSelection((currentData: any) => [...currentData, result]);
  };

  let coordinates = PassengerList.map(
    (passenger) => `${passenger.lng},${passenger.lat}`
  ).join(";");

  if (coordinates.endsWith(";")) {
    coordinates = coordinates.slice(0, -1);
  }
  const getMatrixDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_MATRIX_DRIVING_ENDPOINT +
        userLocation.lng +
        "," +
        userLocation.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        (coordinates && coordinates.trim() !== "" ? ";" + coordinates : "") +
        "?&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    setDirectionMatrixData(result);
  };

  return (
    <div className="">
      <div className=" overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: height, borderRadius: 10 }}
            //mapStyle="mapbox://styles/mapbox/streets-v9"
            mapStyle="mapbox://styles/mapbox/navigation-night-v1"
          >
            <Markers />

            {directionDataSelection?.map((routeData: any, index: any) =>
              routeData.routes ? (
                <MapBoxRoute
                  key={index}
                  coordinates={routeData.routes[0]?.geometry?.coordinates}
                  color={routeData.color}
                />
              ) : null
            )}
          </Map>
        ) : null}
      </div>
      <div
        className="absolute top-[106vh]
      z-20 right-[20px]"
      >
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapboxMap;
