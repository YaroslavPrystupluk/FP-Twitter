import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const allowedOrigins = ['http://localhost:5173'];
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/api/uploads',
  });
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
    // origin: function (origin, callback) {
    //   if (!origin) {
    //     return callback(null, true);
    //   }
    //   if (allowedOrigins.indexOf(origin) !== -1) {
    //     return callback(null, true);
    //   } else {
    //     return callback(new Error('Not allowed by CORS'));
    //   }
    // },
  });
  await app.listen(3001);
}
bootstrap();
