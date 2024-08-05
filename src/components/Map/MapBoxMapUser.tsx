import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MarkersUser from "./MarkersUser";
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

interface MapboxMapProps {
  height?: string;
}

const MapboxMapUser: React.FC<MapboxMapProps> = ({ height }) => {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCoordinates } =
    useContext(SourceCordiContext);

  const { selectCordinates, setSelectCordinates } =
    useContext(SelectCordiContext);

  const { directionDataSelection, setDirectionDataSelection } = useContext(
    DirectionDataSelectionContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
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

  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
        zoom: 9,
      });
    }
  }, [destinationCordinates]);

  //Use to Fly to Destination Markers Location

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
            <MarkersUser />
          </Map>
        ) : null}
      </div>
    </div>
  );
};

export default MapboxMapUser;
