import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Label } from "../ui/label";
import { Search } from "lucide-react";
//import { Drawer } from "vaul";
//import { DrawerDemo } from "./DrawerBooking";

import classNames from "classnames";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbLocation } from "react-icons/tb";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { FiUsers } from "react-icons/fi";
import { DirectionDataSelectionContext } from "@/context/DirectionDataSelectionContext";
import { DialogPrevozi } from "./addPickupPlace";

const path2 = [
  "Ribnica, Železniška Postaja",
  "Prigorica/Ribnici, Avtobusna Postaja",
  "Nove Ložine, Kočevje",
  "Slovenska Vas, Kočevje",
];

const path3 = [
  "Grosuplje, Kulturni Dom",
  "Ribnica, Železniška Postaja",
  "Prigorica/Ribnici, Avtobusna Postaja",
  "Nove Ložine, Kočevje",
  "Slovenska Vas, Kočevje",
];

const colors = ["#2A9D8F", "#F4A261", "#E76F51"];

interface SearchLocProps {
  isButtonClicked: boolean;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
}

export function DrawerDemo({
  isButtonClicked,
  setIsButtonClicked,
}: SearchLocProps) {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
  const MAPBOX_RETRIVE_URL =
    "https://api.mapbox.com/search/searchbox/v1/retrieve/";
  const MAPBOX_SUGGEST_URL =
    "https://api.mapbox.com/search/searchbox/v1/suggest?q=";

  const [source, setSource] = useState("");
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  const { soruceCordinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { directionDataSelection, setDirectionDataSelection } = useContext(
    DirectionDataSelectionContext
  );
  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDistination] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]);

    const querySpace = sourceChange ? source : destination;
    if (querySpace === "" || querySpace === undefined) {
      return;
    }
    const query = querySpace.replace(/\s/g, "+");
    const res = await fetch(
      MAPBOX_SUGGEST_URL +
        query +
        "&language=sl&country=si&limit=10" +
        "&session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    setAddressList(result);
  };
  /*
    const onSourceAddressClick = async (item: any) => {
      setSource(item.place_formatted);
      setAddressList([]);
      setSourceChange(false);
      const res = await fetch(
        MAPBOX_RETRIVE_URL +
          item.mapbox_id +
          "?session_token=" +
          session_token +
          "&access_token=" +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      );
  
      const result = await res.json();
  
      setSourceCordinates({
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      });
    };
  */
  const onDestinationAddressClick = async (item: any) => {
    setDistination(item.place_formatted);
    setAddressList([]);
    setDestinationChange(false);
    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();

    setDestinationCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    setSnap("500px");
  };
  /*
    const handleSourceChange = (value: string) => {
      setSource(value);
      setSourceChange(true);
    };
  */
  const handleDestinationChange = (value: string) => {
    setDistination(value);
    setDestinationChange(true);
  };

  const handleInputClick = () => {
    setIsButtonClicked(true);
    setSnap(1);
  };

  const [selectedCards, setSelectedCards] = useState<number>();
  const handleSelectedItem = (index: number) => {
    setSelectedCards(index);
    setDirectionDataSelection([directionData[index]]);
  };

  const [snap, setSnap] = useState<number | string | null>("250px");

  const [selectedDate, setDate] = useState<Date | undefined>(undefined);

  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleOpen = () => {
    setDialogOpen(true);
  };

  return (
    <div>
      <Drawer
        open={true}
        snapPoints={["300px", "500px", 1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        //dismissible={snap !== "300px"}
        onClose={() => {
          setIsButtonClicked(false);
          setSnap("300px");
        }}
        modal={false}
      >
        <DrawerContent
          className={classNames("h-full", {
            //"top-0 m-0": isButtonClicked,
            //"overflow-y-auto": snap === 1,
            //"overflow-hidden": snap !== 1,
          })}
        >
          <div className="">
            <DrawerHeader className="text-left">
              <DrawerTitle>Kam Greste?</DrawerTitle>
            </DrawerHeader>

            <div className="flex  flex-col  px-4">
              <div
                className="flex items-center border rounded-md px-3"
                cmdk-input-wrapper=""
              >
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <input
                  type="text"
                  className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Search"
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  onClick={() => handleInputClick()}
                />
              </div>
              <ul className="">
                {addressList?.suggestions &&
                  destinationChange &&
                  addressList?.suggestions.map((item: any, index: number) => {
                    return (
                      item.full_address && (
                        <li
                          key={index}
                          className="p-3 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => onDestinationAddressClick(item)}
                        >
                          {item.full_address}
                        </li>
                      )
                    );
                  })}
              </ul>
            </div>
            <div className=" p-4">
              {directionData?.map((routeData: any, index: any) =>
                routeData.routes ? (
                  <div
                    key={index}
                    className={`border mb-3 p-2 rounded-md cursor-pointer `}
                    style={{
                      borderColor: colors[index],
                      boxShadow:
                        index == selectedCards
                          ? `0px 0px 10px ${colors[index]}`
                          : "none",
                    }}
                    onClick={() => handleSelectedItem(index)}
                  >
                    <div className="grid md:grid-cols-5 grid-cols-4">
                      <div className="flex items-center gap-x-2">
                        <MdOutlineAccessTime />
                        <p className="text-sm font-medium leading-none">
                          {routeData.routes[0]?.duration}
                        </p>
                      </div>
                      <div className="flex  items-center gap-x-2 px-4">
                        <FiUsers />
                        <p className="text-sm text-muted-foreground ">
                          {routeData.waypoints?.length}
                        </p>
                      </div>
                      <div className="flex  items-center gap-x-2">
                        <TbLocation />
                        <p className="text-sm text-muted-foreground">
                          {routeData.routes[0]?.distance}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground text-right">
                          $100.00
                        </p>
                      </div>
                      {/*
                <input
                  value={inputValues[event.id] || ""}
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      [event.id]: e.target.value,
                    })
                  }
                />
                */}
                    </div>

                    <div
                      key={index}
                      className="flex items-center gap-x-2  mt-1"
                    >
                      <p className="text-sm  leading-none">
                        Vztopne postaje:{" "}
                        {index === 0 ? "Ljubljana, Avtobusna postaja" : ""}
                        {index === 1 ? path2.join(", ") : ""}
                        {index === 2 ? path3.join(", ") : ""}
                      </p>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            <DrawerFooter>
              <button
                className="inline-flex items-center  justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-4 border-input border-gray-700 bg-white hover:bg-accent hover:text-accent-foreground h-11 rounded-3xl mx-20"
                onClick={handleOpen}
              >
                <div className="bgContainer flex-grow pl-4 text-gray-700">
                  <span>DODAJ ŠTOP</span>
                </div>
                <div className="">
                  <div className="border-4 border-gray-100 shadow-inner w-9 h-9 rounded-full  bg-gray-300  active:bg-gray-300 relative   ">
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-gray-700 w-0.5 h-2 absolute left-1/2 transform -translate-x-1/2"></div>
                      <div className="bg-gray-700 w-2 h-0.5"></div>
                    </div>
                  </div>
                </div>
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <DialogPrevozi isOpen={isDialogOpen} handleClose={handleClose} />
    </div>
  );
}
