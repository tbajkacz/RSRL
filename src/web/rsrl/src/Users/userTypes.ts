export interface UserAccount {
  id: number;
  login: string;
  roles: string[];
}

export interface UserAccountAddParams {
  login: string;
  password: string;
  roles: string[];
}

export interface UserAccountUpdateParams {
  id: number;
  login: string;
  roles: string[];
}

export interface UserAccountRemoveParams {
  id: number;
}

export interface UserAccountSelectOptionModel {
  id: number;
  login: string;
}

export interface UserAccountModalData {
  id: number;
  login: string;
  password: string;
  roles: string[];
}

export enum UserAccountOperation {
  None,
  Add,
  Edit,
  Remove,
  ChangePassword
}
