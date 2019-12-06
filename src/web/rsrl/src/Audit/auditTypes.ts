import { UserAccount } from "../Users/userTypes";

export interface ActionLog {
  id: number;
  executor: UserAccount;
  description: string;
  type: string;
  executionDate: string;
}
