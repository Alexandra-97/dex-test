import { baseFetch } from "../baseFetch";
import { SignInRequest } from "../dto/SignInRequest";
import { User } from "../dto/User";
import { SignUpRequest } from "../dto/SignUpRequest";

const API_URLS = {
  signIn: "/api/Auth/SignIn",
  signUp: "/api/Auth/SignUp",
};

const login = async (params: SignInRequest) => {
  return await baseFetch<SignInRequest, User>({
    url: API_URLS.signIn,
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
};

const register = async (params: SignUpRequest) => {
  return await baseFetch<SignUpRequest, User>({
    url: API_URLS.signUp,
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
};

export const authRequests = { login, register };
