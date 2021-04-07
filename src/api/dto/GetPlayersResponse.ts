import { Player } from "./Player";

export interface GetPlayersResponse {
  data: Player[];
  count: number;
  page: number;
  size: number;
}
