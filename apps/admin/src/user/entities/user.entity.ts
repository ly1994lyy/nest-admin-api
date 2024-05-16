import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  username: string;

  @Column()
  password: string;
}
