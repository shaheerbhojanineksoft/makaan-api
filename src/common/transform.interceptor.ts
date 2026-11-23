import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponseBody, successResponse } from './api-response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponseBody<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponseBody<T>> {
    return next.handle().pipe(
      map((payload) => {
        if (
          payload &&
          typeof payload === 'object' &&
          'isSuccess' in (payload as object) &&
          'message' in (payload as object) &&
          'data' in (payload as object)
        ) {
          return payload as unknown as ApiResponseBody<T>;
        }
        return successResponse(payload);
      }),
    );
  }
}
