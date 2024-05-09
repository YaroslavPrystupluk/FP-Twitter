import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Get('logout')
  // logout(@Req() req: Request, @Res() res: Response) {
  // Очищення куки користувача
  // res.clearCookie('auth_cookie_name'); // Замініть 'auth_cookie_name' на ваше ім'я куки

  // Опціонально: редирект на сторінку після виходу
  // res.redirect('/');

  // Або можна просто повернути повідомлення про вихід
  // res.send('Ви вийшли з облікового запису успішно');
  // }
}
