export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  isError: boolean;
  result: T;
}

export interface CurrentUser {
  login: string;
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
