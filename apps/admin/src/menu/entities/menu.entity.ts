import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  menuName: string;

  @Column()
  orderNum: number;

  @Column({ nullable: true })
  parentId: number;

  @Column({
    length: 50,
  })
  component: string;

  @Column({
    length: 50,
    nullable: true,
  })
  icon: string;

  @Column({
    length: 50,
  })
  path: string;

  @Column({
    length: 50,
    nullable: true,
  })
  createBy: string;

  @UpdateDateColumn()
  updateTime: Date;

  @CreateDateColumn()
  createTime: Date;
}
