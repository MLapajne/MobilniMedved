"use client";

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
import { Drawer } from "vaul";
import { DrawerDemo } from "./DrawerBooking";
interface SearchLocProps {
  isButtonClicked: boolean;
  setIsButtonClicked: Dispatch<SetStateAction<boolean>>;
}
export default function SearchLoc({
  isButtonClicked,
  setIsButtonClicked,
}: SearchLocProps) {
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

  return (
    <div>
      <DrawerDemo
        isButtonClicked={isButtonClicked}
        setIsButtonClicked={setIsButtonClicked}
      />

      {/*
      <Label>Od kje?</Label>

      <div className="border shadow-md  flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            type="text"
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search"
            value={source}
            onChange={(e) => handleSourceChange(e.target.value)}
          />
        </div>
        <ul className="">
          {addressList?.suggestions &&
            sourceChange &&
            addressList?.suggestions.map((item: any, index: number) => {
              return (
                item.full_address && (
                  <li
                    key={index}
                    className="p-3 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => onSourceAddressClick(item)}
                  >
                    {item.place_formatted.includes(item.name)
                      ? item.place_formatted
                      : `${item.name}, ${item.place_formatted}`}
                  </li>
                )
              );
            })}
        </ul>
      </div>
*/}

      <div className="border shadow-md  flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            type="text"
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onClick={() => setIsButtonClicked(true)}
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
                    {console.log(item.full_address)}
                  </li>
                )
              );
            })}
        </ul>
      </div>
    </div>
  );
}
