export type ApiResponse<T> = {
  IsSuccess: boolean;
  Data: T | null;
  Message: string;
  StatusCode: number;
  Errors: string[] | null;
};
