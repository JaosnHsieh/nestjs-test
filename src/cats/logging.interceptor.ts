import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { of, TimeoutError, throwError } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    // console.log('Before....');
    // return of([]);
    const now = Date.now();
    return next.handle().pipe(
      timeout(8000),
      catchError((err) => {
        console.log('intercept');
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}
