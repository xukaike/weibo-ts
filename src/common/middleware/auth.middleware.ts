import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpExceptionResult } from '../filter/http-exception-result';
import { User } from '../../user/entities/user.entity';

//Declaration merging
declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { session } = request;
    if (!session.user) {
      throw new HttpException(
        HttpExceptionResult.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
