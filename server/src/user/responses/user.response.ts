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

  isActivated: boolean;

  isRememberMe: boolean;

  provider: Provider;

  @Exclude()
  activateLink: string;

  posts: Post[];
  tokens: Token[];
  favorites: Favorite[];
  avatar: string;
  scrinshots: string;

  followers: Subscription[];
  following: Subscription[];
  sentMessages: Message[];
  receivedMessages: Message[];

  @Exclude()
  createdAt: Date;

  constructor(user: User | User[]) {
    Object.assign(this, user);
  }
}
