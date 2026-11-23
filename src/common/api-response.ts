export type ApiResponseBody<T = unknown> = {
  isSuccess: boolean;
  message: string;
  data: T | null;
};

export function successResponse<T>(
  data: T,
  message = 'Success',
): ApiResponseBody<T> {
  return { isSuccess: true, message, data };
}

export function errorResponse(
  message: string,
  data: unknown = null,
): ApiResponseBody {
  return { isSuccess: false, message, data };
}
