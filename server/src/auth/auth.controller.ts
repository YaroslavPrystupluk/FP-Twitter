import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IToken } from 'src/types/token';
import { Cookie } from 'src/decorators/cookie.decirator';
import { Agent } from 'src/decorators/agent.decorator';
import { Public } from 'src/decorators/public.decorator';
import { UserResponse } from 'src/user/responses/user.response';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.register(registerUserDto);
    return new UserResponse(user);
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
    const tokens = await this.authService.login(loginUserDto, agent);

    this.setRefreshTokenToCookie(tokens, res);
  }

  @Get('refresh')
  async refresh(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @Agent() agent: string,
  ) {
    if (!refreshToken) throw new UnauthorizedException();

    const tokens = await this.authService.refreshTokens(refreshToken, agent);

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

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) throw new UnauthorizedException();

    await this.authService.logout(refreshToken);
    res.clearCookie(REFRESH_TOKEN);
    res.sendStatus(HttpStatus.OK);
  }
}
