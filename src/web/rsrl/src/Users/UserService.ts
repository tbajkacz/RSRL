import axios from "axios";
import {
  UserAccount,
  UserAccountAddParams,
  UserAccountUpdateParams,
  UserAccountRemoveParams,
  UserAccountUpdatePasswordParams,
  UserAccountInfo
} from "./userTypes";
import { ApiResponse } from "../Common/types";
import { unwrap } from "../Common/serviceUtility";

class UserService {
  Get() {
    return axios.get<ApiResponse<UserAccount[]>>("api/User/GetUsers").then(unwrap);
  }

  GetInfos() {
    return axios.get<ApiResponse<UserAccountInfo[]>>("api/User/GetUsersInfos").then(unwrap);
  }

  Add(param: UserAccountAddParams) {
    return axios.post<ApiResponse<any>>("api/User/Add", param).then(unwrap);
  }

  Update(param: UserAccountUpdateParams) {
    return axios.post<ApiResponse<any>>("api/User/Update", param).then(unwrap);
  }

  UpdatePassword(param: UserAccountUpdatePasswordParams) {
    console.log(param);
    return axios.post<ApiResponse<any>>("api/User/UpdatePassword", param).then(unwrap);
  }

  Delete(param: UserAccountRemoveParams) {
    return axios.post<ApiResponse<any>>("api/User/Remove", param).then(unwrap);
  }

  Roles() {
    return axios.get<ApiResponse<string[]>>("api/User/AvailableRoles").then(unwrap);
  }
}

export const userService = new UserService();
