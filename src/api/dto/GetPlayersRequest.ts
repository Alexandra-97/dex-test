import { GetTeamsRequest } from "./GetTeamsRequest";

export interface GetPlayersRequest extends GetTeamsRequest {
  teamIds?: number[] | string;
}
