import { ApiResponse } from "./../Common/types";
import { unwrap } from "../Common/serviceUtility";
import axios from "axios";
import { AuthParams, CurrentUser } from "./authTypes";

class AuthService {
  SignIn(params?: AuthParams) {
    return axios.post("Auth/Authenticate", params);
  }

  SignOut() {
    return axios.get("Auth/Deauthenticate");
  }

  GetCurrentUser() {
    return axios.get<ApiResponse<CurrentUser>>("Auth/GetCurrentUser").then(unwrap);
  }
}

export const authService = new AuthService();
