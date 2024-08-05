import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useState } from "react";
import { Map, Marker, Popup } from "react-map-gl";
import Stations from "@/data/FixedStations";
import { MatchingIndexesContext } from "@/context/MatchingIndexesContext";
import StationMarker from "./StationMarker";

function MarkersUser() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { sourceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { matchingIndexes, setMatchingIndexes } = useContext(
    MatchingIndexesContext
  );
  const [showPopup, setShowPopup] = useState({});

  return (
    <div>
      {userLocation.length != 0 ? (
        <Marker
          longitude={userLocation?.lng}
          latitude={userLocation?.lat}
          anchor="bottom"
        >
          <img src="./pin.png" className="w-10 h-10" />
        </Marker>
      ) : null}

      {/* Destination Marker  */}

      {destinationCordinates && destinationCordinates.length != 0 ? (
        <Marker
          longitude={destinationCordinates?.lng}
          latitude={destinationCordinates?.lat}
          anchor="bottom"
        >
          <img src="./end_pin.png" className="w-10 h-10" />
        </Marker>
      ) : null}
      {Stations.map((item, index) => (
        <StationMarker
          item={item}
          index={index}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      ))}
    </div>
  );
}

export default MarkersUser;
