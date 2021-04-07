import { baseFetch } from "../baseFetch";
import { GetPlayersRequest } from "../dto/GetPlayersRequest";
import { GetPlayersResponse } from "../dto/GetPlayersResponse";
import { Player } from "../dto/Player";
import { GetTeamOrPlayerRequest } from "../dto/GetTeamOrPlayerRequest";
import { DeleteRequest } from "../dto/DeleteRequest";

const API_URLS = {
  getPlayers: "/api/Player/GetPlayers",
  getPositions: "/api/Player/GetPositions",
  getPlayer: "/api/Player/Get",
  addPlayer: "/api/Player/Add",
  editPlayer: "/api/Player/Update",
  deletePlayer: "/api/Player/Delete",
};

const getPlayers = async (params: GetPlayersRequest) => {
  return await baseFetch<GetPlayersRequest, GetPlayersResponse>({
    url: API_URLS.getPlayers,
    method: "GET",
    queryParams: params,
  });
};

const getPositions = async () => {
  return await baseFetch<{}, string[]>({
    url: API_URLS.getPositions,
    method: "GET",
  });
};

const getPlayer = async (params: GetTeamOrPlayerRequest) => {
  return await baseFetch<GetTeamOrPlayerRequest, Player>({
    url: API_URLS.getPlayer,
    method: "GET",
    queryParams: params,
  });
};

const addPlayer = async (params: Player) => {
  return await baseFetch<Player, Player>({
    url: API_URLS.addPlayer,
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
};

const editPlayer = async (params: Player) => {
  return await baseFetch<Player, Player>({
    url: API_URLS.editPlayer,
    method: "PUT",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
};

const deletePlayer = async (params: DeleteRequest) => {
  return await baseFetch<DeleteRequest, Player>({
    url: API_URLS.deletePlayer,
    method: "DELETE",
    queryParams: params,
  });
};

export const playersRequests = {
  getPlayers,
  getPositions,
  getPlayer,
  addPlayer,
  editPlayer,
  deletePlayer,
};
