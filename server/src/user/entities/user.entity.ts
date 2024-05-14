import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Token } from 'src/auth/entities/token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ nullable: true })
  activateLink: string;

  @OneToMany(() => Post, (post) => post.user, { onDelete: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Token, (token) => token.user, { onDelete: 'CASCADE' })
  tokens: Token[];
}
