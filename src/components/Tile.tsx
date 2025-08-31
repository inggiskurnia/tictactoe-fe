"use client";

import { FC, useEffect, useState } from "react";

interface Props {
  tileState: string;
  humanMark: string;
}

const Tile: FC<Props> = ({ tileState, humanMark }) => {
  const [selected, setSelected] = useState<string>("");

  const handleOnClick = () => {
    setSelected(humanMark);
  };

  useEffect(() => {
    if (tileState) {
      setSelected(tileState);
    }
  }, []);

  return (
    <button
      className="aspect-square w-full rounded-md bg-gray-200 grid place-items-center"
      onClick={handleOnClick}
    >
      <span className="text-[3.5cqw] text-gray-700">{selected}</span>
    </button>
  );
};

export default Tile;
