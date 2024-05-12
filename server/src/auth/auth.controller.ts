import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get('activate/:activateLink')
  @Redirect('https://www.google.com.ua/?hl=uk', HttpStatus.OK)
  async activate(
    @Param('activateLink')
    activateLink: string,
  ) {
    await this.authService.activate(activateLink);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const tokens = await this.authService.login(req.user);

    this.setRefreshTokenToCookie(req.res, tokens);
  }

  @Get('refresh')
  async refresh(@Request() req) {
    const tokens = await this.authService.login(req.user);
    this.setRefreshTokenToCookie(req.res, tokens);
  }

  private setRefreshTokenToCookie(res: Response, token: any) {
    if (!token) throw new UnauthorizedException('No token');
    res.cookie('refreshtoken', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    res.status(HttpStatus.CREATED).json({ accessToken: token.accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('refreshtoken');
    res.redirect('/');
    res.send('You have been logged out');
  }
}
