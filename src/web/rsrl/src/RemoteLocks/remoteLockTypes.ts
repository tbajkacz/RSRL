import { AccessCard } from "../AccessCards/accessCardTypes";

export interface RemoteLock {
  id: number;
  name: string;
  url: string;
  allowedAccessCards: AccessCard[];
}

export interface RemoteLockAddParams {
  name: string;
  url: string;
  allowedAccessCardIds: string[];
}

export interface RemoteLockUpdateParams {
  id: number;
  name: string;
  url: string;
  allowedAccessCardIds: string[];
}

export interface RemoteLockDeleteParams {
  id: number;
}

export interface RemoteLockToggleBlockParams {
  lockId: number;
  targetState: boolean;
}

export interface RemoteLockUnlockParams {
  lockId: number;
}

export interface RemoteLockModalData {
  id: number;
  name: string;
  url: string;
  allowedAccessCardIds: string[];
}

export interface AccessCardSelectModel {
  id: string;
  ownerLogin: string;
  ownerName: string;
  ownerSurname: string;
}

export enum RemoteLockOperation {
  None,
  Add,
  Edit,
  Remove,
  Block,
  Unblock,
  Unlock
}
