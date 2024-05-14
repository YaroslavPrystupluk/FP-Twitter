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
import { LoginUserDto } from './dto/login-user.dto';
import { IToken } from 'src/types/token';
import { Cookie } from 'src/decorators/cookie.decirator';
import { Agent } from 'src/decorators/agent.decorator';

const REFRESH_TOKEN = 'refreshtoken';

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
  @Redirect('https://www.google.com.ua/?hl=uk')
  async activate(
    @Param('activateLink')
    activateLink: string,
  ) {
    await this.authService.activate(activateLink);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
    @Agent() agent: string,
  ) {
    console.log(agent);

    const tokens = await this.authService.login(loginUserDto);

    this.setRefreshTokenToCookie(tokens, res);
  }

  @Get('refresh')
  async refresh(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) throw new UnauthorizedException();

    const tokens = await this.authService.refreshTokens(refreshToken);

    if (!tokens) throw new UnauthorizedException();

    this.setRefreshTokenToCookie(tokens, res);
  }

  private setRefreshTokenToCookie(tokens: IToken, res: Response) {
    if (!tokens || !tokens.refreshToken) throw new UnauthorizedException();

    res.cookie(REFRESH_TOKEN, tokens.refreshToken.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
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
