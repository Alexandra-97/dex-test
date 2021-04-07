import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../core/helpers/notification";
import { playersRequests } from "../../api/requests/playersRequests";
import { imageRequests } from "../../api/requests/imageRequests";
import { Player } from "../../api/dto/Player";
import { AddOrEditPlayerRequest } from "../../api/dto/AddOrEditPlayerRequest";
import { GetTeamOrPlayerRequest } from "../../api/dto/GetTeamOrPlayerRequest";
import { GetPlayersRequest } from "../../api/dto/GetPlayersRequest";
import { GetPlayersResponse } from "../../api/dto/GetPlayersResponse";
import { DeleteRequest } from "../../api/dto/DeleteRequest";
import { GetTeamsResponse } from "../../api/dto/GetTeamsResponse";
import { GetTeamsRequest } from "../../api/dto/GetTeamsRequest";
import { teamsRequests } from "../../api/requests/teamsRequests";

export const getPlayers = createAsyncThunk<
  GetPlayersResponse,
  GetPlayersRequest
>("players/getPlayers", async (params, thunkAPI) => {
  try {
    return await playersRequests.getPlayers(params);
  } catch (err) {
    switch (err.code) {
      default: {
        notification("Unknown error");
        break;
      }
    }

    return thunkAPI.rejectWithValue("Invalid operation: " + err);
  }
});

export const getPositions = createAsyncThunk<string[]>(
  "players/getPositions",
  async (_, thunkAPI) => {
    try {
      return await playersRequests.getPositions();
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

export const getPlayer = createAsyncThunk<Player, GetTeamOrPlayerRequest>(
  "players/getPlayer",
  async (params, thunkAPI) => {
    try {
      return await playersRequests.getPlayer(params);
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

export const addPlayer = createAsyncThunk<Player, AddOrEditPlayerRequest>(
  "players/addPlayer",
  async (params, thunkAPI) => {
    try {
      const { newAvatar, callback, ...rest } = params;
      const avatarUrl = newAvatar
        ? await imageRequests.saveImage(newAvatar)
        : null;
      const response = await playersRequests.addPlayer({
        avatarUrl,
        ...rest,
      });
      if (response) {
        callback && callback();
      }
      return response;
    } catch (err) {
      switch (err.code) {
        case 409: {
          notification("Player already exists");
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

export const editPlayer = createAsyncThunk<Player, AddOrEditPlayerRequest>(
  "players/editPlayer",
  async (params, thunkAPI) => {
    try {
      const { newAvatar, avatarUrl, callback, ...rest } = params;
      const imageUrl = newAvatar
        ? await imageRequests.saveImage(newAvatar)
        : avatarUrl;
      const response = await playersRequests.editPlayer({
        avatarUrl: imageUrl,
        ...rest,
      });
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

export const deletePlayer = createAsyncThunk<Player, DeleteRequest>(
  "players/deletePlayer",
  async (params, thunkAPI) => {
    try {
      const { id, callback } = params;
      const response = await playersRequests.deletePlayer({ id });
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

export const getTeamsFilter = createAsyncThunk<
  GetTeamsResponse,
  GetTeamsRequest
>("players/getTeamsFilter", async (params, thunkAPI) => {
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
});
