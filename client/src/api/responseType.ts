export interface IApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  statuscode: number;
}

export interface IApiResponseWithPagination<T> extends IApiResponse<T> {
  total: number;
  totalPages: number;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface JwtResponse {
  jwtToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface JwtAccessTokenPayload {
  exp: number;
  userId: string;
  name: string;
  email: string;
}

export interface RefreshTokenResponse {
  newAccessToken: string;
}

type ApiError = {
  data: IApiResponse<null>;
  status: number;
};

export const UNKNOWN_ERROR: IApiResponse<null> = {
  success: false,
  message: "something went wrong. please try again or contact support",
  statuscode: 500,
};
export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "data" in error && "status" in error;
}
