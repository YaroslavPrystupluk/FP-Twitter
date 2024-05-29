import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/api/uploads',
  });
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://accounts.google.com/o/oauth2/v2/auth',
      'http://localhost:3001/api/auth/google',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3001);
}
bootstrap();
