import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequest } from "../../api/dto/SignInRequest";
import { User } from "../../api/dto/User";
import { authRequests } from "../../api/requests/authRequests";
import { notification } from "../../core/helpers/notification";
import { SignUpRequest } from "../../api/dto/SignUpRequest";

export const signIn = createAsyncThunk<User, SignInRequest>(
  "auth/signIn",
  async (params, thunkAPI) => {
    try {
      const loginData = await authRequests.login(params);
      if (loginData) {
        localStorage.setItem("user", JSON.stringify(loginData));
      }
      return loginData;
    } catch (err) {
      switch (err.code) {
        case 403: {
          notification("User not found");
          break;
        }
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation signIn: " + err);
    }
  }
);

export const signUp = createAsyncThunk<User, SignUpRequest>(
  "auth/signUp",
  async (params, thunkAPI) => {
    try {
      const registerData = await authRequests.register(params);
      if (registerData) {
        localStorage.setItem("user", JSON.stringify(registerData));
      }
      return registerData;
    } catch (err) {
      switch (err.code) {
        case 409: {
          notification("User already exists");
          break;
        }
        default: {
          notification("Unknown error");
          break;
        }
      }

      return thunkAPI.rejectWithValue("Invalid operation signUp: " + err);
    }
  }
);
