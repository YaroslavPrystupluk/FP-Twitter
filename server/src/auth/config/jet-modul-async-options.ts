import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = (
  configService: ConfigService,
  rememberMe: boolean = false,
): JwtModuleOptions => ({
  secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
  signOptions: { expiresIn: rememberMe ? '30d' : '7d' },
});
export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    jwtModuleOptions(configService, false),
});
