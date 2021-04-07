import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../core/redux/rootReducer";
import {
  addTeam,
  deleteTeam,
  editTeam,
  getTeam,
  getTeamPlayers,
  getTeams,
} from "./teamsActions";
import { Team } from "../../api/dto/Team";
import { Player } from "../../api/dto/Player";
import { Loading } from "../../core/redux/loading";

interface TeamState {
  loading: Loading;
  team?: Team;
  teamPlayers?: Player[];
  teams: Team[];
  count?: number;
  size?: number;
}

const initialState: TeamState = {
  loading: Loading.needLoad,
  teams: [],
  teamPlayers: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTeam.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(addTeam.fulfilled, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(addTeam.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(editTeam.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(editTeam.fulfilled, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(editTeam.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(getTeam.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.team = action.payload;
    });
    builder.addCase(getTeam.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(getTeams.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.teams = action.payload.data;
      state.count = action.payload.count;
      state.size = action.payload.size;
    });
    builder.addCase(getTeams.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(getTeamPlayers.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(getTeamPlayers.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.teamPlayers = action.payload.data;
    });
    builder.addCase(getTeamPlayers.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(deleteTeam.fulfilled, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(deleteTeam.rejected, (state) => {
      state.loading = Loading.idle;
    });
  },
});

export const teamsSelector = (state: RootState) => state.teams;

export const teamsReducer = teamsSlice.reducer;
