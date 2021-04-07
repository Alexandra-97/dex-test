import { Player } from "./Player";

export interface AddOrEditPlayerRequest extends Player {
  callback?: () => void;
  newAvatar?: File;
}
