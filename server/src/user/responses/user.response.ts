import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Token } from 'src/auth/entities/token.entity';

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

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.isActivated = user.isActivated;
    this.isRememberMe = user.isRememberMe;
    this.activateLink = user.activateLink;
    this.posts = user.posts;
    this.tokens = user.tokens;
  }
}
