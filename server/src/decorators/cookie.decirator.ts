import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return key && key in request.cookies
      ? request.cookies[key]
      : request.cookies;
  },
);
