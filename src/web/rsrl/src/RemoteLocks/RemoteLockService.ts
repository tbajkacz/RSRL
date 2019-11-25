import axios from "axios";
import { ApiResponse } from "../Common/types";
import {
  RemoteLock,
  RemoteLockAddParams,
  RemoteLockUpdateParams,
  RemoteLockDeleteParams,
  RemoteLockToggleBlockParams,
  RemoteLockUnlockParams
} from "./remoteLockTypes";
import { unwrap } from "../Common/serviceUtility";
class RemoteLockService {
  Get() {
    return axios.get<ApiResponse<RemoteLock[]>>("Locks/GetLocks").then(unwrap);
  }

  Add(param: RemoteLockAddParams) {
    return axios.post<ApiResponse<any>>("Locks/Add", param).then(unwrap);
  }

  Update(param: RemoteLockUpdateParams) {
    return axios.post<ApiResponse<any>>("Locks/Update", param).then(unwrap);
  }

  Delete(param: RemoteLockDeleteParams) {
    return axios.post<ApiResponse<any>>("Locks/Delete", param).then(unwrap);
  }

  ToggleBlock(param: RemoteLockToggleBlockParams) {
    return axios
      .post<ApiResponse<any>>("Locks/ToggleBlock", param)
      .then(unwrap);
  }

  Unlock(param: RemoteLockUnlockParams) {
    return axios.post<ApiResponse<any>>("Locks/Unlock", param).then(unwrap);
  }
}

export const remoteLockService = new RemoteLockService();
