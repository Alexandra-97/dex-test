import { Team } from "../../api/dto/Team";
import { teamsRequests } from "../../api/requests/teamsRequests";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../core/helpers/notification";
import { imageRequests } from "../../api/requests/imageRequests";
import { GetTeamOrPlayerRequest } from "../../api/dto/GetTeamOrPlayerRequest";
import { GetTeamsResponse } from "../../api/dto/GetTeamsResponse";
import { GetTeamsRequest } from "../../api/dto/GetTeamsRequest";
import { playersRequests } from "../../api/requests/playersRequests";
import { GetPlayersResponse } from "../../api/dto/GetPlayersResponse";
import { DeleteRequest } from "../../api/dto/DeleteRequest";
import { AddOrEditTeamRequest } from "../../api/dto/AddOrEditTeamRequest";

export const addTeam = createAsyncThunk<Team, AddOrEditTeamRequest>(
  "teams/addTeam",
  async (params, thunkAPI) => {
    try {
      const { newImage, callback, ...rest } = params;
      const imageUrl = newImage
        ? await imageRequests.saveImage(newImage)
        : null;
      const response = await teamsRequests.addTeam({
        ...rest,
        imageUrl,
      });
      if (response) {
        callback && callback();
      }
      return response;
    } catch (err) {
      switch (err.code) {
        case 409: {
          notification("Team already exists");
          break;
        }
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation: " + err);
    }
  }
);

export const editTeam = createAsyncThunk<Team, AddOrEditTeamRequest>(
  "teams/editTeam",
  async (params, thunkAPI) => {
    try {
      const { newImage, imageUrl, callback, ...rest } = params;
      const imgUrl = newImage
        ? await imageRequests.saveImage(newImage)
        : imageUrl;
      const response = teamsRequests.editTeam({ ...rest, imageUrl: imgUrl });
      if (response) {
        callback && callback();
      }
      return response;
    } catch (err) {
      switch (err.code) {
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation: " + err);
    }
  }
);

export const getTeam = createAsyncThunk<Team, GetTeamOrPlayerRequest>(
  "teams/getTeam",
  async (params, thunkAPI) => {
    try {
      return await teamsRequests.getTeam(params);
    } catch (err) {
      switch (err.code) {
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation: " + err);
    }
  }
);

export const getTeams = createAsyncThunk<GetTeamsResponse, GetTeamsRequest>(
  "teams/getTeams",
  async (params, thunkAPI) => {
    try {
      return await teamsRequests.getTeams(params);
    } catch (err) {
      switch (err.code) {
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation: " + err);
    }
  }
);

export const getTeamPlayers = createAsyncThunk<GetPlayersResponse, number[]>(
  "teams/getTeamPlayers",
  async (teamIds, thunkAPI) => {
    try {
      return await playersRequests.getPlayers({ teamIds });
    } catch (err) {
      switch (err.code) {
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation: " + err);
    }
  }
);

export const deleteTeam = createAsyncThunk<Team, DeleteRequest>(
  "teams/deleteTeam",
  async (params, thunkAPI) => {
    try {
      const { id, callback } = params;
      const response = await teamsRequests.deleteTeam({ id });
      if (response) {
        callback && callback();
      }
      return response;
    } catch (err) {
      switch (err.code) {
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation: " + err);
    }
  }
);
