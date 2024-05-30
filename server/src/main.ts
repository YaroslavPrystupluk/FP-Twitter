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
    origin: 'http://localhost:5173',
  });
  await app.listen(3001);
}
bootstrap();
