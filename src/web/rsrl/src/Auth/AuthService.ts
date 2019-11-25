import { ApiResponse } from "./../Common/types";
import { unwrap } from "../Common/serviceUtility";
import axios from "axios";
import { AuthParams, CurrentUser } from "./authTypes";

class AuthService {
  SignIn(params?: AuthParams) {
    return axios.post("api/Auth/Authenticate", params);
  }

  SignOut() {
    return axios.get("api/Auth/Deauthenticate");
  }

  GetCurrentUser() {
    return axios.get<ApiResponse<CurrentUser>>("api/Auth/GetCurrentUser").then(unwrap);
  }
}

export const authService = new AuthService();
