export type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
  message: string;
  statusCode: number;
  errors: string[] | null;
};
