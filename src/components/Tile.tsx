"use client"

import {FC, useState} from "react";

const Tile:FC = () => {
    const [tileState, setTileState] = useState<string>("");
    const [humanMark] = useState<string>("X");

    const handleOnClick = () => {
        setTileState(humanMark);
    };

    return (
        <button
            className="aspect-square w-full rounded-md bg-gray-200 grid place-items-center"
            onClick={handleOnClick}
        >
            <span className="text-8xl text-gray-700">{tileState}</span>
        </button>
    );
};


export default Tile;

