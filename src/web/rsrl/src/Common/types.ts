export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  isError: boolean;
  result: T;
}

export interface FormatUserInfoArgs {
  login: string;
  name: string;
  surname: string;
}
