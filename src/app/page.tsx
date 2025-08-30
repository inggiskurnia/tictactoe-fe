"use client";

import { useState, ChangeEvent } from "react";
import Tile from "@/components/Tile";
import NewGameDialog from "@/components/NewGameDialog";

export default function Home() {
    const [rowSize, setRowSize] = useState<number>(3);
    const [colSize, setColSize] = useState<number>(3);

    return (
        <main className="text-slate-900 space-y-4">
            <h1 className="text-xl font-semibold">Welcome to the game!</h1>

            <NewGameDialog/>

            <div
                className={[
                    "grid gap-2 w-96 h-96",
                    // Tailwind arbitrary values for dynamic grids:
                    `grid-cols-[repeat(${colSize},minmax(0,1fr))]`,
                    `grid-rows-[repeat(${rowSize},minmax(0,1fr))]`,
                ].join(" ")}
            >
                {Array.from({ length: rowSize * colSize }, (_, i) => (
                    <Tile key={i} />
                ))}
            </div>
        </main>
    );
}
