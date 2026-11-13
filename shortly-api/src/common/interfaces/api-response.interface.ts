export interface IApiResponse<T = unknown> {
  message?: string;
  data?: T;
  isExisting?: boolean;
}

export interface IApiResponseWithPagination<T> extends IApiResponse<T> {
  total: number;
  totalPages: number;
}
