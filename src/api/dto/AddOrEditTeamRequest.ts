import { Team } from "./Team";

export interface AddOrEditTeamRequest extends Team {
  callback?: () => void;
  newImage?: File;
}
