import { User } from "../../api/dto/User";
import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./authActions";
import { RootState } from "../../core/redux/rootReducer";
import { Loading } from "../../core/redux/loading";

interface AuthState {
  loading: Loading;
  user?: User | null;
}

const initialState: AuthState = {
  loading: Loading.needLoad,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getUser(state) {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
      state.loading = Loading.idle;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = Loading.idle;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = Loading.pending;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = Loading.idle;
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = Loading.idle;
    });
  },
});

export const authActions = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
