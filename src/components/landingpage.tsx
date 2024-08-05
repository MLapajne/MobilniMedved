import React from "react";
import Image from 'next/image';

const Home = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Mobilni medved Kočevje</h1>
            <p className="text-lg text-white mb-8">Aplikacija za agregiranje in izboljševanje mobilnosti v Kočevju</p>
            <div className="w-300 h-300 mx-auto mb-8">
                <Image src="/bear_logo.png" alt="Mobilni medved Kočevje" width={500} height={500} />
            </div>
            <div className="flex justify-center">
                <p className={["text-white", "text-lg", "mr-4"].join(" ")}>Neki neki dev tuki se razvija naprej</p>
            </div>
        </div>
    );
}

export default Home;