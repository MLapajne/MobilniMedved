"use client";

import Booking from "@/components/Booking/Booking";
import { DemoSlider } from "@/components/DemoSlider";
import MapboxMap from "@/components/Map/MapBoxMap";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { DirectionMatrixDataContext } from "@/context/DirectionMatrixDataContext";
import { PassengerDurationsContext } from "@/context/PassengerDurationsContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { RangeSliderContext } from "@/context/RangeSliderContext";
import { SelectCordiContext } from "@/context/SelectCordiContext";
import { DirectionDataSelectionContext } from "@/context/DirectionDataSelectionContext";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PassengerListContext } from "@/context/PassengerListContext";
import { MatchingIndexesContext } from "@/context/MatchingIndexesContext";
export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>();
  const [destinationCordinates, setDestinationCordinates] = useState<any>();
  const [directionData, setDirectionData] = useState<any>([]);
  const [directionMatrixData, setDirectionMatrixData] = useState<any>([]);
  const [PassengerDurations, setPassengerDurations] = useState<any>([]);
  const [range, setRange] = useState<number[]>([0]);
  const [matchingIndexes, setMatchingIndexes] = useState<number[]>([0]);
  const [selectCordinates, setSelectCordinates] = useState<any>([]);
  const [directionDataSelection, setDirectionDataSelection] = useState<any>([]);

  useEffect(() => {
    //getUserLocation();

    setUserLocation({
      lat: 46.04372643727317,
      lng: 14.483940354296136,
    });
  }, []);
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider
          value={{ sourceCordinates, setSourceCordinates }}
        >
          <DestinationCordiContext.Provider
            value={{ destinationCordinates, setDestinationCordinates }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <DirectionMatrixDataContext.Provider
                value={{ directionMatrixData, setDirectionMatrixData }}
              >
                <PassengerDurationsContext.Provider
                  value={{ PassengerDurations, setPassengerDurations }}
                >
                  <RangeSliderContext.Provider value={{ range, setRange }}>
                    <MatchingIndexesContext.Provider
                      value={{ matchingIndexes, setMatchingIndexes }}
                    >
                      <SelectCordiContext.Provider
                        value={{ selectCordinates, setSelectCordinates }}
                      >
                        <DirectionDataSelectionContext.Provider
                          value={{
                            directionDataSelection,
                            setDirectionDataSelection,
                          }}
                        >
                          <div className="grid grid-cols-1">
                            <div>
                              <MapboxMap height="80vh" />
                            </div>
                            <div>
                              <Booking />
                            </div>
                          </div>
                        </DirectionDataSelectionContext.Provider>
                      </SelectCordiContext.Provider>
                    </MatchingIndexesContext.Provider>
                  </RangeSliderContext.Provider>
                </PassengerDurationsContext.Provider>
              </DirectionMatrixDataContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
