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
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization,Referrer-Policy,no-referrer-when-downgrade',
  });
  await app.listen(3001);
}
bootstrap();
