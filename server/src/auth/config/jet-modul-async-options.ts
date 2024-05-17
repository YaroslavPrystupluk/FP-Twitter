import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
});
export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    jwtModuleOptions(configService),
});
