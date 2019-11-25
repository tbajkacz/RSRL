export interface UserAccount {
  id: number;
  name: string;
  surname: string;
  pesel: string;
  login: string;
  roles: string[];
}

export interface UserAccountAddParams {
  name: string;
  surname: string;
  pesel: string;
  login: string;
  password: string;
  roles: string[];
}

export interface UserAccountUpdateParams {
  id: number;
  name: string;
  surname: string;
  pesel: string;
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

export interface UserAccountUpdatePasswordParams {
  id: number;
  password: string;
}

export interface UserAccountModalData {
  id: number;
  name: string;
  surname: string;
  pesel: string;
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
