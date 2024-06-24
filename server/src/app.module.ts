import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { FavoritesModule } from './favorites/favorites.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MessageModule } from './message/message.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModule,
    MailerModule,
    ForgotPasswordModule,
    FavoritesModule,
    SubscriptionModule,
    MessageModule,
    ScheduleModule.forRoot()
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
