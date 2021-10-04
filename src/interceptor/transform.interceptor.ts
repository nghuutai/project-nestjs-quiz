import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor');
    console.log(context.switchToHttp().getRequest().body)
    return next
      .handle()
      .pipe(
        map(data => {
            console.log(data);
            return {
                title: 'Success',
                data
            };
        }),
      );
  }
}