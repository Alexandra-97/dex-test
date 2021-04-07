import { Team } from "./Team";

export interface GetTeamsResponse {
  data: Team[];
  count: number;
  page: number;
  size: number;
}
