import { SignInRequest } from "./SignInRequest";

export interface SignUpRequest extends SignInRequest {
  userName: string;
}
