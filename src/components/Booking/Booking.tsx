import React, { useEffect, useState } from "react";
import Passenger from "./Passenger";
import SearchLoc from "./SearchLoc";
import { Card } from "../ui/card";
import { DrawerDemo } from "./DrawerBooking";

function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight * 0.72);
  }, []);

  const [localValues, setLocalValues] = useState([0, 100_000]);
  const handleValueChange = (newValues: any) => {
    setLocalValues(newValues);
  };
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <DrawerDemo
      isButtonClicked={isButtonClicked}
      setIsButtonClicked={setIsButtonClicked}
    />
  );
}

export default Booking;
{
  /* 
    <div className="p-5 ">
      <div
        //transition-all duration-500 ease-in-out
        className={` ${isButtonClicked ? "absolute top-0 left-0 w-full" : ""}`}
      >
        
        
        <Card className="">
          <Passenger />

          <button
            className="w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4"
          >
            Poberi
          </button>
        </Card>
       
      </div>
    </div>
     */
}
