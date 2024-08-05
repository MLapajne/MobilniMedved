import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Map, Marker } from "react-map-gl";
import CarsList from "@/data/PassengerList";
import { MatchingIndexesContext } from "@/context/MatchingIndexesContext";

function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { sourceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { matchingIndexes, setMatchingIndexes } = useContext(
    MatchingIndexesContext
  );

  return (
    <div>
      {/* User Marker  */}
      {/* <Marker 
                longitude={userLocation?.lng} 
                latitude={userLocation?.lat} 
                anchor="bottom" >
                 <img src="./pin.png" 
                 className='w-10 h-10'
                 />
                </Marker> */}

      {/* Source marker  */}
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
      {CarsList.map((item, index) => {
        if (matchingIndexes.includes(index)) {
          return (
            <Marker
              longitude={item.lng}
              latitude={item.lat}
              anchor="bottom"
              key={index}
            >
              <img
                src={item.fixed ? "./location_fix.png" : "./location.png"}
                className="w-10 h-10"
              />
            </Marker>
          );
        } else {
          return (
            <Marker
              longitude={item.lng}
              latitude={item.lat}
              anchor="bottom"
              key={index}
            >
              <img
                src="./pin_dis.png"
                className="w-10 h-10"
                style={{ opacity: 0.5 }}
              />
            </Marker>
          );
        }
      })}
    </div>
  );
}

export default Markers;
