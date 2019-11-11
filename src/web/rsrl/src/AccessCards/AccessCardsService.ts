import { ApiResponse } from "../Common/types";
import axios from "axios";
import {
  AccessCard,
  AccessCardAddParams,
  AccessCardUpdateParams
} from "./accessCardTypes";
import { unwrap } from "../Common/serviceUtility";

class AccessCardsService {
  Get() {
    return axios
      .get<ApiResponse<AccessCard[]>>("AccessCards/GetAccessCards")
      .then(unwrap);
  }

  Add(param: AccessCardAddParams) {
    return axios.post("AccessCards/Add", param);
  }

  Update(param: AccessCardUpdateParams) {
    return axios.post("AccessCards/Update", param);
  }
}

export const accessCardsService = new AccessCardsService();
