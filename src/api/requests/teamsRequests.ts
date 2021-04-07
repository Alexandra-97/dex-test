import { baseFetch } from "../baseFetch";
import { Team } from "../dto/Team";
import { GetTeamOrPlayerRequest } from "../dto/GetTeamOrPlayerRequest";
import { GetTeamsRequest } from "../dto/GetTeamsRequest";
import { GetTeamsResponse } from "../dto/GetTeamsResponse";
import { DeleteRequest } from "../dto/DeleteRequest";

const API_URLS = {
  add: "/api/Team/Add",
  edit: "/api/Team/Update",
  delete: "/api/Team/Delete",
  getTeam: "/api/Team/Get",
  getTeams: "/api/Team/GetTeams",
};

const addTeam = async (params: Team) => {
  return await baseFetch<Team, Team>({
    url: API_URLS.add,
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
};

const editTeam = async (params: Team) => {
  return await baseFetch<Team, Team>({
    url: API_URLS.edit,
    method: "PUT",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
};

const getTeam = async (params: GetTeamOrPlayerRequest) => {
  return await baseFetch<GetTeamOrPlayerRequest, Team>({
    url: API_URLS.getTeam,
    method: "GET",
    queryParams: params,
  });
};

const getTeams = async (params: GetTeamsRequest) => {
  return await baseFetch<GetTeamsRequest, GetTeamsResponse>({
    url: API_URLS.getTeams,
    method: "GET",
    queryParams: params,
  });
};

const deleteTeam = async (params: DeleteRequest) => {
  return await baseFetch<DeleteRequest, Team>({
    url: API_URLS.delete,
    method: "DELETE",
    queryParams: params,
  });
};

export const teamsRequests = {
  addTeam,
  editTeam,
  getTeam,
  getTeams,
  deleteTeam,
};
