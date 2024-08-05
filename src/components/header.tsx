    import React from "react";
    import Image from 'next/image';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

    const Header = () => {
        return (
            <header className="bg-green-900 text-gray-300 body-font relative ">
                <div className="container mx-auto flex items-center justify-between p-5 md:flex-row text-center">
                    <div className="flex justify-start flex-1">
                        <a href="/" className="inline-flex title-font font-medium items-center text-white">
                            <Image src="/bear_logo.png" alt="Logo" width={150} height={150} className="rounded-full" layout="fixed"/>
                        </a>
                    </div>
                    <div className="flex-1 px-4 md:px-0">
                        <span className="text-white text-2xl md:text-4xl font-bold">Mobilni Medved</span>
                    </div>
                    <div className="flex justify-end flex-1">
                        <div className="flex flex-col items-center text-base justify-end">
                            <Avatar>
                                <AvatarImage src="/BearProfil.jpg" alt="Profile" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="mt-2 text-white">John Doe</span>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    export default Header;