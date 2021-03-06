import axios from "axios";
import { ApiResponse } from "../Common/types";
import {
  RemoteLock,
  RemoteLockAddParams,
  RemoteLockUpdateParams,
  RemoteLockDeleteParams,
  RemoteLockToggleBlockParams,
  RemoteLockUnlockParams,
  RemoteLockIsBlockedParams,
  RemoteLockIsBlocked
} from "./remoteLockTypes";
import { unwrap } from "../Common/serviceUtility";
class RemoteLockService {
  Get() {
    return axios.get<ApiResponse<RemoteLock[]>>("api/Locks/GetLocks").then(unwrap);
  }

  Add(param: RemoteLockAddParams) {
    return axios.post<ApiResponse<any>>("api/Locks/Add", param).then(unwrap);
  }

  Update(param: RemoteLockUpdateParams) {
    return axios.post<ApiResponse<any>>("api/Locks/Update", param).then(unwrap);
  }

  Delete(param: RemoteLockDeleteParams) {
    return axios.post<ApiResponse<any>>("api/Locks/Remove", param).then(unwrap);
  }

  ToggleBlock(param: RemoteLockToggleBlockParams) {
    return axios.post<ApiResponse<any>>("api/Locks/ToggleBlock", param).then(unwrap);
  }

  Unlock(param: RemoteLockUnlockParams) {
    return axios.post<ApiResponse<any>>("api/Locks/Unlock", param).then(unwrap);
  }

  IsBlocked(param: RemoteLockIsBlockedParams) {
    return axios.get<ApiResponse<RemoteLockIsBlocked>>(`api/Locks/IsBlocked?id=${param.id}`).then(unwrap);
  }
}

export const remoteLockService = new RemoteLockService();
