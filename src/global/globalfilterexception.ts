/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception instanceof HttpException
        ? Array.isArray((exception.getResponse() as any).message)
          ? (exception.getResponse() as any).message
          : [(exception.getResponse() as any).message]
        : [exception.message.split('\n').pop()];
    const errorResponse = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : exception?.code
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.INTERNAL_SERVER_ERROR,
      error:
        exception instanceof HttpException
          ? (exception.getResponse() as any).error
          : '',
      message: message[0] || exception.getResponse(),
    };

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
