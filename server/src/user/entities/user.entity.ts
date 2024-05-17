import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/post/entities/posts.entity';
import { Token } from 'src/auth/entities/token.entity';
import { Provider } from 'src/enum/provider.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string | null;

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

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
