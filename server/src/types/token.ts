import { Token } from 'src/auth/entities/token.entity';

export interface IToken {
  accessToken: string;
  refreshToken: Token;
}
