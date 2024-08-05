import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogPickupPlace";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { useContext, useEffect, useState } from "react";
import { Clock, Euro, Search } from "lucide-react";
import MapboxMapUser from "../Map/MapBoxMapUser";
import { Map } from "lucide-react";
import { TbBackground } from "react-icons/tb";
import { DateTimePicker, TimePicker } from "@/components/ui/datetime-picker";

const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const MAPBOX_SUGGEST_URL =
  "https://api.mapbox.com/search/searchbox/v1/suggest?q=";

export function DialogPrevozi({ event, isOpen, handleClose }: any) {
  const [source, setSource] = useState("");
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

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

  const [selectedCards, setSelectedCards] = useState<number>();
  const handleSelectedItem = (index: number) => {
    setSelectedCards(index);
  };

  return (
    <Dialog onOpenChange={handleClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent className="h-full">
        <DialogHeader>
          <DialogTitle className="mt-4 text-center">
            Rezerviraj Prevoz
          </DialogTitle>

          <div className="flex w-full flex-col py-4">
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
                //onClick={() => handleInputClick()}
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
                        className="p-3 text-sm cursor-pointer text-left hover:bg-gray-100"
                        onClick={() => onDestinationAddressClick(item)}
                      >
                        {item.full_address}
                      </li>
                    )
                  );
                })}
            </ul>
          </div>
          <div className="pb-4">
            <MapboxMapUser height="30vh" />
          </div>
          <div
            className="grid grid-cols-3 text-center p-4 rounded-md"
            style={{ background: "#0E172A" }}
          >
            <div className="flex justify-center space-x-2 text-xl font-bold items-center">
              <Map />
              <span>8km</span>
            </div>
            <div className="flex justify-center space-x-2 text-xl font-bold items-center">
              <Clock />
              <span>45min</span>
            </div>
            <div className="flex justify-center space-x-2 text-xl font-bold items-center">
              <Euro />
              <span>49eur</span>
            </div>
          </div>
          <span className="text-center font-bold pt-4">Število Sedežev</span>
          <div className="grid grid-cols-4 text-center space-x-2">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="p-4 rounded-md font-bold text-xl"
                style={{
                  background: index == selectedCards ? "#E5E5E5" : "#0E172A",
                  color: index == selectedCards ? "#0E172A" : "#E5E5E5",
                }}
                onClick={() => handleSelectedItem(index)}
              >
                {index}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 space-x-2 pt-4">
            <div className="space-y-2 flex-grow text-bold">
              <span className=" font-bold ">Datum</span>
              <DateTimePicker />
            </div>
            <div className="space-y-2 flex-grow mb-4">
              <span className=" font-bold">Čas</span>
              <TimePicker />
            </div>
          </div>
          <Button className="w-full bg-custom-yellow p-1 rounded-md text-bold">
            Štopaj
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
