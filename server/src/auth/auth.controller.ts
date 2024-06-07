import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Response, Request as ExpressRequest } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IToken } from 'src/types/token';
import { Cookie } from 'src/decorators/cookie.decirator';
import { Agent } from 'src/decorators/agent.decorator';
import { Public } from 'src/decorators/public.decorator';
import { UserResponse } from 'src/user/responses/user.response';
import { GoogleAuthGuard } from '../guards/google.guard';
import { HttpService } from '@nestjs/axios';
import { map, mergeMap } from 'rxjs';
import { hendleTimeoutError } from 'src/helpers/timeout-error.helpers';
import { Provider } from 'src/enum/provider.enum';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.authService.register(registerUserDto);
    setTimeout(
      async () => {
        await this.authService.removeUnconfirmedUsers();
      },
      15 * 60 * 1000,
    );

    return new UserResponse(user);
  }

  @Get('activate/:activateLink')
  async activate(
    @Param('activateLink')
    activateLink: string,
    @Res() res: Response,
  ) {
    await this.authService.activate(activateLink);
    res.redirect('http://localhost:5173/activated');
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

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return await this.authService.getProfile(userId);

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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: ExpressRequest, @Res() res: Response) {
    const token = req.user['accessToken'];
    const { data } = await axios.get(
      `http://localhost:3001/api/auth/success?token=${token}`,
    );

    return res.send(data.accessToken);
  }

  @Get('success')
  async success(
    @Query('token') token: string,
    @Agent() agent: string,
    @Res() res: Response,
  ) {
    return this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
      )
      .pipe(
        mergeMap(({ data: { email, name, picture } }) =>
          this.authService.providerAuth(
            email,
            name,
            picture,
            agent,
            Provider.GOOGLE,
          ),
        ),
        map((data) => this.setRefreshTokenToCookie(data, res)),
        hendleTimeoutError(),
      );
  }
}
