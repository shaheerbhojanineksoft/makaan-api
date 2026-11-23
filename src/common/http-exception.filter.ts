import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { errorResponse } from './api-response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let data: unknown = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        exceptionResponse &&
        typeof exceptionResponse === 'object'
      ) {
        const body = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(body.message)) {
          message = body.message.join(', ');
          data = body.message;
        } else if (typeof body.message === 'string') {
          message = body.message;
        } else if (typeof body.error === 'string') {
          message = body.error;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
    }

    response.status(status).json(errorResponse(message, data));
  }
}
