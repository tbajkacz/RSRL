import axios from "axios";
import { ApiResponse } from "../Common/types";
import { ActionLog } from "./auditTypes";
import { unwrap } from "../Common/serviceUtility";

class AuditService {
  GetLogs() {
    return axios.get<ApiResponse<ActionLog[]>>("api/Audit/GetLogs").then(unwrap);
  }
}

export const auditService = new AuditService();
