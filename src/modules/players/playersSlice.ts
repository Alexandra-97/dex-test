import { createSlice } from "@reduxjs/toolkit";
import { Loading } from "../../core/redux/loading";
import { RootState } from "../../core/redux/rootReducer";
import {
  addPlayer,
  deletePlayer,
  editPlayer,
  getPlayer,
  getPlayers,
  getPositions,
  getTeamsFilter,
} from "./playersActions";
import { Player } from "../../api/dto/Player";
import { Team } from "../../api/dto/Team";

interface PlayersState {
  loading: Loading;
  loadingTeams: Loading;
  player?: Player;
  positions?: string[];
  teamsFilter?: Team[];
  players: Player[];
  count?: number;
  size?: number;
}

const initialState: PlayersState = {
  loading: Loading.needLoad,
  loadingTeams: Loading.needLoad,
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlayers.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      state.players = action.payload.data;
      state.count = action.payload.count;
      state.size = action.payload.size;
      state.loading = Loading.idle;
    });
    builder.addCase(getPlayers.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(getPositions.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.positions = action.payload;
    });
    builder.addCase(getPositions.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(getPlayer.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(getPlayer.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.player = action.payload;
    });
    builder.addCase(getPlayer.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(addPlayer.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(addPlayer.fulfilled, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(addPlayer.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(editPlayer.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(editPlayer.fulfilled, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(editPlayer.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(deletePlayer.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(deletePlayer.fulfilled, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(deletePlayer.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(getTeamsFilter.pending, (state) => {
      state.loadingTeams = Loading.pending;
    });
    builder.addCase(getTeamsFilter.fulfilled, (state, action) => {
      state.teamsFilter = action.payload.data;
      state.loadingTeams = Loading.idle;
    });
    builder.addCase(getTeamsFilter.rejected, (state) => {
      state.loadingTeams = Loading.idle;
    });
  },
});

export const playersSelector = (state: RootState) => state.players;

export const playersReducer = playersSlice.reducer;
