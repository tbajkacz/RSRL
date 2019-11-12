import { UserAccount } from "../Users/userTypes";

export interface AccessCard {
  id: string;
  owner: UserAccount;
}

export interface AccessCardAddParams {
  id: string;
  ownerId: number;
}

export interface AccessCardUpdateParams {
  id: string;
  ownerId: number;
}

export interface AccessCardModalData {
  id: string;
  ownerLogin: string;
}

export enum AccessCardOperation {
  None,
  Add,
  Edit,
  Remove
}
