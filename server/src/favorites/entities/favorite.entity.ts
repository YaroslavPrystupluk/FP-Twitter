import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/posts/entities/posts.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn({ name: 'favorite_id' })
  id: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_DATETIME' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, (post) => post.favorites, { onDelete: 'CASCADE' })
  post: Post;
}
