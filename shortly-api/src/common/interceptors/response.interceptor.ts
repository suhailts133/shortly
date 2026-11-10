import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import type { IApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<IApiResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        if (result && typeof result === 'object' && 'message' in result) {
          const { message, ...rest } = result as Record<string, unknown>;
          return { success: true, message: message as string, ...rest } as IApiResponse<T>;
        }
        return { success: true, data: result };
      }),
    );
  }
}