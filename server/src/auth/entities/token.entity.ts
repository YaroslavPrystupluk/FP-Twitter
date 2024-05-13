import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn({ name: 'token_id' })
  id: number;

  @Column()
  refreshToken: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
