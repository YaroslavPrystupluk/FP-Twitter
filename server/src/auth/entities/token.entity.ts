import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn({ name: 'token_id' })
  id: string;

  @Column()
  refreshToken: string;

  @Column()
  exp: Date;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
