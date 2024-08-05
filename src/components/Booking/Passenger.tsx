import { DirectionDataContext } from "@/context/DirectionDataContext";
import { DirectionMatrixDataContext } from "@/context/DirectionMatrixDataContext";
import PassengerList from "@/data/PassengerList";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { FaStar } from "react-icons/fa";
import { PassengerDurationsContext } from "@/context/PassengerDurationsContext";
import { SliderDemo } from "../ui/sliderDemo";
import { RangeSliderContext } from "@/context/RangeSliderContext";
import { MatchingIndexesContext } from "@/context/MatchingIndexesContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { SelectCordiContext } from "@/context/SelectCordiContext";

function Passenger() {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { directionMatrixData, setDirectionMatrixData } = useContext(
    DirectionMatrixDataContext
  );
  const [starNumber, setStarNumber] = useState(2);
  let PassengerDurationsList: { id: number; duration: number }[] = [];
  const { PassengerDurations, setPassengerDurations } = useContext(
    PassengerDurationsContext
  );
  const { matchingIndexes, setMatchingIndexes } = useContext(
    MatchingIndexesContext
  );
  const { selectCordinates, setSelectCordinates } =
    useContext(SelectCordiContext);
  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);

  const [range, setRange] = useState([0]);
  //const { range, setRange } = useContext(RangeSliderContext);

  const handleRangeChange = (value: React.SetStateAction<number[]>) => {
    setRange(value);
  };

  const handleSelectedCard = (item: any) => {
    //setSelectedCar(item);
    setSelectCordinates({
      lng: item.lng,
      lat: item.lat,
    });
    onSelectedCard(item);
  };

  const getCost = (charges: any) => {
    return (
      charges *
      directionData.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };

  const [selectedCards, setSelectedCards] = useState<any[]>([]);

  const onSelectedCard = (item: any) => {
    if (selectedCards.includes(item)) {
      setSelectedCards(selectedCards.filter((card) => card !== item));
    } else {
      setSelectedCards([...selectedCards, item]);
    }
  };

  useEffect(() => {
    if (directionMatrixData.length !== 0) {
      for (let i = 1; i < directionMatrixData.durations.length; i++) {
        let durationPoints = 0;
        if (i > 1) {
          durationPoints =
            directionMatrixData.durations[i][0] +
            directionMatrixData.durations[1][i];
        } else if (i == 1) {
          durationPoints = directionMatrixData.durations[i][0];
        }
        PassengerDurationsList.push({
          id: i - 1,
          duration: durationPoints,
        });
      }
      setPassengerDurations(PassengerDurationsList);
    }
    //console.log(PassengerDurationsList);
  }, [directionMatrixData]);

  useEffect(() => {
    if (PassengerDurations?.[0]?.duration) {
      setRange([PassengerDurations[0].duration / 60]);
    }
  }, [PassengerDurations]);

  useEffect(() => {
    if (
      range &&
      range[0] !== 0 &&
      PassengerDurations &&
      PassengerDurations.length > 0
    ) {
      const newMatchingIndexes: number[] = [];

      PassengerList.forEach((item, index) => {
        const duration = PassengerDurations[index + 1].duration;

        if (duration / 60 <= range[0]) {
          newMatchingIndexes.push(index);
        }
      });

      setMatchingIndexes(newMatchingIndexes);
    }
  }, [PassengerList, PassengerDurations, range]);

  return (
    <>
      {range &&
        range[0] !== 0 &&
        PassengerDurations &&
        PassengerDurations.length > 0 && (
          <div>
            <div className="mt-3">
              <Label>Izbira Štoparjev</Label>
              <div
                className="grid 
        grid-cols-3 
        md:grid-cols-2
        lg:grid-cols-3
         "
              >
                {PassengerList.map((item, index) => {
                  const duration = PassengerDurations[index + 1].duration;
                  const originalDuration = PassengerDurations[0].duration;
                  const durationStr =
                    duration / 60 >= 60
                      ? `${(duration / 3600).toFixed(2)} Hour(s)`
                      : `${Math.round(duration / 60)} Min`;

                  return duration / 60 <= range[0] ? (
                    <div
                      key={index}
                      className={`m-2
                 p-2 border-[1px] rounded-md 
                 hover:border-yellow-400 
                 cursor-pointer
                 ${
                   selectedCards.includes(item)
                     ? "border-yellow-400 border-[2px]"
                     : null
                 }`}
                      onClick={() => handleSelectedCard(item)}
                    >
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={75}
                          height={90}
                          className="w-full"
                        />
                        <div className="absolute top-0 right-0 flex items-center justify-center">
                          <FaStar
                            color="#FFD700 "
                            size={30}
                            style={{
                              filter: "drop-shadow(0px 0px 10px #FFD700)",
                            }}
                          />
                          <span
                            className="absolute text-white text-xs font-bold"
                            style={{
                              textShadow: "0px 0px 1px #000000",
                              bottom: "3px",
                            }}
                          >
                            {starNumber}
                          </span>
                        </div>
                        <div
                          className="absolute text-sm bottom-0 left-0 right-0 font-bold text-gray-800 px-2 text-center "
                          style={{
                            background:
                              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
                          }}
                        >
                          {item.name}
                        </div>
                      </div>

                      <h2 className="text-[10px] text-gray-500">
                        <p>
                          {item.start_loc} - {item.end_loc}
                        </p>
                        {directionData.routes ? (
                          <span
                            className="font-medium
                     text-black"
                          >
                            {getCost(item.charges)}$
                          </span>
                        ) : null}
                      </h2>
                      <h2 className="text-[10px] text-gray-500">
                        <div>{durationStr}</div>
                      </h2>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <Label>Odmik Od Poti</Label>
            <div className="my-3">
              <SliderDemo
                defaultValue={[PassengerDurations[0].duration / 60]}
                max={400}
                min={PassengerDurations[0].duration / 60}
                step={1}
                value={range}
                onValueChange={handleRangeChange}
                formatLabel={(value) =>
                  `${Math.round(
                    PassengerDurations[0].duration / 60
                  )} min + ${Math.round(
                    value - PassengerDurations[0].duration / 60
                  )} min`
                }
              />
            </div>
          </div>
        )}
    </>
  );
}

export default Passenger;
