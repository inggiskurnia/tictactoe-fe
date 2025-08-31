import axios from "axios";
import { ApiResponse } from "@/types/apiResponse";

const moveGameUrl = "http://localhost:8080/api/v1/games/move";

export interface MoveGameRequest {
  gameId: string;
  col: number;
  row: number;
}

export interface MoveGameResponse {
  gameId: string;
  board: string[][];
  status: string;
}

export const makeMoveGame = async (
  request: MoveGameRequest,
): Promise<ApiResponse<MoveGameResponse>> => {
  const response = await axios.post(moveGameUrl, request);

  return response.data;
};
