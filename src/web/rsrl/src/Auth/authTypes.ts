export interface CurrentUser {
  login: string;
  name: string;
  surname: string;
  roles: string[];
}

export interface AuthParams {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface Auth {
  currentUser?: CurrentUser;
  signIn: (params?: AuthParams) => void;
  signOut: () => void;
  promise?: Promise<any>;
}
