export type Option = {
  id: string;
  name: string;
  status?: string;
  image?: string;
  children?: Option[];
};
export type DetailType = {
  id: number;
  name: string;
  count?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  error: string | null;
  data: T;
};

export type PaginationResponse<T> = {
  page: number;
  size: number;
  hasMore: boolean;
  records: T[];
};
