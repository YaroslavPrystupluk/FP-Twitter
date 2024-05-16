import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUser } from 'src/types/types';

export const GetUser = createParamDecorator(
  (data: string, context: ExecutionContext): IUser => {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);

    return data ? request.user[data] : request.user;
  },
);
