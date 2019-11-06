export interface Api_ToggleBlockParam {
  TargetState: boolean;
}

export interface UnlockParam {
  accessCard: string;
}

export interface ReportMovementBody {
  lockSecretKey: string;
  eventDate: string;
}

export interface UnlockBody {
  lockSecretKey: string;
  accessCardId: string;
  eventDate: string;
}

export interface AccessDeniedBody {
  lockSecretKey: string;
  accessCardId: string;
  eventDate: string;
}

export interface Api_VerifyAccessCardAllowedResponse {
  hasAccess: boolean;
}

export interface Api_Response<T> {
  statusCode: number;
  message: string;
  isError: boolean;
  result: T;
}
