import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { Token } from 'src/auth/entities/token.entity';
import { Post } from 'src/posts/entities/posts.entity';
import { Provider } from 'src/enum/provider.enum';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Message } from 'src/message/entities/message.entity';

export class UserResponse implements User {
  id: string;
  email: string;
  displayname: string;

  @Exclude()
  password: string;
  @Exclude()
  isActivated: boolean;
  @Exclude()
  isRememberMe: boolean;
  @Exclude()
  provider: Provider;
  @Exclude()
  tokens: Token[];
  @Exclude()
  activateLink: string;
  @Exclude()
  createdAt: Date;

  posts: Post[];
  favorites: Favorite[];
  avatar: string;
  banner: string;
  followers: Subscription[];
  following: Subscription[];
  sentMessages: Message[];
  receivedMessages: Message[];

  constructor(user: User | User[]) {
    Object.assign(this, user);
  }
}
