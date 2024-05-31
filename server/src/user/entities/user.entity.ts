import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/posts/entities/posts.entity';
import { Token } from 'src/auth/entities/token.entity';
import { Provider } from 'src/enum/provider.enum';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string | null;

  @Column({ default: 'User' + Date.now() })
  displayname: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.EMAIL,
  })
  provider: Provider;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ default: false })
  isRememberMe: boolean;

  @Column({ nullable: true })
  activateLink: string;

  @Column({ default: 'https://i.stack.imgur.com/l60Hf.png' })
  avatar: string;

  @Column({ nullable: true })
  scrinshots: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => Subscription, (subscription) => subscription.follower)
  followers: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.following)
  following: Subscription[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
}
