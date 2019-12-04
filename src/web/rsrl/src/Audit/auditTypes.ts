import { UserAccount } from "../Users/userTypes";

export interface ActionLog {
  executor: UserAccount;
  description: string;
  type: string;
  executionDate: string;
}
