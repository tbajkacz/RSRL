import { ApiResponse } from "../Common/types";
import axios from "axios";
import { AccessCard, AccessCardAddParams, AccessCardUpdateParams, AccessCardRemoveParams } from "./accessCardTypes";
import { unwrap } from "../Common/serviceUtility";

class AccessCardsService {
  Get() {
    return axios.get<ApiResponse<AccessCard[]>>("api/AccessCards/GetAccessCards").then(unwrap);
  }

  Add(param: AccessCardAddParams) {
    return axios.post("api/AccessCards/Add", param);
  }

  Update(param: AccessCardUpdateParams) {
    return axios.post("api/AccessCards/Update", param);
  }

  Delete(param: AccessCardRemoveParams) {
    return axios.post(`api/AccessCards/Remove`, param);
  }
}

export const accessCardsService = new AccessCardsService();
