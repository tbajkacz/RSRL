import axios from "axios";
import { UserAccount } from "./userTypes";
import { ApiResponse } from "../Common/types";
import { unwrap } from "../Common/serviceUtility";

class UserService {
  Get() {
    return axios.get<ApiResponse<UserAccount[]>>("User/GetUsers").then(unwrap);
  }
}

export const userService = new UserService();
