import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { Token } from 'src/auth/entities/token.entity';
import { Post } from 'src/post/entities/post.entity';

export class UserResponse implements User {
  id: string;
  email: string;

  @Exclude()
  password: string;

  isActivated: boolean;

  isRememberMe: boolean;

  @Exclude()
  activateLink: string;

  posts: Post[];
  tokens: Token[];

  @Exclude()
  createdAt: Date;

  constructor(user: User | User[]) {
    Object.assign(this, user);
  }
}
