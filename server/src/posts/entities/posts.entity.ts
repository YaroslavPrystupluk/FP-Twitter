import { Favorite } from 'src/favorites/entities/favorite.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: string;

  @Column()
  text: string;

  @Column('text', { array: true, default: [] })
  image: string[];

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.post)
  favorites: Favorite[];

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_DATETIME' })
  createdAt: Date;
}
