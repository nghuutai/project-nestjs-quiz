import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface IResposeException {
  statusCode: number;
  error: string;
  message: string[];
}

interface IResultException {
  title: string;
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | string[];
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Filter');
    console.log('121324', (exception as QueryFailedError).message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = "Internal server error";
    
    if (exception instanceof QueryFailedError) {
      message = exception.message;
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const error: IResposeException =  exception.getResponse() as IResposeException;
      message = error.message;
    }

    const resultException: IResultException = {
      title: 'Failed',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    }

    response
      .status(status)
      .json(resultException);
  }
}