import axios from "axios";
import {
  UserAccount,
  UserAccountAddParams,
  UserAccountUpdateParams,
  UserAccountRemoveParams
} from "./userTypes";
import { ApiResponse } from "../Common/types";
import { unwrap } from "../Common/serviceUtility";

class UserService {
  Get() {
    return axios.get<ApiResponse<UserAccount[]>>("User/GetUsers").then(unwrap);
  }

  Add(param: UserAccountAddParams) {
    return axios.post<ApiResponse<any>>("User/Add", param).then(unwrap);
  }

  Update(param: UserAccountUpdateParams) {
    return axios.post<ApiResponse<any>>("User/Update", param).then(unwrap);
  }

  Delete(param: UserAccountRemoveParams) {
    return axios.post<ApiResponse<any>>("User/Remove", param).then(unwrap);
  }

  Roles() {
    return axios.get<ApiResponse<string[]>>("User/AvailableRoles").then(unwrap);
  }
}

export const userService = new UserService();
