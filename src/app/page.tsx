"use client";

import { useState } from "react";
import NewGameDialog from "@/components/NewGameDialog";
import { Game } from "@/app/api/createGame";
import { useMutation } from "@tanstack/react-query";
import { makeMoveGame, MoveGameResponse } from "@/app/api/updateGame";
import { ApiResponse } from "@/types/apiResponse";

export default function Home() {
  const [game, setGame] = useState<Game>();

  const { mutate, isPending } = useMutation({
    mutationFn: (p: { row: number; col: number }) =>
      makeMoveGame({ gameId: game!.gameId, row: p.row, col: p.col }),
    onSuccess: (result: ApiResponse<MoveGameResponse>) => {
      setGame((prev) =>
        prev
          ? {
              ...prev,
              ...result,
              board: result.data.board,
              status: result.data.status,
            }
          : prev,
      );
    },
    onError: (e) =>
      alert(e instanceof Error ? e.message : "Something went wrong"),
  });

  const makeMove = (row: number, col: number) => {
    if (!game) return;
    if (game.board[row][col] !== " ") return;
    if (isPending) return;
    mutate({ row, col });
  };

  function getStatusMessage(status?: string) {
    switch (status) {
      case "X_WON":
        return "X wins! 🎉";
      case "O_WON":
        return "O wins! 🎉";
      case "DRAW":
        return "It's a draw 🤝";
      case "IN_PROGRESS":
      default:
        return null;
    }
  }

  return (
    <main className="text-slate-900 space-y-4">
      <div className="flex pt-10 flex-col gap-5 items-center justify-center w-full">
        <h1 className="text-3xl font-semibold">Welcome to the game!</h1>

        {game?.status && game.status !== "IN_PROGRESS" && (
          <p className="text-lg font-medium text-red-600">
            {getStatusMessage(game.status)}
          </p>
        )}

        <h2>Game ID : {game?.gameId}</h2>

        <NewGameDialog onCreated={setGame} />

        {game && (
          <div
            key={game.gameId}
            className="grid gap-2 w-1/2 h-1/2"
            style={{
              gridTemplateColumns: `repeat(${game.colSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${game.rowSize}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: game.rowSize }, (_, row) =>
              Array.from({ length: game.colSize }, (_, col) => (
                <button
                  key={`${game.gameId}-${row}-${col}`}
                  className="aspect-square w-full rounded-md bg-gray-200 grid place-items-center"
                  onClick={() => makeMove(row, col)}
                  disabled={game.status != "IN_PROGRESS"}
                >
                  <span className="text-[3.5cqw] text-gray-700">
                    {game.board[row][col]}
                  </span>
                </button>
              )),
            )}
          </div>
        )}
      </div>
    </main>
  );
}
