export interface Player {
  name: string;
  number: number;
  position: string;
  team: number;
  teamName?: string;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl?: string | null;
  id?: number;
}
