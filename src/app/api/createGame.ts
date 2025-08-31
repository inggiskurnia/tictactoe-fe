import axios from "axios";
import { ApiResponse } from "@/types/apiResponse";

const gameUrl = "http://localhost:8080/api/v1/games/create";

interface CreateGameRequest {
  colSize: number;
  rowSize: number;
  winLength: number;
  humanMark: string;
}

export interface Game {
  gameId: string;
  rowSize: number;
  colSize: number;
  humanMark: string;
  aiMark: string;
  status: string;
  board: string[][];
}

export const createNewGame = async (
  request: CreateGameRequest,
): Promise<ApiResponse<Game>> => {
  const response = await axios.post(gameUrl, request);

  return response.data;
};
