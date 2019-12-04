export interface CurrentUser {
  login: string;
  roles: string[];
}

export interface AuthParams {
  login: string;
  password: string;
}

export interface Auth {
  currentUser?: CurrentUser;
  signIn: (params?: AuthParams) => void;
  signOut: () => void;
}
