'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Bus, Info } from "lucide-react";

const SubHeader = () => {
    const [activeButton, setActiveButton] = useState("");

    const handleButtonClick = (buttonName : any) => {
        setActiveButton(buttonName);
    };

    return (
        <div className="bg-green-800 text-white body-font relative">
            <div className="container mx-auto flex flex-wrap justify-between items-center p-5 text-center">
                <Link href="/option1" passHref>
                    <Button size="lg"
                            onClick={() => handleButtonClick("option1")}
                            className={`transition-colors duration-300 ${activeButton === "option1" ? "bg-orange-500" : "bg-green-500 hover:bg-green-600"} w-full md:w-auto`}>
                        <Car className="mr-2 h-5 w-5 md:h-4 md:w-4" /> Option 1
                    </Button>
                </Link>
                <Link href="/option2" passHref>
                    <Button size="lg"
                            onClick={() => handleButtonClick("option2")}
                            className={`transition-colors duration-300 ${activeButton === "option2" ? "bg-orange-500" : "bg-green-500 hover:bg-green-600"} w-full md:w-auto mt-2 md:mt-0`}>
                        <Bus className="mr-2 h-5 w-5 md:h-4 md:w-4" /> Option 2
                    </Button>
                </Link>
                <Link href="/option3" passHref>
                    <Button size="lg"
                            onClick={() => handleButtonClick("option3")}
                            className={`transition-colors duration-300 ${activeButton === "option3" ? "bg-orange-500" : "bg-green-500 hover:bg-green-600"} w-full md:w-auto mt-2 md:mt-0`}>
                        <Info className="mr-2 h-5 w-5 md:h-4 md:w-4" /> Option 3
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SubHeader;
